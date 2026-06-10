"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Monitor,
  Building2,
  Users,
  Globe,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Send,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Share2,
} from "lucide-react";
import { useState } from "react";

// Mock job data
const job = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "Google",
  companyInfo: {
    description:
      "Google LLC is a global technology leader focused on improving the ways people connect with information. From Search and Maps to YouTube and Android, Google products are used by billions of people worldwide.",
    size: "10,000+ employees",
    founded: "1998",
    website: "google.com",
    industry: "Technology",
  },
  location: "Bangalore, India",
  type: "Full-time",
  mode: "Hybrid",
  salary: "₹25L - ₹45L",
  match: 95,
  posted: "2 hours ago",
  deadline: "July 15, 2026",
  source: "LinkedIn",
  logo: "G",
  logoColor: "#4285F4",
  skills: ["React", "TypeScript", "Next.js", "GraphQL", "Node.js", "CSS-in-JS"],
  experience: "5-8 years",
  description: `We are looking for a Senior Frontend Developer to join our India engineering team and help build next-generation web experiences for Google's enterprise products.

You will work closely with designers, product managers, and backend engineers to create performant, accessible, and beautiful user interfaces that serve millions of users globally.`,
  responsibilities: [
    "Lead the design and development of complex frontend features",
    "Architect scalable, reusable component libraries",
    "Mentor junior engineers and conduct code reviews",
    "Collaborate with UX designers to implement pixel-perfect interfaces",
    "Optimize web performance and Core Web Vitals",
    "Drive best practices for testing, accessibility, and CI/CD",
  ],
  requirements: [
    "5+ years of professional frontend development experience",
    "Strong proficiency in React, TypeScript, and modern JavaScript",
    "Experience with state management (Redux, Zustand, etc.)",
    "Solid understanding of web performance optimization",
    "Excellent communication and teamwork skills",
    "Bachelor's degree in Computer Science or equivalent experience",
  ],
  benefits: [
    "Competitive salary with equity and bonuses",
    "Health, dental, and vision insurance",
    "Flexible work arrangements (hybrid)",
    "Free meals and on-site amenities",
    "Learning & development budget",
    "Generous PTO policy",
  ],
  matchDetails: {
    skillMatch: 90,
    experienceMatch: 95,
    locationMatch: 100,
    overallMatch: 95,
    matchingSkills: ["React", "TypeScript", "Next.js", "Node.js"],
    missingSkills: ["GraphQL", "CSS-in-JS"],
  },
};

