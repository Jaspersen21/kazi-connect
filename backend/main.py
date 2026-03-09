from fastapi import FastAPI, HTTPException
from app.database.connection import database
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
    user_dict["password"] = hashed_pw

    #Insert user into database 
    result = await database.users.insert_one(user_dict)

    return {"message": "User registered successfully"}


@app.post("/login")
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
