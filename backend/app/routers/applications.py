from fastapi import APIRouter, Depends, Query
from typing import Literal, List

from app.core.security import get_current_employer, get_current_seeker
from app.services.application_service import (
    get_job_applications,
    apply_for_job,
    update_application_status,
    get_jobs_applied_by_seeker,
)
from app.schemas.application import (
    ApplicationOut,
    EmployerApplicationView,
    AppliedJobsResponse,
)

router = APIRouter(
    tags=["applications"]
)


@router.get("/applications/me", response_model=AppliedJobsResponse)
async def get_my_applications(
    seeker=Depends(get_current_seeker),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    status: Literal["pending", "accepted", "rejected"] | None = Query(None),
):
    return await get_jobs_applied_by_seeker(seeker, page, limit, status)


@router.post("/jobs/{job_id}/apply", response_model=ApplicationOut)
async def apply_to_job(
    job_id: str,
    seeker=Depends(get_current_seeker)
):
    return await apply_for_job(job_id, seeker)


@router.get("/jobs/{job_id}/applications", response_model=List[EmployerApplicationView])
async def get_applications_for_job(
    job_id: str,
    employer=Depends(get_current_employer)
):
    return await get_job_applications(job_id, employer)


@router.patch("/applications/{application_id}", response_model=ApplicationOut)
async def update_application(
    application_id: str,
    status: Literal["pending", "accepted", "rejected"],
    employer=Depends(get_current_employer)
):
    return await update_application_status(application_id, status, employer)