from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, text
from app.database import get_db
from app.models.user import User
from app.models.job import Job
from app.models.resume import Resume
from app.models.log import ActivityLog
from datetime import datetime, timedelta

router = APIRouter()


@router.get("/stats")
async def get_admin_stats(db: AsyncSession = Depends(get_db)):
    """Get admin dashboard statistics."""
    now = datetime.utcnow()
    week_ago = now - timedelta(days=7)
    month_ago = now - timedelta(days=30)

    # User stats
    total_users = await db.execute(select(func.count(User.id)))
    new_users_week = await db.execute(
        select(func.count(User.id)).where(User.created_at >= week_ago)
    )
    new_users_month = await db.execute(
        select(func.count(User.id)).where(User.created_at >= month_ago)
    )

    # Job stats
    total_jobs = await db.execute(
        select(func.count(Job.id)).where(Job.is_active == True)
    )
    jobs_by_source = await db.execute(
        select(Job.source, func.count(Job.id))
        .where(Job.is_active == True)
        .group_by(Job.source)
    )
    jobs_by_type = await db.execute(
        select(Job.job_type, func.count(Job.id))
        .where(Job.is_active == True)
        .group_by(Job.job_type)
    )

    # Resume stats
    total_resumes = await db.execute(select(func.count(Resume.id)))
    avg_ats_score = await db.execute(
        select(func.avg(Resume.ats_score)).where(Resume.ats_score.isnot(None))
    )

    # Recent activity
    recent_logs = await db.execute(
        select(ActivityLog)
        .order_by(ActivityLog.created_at.desc())
        .limit(20)
    )

    return {
        "users": {
            "total": total_users.scalar() or 0,
            "new_this_week": new_users_week.scalar() or 0,
            "new_this_month": new_users_month.scalar() or 0,
        },
        "jobs": {
            "total_active": total_jobs.scalar() or 0,
            "by_source": dict(jobs_by_source.all()),
            "by_type": dict(jobs_by_type.all()),
        },
        "resumes": {
            "total": total_resumes.scalar() or 0,
            "avg_ats_score": round(avg_ats_score.scalar() or 0, 1),
        },
        "recent_activity": [
            {
                "id": log.id,
                "action": log.action,
                "user_id": log.user_id,
                "resource_type": log.resource_type,
                "details": log.details,
                "created_at": log.created_at.isoformat() if log.created_at else None,
            }
            for log in recent_logs.scalars().all()
        ],
    }


@router.get("/users")
async def list_admin_users(
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    """List all users for admin."""
    result = await db.execute(
        select(User).order_by(User.created_at.desc()).offset(skip).limit(limit)
    )
    users = result.scalars().all()
    return [
        {
            "id": u.id,
            "email": u.email,
            "name": u.name,
            "role": u.role,
            "provider": u.provider,
            "created_at": u.created_at.isoformat() if u.created_at else None,
            "last_login_at": u.last_login_at.isoformat() if u.last_login_at else None,
        }
        for u in users
    ]


@router.get("/analytics")
async def get_analytics(db: AsyncSession = Depends(get_db)):
    """Get detailed analytics for admin dashboard."""
    # Most popular job titles searched
    popular_jobs = await db.execute(
        select(Job.title, func.count(Job.id).label("count"))
        .where(Job.is_active == True)
        .group_by(Job.title)
        .order_by(func.count(Job.id).desc())
        .limit(10)
    )

    # Top companies hiring
    top_companies = await db.execute(
        select(Job.company_name, func.count(Job.id).label("count"))
        .where(Job.is_active == True)
        .group_by(Job.company_name)
        .order_by(func.count(Job.id).desc())
        .limit(10)
    )

    # Most in-demand skills
    # Skills are stored as JSON arrays, so we need to unnest them
    # For PostgreSQL:
    try:
        skills_query = await db.execute(text("""
            SELECT skill, COUNT(*) as count
            FROM jobs, jsonb_array_elements_text(skills_required) as skill
            WHERE is_active = true
            GROUP BY skill
            ORDER BY count DESC
            LIMIT 15
        """))
        top_skills = [{"skill": row[0], "count": row[1]} for row in skills_query.all()]
    except Exception:
        top_skills = []

    return {
        "popular_jobs": [{"title": r[0], "count": r[1]} for r in popular_jobs.all()],
        "top_companies": [{"company": r[0], "count": r[1]} for r in top_companies.all()],
        "top_skills": top_skills,
    }
