# 🚀 JobFinder Pro - Backend

This is the FastAPI backend directory for JobFinder Pro.

For the complete project overview, setup guides, database schemas, and system architecture, please refer to the master [Root README.md](../README.md).

## Quick Start (Backend)

1. Make sure you have your databases running (PostgreSQL, Redis, Qdrant).
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run database migrations:
   ```bash
   alembic upgrade head
   ```
4. Start the Uvicorn development server:
   ```bash
   uvicorn app.main:app --reload
   ```
5. View interactive documentation at [http://localhost:8000/api/docs](http://localhost:8000/api/docs).
