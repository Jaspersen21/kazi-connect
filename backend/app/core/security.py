from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer

from app.database.connection import database
from app.core.config import settings
from app.utils.db_helpers import to_object_id


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable is not set")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        return user_id

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid or expired"
        )


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user_id = verify_token(token)
    user_object_id = to_object_id(user_id, "user_id")
    user = await database.users.find_one({"_id": user_object_id})

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user


async def get_current_employer(current_user=Depends(get_current_user)):
    if current_user.get("role") != "employer":
        raise HTTPException(status_code=403, detail="Only employers can create job")
    return current_user


async def get_current_seeker(current_user=Depends(get_current_user)):
    if current_user.get("role") != "seeker":
        raise HTTPException(status_code=403, detail="Only job seekers can apply for jobs")
    return current_user