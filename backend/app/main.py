from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.database import init_db
from app.routers import users, resumes, jobs, ai, admin, logs

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup
    await init_db()
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

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
