"""Funding Tracker Worker.

Monitors startup funding rounds and identifies companies
likely to be hiring. Can be extended with real APIs like
Crunchbase, Tracxn, or web scraping.
"""

import asyncio
from datetime import datetime
from sqlalchemy import select
from app.database import async_session
from app.models.job import HiringIntelligence
from app.services.hiring_intel import get_recent_funding


async def track_funding_rounds() -> dict:
    """Fetch recent funding data and store as hiring intelligence events.

    Returns:
        Summary dict with counts of new/skipped entries.
    """
    stats = {"new": 0, "skipped": 0, "errors": 0}

    try:
        funding_data = await get_recent_funding(limit=50)
    except Exception as e:
        print(f"Error fetching funding data: {e}")
        return {"new": 0, "skipped": 0, "errors": 1}

    async with async_session() as session:
        for entry in funding_data:
            try:
                company = entry.get("company", "Unknown")
                round_type = entry.get("round", "Unknown")

                # Check for duplicates
                existing = await session.execute(
                    select(HiringIntelligence).where(
                        HiringIntelligence.company_name == company,
                        HiringIntelligence.event_type == "funding",
                        HiringIntelligence.headline.contains(round_type),
                    )
                )
                if existing.scalar_one_or_none():
                    stats["skipped"] += 1
                    continue

                # Create intelligence entry
                intel = HiringIntelligence(
                    company_name=company,
                    event_type="funding",
                    headline=f"{company} raises {entry.get('amount', 'undisclosed')} in {round_type}",
                    details={
                        "amount": entry.get("amount"),
                        "round": round_type,
                        "investors": entry.get("investors", []),
                        "sector": entry.get("sector"),
                        "jobs_likely": entry.get("jobs_likely", []),
                    },
                    sentiment="positive",
                    published_at=_parse_date(entry.get("date")),
                    source_url=entry.get("source_url"),
                )
                session.add(intel)
                stats["new"] += 1

            except Exception as e:
                print(f"Error storing funding entry: {e}")
                stats["errors"] += 1

        await session.commit()

    print(f"💰 Funding tracker complete: {stats}")
    return stats


def _parse_date(date_str: str | None) -> datetime | None:
    """Parse a date string."""
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str)
    except (ValueError, TypeError):
        return None


async def run_funding_loop(interval_hours: int = 6):
    """Run the funding tracker in a continuous loop."""
    print(f"🚀 Starting funding tracker (interval: {interval_hours}h)")
    while True:
        try:
            await track_funding_rounds()
        except Exception as e:
            print(f"❌ Funding tracker error: {e}")
        await asyncio.sleep(interval_hours * 3600)


if __name__ == "__main__":
    asyncio.run(track_funding_rounds())
