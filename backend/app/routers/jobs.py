from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.database import get_db
from app.models.job import Job, SavedJob, JobApplication
from app.schemas.job import JobResponse, JobSearchParams, SavedJobResponse
from typing import Optional
import uuid

router = APIRouter()


@router.get("/", response_model=list[JobResponse])
async def search_jobs(
    q: Optional[str] = None,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    work_mode: Optional[str] = None,
    experience_min: Optional[int] = None,
    experience_max: Optional[int] = None,
    salary_min: Optional[float] = None,
    source: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Search jobs with filters."""
    query = select(Job).where(Job.is_active == True)

    if q:
        query = query.where(
            Job.title.ilike(f"%{q}%") | Job.description.ilike(f"%{q}%") | Job.company_name.ilike(f"%{q}%")
        )
    if location:
        query = query.where(Job.location.ilike(f"%{location}%"))
    if job_type:
        query = query.where(Job.job_type == job_type)
    if work_mode:
        query = query.where(Job.work_mode == work_mode)
    if experience_min is not None:
        query = query.where(Job.experience_min >= experience_min)
    if salary_min is not None:
        query = query.where(Job.salary_min >= salary_min)
    if source:
        query = query.where(Job.source == source)

    query = query.order_by(Job.posted_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/recommended", response_model=list[JobResponse])
async def get_recommended_jobs(
    user_id: Optional[str] = None,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
):
    """Get AI-recommended jobs for a user."""
    # For now, return recent jobs. AI matching will be added in Phase 5
    result = await db.execute(
        select(Job)
        .where(Job.is_active == True)
        .order_by(Job.posted_at.desc())
        .limit(limit)
    )
    return result.scalars().all()


@router.get("/stats")
async def get_job_stats(db: AsyncSession = Depends(get_db)):
    """Get job market statistics."""
    total = await db.execute(select(func.count(Job.id)).where(Job.is_active == True))
    by_source = await db.execute(
        select(Job.source, func.count(Job.id))
        .where(Job.is_active == True)
        .group_by(Job.source)
    )
    by_type = await db.execute(
        select(Job.job_type, func.count(Job.id))
        .where(Job.is_active == True)
        .group_by(Job.job_type)
    )

    return {
        "total_active": total.scalar(),
        "by_source": dict(by_source.all()),
        "by_type": dict(by_type.all()),
    }


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: str, db: AsyncSession = Depends(get_db)):
    """Get job details."""
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.post("/{job_id}/save")
async def save_job(job_id: str, user_id: str = "demo", db: AsyncSession = Depends(get_db)):
    """Save/bookmark a job."""
    # Check if already saved
    existing = await db.execute(
        select(SavedJob).where(SavedJob.user_id == user_id, SavedJob.job_id == job_id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Job already saved")

    saved = SavedJob(id=str(uuid.uuid4()), user_id=user_id, job_id=job_id)
    db.add(saved)
    await db.flush()
    return {"saved": True}


@router.delete("/{job_id}/save")
async def unsave_job(job_id: str, user_id: str = "demo", db: AsyncSession = Depends(get_db)):
    """Remove saved job."""
    result = await db.execute(
        select(SavedJob).where(SavedJob.user_id == user_id, SavedJob.job_id == job_id)
    )
    saved = result.scalar_one_or_none()
    if not saved:
        raise HTTPException(status_code=404, detail="Saved job not found")
    await db.delete(saved)
    return {"unsaved": True}


@router.post("/{job_id}/apply")
async def apply_to_job(
    job_id: str,
    user_id: str = "demo",
    resume_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    """Apply to a job."""
    application = JobApplication(
        id=str(uuid.uuid4()),
        user_id=user_id,
        job_id=job_id,
        resume_id=resume_id,
    )
    db.add(application)
    await db.flush()
    return {"applied": True, "application_id": application.id}
