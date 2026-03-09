from fastapi import FastAPI, HTTPException
from app.database.connection import database
from app.core.security import (hash_password, verify_password, create_access_token)
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.routers.auth import router as auth_router
from schemas import UserCreate, UserLogin, UserOut
from auth import hash_password 
from auth import verify_password
from auth import create_access_token
from fastapi.security import OAuth2PasswordBearer
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from auth import verify_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI()

app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "KaziConnect Backend Running 🚀"}

@app.post("/register")



@app.post("/login")



async def get_current_user(token: str = Depends(oauth2_scheme)):
    email = verify_token(token)

    user = await database.users.find_one({"email": email})

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

@app.get("/users/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return{
        "name": current_user["name"],
        "email": current_user["email"]  
    }
