from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.core.security import get_current_user
from app.schemas.user import UserCreate, UserOut
from app.services.auth_service import register_user, login_user
from app.utils.formatters import format_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    return await register_user(user)


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return await login_user(form_data.username, form_data.password)


@router.get("/users/me", response_model=UserOut)
async def read_users_me(current_user=Depends(get_current_user)):
    return format_user(current_user)