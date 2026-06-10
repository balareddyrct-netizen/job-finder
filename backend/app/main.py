from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.config import get_settings
from app.database import init_db
from app.middleware.cors import setup_cors
from app.middleware.logging_middleware import LoggingMiddleware
from app.routers import users, resumes, jobs, ai, admin, logs

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup
    await init_db()

    # Seed mock jobs if database is empty
    try:
        from app.workers.job_scraper import scrape_and_store_jobs
        from app.database import async_session
        from sqlalchemy import select, func
        from app.models.job import Job

        async with async_session() as session:
            count = await session.execute(select(func.count(Job.id)))
            if count.scalar() == 0:
                print("📦 Seeding database with mock jobs...")
                await scrape_and_store_jobs(use_mock=True)
    except Exception as e:
        print(f"⚠️ Job seeding skipped: {e}")

    print(f"🚀 {settings.APP_NAME} v{settings.APP_VERSION} started")
    yield
    # Shutdown
    print("👋 Shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan,
)

# Middleware (order matters: last added = first executed)
setup_cors(app)
app.add_middleware(LoggingMiddleware)

# Routers
app.include_router(users.router, prefix=f"{settings.API_PREFIX}/users", tags=["Users"])
app.include_router(resumes.router, prefix=f"{settings.API_PREFIX}/resumes", tags=["Resumes"])
app.include_router(jobs.router, prefix=f"{settings.API_PREFIX}/jobs", tags=["Jobs"])
app.include_router(ai.router, prefix=f"{settings.API_PREFIX}/ai", tags=["AI"])
app.include_router(admin.router, prefix=f"{settings.API_PREFIX}/admin", tags=["Admin"])
app.include_router(logs.router, prefix=f"{settings.API_PREFIX}/logs", tags=["Logs"])


@app.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "healthy",
        "docs": "/api/docs",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
