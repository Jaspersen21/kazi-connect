from bson import ObjectId
from fastapi import HTTPException
from app.database.connection import database
from datetime import datetime, timezone
from pymongo.errors import DuplicateKeyError
from app.utils.formatters import format_application
from app.utils.db_helpers import to_object_id

async def apply_for_job(job_id, seeker):
    job_object_id = to_object_id(job_id, "job_id")

    job = await database.jobs.find_one({"_id": job_object_id, "is_active": True})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing_application = await database.applications.find_one({
        "job_id": job_object_id,
        "user_id": seeker["_id"]
    })

    if existing_application:
        raise HTTPException(status_code=400, detail="You have already applied for this job")
    
    now = datetime.now(timezone.utc)


    application = {
        "job_id": job_object_id,
        "user_id": seeker["_id"],
        "status": "pending",
        "created_at": now,
        "updated_at": now

    }

    try:
        result = await database.applications.insert_one(application)
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="You have already applied for this job")
    
    application["_id"] = result.inserted_id
    return format_application(application)


async def get_job_applications(job_id, employer):

    job_object_id = to_object_id(job_id, "job_id")
    job = await database.jobs.find_one({"_id": job_object_id})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if str(job["created_by"]) != str(employer["_id"]):
        raise HTTPException(status_code=403, detail="You are not authorized")
    
    cursor = database.applications.find({"job_id": job_object_id})

    applications = []

    async for application in cursor:
        user = await database.users.find_one({"_id": application["user_id"]})

        applications.append({
            "application_id": str(application["_id"]),
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "status": application["status"]
        })

    return applications


async def  update_application_status(application_id, status, employer):

    application_id_obj = to_object_id(application_id, "application_id")

    application = await database.applications.find_one({"_id": application_id_obj})

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    job = await database.jobs.find_one({"_id": application["job_id"]})

    if str(job["created_by"]) != str(employer["_id"]):
        raise HTTPException(status_code=403, detail="You are not authorized")
    
    await database.applications.update_one({"_id": application_id_obj}, 
                                           {"$set": {"status": status,
                                                     "updated_at": datetime.now(timezone.utc)}})

    if status == "accepted":
        await database.applications.update_many(
            {
                "job_id": application["job_id"],
                "_id": {"$ne": application_id_obj}
            },
            {
                "$set": {"status": "rejected",
                          "updated_at": datetime.now(timezone.utc)}
            }
        )

    update_application = await database.applications.find_one({"_id": application_id_obj})

    return format_application(update_application)    


async def get_jobs_applied_by_seeker(seeker, page: int, limit: int, status: str | None = None):

    match_query = {
        "user_id": seeker["_id"]
    }

    if status:
        match_query["status"] = status

    total = await database.applications.count_documents(match_query)

    skip = (page - 1) * limit

    

    pipeline  = [
            {
                "$match": match_query
            },
             {
                 "$lookup": {
                      "from": "jobs",
                      "localField": "job_id",
                      "foreignField":"_id",
                      "as": "job_details"
                 }
             },
             {
                 "$unwind" : {
                        "path": "$job_details",
                        "preserveNullAndEmptyArrays": True
                 }
             },
             {
                 "$skip": skip
             },
             {
                 "$limit": limit
             }
        ]

    cursor = await  database.applications.aggregate(pipeline)

    applied_jobs = []

    async for application  in cursor:

            if not application.get("job_details"):
                applied_jobs.append({
                    "application_id": str(application["_id"]),
                    "job_id": str(application["job_id"]),
                    "status": application["status"],
                    "title": "Job not found",
                    "company": None
                })
                continue

            applied_jobs.append({
                "application_id": str(application["_id"]),
                "job_id": str(application["job_id"]),
                "status": application["status"],
                "title": application["job_details"]["title"],
                "company": application["job_details"]["company"]
            })

    return {
            "total": total,
            "page": page,
            "limit": limit,
            "data": applied_jobs
        }

           