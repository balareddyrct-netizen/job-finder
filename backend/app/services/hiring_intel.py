"""Hiring Intelligence Service.

Fetches startup funding news and hiring trend data
from external APIs and news sources.
"""

from datetime import datetime, timedelta


# Sample funding data (will be replaced with real API calls)
SAMPLE_FUNDING = [
    {"company": "PhysicsWallah", "amount": "$210M", "round": "Series B", "investors": ["WestBridge Capital", "GSV Ventures"], "sector": "EdTech", "date": "2026-06-01", "jobs_likely": ["Software Engineer", "Data Scientist", "Product Manager"]},
    {"company": "Zepto", "amount": "$340M", "round": "Series F", "investors": ["StepStone Group", "Nexus Venture Partners"], "sector": "Quick Commerce", "date": "2026-05-28", "jobs_likely": ["Backend Engineer", "Delivery Operations", "ML Engineer"]},
    {"company": "Rapido", "amount": "$200M", "round": "Series E", "investors": ["Prosus", "Nexus"], "sector": "Mobility", "date": "2026-05-20", "jobs_likely": ["Android Developer", "iOS Developer", "Data Analyst"]},
    {"company": "Dukaan", "amount": "$75M", "round": "Series C", "investors": ["Lightspeed", "Tiger Global"], "sector": "E-commerce SaaS", "date": "2026-05-15", "jobs_likely": ["Full Stack Developer", "DevOps Engineer", "Sales Manager"]},
    {"company": "Krutrim AI", "amount": "$350M", "round": "Series B", "investors": ["Matrix Partners", "Peak XV"], "sector": "AI/ML", "date": "2026-05-10", "jobs_likely": ["AI Research Scientist", "ML Engineer", "NLP Engineer"]},
    {"company": "Ather Energy", "amount": "$150M", "round": "Series F", "investors": ["GIC", "NIIF"], "sector": "EV", "date": "2026-05-05", "jobs_likely": ["Embedded Engineer", "Battery Engineer", "Manufacturing Lead"]},
    {"company": "Groww", "amount": "$120M", "round": "Series E", "investors": ["Sequoia", "Ribbit Capital"], "sector": "FinTech", "date": "2026-04-28", "jobs_likely": ["Backend Developer", "Security Engineer", "Compliance Analyst"]},
    {"company": "Meesho", "amount": "$275M", "round": "Series F", "investors": ["Fidelity", "B Capital"], "sector": "Social Commerce", "date": "2026-04-20", "jobs_likely": ["React Developer", "Data Engineer", "Product Designer"]},
    {"company": "Lenskart", "amount": "$500M", "round": "Series H", "investors": ["Abu Dhabi Investment Authority", "ChrysCapital"], "sector": "D2C Retail", "date": "2026-04-15", "jobs_likely": ["Supply Chain Analyst", "Frontend Developer", "Store Manager"]},
    {"company": "Fractal Analytics", "amount": "$100M", "round": "Series D", "investors": ["TPG Capital"], "sector": "AI Analytics", "date": "2026-04-10", "jobs_likely": ["Data Scientist", "AI Consultant", "Cloud Architect"]},
]

SAMPLE_TRENDS = [
    {"headline": "AI/ML hiring surges 45% in Q2 2026", "source": "Economic Times", "sentiment": "positive", "sector": "AI/ML", "date": "2026-06-05", "details": "Companies across sectors are aggressively hiring AI engineers, with demand for LLM specialists tripling year-over-year."},
    {"headline": "Bangalore remains top tech hub with 35% of all IT job openings", "source": "YourStory", "sentiment": "positive", "sector": "IT", "date": "2026-06-03", "details": "Despite remote work trends, Bangalore continues to dominate with highest concentration of tech roles."},
    {"headline": "Cybersecurity roles see 60% salary increase", "source": "Inc42", "sentiment": "positive", "sector": "Security", "date": "2026-06-01", "details": "Growing digital threats have made security professionals the highest-paid in tech, with senior roles exceeding ₹80 LPA."},
    {"headline": "E-commerce companies accelerate tech hiring for festive season", "source": "Mint", "sentiment": "positive", "sector": "E-commerce", "date": "2026-05-28", "details": "Flipkart, Amazon, and Meesho are hiring thousands of engineers ahead of the festive shopping season."},
    {"headline": "Green energy startups create 50,000 new jobs in India", "source": "TechCrunch India", "sentiment": "positive", "sector": "CleanTech", "date": "2026-05-25", "details": "India's push for renewable energy has created massive job opportunities in solar, wind, and EV sectors."},
    {"headline": "Remote work positions decline 20% as companies push RTO", "source": "Business Standard", "sentiment": "negative", "sector": "General", "date": "2026-05-22", "details": "Major tech companies including TCS, Infosys mandate 3-day office attendance, reducing remote job postings."},
    {"headline": "India's SaaS sector projected to create 200,000 jobs by 2027", "source": "NASSCOM", "sentiment": "positive", "sector": "SaaS", "date": "2026-05-18", "details": "India's booming SaaS industry continues to be a major employment generator with strong global demand."},
    {"headline": "Tier-2 cities see 80% growth in tech job postings", "source": "People Matters", "sentiment": "positive", "sector": "IT", "date": "2026-05-15", "details": "Pune, Hyderabad, Chennai, and Jaipur are emerging as alternative tech hubs with competitive salaries."},
]


async def get_recent_funding(limit: int = 20) -> list:
    """Get recently funded startups with associated job opportunities."""
    return SAMPLE_FUNDING[:limit]


async def get_hiring_trends(limit: int = 20) -> list:
    """Get hiring trend news and analysis."""
    return SAMPLE_TRENDS[:limit]
