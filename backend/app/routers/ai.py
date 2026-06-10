from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from typing import Optional

router = APIRouter()


@router.post("/parse-resume")
async def parse_resume_ai(
    text: str,
    db: AsyncSession = Depends(get_db),
):
    """Parse resume text using Gemini AI."""
    from app.services.resume_parser import parse_resume_text
    result = await parse_resume_text(text)
    return result


@router.post("/ats-score")
async def ats_score(
    resume_text: str,
    job_description: Optional[str] = None,
):
    """Score resume against job description using AI."""
    from app.services.ats_scorer import score_resume_ats
    result = await score_resume_ats(resume_text, job_description)
    return result


@router.post("/match-jobs")
async def match_jobs(
    resume_text: str,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
):
    """Find matching jobs for a resume using vector similarity."""
    from app.services.job_matcher import find_matching_jobs
    result = await find_matching_jobs(resume_text, limit, db)
    return result


@router.get("/intelligence/funding")
async def get_funding_news(limit: int = 20):
    """Get recently funded startups."""
    from app.services.hiring_intel import get_recent_funding
    return await get_recent_funding(limit)


@router.get("/intelligence/trends")
async def get_hiring_trends(limit: int = 20):
    """Get hiring trend news."""
    from app.services.hiring_intel import get_hiring_trends
    return await get_hiring_trends(limit)
