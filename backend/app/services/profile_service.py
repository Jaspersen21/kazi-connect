from bson import ObjectId
from datetime import datetime, timezone
from fastapi import HTTPException
from pymongo.errors import DuplicateKeyError

from app.database.connection import database
from app.utils.db_helpers import to_object_id


def _format_profile(doc: dict) -> dict:
    # DB doc contains _id (ObjectId)
    if not doc:
        return doc
    doc = dict(doc)
    doc["id"] = str(doc.pop("_id"))
    if "user_id" in doc and isinstance(doc["user_id"], ObjectId):
        doc["user_id"] = str(doc["user_id"])
    return doc


async def get_profile_for_user(user: dict) -> dict:
    profile = await database.profiles.find_one({"user_id": user["_id"]})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return _format_profile(profile)


async def create_profile_for_user(payload: dict, user: dict) -> dict:
    now = datetime.now(timezone.utc)

    doc = {
        "user_id": user["_id"],
        "full_name": payload.get("full_name"),
        "phone": payload.get("phone"),
        "location": payload.get("location"),
        "headline": payload.get("headline"),
        "summary": payload.get("summary"),
        "skills": payload.get("skills") or [],
        "created_at": now,
        "updated_at": now,
    }

    # Remove None values to keep DB clean
    doc = {k: v for k, v in doc.items() if v is not None or k in {"user_id", "skills", "created_at", "updated_at"}}

    try:
        result = await database.profiles.insert_one(doc)
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="Profile already exists")

    created = await database.profiles.find_one({"_id": result.inserted_id})
    return _format_profile(created)


async def update_profile_for_user(payload: dict, user: dict) -> dict:
    now = datetime.now(timezone.utc)

    update_data = {
        "full_name": payload.get("full_name"),
        "phone": payload.get("phone"),
        "location": payload.get("location"),
        "headline": payload.get("headline"),
        "summary": payload.get("summary"),
        "skills": payload.get("skills"),
        "updated_at": now,
    }

    # Only set provided keys; ignore missing fields (payload should be dict(exclude_unset=True))
    update_data = {k: v for k, v in update_data.items() if k == "updated_at" or k in payload}

    if not update_data or set(update_data.keys()) == {"updated_at"}:
        raise HTTPException(status_code=400, detail="No fields to update")

    res = await database.profiles.update_one(
        {"user_id": user["_id"]},
        {"$set": update_data},
        upsert=True,
    )

    doc = await database.profiles.find_one({"user_id": user["_id"]})
    return _format_profile(doc)

