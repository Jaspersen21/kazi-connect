from fastapi import (APIRouter, HTTPException, Depends)
from fastapi.security import  OAuth2PasswordRequestForm
from app.database.connection import database
from app.core.security import (hash_password, verify_password, create_access_token, verify_token, get_current_user)
from app.schemas.user import UserCreate, UserLogin, UserOut
from  app.services.auth_service import register_user , login_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register", response_model=UserOut)
async def register(user : UserCreate):

    try:
        return await register_user(user)
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        return await login_user(form_data.username, form_data.password)
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    


  
@router.get("/users/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return{
        "name": current_user["name"],
        "email": current_user["email"]  
    }