export default function JobDetailPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Back Button */}
      <Link
        href="/jobs"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          marginBottom: "var(--space-5)",
        }}
      >
        <ArrowLeft size={16} /> Back to Search
      </Link>

      {/* Header Card */}
      <div
        className="card"
        style={{ padding: "var(--space-8)", marginBottom: "var(--space-5)" }}
      >
        <div style={{ display: "flex", gap: "var(--space-6)" }}>
          {/* Logo */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "var(--radius-xl)",
              background: `${job.logoColor}12`,
              color: job.logoColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "1.75rem",
              flexShrink: 0,
            }}
          >
            {job.logo}
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h1 style={{ fontSize: "1.75rem", marginBottom: 4 }}>
                  {job.title}
                </h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    fontSize: "1.0625rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Building2 size={16} /> {job.company}
                  <span className="badge badge-neutral" style={{ marginLeft: 4 }}>
                    {job.source}
                  </span>
                </div>
              </div>

              {/* Match Score */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: `conic-gradient(var(--accent-500) ${job.match * 3.6}deg, var(--gray-200) 0)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "1.125rem",
                      color: "var(--accent-600)",
                    }}
                  >
                    {job.match}%
                  </span>
                  <span style={{ fontSize: "0.5625rem", color: "var(--text-tertiary)" }}>
                    Match
                  </span>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-4)",
                marginTop: "var(--space-4)",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={15} /> {job.location}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Briefcase size={15} /> {job.type}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Monitor size={15} /> {job.mode}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <DollarSign size={15} /> {job.salary}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Users size={15} /> {job.experience}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={15} /> {job.posted}
              </span>
            </div>

            {/* Skills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-2)",
                marginTop: "var(--space-4)",
              }}
            >
              {job.skills.map((s) => (
                <span
                  key={s}
                  className={`badge ${job.matchDetails.matchingSkills.includes(s) ? "badge-success" : "badge-neutral"}`}
                >
                  {job.matchDetails.matchingSkills.includes(s) && (
                    <CheckCircle2 size={10} />
                  )}
                  {s}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                marginTop: "var(--space-6)",
              }}
            >
              <button
                className={`btn ${applied ? "btn-success" : "btn-primary"} btn-lg`}
                onClick={() => setApplied(true)}
                disabled={applied}
              >
                {applied ? (
                  <>
                    <CheckCircle2 size={18} /> Applied
                  </>
                ) : (
                  <>
                    <Send size={18} /> Apply Now
                  </>
                )}
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => setIsSaved(!isSaved)}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck size={18} /> Saved
                  </>
                ) : (
                  <>
                    <Bookmark size={18} /> Save Job
                  </>
                )}
              </button>
              <button className="btn btn-ghost btn-lg">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "var(--space-5)",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
          }}
        >
          {/* Description */}
          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)" }}>About This Role</h3>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)" }}>Responsibilities</h3>
            <ul
              style={{
                paddingLeft: 20,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {job.responsibilities.map((r, i) => (
                <li
                  key={i}
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)" }}>Requirements</h3>
            <ul
              style={{
                paddingLeft: 20,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {job.requirements.map((r, i) => (
                <li
                  key={i}
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)" }}>Benefits</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-3)",
              }}
            >
              {job.benefits.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.9375rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{ color: "var(--accent-500)", flexShrink: 0 }}
                  />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
          }}
        >
          {/* AI Match Breakdown */}
          <div className="card">
            <h4
              style={{
                marginBottom: "var(--space-4)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Sparkles size={16} style={{ color: "var(--primary-500)" }} />
              AI Match Analysis
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {[
                { label: "Skills", value: job.matchDetails.skillMatch },
                { label: "Experience", value: job.matchDetails.experienceMatch },
                { label: "Location", value: job.matchDetails.locationMatch },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      marginBottom: 4,
                    }}
                  >
                    <span>{item.label}</span>
                    <span
                      style={{
                        color:
                          item.value >= 80
                            ? "var(--accent-600)"
                            : "var(--warning-600)",
                        fontWeight: 700,
                      }}
                    >
                      {item.value}%
                    </span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div
                      className={`progress-bar-fill ${item.value >= 80 ? "success" : "warning"}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}

              <hr className="divider" style={{ margin: "var(--space-2) 0" }} />

              <div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--accent-600)",
                    marginBottom: 6,
                  }}
                >
                  ✓ Matching Skills
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {job.matchDetails.matchingSkills.map((s) => (
                    <span key={s} className="badge badge-success">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--warning-600)",
                    marginBottom: 6,
                  }}
                >
                  ⚠ Skills to Improve
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {job.matchDetails.missingSkills.map((s) => (
                    <span key={s} className="badge badge-warning">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="card">
            <h4 style={{ marginBottom: "var(--space-4)" }}>About {job.company}</h4>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "var(--space-4)",
              }}
            >
              {job.companyInfo.description}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
                fontSize: "0.8125rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Industry</span>
                <span style={{ fontWeight: 500 }}>{job.companyInfo.industry}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Size</span>
                <span style={{ fontWeight: 500 }}>{job.companyInfo.size}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Founded</span>
                <span style={{ fontWeight: 500 }}>{job.companyInfo.founded}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Website</span>
                <a
                  href="#"
                  style={{
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {job.companyInfo.website} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Key Dates */}
          <div className="card">
            <h4 style={{ marginBottom: "var(--space-4)" }}>Key Dates</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                fontSize: "0.875rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--text-secondary)",
                }}
              >
                <Calendar size={15} /> Posted: {job.posted}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--danger-500)",
                  fontWeight: 500,
                }}
              >
                <Clock size={15} /> Deadline: {job.deadline}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
