from pydantic import BaseModel, Field

class JobCreate(BaseModel):
    title: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
    company: str = Field(..., min_length=3)


class JobOut(BaseModel):
    title: str
    description: str
    company: str
    created_by: str