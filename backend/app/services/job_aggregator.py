"""Job Aggregation Service.

Fetches jobs from multiple sources using the adapter pattern.
Currently supports JSearch API and mock data.
"""

import httpx
from typing import Optional
from app.config import get_settings
from datetime import datetime
import uuid

settings = get_settings()


async def fetch_jobs_jsearch(
    query: str,
    location: Optional[str] = None,
    page: int = 1,
    num_pages: int = 1,
) -> list:
    """Fetch jobs from JSearch API (RapidAPI)."""
    if not settings.JSEARCH_API_KEY:
        return []

    url = "https://jsearch.p.rapidapi.com/search"
    params = {
        "query": query,
        "page": str(page),
        "num_pages": str(num_pages),
    }
    if location:
        params["query"] = f"{query} in {location}"

    headers = {
        "X-RapidAPI-Key": settings.JSEARCH_API_KEY,
        "X-RapidAPI-Host": settings.JSEARCH_API_HOST,
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params, headers=headers, timeout=15)
            response.raise_for_status()
            data = response.json()

            jobs = []
            for item in data.get("data", []):
                jobs.append({
                    "id": str(uuid.uuid4()),
                    "source": "jsearch",
                    "source_url": item.get("job_apply_link", ""),
                    "source_job_id": item.get("job_id", ""),
                    "title": item.get("job_title", ""),
                    "company_name": item.get("employer_name", ""),
                    "company_logo": item.get("employer_logo", ""),
                    "location": f"{item.get('job_city', '')}, {item.get('job_country', '')}".strip(", "),
                    "job_type": item.get("job_employment_type", ""),
                    "work_mode": "remote" if item.get("job_is_remote") else "onsite",
                    "salary_min": item.get("job_min_salary"),
                    "salary_max": item.get("job_max_salary"),
                    "salary_currency": item.get("job_salary_currency", "USD"),
                    "description": item.get("job_description", ""),
                    "skills_required": item.get("job_required_skills") or [],
                    "experience_min": item.get("job_required_experience", {}).get("required_experience_in_months", 0) // 12 if item.get("job_required_experience") else None,
                    "posted_at": item.get("job_posted_at_datetime_utc"),
                    "is_active": True,
                })
            return jobs
        except Exception as e:
            print(f"JSearch API error: {e}")
            return []


