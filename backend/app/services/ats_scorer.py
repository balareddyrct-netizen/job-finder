"""ATS Resume Scoring Engine.

Scores resumes using keyword analysis, structure checks, and optionally
Gemini AI for semantic analysis against job descriptions.
"""

import re
from typing import Optional


# Common ATS-important sections
REQUIRED_SECTIONS = [
    "contact", "summary", "experience", "education", "skills"
]

# ATS-unfriendly elements
ATS_RED_FLAGS = [
    "tables", "columns", "graphics", "headers/footers",
    "text boxes", "images", "special characters"
]

# Common action verbs ATS systems look for
ACTION_VERBS = [
    "managed", "developed", "created", "implemented", "designed",
    "led", "built", "improved", "increased", "reduced", "achieved",
    "delivered", "launched", "optimized", "automated", "analyzed",
    "collaborated", "mentored", "established", "streamlined",
    "architected", "deployed", "integrated", "maintained", "resolved",
]


def check_sections(text: str) -> dict:
    """Check for presence of key resume sections."""
    text_lower = text.lower()
    found = {}
    section_keywords = {
        "contact": ["email", "phone", "@", "linkedin"],
        "summary": ["summary", "objective", "about", "profile"],
        "experience": ["experience", "work history", "employment"],
        "education": ["education", "degree", "university", "college"],
        "skills": ["skills", "technologies", "tools", "proficiencies"],
        "projects": ["projects", "portfolio"],
        "certifications": ["certification", "certificate", "certified"],
    }

    for section, keywords in section_keywords.items():
        found[section] = any(kw in text_lower for kw in keywords)

    return found


def check_keywords(text: str, job_description: Optional[str] = None) -> dict:
    """Analyze keyword match between resume and job description."""
    text_lower = text.lower()
    words = set(re.findall(r'\b\w+\b', text_lower))

    # Count action verbs
    action_verb_count = sum(1 for v in ACTION_VERBS if v in text_lower)

    # If job description provided, check keyword overlap
    jd_match = None
    if job_description:
        jd_lower = job_description.lower()
        jd_words = set(re.findall(r'\b\w+\b', jd_lower))

        # Filter out common words
        common_words = {"the", "a", "an", "is", "are", "was", "were", "be",
                       "been", "being", "have", "has", "had", "do", "does",
                       "did", "will", "would", "could", "should", "may",
                       "might", "can", "shall", "to", "of", "in", "for",
                       "on", "with", "at", "by", "from", "as", "into",
                       "through", "and", "or", "but", "not", "this", "that",
                       "it", "its", "we", "our", "you", "your", "they", "their"}

        jd_keywords = jd_words - common_words
        resume_keywords = words - common_words

        matched = jd_keywords & resume_keywords
        missing = jd_keywords - resume_keywords

        # Only consider meaningful keywords (3+ chars)
        meaningful_matched = {w for w in matched if len(w) >= 3}
        meaningful_missing = {w for w in missing if len(w) >= 3}

        jd_match = {
            "matched_keywords": list(meaningful_matched)[:20],
            "missing_keywords": list(meaningful_missing)[:15],
            "match_percentage": round(
                len(meaningful_matched) / max(len(jd_keywords), 1) * 100, 1
            ),
        }

    return {
        "word_count": len(words),
        "action_verb_count": action_verb_count,
        "jd_match": jd_match,
    }


