"""CORS Configuration Module.

Centralizes CORS middleware setup to keep main.py clean.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings


def setup_cors(app: FastAPI) -> None:
    """Configure CORS middleware on the FastAPI application."""
    settings = get_settings()

    # Allowed origins
    origins = [
        settings.FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=[
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin",
            "X-Requested-With",
        ],
        expose_headers=["X-Request-ID"],
        max_age=600,  # Cache preflight for 10 minutes
    )
