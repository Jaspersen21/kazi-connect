from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ProfileBase(BaseModel):
    full_name: str | None = Field(None, min_length=2, max_length=100)
    phone: str | None = Field(None, min_length=7, max_length=30)
    location: str | None = Field(None, min_length=2, max_length=100)
    headline: str | None = Field(None, min_length=2, max_length=200)
    summary: str | None = Field(None, min_length=10, max_length=2000)
    skills: list[str] = Field(default_factory=list, max_length=50)


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(BaseModel):
    full_name: str | None = Field(None, min_length=2, max_length=100)
    phone: str | None = Field(None, min_length=7, max_length=30)
    location: str | None = Field(None, min_length=2, max_length=100)
    headline: str | None = Field(None, min_length=2, max_length=200)
    summary: str | None = Field(None, min_length=10, max_length=2000)
    skills: list[str] | None = Field(None, max_length=50)


class ProfileOut(BaseModel):
    id: str
    user_id: str

    full_name: str | None = None
    phone: str | None = None
    location: str | None = None
    headline: str | None = None
    summary: str | None = None
    skills: list[str] = Field(default_factory=list)

    created_at: datetime
    updated_at: datetime

