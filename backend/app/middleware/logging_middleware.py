"""Request Logging Middleware.

Logs all incoming API requests with timing, status codes,
and user information. Stores logs in the database via the
ActivityLog model.
"""

import time
import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from sqlalchemy import insert
from app.database import async_session
from app.models.log import ActivityLog


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware that logs all API requests to the activity_logs table."""

    # Paths to exclude from logging (health checks, docs, static assets)
    EXCLUDED_PATHS = {
        "/health",
        "/api/docs",
        "/api/redoc",
        "/openapi.json",
        "/favicon.ico",
    }

    async def dispatch(self, request: Request, call_next) -> Response:
        # Skip logging for excluded paths
        if request.url.path in self.EXCLUDED_PATHS:
            return await call_next(request)

        start_time = time.time()
        request_id = str(uuid.uuid4())[:8]

        # Extract request info
        method = request.method
        path = request.url.path
        client_ip = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent", "")

        # Process the request
        try:
            response = await call_next(request)
            status_code = response.status_code
        except Exception as exc:
            status_code = 500
            raise exc
        finally:
            # Calculate duration
            duration_ms = round((time.time() - start_time) * 1000, 2)

            # Log to database (fire and forget)
            try:
                await self._log_request(
                    method=method,
                    path=path,
                    status_code=status_code,
                    duration_ms=duration_ms,
                    client_ip=client_ip,
                    user_agent=user_agent,
                    request_id=request_id,
                )
            except Exception:
                # Don't let logging errors break the application
                pass

            # Console log for development
            status_emoji = "✅" if status_code < 400 else "⚠️" if status_code < 500 else "❌"
            print(
                f"{status_emoji} [{request_id}] {method} {path} → {status_code} ({duration_ms}ms)"
            )

        return response

    async def _log_request(
        self,
        method: str,
        path: str,
        status_code: int,
        duration_ms: float,
        client_ip: str | None,
        user_agent: str,
        request_id: str,
    ):
        """Store request log in the database."""
        # Only log API requests (not static files)
        if not path.startswith("/api/"):
            return

        # Determine action from method + path
        action = f"{method} {path}"

        # Determine resource type from path
        resource_type = None
        path_parts = path.strip("/").split("/")
        if len(path_parts) >= 3:
            resource_type = path_parts[2]  # e.g., "users", "jobs", "resumes"

        async with async_session() as session:
            log_entry = ActivityLog(
                action=action[:100],  # Truncate to fit column
                resource_type=resource_type,
                details={
                    "status_code": status_code,
                    "duration_ms": duration_ms,
                    "request_id": request_id,
                },
                ip_address=client_ip,
                user_agent=user_agent[:500] if user_agent else None,
            )
            session.add(log_entry)
            await session.commit()
