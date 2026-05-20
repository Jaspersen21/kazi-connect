from fastapi import APIRouter, Depends, Query
from typing import Literal


from app.schemas.job import JobCreate, JobUpdate, JobOut, JobListResponse

from app.services.job_service import (
    create_job,
    list_jobs,
    get_job_by_id,
    update_job_service,
    delete_job_service,
    count_active_jobs,
)
from app.core.security import get_current_employer

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)


@router.post("/", response_model=JobOut)
async def create_new_job(
    job: JobCreate,
    employer=Depends(get_current_employer)
):
    return await create_job(job, employer)


@router.get("/", response_model=JobListResponse)
async def get_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = Query(None),
    company: str | None = Query(None),
    location: str | None = Query(None),
    category: str | None = Query(None),
    job_type: str | None = Query(None),
    sort: str | None = Query(None),
    order: Literal["asc", "desc"] = Query("asc"),
):
    return await list_jobs(page, limit, search, company, location, category, job_type, sort, order)



@router.patch("/{job_id}", response_model=JobOut)
async def update_job(
    job_id: str,
    job_update: JobUpdate,
    employer=Depends(get_current_employer)
):
    return await update_job_service(job_id, job_update, employer)


@router.delete("/{job_id}")
async def delete_job(
    job_id: str,
    employer=Depends(get_current_employer)
):
    return await delete_job_service(job_id, employer)


@router.get("/count")
async def get_jobs_count():
    return await count_active_jobs()


@router.get("/{job_id}", response_model=JobOut)
async def get_job(job_id: str):
    return await get_job_by_id(job_id)