def get_mock_jobs() -> list:
    """Generate realistic mock job data for development."""
    companies = [
        {"name": "Google", "logo": "https://logo.clearbit.com/google.com"},
        {"name": "Microsoft", "logo": "https://logo.clearbit.com/microsoft.com"},
        {"name": "Amazon", "logo": "https://logo.clearbit.com/amazon.com"},
        {"name": "Flipkart", "logo": "https://logo.clearbit.com/flipkart.com"},
        {"name": "Swiggy", "logo": "https://logo.clearbit.com/swiggy.com"},
        {"name": "Razorpay", "logo": "https://logo.clearbit.com/razorpay.com"},
        {"name": "CRED", "logo": "https://logo.clearbit.com/cred.club"},
        {"name": "PhonePe", "logo": "https://logo.clearbit.com/phonepe.com"},
        {"name": "Zerodha", "logo": "https://logo.clearbit.com/zerodha.com"},
        {"name": "Ola", "logo": "https://logo.clearbit.com/olacabs.com"},
        {"name": "Paytm", "logo": "https://logo.clearbit.com/paytm.com"},
        {"name": "Infosys", "logo": "https://logo.clearbit.com/infosys.com"},
        {"name": "TCS", "logo": "https://logo.clearbit.com/tcs.com"},
        {"name": "Wipro", "logo": "https://logo.clearbit.com/wipro.com"},
        {"name": "HCL Tech", "logo": "https://logo.clearbit.com/hcltech.com"},
        {"name": "Zomato", "logo": "https://logo.clearbit.com/zomato.com"},
        {"name": "Freshworks", "logo": "https://logo.clearbit.com/freshworks.com"},
        {"name": "Zoho", "logo": "https://logo.clearbit.com/zoho.com"},
        {"name": "Dream11", "logo": "https://logo.clearbit.com/dream11.com"},
        {"name": "Byju's", "logo": "https://logo.clearbit.com/byjus.com"},
    ]

    job_templates = [
        {"title": "Senior Software Engineer", "type": "full-time", "skills": ["Python", "Java", "AWS", "Microservices", "Docker"], "exp": (4, 8), "salary": (1800000, 3500000)},
        {"title": "Frontend Developer", "type": "full-time", "skills": ["React", "TypeScript", "Next.js", "CSS", "JavaScript"], "exp": (2, 5), "salary": (1200000, 2500000)},
        {"title": "Backend Developer", "type": "full-time", "skills": ["Node.js", "Python", "PostgreSQL", "Redis", "Docker"], "exp": (3, 6), "salary": (1500000, 3000000)},
        {"title": "Full Stack Developer", "type": "full-time", "skills": ["React", "Node.js", "MongoDB", "TypeScript", "AWS"], "exp": (2, 5), "salary": (1400000, 2800000)},
        {"title": "DevOps Engineer", "type": "full-time", "skills": ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"], "exp": (3, 7), "salary": (1600000, 3200000)},
        {"title": "Data Scientist", "type": "full-time", "skills": ["Python", "TensorFlow", "SQL", "Pandas", "Machine Learning"], "exp": (2, 6), "salary": (1500000, 3500000)},
        {"title": "ML Engineer", "type": "full-time", "skills": ["PyTorch", "Python", "MLOps", "Deep Learning", "NLP"], "exp": (3, 7), "salary": (2000000, 4000000)},
        {"title": "Product Manager", "type": "full-time", "skills": ["Product Strategy", "Agile", "SQL", "Analytics", "Roadmapping"], "exp": (4, 8), "salary": (2000000, 4500000)},
        {"title": "UI/UX Designer", "type": "full-time", "skills": ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"], "exp": (2, 5), "salary": (1000000, 2200000)},
        {"title": "Mobile Developer (React Native)", "type": "full-time", "skills": ["React Native", "TypeScript", "iOS", "Android", "Redux"], "exp": (2, 5), "salary": (1300000, 2800000)},
        {"title": "Cloud Architect", "type": "full-time", "skills": ["AWS", "Azure", "GCP", "Terraform", "Microservices"], "exp": (6, 12), "salary": (3000000, 6000000)},
        {"title": "QA Engineer", "type": "full-time", "skills": ["Selenium", "Cypress", "Python", "API Testing", "Automation"], "exp": (2, 5), "salary": (800000, 1800000)},
        {"title": "Data Analyst", "type": "full-time", "skills": ["SQL", "Python", "Tableau", "Excel", "Statistics"], "exp": (1, 4), "salary": (600000, 1500000)},
        {"title": "Android Developer", "type": "full-time", "skills": ["Kotlin", "Java", "Android SDK", "Jetpack Compose", "MVVM"], "exp": (2, 5), "salary": (1200000, 2600000)},
        {"title": "iOS Developer", "type": "full-time", "skills": ["Swift", "SwiftUI", "UIKit", "Core Data", "Xcode"], "exp": (2, 5), "salary": (1300000, 2800000)},
        {"title": "Cybersecurity Analyst", "type": "full-time", "skills": ["SIEM", "Penetration Testing", "Firewalls", "Python", "Compliance"], "exp": (3, 6), "salary": (1500000, 3000000)},
        {"title": "Site Reliability Engineer", "type": "full-time", "skills": ["Linux", "Kubernetes", "Prometheus", "Go", "Python"], "exp": (4, 8), "salary": (2000000, 4000000)},
        {"title": "Technical Writer", "type": "full-time", "skills": ["Technical Writing", "API Documentation", "Markdown", "Git", "Docs-as-Code"], "exp": (1, 4), "salary": (600000, 1400000)},
        {"title": "Blockchain Developer", "type": "full-time", "skills": ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi"], "exp": (2, 5), "salary": (1800000, 4000000)},
        {"title": "AI Research Engineer", "type": "full-time", "skills": ["PyTorch", "Transformers", "LLMs", "Python", "Research"], "exp": (3, 7), "salary": (2500000, 5000000)},
    ]

    locations = ["Bangalore", "Mumbai", "Hyderabad", "Delhi NCR", "Pune", "Chennai", "Noida", "Gurugram", "Remote"]
    work_modes = ["onsite", "hybrid", "remote"]
    sources = ["linkedin", "naukri", "instahire", "company_website", "startup"]

    jobs = []
    import random
    random.seed(42)

    for i in range(200):
        company = random.choice(companies)
        template = random.choice(job_templates)
        location = random.choice(locations)

        days_ago = random.randint(0, 30)
        posted = datetime.utcnow().replace(
            hour=random.randint(6, 22),
            minute=random.randint(0, 59)
        )
        from datetime import timedelta
        posted = posted - timedelta(days=days_ago)

        jobs.append({
            "id": str(uuid.uuid4()),
            "source": random.choice(sources),
            "source_url": f"https://careers.{company['name'].lower().replace(' ', '')}.com/jobs/{i}",
            "source_job_id": f"JOB-{i:04d}",
            "title": template["title"],
            "company_name": company["name"],
            "company_logo": company["logo"],
            "location": location,
            "job_type": template["type"],
            "work_mode": random.choice(work_modes),
            "salary_min": template["salary"][0],
            "salary_max": template["salary"][1],
            "salary_currency": "INR",
            "description": f"We are looking for a {template['title']} to join our team at {company['name']} in {location}. "
                          f"You will work on cutting-edge technology and help build products used by millions of users. "
                          f"Required skills: {', '.join(template['skills'])}. "
                          f"Experience: {template['exp'][0]}-{template['exp'][1]} years.",
            "requirements": template["skills"],
            "skills_required": template["skills"],
            "experience_min": template["exp"][0],
            "experience_max": template["exp"][1],
            "posted_at": posted.isoformat(),
            "is_active": True,
            "company_funding": None,
            "hiring_trend": random.choice(["growing", "stable", None]),
        })

    return jobs
