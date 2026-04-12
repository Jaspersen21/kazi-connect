from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers import jobs

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Kazi Connect API is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}

app.include_router(auth_router)
app.include_router(jobs.router)