from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class JobResponse(BaseModel):
    id: str
    source: str
    source_url: str
    source_job_id: Optional[str] = None
    title: str
    company_name: str
    company_logo: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    work_mode: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    salary_currency: str = "INR"
    description: str
    requirements: Optional[dict] = None
    skills_required: list = []
    experience_min: Optional[int] = None
    experience_max: Optional[int] = None
    posted_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    is_active: bool = True
    company_funding: Optional[dict] = None
    hiring_trend: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class JobSearchParams(BaseModel):
    q: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    work_mode: Optional[str] = None
    experience_min: Optional[int] = None
    experience_max: Optional[int] = None
    salary_min: Optional[float] = None
    source: Optional[str] = None
    skip: int = 0
    limit: int = 20


class SavedJobResponse(BaseModel):
    id: str
    user_id: str
    job_id: str
    saved_at: Optional[datetime] = None
    job: Optional[JobResponse] = None

    class Config:
        from_attributes = True
