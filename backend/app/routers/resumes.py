from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.resume import Resume
from app.schemas.resume import ResumeResponse, ResumeCreate, ResumeUpdate, ATSScoreResponse
from typing import Optional
import uuid

router = APIRouter()


@router.get("/", response_model=list[ResumeResponse])
async def list_resumes(
    user_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    """List all resumes for a user."""
    query = select(Resume)
    if user_id:
        query = query.where(Resume.user_id == user_id)
    result = await db.execute(query.order_by(Resume.updated_at.desc()))
    return result.scalars().all()


@router.post("/", response_model=ResumeResponse)
async def create_resume(
    data: ResumeCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create a new resume."""
    resume = Resume(
        id=str(uuid.uuid4()),
        user_id=data.user_id,
        title=data.title,
        content_json=data.content_json,
        content_text=data.content_text,
        template=data.template or "professional",
    )
    db.add(resume)
    await db.flush()
    return resume


@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(resume_id: str, db: AsyncSession = Depends(get_db)):
    """Get a specific resume."""
    result = await db.execute(select(Resume).where(Resume.id == resume_id))
    resume = result.scalar_one_or_none()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume


@router.put("/{resume_id}", response_model=ResumeResponse)
async def update_resume(
    resume_id: str,
    data: ResumeUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update a resume."""
    result = await db.execute(select(Resume).where(Resume.id == resume_id))
    resume = result.scalar_one_or_none()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(resume, key, value)
    await db.flush()
    return resume


@router.delete("/{resume_id}")
async def delete_resume(resume_id: str, db: AsyncSession = Depends(get_db)):
    """Delete a resume."""
    result = await db.execute(select(Resume).where(Resume.id == resume_id))
    resume = result.scalar_one_or_none()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    await db.delete(resume)
    return {"deleted": True}


@router.post("/{resume_id}/ats-score", response_model=ATSScoreResponse)
async def score_resume(
    resume_id: str,
    job_description: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    """Run ATS scoring on a resume."""
    result = await db.execute(select(Resume).where(Resume.id == resume_id))
    resume = result.scalar_one_or_none()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # Import ATS scorer service
    from app.services.ats_scorer import score_resume_ats
    score_result = await score_resume_ats(resume.content_text or "", job_description)

    # Update resume with score
    resume.ats_score = score_result["overall_score"]
    resume.ats_feedback = score_result["feedback"]
    await db.flush()

    return score_result


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    """Upload and parse a resume file (PDF/DOCX)."""
    if file.content_type not in [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")

    content = await file.read()

    # Parse based on file type
    from app.services.resume_parser import parse_resume
    parsed = await parse_resume(content, file.content_type)

    return {
        "parsed_data": parsed,
        "filename": file.filename,
    }
