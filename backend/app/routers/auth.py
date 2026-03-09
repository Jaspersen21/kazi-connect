from fastapi import (APIRouter, HTTPException, Depends, security)
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.database.connection import database
from app.core.security import (hash_password, verify_password, create_access_token, verify_token, get_current_user)
from app.schemas.user import UserCreate, UserLogin, UserOut


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
async def register(user: UserCreate):

    #Check if users already exxits 
    existing_user = await database.users.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    #Hash password 
    hashed_pw = hash_password(user.password)

    #create user document 
    user_dict = user.dict()
    user_dict["password"] = hashed_pw

    #Insert user into database 
    result = await database.users.insert_one(user_dict)

    return {"message": "User registered successfully"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    #Find user by email
    existing_user = await database.users.find_one({"email": form_data.username})

    if not existing_user:
        raise HTTPException(status_code=400, detail= "Invalid email or password")
    
    #Verify password
    if not verify_password(form_data.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail= "Invalid email or password")
    
    #Create JWT token
    token = create_access_token({"sub": existing_user["email"]})

    return {
        "access_token": token,
        "token_type": "bearer"
    }




@router.get("/users/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return{
        "name": current_user["name"],
        "email": current_user["email"]  
    }


