"""Job Scraper Worker.

Periodically fetches new jobs from configured sources (JSearch API + mock data)
and upserts them into the database. Designed to run as a background task
or via Celery beat schedule.
"""

import asyncio
from datetime import datetime
from sqlalchemy import select
from app.database import async_session
from app.models.job import Job
from app.services.job_aggregator import fetch_jobs_jsearch, get_mock_jobs
from app.config import get_settings

settings = get_settings()

# Common search queries for Indian tech jobs
DEFAULT_QUERIES = [
    "software engineer India",
    "frontend developer India",
    "backend developer India",
    "data scientist India",
    "devops engineer India",
    "product manager India",
    "machine learning engineer India",
    "full stack developer India",
]


async def scrape_and_store_jobs(
    queries: list[str] | None = None,
    use_mock: bool = True,
) -> dict:
    """Fetch jobs from all sources and store in database.

    Args:
        queries: List of search queries for JSearch API.
        use_mock: Whether to seed with mock data if DB is empty.

    Returns:
        Summary dict with counts of new/updated/skipped jobs.
    """
    queries = queries or DEFAULT_QUERIES
    stats = {"new": 0, "updated": 0, "skipped": 0, "errors": 0}

    all_jobs = []

    # 1. Fetch from JSearch API (if key is configured)
    if settings.JSEARCH_API_KEY:
        for query in queries:
            try:
                jobs = await fetch_jobs_jsearch(query, num_pages=1)
                all_jobs.extend(jobs)
                # Rate limit between requests
                await asyncio.sleep(1)
            except Exception as e:
                print(f"Error fetching '{query}': {e}")
                stats["errors"] += 1

    # 2. Seed with mock data if no API key or DB is empty
    if use_mock and not all_jobs:
        print("📦 Using mock job data...")
        all_jobs = get_mock_jobs()

    # 3. Store in database
    async with async_session() as session:
        for job_data in all_jobs:
            try:
                # Check if job already exists by source_job_id
                source_job_id = job_data.get("source_job_id")
                if source_job_id:
                    existing = await session.execute(
                        select(Job).where(Job.source_job_id == source_job_id)
                    )
                    if existing.scalar_one_or_none():
                        stats["skipped"] += 1
                        continue

                # Create new job
                job = Job(
                    id=job_data.get("id"),
                    source=job_data.get("source", "unknown"),
                    source_url=job_data.get("source_url", ""),
                    source_job_id=source_job_id,
                    title=job_data.get("title", ""),
                    company_name=job_data.get("company_name", ""),
                    company_logo=job_data.get("company_logo"),
                    location=job_data.get("location"),
                    job_type=job_data.get("job_type"),
                    work_mode=job_data.get("work_mode"),
                    salary_min=job_data.get("salary_min"),
                    salary_max=job_data.get("salary_max"),
                    salary_currency=job_data.get("salary_currency", "INR"),
                    description=job_data.get("description", ""),
                    requirements=job_data.get("requirements"),
                    skills_required=job_data.get("skills_required", []),
                    experience_min=job_data.get("experience_min"),
                    experience_max=job_data.get("experience_max"),
                    posted_at=_parse_datetime(job_data.get("posted_at")),
                    is_active=job_data.get("is_active", True),
                    company_funding=job_data.get("company_funding"),
                    hiring_trend=job_data.get("hiring_trend"),
                )
                session.add(job)
                stats["new"] += 1

            except Exception as e:
                print(f"Error storing job: {e}")
                stats["errors"] += 1

        await session.commit()

    print(f"🔄 Job scrape complete: {stats}")
    return stats


def _parse_datetime(value) -> datetime | None:
    """Parse a datetime value from string or datetime object."""
    if value is None:
        return None
    if isinstance(value, datetime):
        return value
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None


async def run_scraper_loop(interval_minutes: int = 60):
    """Run the job scraper in a continuous loop.

    Used for standalone execution (not via Celery).
    """
    print(f"🚀 Starting job scraper (interval: {interval_minutes}min)")
    while True:
        try:
            await scrape_and_store_jobs()
        except Exception as e:
            print(f"❌ Scraper error: {e}")
        await asyncio.sleep(interval_minutes * 60)


if __name__ == "__main__":
    asyncio.run(scrape_and_store_jobs(use_mock=True))
