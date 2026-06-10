"""News Crawler Worker.

Crawls hiring trend news and industry updates from
news sources and APIs. Stores relevant articles as
hiring intelligence entries.
"""

import asyncio
from datetime import datetime
from sqlalchemy import select
from app.database import async_session
from app.models.job import HiringIntelligence
from app.services.hiring_intel import get_hiring_trends


async def crawl_hiring_news() -> dict:
    """Fetch hiring trend news and store as intelligence events.

    Returns:
        Summary dict with counts of new/skipped entries.
    """
    stats = {"new": 0, "skipped": 0, "errors": 0}

    try:
        trends = await get_hiring_trends(limit=50)
    except Exception as e:
        print(f"Error fetching trends: {e}")
        return {"new": 0, "skipped": 0, "errors": 1}

    async with async_session() as session:
        for trend in trends:
            try:
                headline = trend.get("headline", "")

                # Check for duplicates by headline
                existing = await session.execute(
                    select(HiringIntelligence).where(
                        HiringIntelligence.headline == headline,
                        HiringIntelligence.event_type == "trend",
                    )
                )
                if existing.scalar_one_or_none():
                    stats["skipped"] += 1
                    continue

                # Create intelligence entry
                intel = HiringIntelligence(
                    company_name=trend.get("source", "Industry"),
                    event_type="trend",
                    headline=headline,
                    details={
                        "sector": trend.get("sector"),
                        "details": trend.get("details"),
                        "source_name": trend.get("source"),
                    },
                    sentiment=trend.get("sentiment", "neutral"),
                    published_at=_parse_date(trend.get("date")),
                    source_url=trend.get("url"),
                )
                session.add(intel)
                stats["new"] += 1

            except Exception as e:
                print(f"Error storing trend: {e}")
                stats["errors"] += 1

        await session.commit()

    print(f"📰 News crawl complete: {stats}")
    return stats


def _parse_date(date_str: str | None) -> datetime | None:
    """Parse a date string."""
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str)
    except (ValueError, TypeError):
        return None


async def run_news_loop(interval_hours: int = 4):
    """Run the news crawler in a continuous loop."""
    print(f"🚀 Starting news crawler (interval: {interval_hours}h)")
    while True:
        try:
            await crawl_hiring_news()
        except Exception as e:
            print(f"❌ News crawler error: {e}")
        await asyncio.sleep(interval_hours * 3600)


if __name__ == "__main__":
    asyncio.run(crawl_hiring_news())
