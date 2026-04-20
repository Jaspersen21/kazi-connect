from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException


def to_object_id(id: str, field_name: str = "id") -> ObjectId:
    try:
        return ObjectId(id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid {field_name} format"
        )