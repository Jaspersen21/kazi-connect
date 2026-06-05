from fastapi import FastAPI, HTTPException
from app.routers.auth import router as auth_router
from app.routers.jobs import router as jobs_router
from app.routers.applications import router as applications_router
from app.database.connection import database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://kazi-connect-whkm.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get("/health/db")
async def health_db():
    try:
        await database.command("ping")
        return {"status": "ok", "db": "connected"}
    except Exception:
        raise HTTPException(status_code=503, detail="Database not connected")

app.include_router(auth_router)
app.include_router(jobs_router)
app.include_router(applications_router)