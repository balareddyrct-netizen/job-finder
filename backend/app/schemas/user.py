from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserResponse(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    image: Optional[str] = None
    summary: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    education: list = []
    experience: list = []
    skills: list = []
    job_preferences: dict = {}
    role: str = "user"
    provider: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    last_login_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    summary: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    education: Optional[list] = None
    experience: Optional[list] = None
    skills: Optional[list] = None
    job_preferences: Optional[dict] = None


class UserCreate(BaseModel):
    email: str
    name: Optional[str] = None
    password: Optional[str] = None
    provider: Optional[str] = None
    provider_id: Optional[str] = None
    image: Optional[str] = None
