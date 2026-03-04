from fastapi import FastAPI
from database import database

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "KaziConnect Backend Running 🚀"}