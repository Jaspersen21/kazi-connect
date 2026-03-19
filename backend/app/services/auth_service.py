from app.database.connection import database
from app.core.security import hash_password, verify_password, create_access_token


async def register_user(user):

    existing_user = await database.users.find_one({"email": user.email})

    if existing_user:
        raise ValueError("User already exists")
    
    hashed_pw = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_pw
    }

    result = await database.users.insert_one(new_user)

    return {"message": "User registered successfully"}


async def login_user(email: str, password: str):
    user = await database.users.find_one({"email": email})

    if not user:
        raise ValueError("Invalid email or password")

    if not verify_password(password, user["password"]):
        raise ValueError("Invalid email or password")

    token = create_access_token(data={"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}

