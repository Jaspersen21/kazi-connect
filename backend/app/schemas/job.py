from pydantic import BaseModel, Field
from datetime import datetime
from typing import List

class JobCreate(BaseModel):
    title: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
    company: str = Field(..., min_length=3)


class JobOut(BaseModel):
    id: str  # mapped from _id
    title: str
    description: str
    company: str
    created_by: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

class JobUpdate(BaseModel):
    title: str | None = Field(None, min_length=3)
    description: str | None = Field(None, min_length=10)
    company: str | None = Field(None, min_length=3)

class JobListResponse(BaseModel):
    total: int
    page: int
    limit: int
    data: List[JobOut]    