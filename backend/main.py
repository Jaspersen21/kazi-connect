from fastapi import FastAPI, HTTPException
from database import database
from schemas import UserCreate
from auth import hash_password 

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "KaziConnect Backend Running 🚀"}

@app.post("/register")
async def register(user: UserCreate):

    #Check if users already exxits 
    existing_user = await database.users.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    #Hash password 
    hashed_pw = hash_password(user.password)

    #create user document 
    user_dict = user.dict()
    user_dict["pasword"] = hashed_pw

    #Insert user into database 
    await database.users.insert_one(user_dict)

    return {"message": "User registered successfully"}