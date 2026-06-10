"""PDF Export Tools.

Generates PDF resumes from structured resume data
using ReportLab or simple HTML-to-PDF conversion.
"""

import io
import os
from typing import Optional


async def generate_resume_pdf(
    resume_data: dict,
    template: str = "professional",
) -> bytes:
    """Generate a PDF resume from structured data.

    Uses a simple text-based approach that works without
    heavy dependencies. For production, integrate with
    a proper PDF template engine.

    Args:
        resume_data: Dict with resume sections (name, email, summary, etc.)
        template: Template name ('professional', 'modern', 'minimal')

    Returns:
        PDF file as bytes.
    """
    try:
        # Try using reportlab if available
        return _generate_with_reportlab(resume_data, template)
    except ImportError:
        # Fallback to simple text PDF
        return _generate_simple_pdf(resume_data)


def _generate_with_reportlab(resume_data: dict, template: str) -> bytes:
    """Generate PDF using ReportLab library."""
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib.colors import HexColor
    from reportlab.platypus import (
        SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    )

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
    )

    styles = getSampleStyleSheet()

    # Custom styles based on template
    primary_color = {
        "professional": "#1a1a2e",
        "modern": "#6366f1",
        "minimal": "#333333",
    }.get(template, "#1a1a2e")

    name_style = ParagraphStyle(
        "ResumeName",
        parent=styles["Title"],
        fontSize=22,
        textColor=HexColor(primary_color),
        spaceAfter=4,
    )

    section_style = ParagraphStyle(
        "SectionHeader",
        parent=styles["Heading2"],
        fontSize=13,
        textColor=HexColor(primary_color),
        spaceBefore=16,
        spaceAfter=6,
        borderWidth=0,
    )

    body_style = ParagraphStyle(
        "ResumeBody",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        spaceAfter=4,
    )

    contact_style = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontSize=9,
        textColor=HexColor("#666666"),
        spaceAfter=12,
    )

    elements = []

    # Name
    name = resume_data.get("name", "Your Name")
    elements.append(Paragraph(name, name_style))

    # Contact info line
    contact_parts = []
    if resume_data.get("email"):
        contact_parts.append(resume_data["email"])
    if resume_data.get("phone"):
        contact_parts.append(resume_data["phone"])
    if resume_data.get("location"):
        contact_parts.append(resume_data["location"])
    if resume_data.get("linkedin_url"):
        contact_parts.append(resume_data["linkedin_url"])

    if contact_parts:
        elements.append(Paragraph(" | ".join(contact_parts), contact_style))

    elements.append(HRFlowable(width="100%", color=HexColor("#dddddd")))

    # Summary
    if resume_data.get("summary"):
        elements.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
        elements.append(Paragraph(resume_data["summary"], body_style))

    # Experience
    experience = resume_data.get("experience", [])
    if experience:
        elements.append(Paragraph("WORK EXPERIENCE", section_style))
        for exp in experience:
            if isinstance(exp, dict):
                title = exp.get("title", "")
                company = exp.get("company", "")
                period = exp.get("period", "")
                desc = exp.get("description", "")
                elements.append(Paragraph(
                    f"<b>{title}</b> — {company} ({period})", body_style
                ))
                if desc:
                    elements.append(Paragraph(desc, body_style))
                elements.append(Spacer(1, 4))
            elif isinstance(exp, str):
                elements.append(Paragraph(f"• {exp}", body_style))

    # Education
    education = resume_data.get("education", [])
    if education:
        elements.append(Paragraph("EDUCATION", section_style))
        for edu in education:
            if isinstance(edu, dict):
                degree = edu.get("degree", "")
                school = edu.get("school", "")
                year = edu.get("year", "")
                elements.append(Paragraph(
                    f"<b>{degree}</b> — {school} ({year})", body_style
                ))
            elif isinstance(edu, str):
                elements.append(Paragraph(f"• {edu}", body_style))

    # Skills
    skills = resume_data.get("skills", [])
    if skills:
        elements.append(Paragraph("SKILLS", section_style))
        if isinstance(skills[0], str):
            elements.append(Paragraph(", ".join(skills), body_style))
        else:
            for skill in skills:
                if isinstance(skill, dict):
                    elements.append(Paragraph(
                        f"• {skill.get('name', str(skill))}", body_style
                    ))

    doc.build(elements)
    return buffer.getvalue()


def _generate_simple_pdf(resume_data: dict) -> bytes:
    """Generate a minimal text-based PDF without reportlab.

    This is a fallback that creates a basic PDF structure.
    """
    lines = []
    lines.append(resume_data.get("name", "Resume"))
    lines.append("")

    # Contact
    if resume_data.get("email"):
        lines.append(f"Email: {resume_data['email']}")
    if resume_data.get("phone"):
        lines.append(f"Phone: {resume_data['phone']}")
    lines.append("")

    # Summary
    if resume_data.get("summary"):
        lines.append("--- PROFESSIONAL SUMMARY ---")
        lines.append(resume_data["summary"])
        lines.append("")

    # Skills
    skills = resume_data.get("skills", [])
    if skills:
        lines.append("--- SKILLS ---")
        skill_names = [
            s if isinstance(s, str) else s.get("name", str(s))
            for s in skills
        ]
        lines.append(", ".join(skill_names))
        lines.append("")

    text = "\n".join(lines)

    # Create minimal valid PDF
    pdf_content = f"""%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842]
   /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj

5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj

4 0 obj
<< /Length {len(text) + 50} >>
stream
BT
/F1 11 Tf
50 790 Td
14 TL
"""

    for line in text.split("\n"):
        # Escape special PDF characters
        safe_line = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        pdf_content += f"({safe_line}) '\n"

    pdf_content += """ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000206 00000 n 

trailer
<< /Size 6 /Root 1 0 R >>
startxref
0
%%EOF"""

    return pdf_content.encode("latin-1")


async def save_pdf_to_disk(
    pdf_bytes: bytes,
    filename: str,
    upload_dir: str = "./uploads/resumes",
) -> str:
    """Save PDF bytes to disk and return the file path."""
    os.makedirs(upload_dir, exist_ok=True)
    filepath = os.path.join(upload_dir, filename)
    with open(filepath, "wb") as f:
        f.write(pdf_bytes)
    return filepath
