from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.log import ActivityLog
from typing import Optional

router = APIRouter()


@router.get("/")
async def get_logs(
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    resource_type: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    """Get activity logs with filters."""
    query = select(ActivityLog)

    if user_id:
        query = query.where(ActivityLog.user_id == user_id)
    if action:
        query = query.where(ActivityLog.action == action)
    if resource_type:
        query = query.where(ActivityLog.resource_type == resource_type)

    query = query.order_by(ActivityLog.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    logs = result.scalars().all()

    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "action": log.action,
            "resource_type": log.resource_type,
            "resource_id": log.resource_id,
            "details": log.details,
            "ip_address": log.ip_address,
            "user_agent": log.user_agent,
            "created_at": log.created_at.isoformat() if log.created_at else None,
        }
        for log in logs
    ]


@router.get("/actions")
async def get_log_actions(db: AsyncSession = Depends(get_db)):
    """Get list of unique log actions."""
    from sqlalchemy import distinct
    result = await db.execute(select(distinct(ActivityLog.action)))
    return [r[0] for r in result.all()]
