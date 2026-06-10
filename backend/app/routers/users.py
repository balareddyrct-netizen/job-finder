from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from typing import Optional
import uuid

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    user_id: str = None,  # Will come from auth middleware
    db: AsyncSession = Depends(get_db),
):
    """Get current user profile."""
    # For now, get first user or create demo user
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/me", response_model=UserResponse)
async def update_profile(
    data: UserUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update current user profile."""
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    await db.flush()
    return user


@router.post("/me/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    """Upload profile avatar."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Save file
    file_ext = file.filename.split(".")[-1]
    filename = f"avatars/{uuid.uuid4()}.{file_ext}"

    import os
    os.makedirs("uploads/avatars", exist_ok=True)
    file_path = f"uploads/{filename}"

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Update user
    result = await db.execute(select(User).limit(1))
    user = result.scalar_one_or_none()
    if user:
        user.image = f"/uploads/{filename}"
        await db.flush()

    return {"url": f"/uploads/{filename}"}


@router.get("/", response_model=list[UserResponse])
async def list_users(
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    """List all users (admin)."""
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()
