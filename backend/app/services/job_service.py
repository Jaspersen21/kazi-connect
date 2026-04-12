from fastapi  import HTTPException
from bson import ObjectId
from bson.errors import InvalidId
from app.database.connection import database

async def create_job(job, current_user):
    new_job = {
        "title" : job.title,
        "description" : job.description,
        "company" : job.company,
        "created_by" : current_user["_id"],
        "is_active": True
    }

    result = await database.jobs.insert_one(new_job)

    new_job["_id"] = str(result.inserted_id)
    new_job["created_by"] = str(new_job["created_by"])

    return new_job

async def list_jobs(page: int, limit: int, search: str | None = None, 
                    company: str | None = None,
                     sort: str | None = None, 
                     order: str = "asc"):

    skip = (page - 1) * limit 

    query = {"is_active": True}

    if search:
        search = search.strip()
        if not search:
            search = None
        if company:
            query["$or"] = [
                {"title": {"$regex": search, "$options": "i"}}]
        else:
            query["$or"] = [
                {"title": {"$regex": search, "$options": "i"}},
                {"company": {"$regex": search, "$options": "i"}}
            ]

    if company:
        company = company.strip()
        if not company:
            company = None
        query["company"] = company

    ALLOWED_SORT_FIELDS = ["title", "company"]

    if sort:
        sort = sort.strip().lower()
        if sort not in ALLOWED_SORT_FIELDS:
            raise HTTPException(status_code=400, detail="Invalid sort field")
           

    total = await database.jobs.count_documents(query)

    cursor = database.jobs.find(query)

    if sort:
        order = order.lower()
        sort_order = 1 if order == "asc" else -1 
        cursor = cursor.sort(sort, sort_order)

    else:
        cursor = cursor.sort("_id", -1)

    cursor = cursor.skip(skip).limit(limit)        

    jobs = []

    async for job in cursor:
        job["_id"] = str(job["_id"])
        job["created_by"] = str(job["created_by"])
        jobs.append(job)


    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": jobs
    }

async def get_job_by_id(job_id: str):

    try:
        job_object_id = ObjectId(job_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid job ID format")
    
    job = await database.jobs.find_one({"_id": job_object_id, "is_active": True})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job["_id"] = str(job["_id"])
    job["created_by"] = str(job["created_by"])

    return job

async def update_job_service(job_id, job_update, employer):
    #validate job id
    try:
        job_object_id = ObjectId(job_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid job ID format")
    
    #find job
    job = await database.jobs.find_one({"_id": job_object_id, "is_active": True})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    #check ownership
    if job["created_by"] != employer["_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this job")
    

    #prepare update data
    update_data = job_update.dict(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    await database.jobs.update_one({"_id": job_object_id}, {"$set": update_data})

    #fetch updated job

    updated_job = await database.jobs.find_one({"_id": job_object_id})

    updated_job["_id"] = str(updated_job["_id"])
    updated_job["created_by"] = str(updated_job["created_by"])

    return updated_job

async def delete_job_service(job_id, employer):
    #validate job id
    try:
        job_object_id = ObjectId(job_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid job ID format")
    
    #find job
    job = await database.jobs.find_one({"_id": job_object_id, "is_active": True})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    #check ownership
    if job["created_by"] != employer["_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this job")
    
    #soft delete by setting is_active to False
    await database.jobs.update_one({"_id": job_object_id}, {"$set": {"is_active": False}})

    return {"detail": "Job deleted successfully"}
    



    
