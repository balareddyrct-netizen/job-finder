/**
 * Client-side ATS (Applicant Tracking System) Scorer.
 *
 * Provides instant, lightweight ATS scoring in the browser
 * without requiring a backend API call. Useful for real-time
 * feedback in the resume editor.
 */

// ─── Constants ─────────────────────────────────────────────────

const REQUIRED_SECTIONS = [
  "contact",
  "summary",
  "experience",
  "education",
  "skills",
] as const;

const ACTION_VERBS = [
  "managed",
  "developed",
  "created",
  "implemented",
  "designed",
  "led",
  "built",
  "improved",
  "increased",
  "reduced",
  "achieved",
  "delivered",
  "launched",
  "optimized",
  "automated",
  "analyzed",
  "collaborated",
  "mentored",
  "established",
  "streamlined",
  "architected",
  "deployed",
  "integrated",
  "maintained",
  "resolved",
];

const SECTION_KEYWORDS: Record<string, string[]> = {
  contact: ["email", "phone", "@", "linkedin"],
  summary: ["summary", "objective", "about", "profile"],
  experience: ["experience", "work history", "employment"],
  education: ["education", "degree", "university", "college"],
  skills: ["skills", "technologies", "tools", "proficiencies"],
};

// ─── Types ─────────────────────────────────────────────────────

export interface ATSFeedback {
  category: string;
  score: number;
  maxScore: number;
  message: string;
}

export interface ATSResult {
  overallScore: number;
  feedback: ATSFeedback[];
  suggestions: string[];
}

// ─── Main Scorer ───────────────────────────────────────────────

export function scoreResumeATS(
  resumeText: string,
  jobDescription?: string
): ATSResult {
  if (!resumeText || resumeText.trim().length < 50) {
    return {
      overallScore: 0,
      feedback: [
        {
          category: "Content",
          score: 0,
          maxScore: 100,
          message: "Resume is too short or empty",
        },
      ],
      suggestions: ["Add content to your resume before scoring"],
    };
  }

  const textLower = resumeText.toLowerCase();
  const feedback: ATSFeedback[] = [];
  const suggestions: string[] = [];

  // 1. Section Score (25 points)
  const foundSections = REQUIRED_SECTIONS.filter((section) =>
    SECTION_KEYWORDS[section]?.some((kw) => textLower.includes(kw))
  );
  const sectionScore = (foundSections.length / REQUIRED_SECTIONS.length) * 25;

  REQUIRED_SECTIONS.forEach((section) => {
    if (!foundSections.includes(section)) {
      const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
      suggestions.push(`Add a ${sectionName} section to your resume`);
    }
  });

  feedback.push({
    category: "Sections",
    score: Math.round(sectionScore),
    maxScore: 25,
    message: `Found ${foundSections.length}/${REQUIRED_SECTIONS.length} required sections`,
  });

  // 2. Formatting Score (25 points)
  const wordCount = resumeText.split(/\s+/).filter(Boolean).length;
  let formatScore = 25;
  if (wordCount < 200) {
    formatScore = 10;
    suggestions.push("Your resume is too short. Aim for 400-800 words");
  } else if (wordCount < 400) {
    formatScore = 18;
  } else if (wordCount > 1500) {
    formatScore = 15;
    suggestions.push("Your resume is too long. Keep it under 2 pages");
  }

  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.-]+/.test(resumeText);
  const hasPhone = /[+]?[\d\s\-()]{10,}/.test(resumeText);
  if (!hasEmail) suggestions.push("Include your email address");
  if (!hasPhone) suggestions.push("Include your phone number");

  feedback.push({
    category: "Formatting",
    score: Math.round(formatScore),
    maxScore: 25,
    message: `${wordCount} words — ${
      wordCount >= 400 && wordCount <= 1000 ? "good length" : "needs adjustment"
    }`,
  });

  // 3. Keywords Score (25 points)
  const actionVerbCount = ACTION_VERBS.filter((v) =>
    textLower.includes(v)
  ).length;
  let verbScore = Math.min(actionVerbCount / 8, 1) * 12.5;
  let jdScore = 12.5;

  if (jobDescription) {
    const jdWords = new Set(
      jobDescription
        .toLowerCase()
        .match(/\b\w{3,}\b/g)
        ?.filter(
          (w) =>
            ![
              "the",
              "and",
              "for",
              "are",
              "was",
              "you",
              "your",
              "with",
              "this",
              "that",
              "will",
              "have",
              "from",
              "they",
              "been",
              "our",
            ].includes(w)
        ) ?? []
    );
    const resumeWords = new Set(
      resumeText
        .toLowerCase()
        .match(/\b\w{3,}\b/g) ?? []
    );

    const matched = [...jdWords].filter((w) => resumeWords.has(w));
    const missing = [...jdWords].filter((w) => !resumeWords.has(w));
    const matchPct = jdWords.size > 0 ? (matched.length / jdWords.size) * 100 : 0;
    jdScore = (matchPct / 100) * 12.5;

    if (matchPct < 50 && missing.length > 0) {
      suggestions.push(
        `Add missing keywords: ${missing.slice(0, 5).join(", ")}`
      );
    }
  }

  if (actionVerbCount < 5) {
    suggestions.push(
      "Use more action verbs (e.g., managed, developed, implemented)"
    );
  }

  feedback.push({
    category: "Keywords",
    score: Math.round(verbScore + jdScore),
    maxScore: 25,
    message: `${actionVerbCount} action verbs found`,
  });

  // 4. Impact Score (25 points)
  const numbersFound = resumeText.match(/\d+[%+]?/g) || [];
  const hasMetrics = numbersFound.length >= 3;
  let impactScore = 0;
  if (hasMetrics) impactScore += 15;
  if (actionVerbCount >= 8) impactScore += 10;
  else if (actionVerbCount >= 5) impactScore += 5;

  if (!hasMetrics) {
    suggestions.push(
      "Add quantified achievements (e.g., 'Increased sales by 30%')"
    );
  }

  feedback.push({
    category: "Impact",
    score: Math.round(impactScore),
    maxScore: 25,
    message: `${
      impactScore >= 20 ? "Strong" : impactScore >= 10 ? "Moderate" : "Weak"
    } impact statements`,
  });

  // Overall
  const overallScore = Math.max(
    0,
    Math.min(100, Math.round(sectionScore + formatScore + verbScore + jdScore + impactScore))
  );

  return {
    overallScore,
    feedback,
    suggestions: suggestions.slice(0, 8),
  };
}
