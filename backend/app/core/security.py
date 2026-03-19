from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from app.database.connection import database
from fastapi.security import OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")



SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256" 
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"] , deprecated="auto")

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
        email: str = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Invalid token"

            )
        return email
    
    except JWTError:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Token is invalid or expired"
        )
    



async def get_current_user(token: str = Depends(oauth2_scheme)):
    email = verify_token(token)

    user = await database.users.find_one({"email": email})

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user