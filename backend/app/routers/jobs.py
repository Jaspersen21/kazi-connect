from fastapi import APIRouter, Depends
from app.schemas.job import JobCreate
from app.services.job_service import create_job, list_jobs, get_job_by_id
from app.core.security import get_current_employer, get_current_seeker
from app.services.application_service import get_job_applications, apply_for_job, update_application_status

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)

@router.post("/")
async def create_new_job(job: JobCreate, employer = Depends(get_current_employer)):
    return await create_job(job, employer)

@router.get("/")
async def get_jobs(page: int = 1, limit: int = 10):
    return await list_jobs(page, limit)

@router.get("/{job_id}")
async def get_job(job_id: str):
    return await get_job_by_id(job_id)

@router.post("/{job_id}/apply")
async def apply_for_job(job_id: str, seeker = Depends(get_current_seeker)):
    return await apply_for_job(job_id, seeker)

@router.get("/{job_id}/applications")
async def get_applications(job_id: str, employer = Depends(get_current_employer)):
    return await get_job_applications(job_id, employer)

@router.patch("/applications/{application_id}")
async def update_application(application_id: str, status: str, employer = Depends(get_current_employer)):
    return await update_application_status(application_id, status, employer)