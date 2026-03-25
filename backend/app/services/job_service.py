from fastapi  import HTTPException
from bson import ObjectId

from app.database.connection import database

async def create_job(job, current_user):
    new_job = {
        "title" : job.title,
        "description" : job.description,
        "company" : job.company,
        "created_by" : current_user["_id"]
    }

    result = await database.jobs.insert_one(new_job)

    new_job["_id"] = str(result.inserted_id)
    new_job["created_by"] = str(new_job["created_by"])

    return new_job

async def list_jobs(page: int, limit: int):
    skip = (page - 1) * limit 

    cursor = database.jobs.find().skip(skip).limit(limit)

    jobs = []

    async for job in cursor:
        job["_id"] = str(job["_id"])
        job["created_by"] = str(job["created_by"])
        jobs.append(job)


    return jobs

async def get_job_by_id(job_id: str):

    job = await database.jobs.find_one({"_id": ObjectId(job_id)})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job["_id"] = str(job["_id"])
    job["created_by"] = str(job["created_by"])

    return job