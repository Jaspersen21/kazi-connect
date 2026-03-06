from fastapi import FastAPI, HTTPException
from database import database
from schemas import UserCreate
from auth import hash_password 
from auth import verify_password

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
    user_dict = {
        "email": user.email,
        "password": hashed_pw
    }

    #Insert user into database 
    await database.users.insert_one(user_dict)

    return {"message": "User registered successfully"}


@app.post("/login")
async def login(user: UserCreate):
    #Find user by email
    existing_user = await database.users.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(status_code=400, detail= "Invalid email or password")
    
    #Verify password
    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail= "Invalid email or password")
    
    return {"message": "Login successful"}
