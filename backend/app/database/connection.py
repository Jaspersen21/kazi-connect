from pymongo import AsyncMongoClient
from app.core.config import settings


if not settings.MONGO_URL:
    raise ValueError("MONGO_URL environment variable is not set")

client = AsyncMongoClient(settings.MONGO_URL)
database = client[settings.DB_NAME]