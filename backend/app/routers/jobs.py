from fastapi import APIRouter, Depends
from app.schemas.job import JobCreate
from app.services.job_service import create_job, list_jobs, get_job_by_id
from app.core.security import get_current_employer, get_current_seeker
from app.services.application_service import get_job_applications, apply_for_job, update_application_status, get_jobs_applied_by_seeker
from fastapi import Query
from typing import Literal

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)

@router.post("/")
async def create_new_job(job: JobCreate, employer = Depends(get_current_employer)):
    return await create_job(job, employer)

@router.get("/applied")
async def get_applied_jobs( 
    seeker = Depends(get_current_seeker),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    status: Literal["pending", "accepted", "rejected"] | None = Query(None)
):
    return await get_jobs_applied_by_seeker(seeker, page, limit, status)



@router.get("/")
async def get_jobs(page: int = Query(1, ge=1), limit: int = Query(10, ge=1, le=100)):
    return await list_jobs(page, limit)


@router.post("/{job_id}/apply")
async def apply_to_job(job_id: str, seeker = Depends(get_current_seeker)):
    return await apply_for_job(job_id, seeker)

@router.get("/{job_id}/applications")
async def get_applications(job_id: str, employer = Depends(get_current_employer)):
    return await get_job_applications(job_id, employer)

@router.patch("/applications/{application_id}")
async def update_application(application_id: str, status: str, employer = Depends(get_current_employer)):
    return await update_application_status(application_id, status, employer)

@router.get("/{job_id}")
async def get_job(job_id: str):
    return await get_job_by_id(job_id)







