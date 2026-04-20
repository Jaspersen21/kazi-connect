from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers.jobs import router as jobs_router
from app.routers.applications import router as applications_router
from app.database.connection import database

app = FastAPI()

@app.on_event("startup")
async def create_indexes():
    
    # USERS: unique email
    await database.users.create_index("email", unique=True)

    # APPLICATIONS: prevent duplicate applications
    await database.applications.create_index(
        [("job_id", 1), ("user_id", 1)],
        unique=True
    )

    # APPLICATIONS: query optimization
    await database.applications.create_index("user_id")
    await database.applications.create_index("job_id")

    # JOBS: query optimization
    await database.jobs.create_index("created_by")
    await database.jobs.create_index("is_active")
    await database.jobs.create_index("company", background=True)

@app.get("/")
async def root():
    return {"message": "Kazi Connect API is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}

app.include_router(auth_router)
app.include_router(jobs_router)
app.include_router(applications_router)