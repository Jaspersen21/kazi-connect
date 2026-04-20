from app.database.connection import database
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.user import UserCreate
from datetime import datetime, timezone
from pymongo.errors import DuplicateKeyError
from fastapi import HTTPException
from app.utils.formatters import format_user


async def register_user(user: UserCreate):
    existing_user = await database.users.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = hash_password(user.password)
    now = datetime.now(timezone.utc)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pw,
        "role": user.role,
        "created_at": now,
        "updated_at": now
    }

    try:
        result = await database.users.insert_one(new_user)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user["_id"] = result.inserted_id
    return format_user(new_user)


async def login_user(email: str, password: str):
    user = await database.users.find_one({"email": email})

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}