def check_formatting(text: str) -> dict:
    """Check resume formatting quality."""
    lines = text.split("\n")
    non_empty_lines = [l for l in lines if l.strip()]

    # Length check
    word_count = len(text.split())
    length_score = 100
    if word_count < 200:
        length_score = 40  # Too short
    elif word_count < 400:
        length_score = 70
    elif word_count > 1500:
        length_score = 60  # Too long

    # Check for quantified achievements (numbers)
    numbers = re.findall(r'\d+[%+]?', text)
    has_metrics = len(numbers) >= 3

    # Check for email
    has_email = bool(re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', text))

    # Check for phone
    has_phone = bool(re.search(r'[\+]?[\d\s\-\(\)]{10,}', text))

    return {
        "word_count": word_count,
        "line_count": len(non_empty_lines),
        "length_score": length_score,
        "has_metrics": has_metrics,
        "metrics_count": len(numbers),
        "has_email": has_email,
        "has_phone": has_phone,
    }


async def score_resume_ats(
    resume_text: str,
    job_description: Optional[str] = None,
) -> dict:
    """
    Score a resume for ATS compatibility.

    Returns overall score (0-100) with detailed feedback and suggestions.
    """
    if not resume_text or len(resume_text.strip()) < 50:
        return {
            "overall_score": 0,
            "feedback": [
                {"category": "Content", "score": 0, "message": "Resume appears to be empty or too short"}
            ],
            "suggestions": ["Add content to your resume before scoring"],
        }

    # Run all checks
    sections = check_sections(resume_text)
    keywords = check_keywords(resume_text, job_description)
    formatting = check_formatting(resume_text)

    feedback = []
    suggestions = []

    # 1. Section Score (25 points)
    required_found = sum(1 for s in REQUIRED_SECTIONS if sections.get(s, False))
    section_score = (required_found / len(REQUIRED_SECTIONS)) * 25

    if not sections.get("contact"):
        suggestions.append("Add contact information (email, phone, LinkedIn)")
    if not sections.get("summary"):
        suggestions.append("Add a professional summary or objective at the top")
    if not sections.get("experience"):
        suggestions.append("Add a work experience section")
    if not sections.get("education"):
        suggestions.append("Add an education section")
    if not sections.get("skills"):
        suggestions.append("Add a skills section listing your technical and soft skills")

    feedback.append({
        "category": "Sections",
        "score": round(section_score),
        "max_score": 25,
        "message": f"Found {required_found}/{len(REQUIRED_SECTIONS)} required sections",
    })

    # 2. Formatting Score (25 points)
    format_score = formatting["length_score"] * 0.25

    if formatting["word_count"] < 200:
        suggestions.append("Your resume is too short. Aim for 400-800 words")
    elif formatting["word_count"] > 1500:
        suggestions.append("Your resume is too long. Keep it under 2 pages (800 words)")

    if not formatting["has_email"]:
        suggestions.append("Include your email address")
    if not formatting["has_phone"]:
        suggestions.append("Include your phone number")
    if not formatting["has_metrics"]:
        suggestions.append("Add quantified achievements (e.g., 'Increased sales by 30%')")

    feedback.append({
        "category": "Formatting",
        "score": round(format_score),
        "max_score": 25,
        "message": f"{formatting['word_count']} words, {'good length' if 400 <= formatting['word_count'] <= 1000 else 'needs adjustment'}",
    })

    # 3. Keywords Score (25 points)
    verb_score = min(keywords["action_verb_count"] / 8, 1) * 12.5
    jd_score = 12.5  # Default if no JD

    if keywords["jd_match"]:
        jd_score = (keywords["jd_match"]["match_percentage"] / 100) * 12.5
        if keywords["jd_match"]["match_percentage"] < 50:
            missing = keywords["jd_match"]["missing_keywords"][:5]
            suggestions.append(f"Add these missing keywords from the job description: {', '.join(missing)}")

    keyword_score = verb_score + jd_score

    if keywords["action_verb_count"] < 5:
        suggestions.append("Use more action verbs (e.g., managed, developed, implemented)")

    feedback.append({
        "category": "Keywords",
        "score": round(keyword_score),
        "max_score": 25,
        "message": f"{keywords['action_verb_count']} action verbs found" +
                   (f", {keywords['jd_match']['match_percentage']}% JD match" if keywords["jd_match"] else ""),
        "details": keywords["jd_match"],
    })

    # 4. Impact Score (25 points)
    impact_score = 0
    if formatting["has_metrics"]:
        impact_score += 15
    if keywords["action_verb_count"] >= 8:
        impact_score += 10
    elif keywords["action_verb_count"] >= 5:
        impact_score += 5

    feedback.append({
        "category": "Impact",
        "score": round(impact_score),
        "max_score": 25,
        "message": f"{'Strong' if impact_score >= 20 else 'Moderate' if impact_score >= 10 else 'Weak'} impact statements",
    })

    overall_score = round(section_score + format_score + keyword_score + impact_score)
    overall_score = max(0, min(100, overall_score))

    return {
        "overall_score": overall_score,
        "feedback": feedback,
        "suggestions": suggestions[:8],  # Limit to top 8 suggestions
    }
