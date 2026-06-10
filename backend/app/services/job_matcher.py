"""Job Matcher Service.

Uses vector similarity search (Qdrant) and weighted scoring
to match resumes against job listings.
"""

from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import re


async def find_matching_jobs(
    resume_text: str,
    limit: int = 10,
    db: AsyncSession = None,
) -> list:
    """Find jobs matching a resume using keyword-based scoring.

    In Phase 5, this will be enhanced with vector similarity via Qdrant.
    Currently uses keyword overlap scoring as a fallback.
    """
    from app.models.job import Job

    if not db:
        return []

    # Get all active jobs
    result = await db.execute(
        select(Job).where(Job.is_active == True).limit(200)
    )
    jobs = result.scalars().all()

    # Extract resume keywords
    resume_words = set(re.findall(r'\b\w{3,}\b', resume_text.lower()))

    # Score each job
    scored_jobs = []
    for job in jobs:
        job_text = f"{job.title} {job.description} {' '.join(job.skills_required or [])}"
        job_words = set(re.findall(r'\b\w{3,}\b', job_text.lower()))

        # Keyword overlap
        common = resume_words & job_words
        score = len(common) / max(len(job_words), 1) * 100

        scored_jobs.append({
            "job_id": job.id,
            "title": job.title,
            "company_name": job.company_name,
            "location": job.location,
            "match_score": round(score, 1),
            "matched_keywords": list(common)[:10],
            "source": job.source,
        })

    # Sort by score descending
    scored_jobs.sort(key=lambda x: x["match_score"], reverse=True)

    return scored_jobs[:limit]
