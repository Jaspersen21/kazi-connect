from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List

class ApplicationOut(BaseModel):
    id: str
    job_id: str
    user_id: str
    status: str
    created_at: datetime
    updated_at: datetime

class EmployerApplicationView(BaseModel):
    application_id: str
    user_id: str
    name: str
    email: EmailStr
    status: str

class AppliedJobItem(BaseModel):
    application_id: str
    job_id: str
    status: str
    title: str
    company: str | None


class AppliedJobsResponse(BaseModel):
    total: int
    page: int
    limit: int
    data: List[AppliedJobItem]    
