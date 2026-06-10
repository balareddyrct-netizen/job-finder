from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ResumeResponse(BaseModel):
    id: str
    user_id: str
    title: str
    raw_file_url: Optional[str] = None
    content_json: dict = {}
    content_text: Optional[str] = None
    parsed_data: Optional[dict] = None
    ats_score: Optional[float] = None
    ats_feedback: Optional[dict] = None
    is_primary: bool = False
    version: int = 1
    template: str = "professional"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ResumeCreate(BaseModel):
    user_id: str
    title: str
    content_json: dict = {}
    content_text: Optional[str] = None
    template: Optional[str] = "professional"


class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    content_json: Optional[dict] = None
    content_text: Optional[str] = None
    template: Optional[str] = None
    is_primary: Optional[bool] = None


class ATSScoreResponse(BaseModel):
    overall_score: float
    feedback: list
    suggestions: list
