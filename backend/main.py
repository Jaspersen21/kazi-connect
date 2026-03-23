from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers import jobs


app = FastAPI()

app.include_router(auth_router)
app.include_router(jobs.router)