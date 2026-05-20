from fastapi import APIRouter, Depends
from app.core.security import get_current_seeker

from app.schemas.profile import ProfileCreate, ProfileOut, ProfileUpdate
from app.services.profile_service import (
    create_profile_for_user,
    get_profile_for_user,
    update_profile_for_user,
)

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("", response_model=ProfileOut)
async def get_my_profile(seeker=Depends(get_current_seeker)):
    return await get_profile_for_user(seeker)


@router.post("", response_model=ProfileOut)
async def create_my_profile(profile: ProfileCreate, seeker=Depends(get_current_seeker)):
    return await create_profile_for_user(profile.dict(exclude_unset=True), seeker)


@router.put("", response_model=ProfileOut)
async def update_my_profile(profile: ProfileUpdate, seeker=Depends(get_current_seeker)):
    data = profile.dict(exclude_unset=True)
    return await update_profile_for_user(data, seeker)

