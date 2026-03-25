from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException
from app.database.connection import database


async def apply_for_job(job_id, seeker):

    try:
        job_object_id = ObjectId(job_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid job ID format")




    job = await database.jobs.find_one({"_id": ObjectId(job_id)})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing_application = await database.applications.find_one({
        "job_id": ObjectId(job_id),
        "user_id": seeker["_id"]
    })

    if existing_application:
        raise HTTPException(status_code=400, detail="You have already applied for this job")


    application = {
        "job_id": job_object_id,
        "user_id": seeker["_id"],
        "status": "pending"
    }



    result = await database.applications.insert_one(application)

    application["_id"] = str(result.inserted_id)
    application["job_id"] = str(application["job_id"])
    application["user_id"] = str(application["user_id"])

    

    return application


async def get_job_applications(job_id, employer):

    job = await database.jobs.find_one({"_id": ObjectId(job_id)})

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if str(job["created_by"]) != str(employer["_id"]):
        raise HTTPException(status_code=403, detail="You are not authorized")
    
    cursor = database.applications.find({"job_id": ObjectId(job_id)})

    applications = []

    async for appliction in cursor:
        user = await database.users.find_one({"_id": ObjectId(appliction["user_id"])})

        applications.append({
            "application_id": str(appliction["_id"]),
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "status": appliction["status"]
        })

    return applications


async def  update_application_status(application_id, status, employer):

    application = await database.applications.find_one({"_id": ObjectId(application_id)})

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    job = await database.jobs.find_one({"_id": ObjectId(application["job_id"])})

    if str(job["created_by"]) != str(employer["_id"]):
        raise HTTPException(status_code=403, detail="You are not authorized")
    
    await database.applications.update_one({"_id": ObjectId(application_id)}, {"$set": {"status": status}})

    if status == "accepted":
        await database.applications.update_many(
            {
                "job_id": application["job_id"],
                "_id": {"$ne": ObjectId(application_id)}
            },
            {
                "$set": {"status": "rejected"}
            }
        )

    update_application = await database.applications.find_one({"_id": ObjectId(application_id)})

    update_application["_id"] = str(update_application["_id"])
    update_application["job_id"] = str(update_application["job_id"])
    update_application["user_id"] = str(update_application["user_id"])

    return update_application    