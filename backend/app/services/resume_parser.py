"""Resume Parser Service.

Parses PDF/DOCX resume files and extracts structured data using
text extraction and optionally Gemini AI for intelligent parsing.
"""

import re
from typing import Optional


async def extract_text_from_pdf(content: bytes) -> str:
    """Extract text from PDF file bytes."""
    try:
        from PyPDF2 import PdfReader
        import io
        reader = PdfReader(io.BytesIO(content))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        return f"Error extracting PDF: {str(e)}"


async def extract_text_from_docx(content: bytes) -> str:
    """Extract text from DOCX file bytes."""
    try:
        from docx import Document
        import io
        doc = Document(io.BytesIO(content))
        text = "\n".join(paragraph.text for paragraph in doc.paragraphs)
        return text.strip()
    except Exception as e:
        return f"Error extracting DOCX: {str(e)}"


def extract_email(text: str) -> Optional[str]:
    """Extract email from text."""
    match = re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', text)
    return match.group(0) if match else None


def extract_phone(text: str) -> Optional[str]:
    """Extract phone number from text."""
    match = re.search(r'[\+]?[\d\s\-\(\)]{10,15}', text)
    return match.group(0).strip() if match else None


def extract_name(text: str) -> Optional[str]:
    """Extract name (usually first line of resume)."""
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if lines:
        # First non-empty line that doesn't look like a section header
        first_line = lines[0]
        if len(first_line) < 50 and not any(
            kw in first_line.lower()
            for kw in ["experience", "education", "skills", "summary", "objective"]
        ):
            return first_line
    return None


def extract_skills(text: str) -> list:
    """Extract skills from text using common skill patterns."""
    common_skills = [
        "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust",
        "react", "angular", "vue", "next.js", "node.js", "express",
        "django", "flask", "fastapi", "spring", "rails",
        "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch",
        "aws", "gcp", "azure", "docker", "kubernetes", "terraform",
        "git", "ci/cd", "jenkins", "github actions",
        "html", "css", "sass", "tailwind",
        "machine learning", "deep learning", "nlp", "computer vision",
        "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy",
        "agile", "scrum", "jira", "confluence",
        "figma", "sketch", "adobe", "photoshop",
        "linux", "windows", "macos",
        "rest api", "graphql", "microservices",
        "data analysis", "data science", "data engineering",
        "project management", "team leadership",
    ]

    text_lower = text.lower()
    found_skills = []
    for skill in common_skills:
        if skill in text_lower:
            found_skills.append(skill.title())

    return list(set(found_skills))


async def parse_resume(content: bytes, content_type: str) -> dict:
    """Parse resume file and extract structured data."""
    if "pdf" in content_type:
        text = await extract_text_from_pdf(content)
    elif "docx" in content_type or "wordprocessing" in content_type:
        text = await extract_text_from_docx(content)
    else:
        text = content.decode("utf-8", errors="ignore")

    return await parse_resume_text(text)


async def parse_resume_text(text: str) -> dict:
    """Parse resume text and extract structured data."""
    return {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "raw_text": text[:5000],  # Limit text length
        "word_count": len(text.split()),
    }
