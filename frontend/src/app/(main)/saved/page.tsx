"use client";

import Link from "next/link";
import {
  Bookmark,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Monitor,
  Trash2,
  ExternalLink,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const savedJobsData = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Bangalore, India",
    type: "Full-time",
    mode: "Hybrid",
    salary: "₹25L - ₹45L",
    match: 95,
    posted: "2 hours ago",
    savedAt: "Today",
    skills: ["React", "TypeScript", "Next.js"],
    logo: "G",
    logoColor: "#4285F4",
    status: "active",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "Razorpay",
    location: "Bangalore, India",
    type: "Full-time",
    mode: "Remote",
    salary: "₹18L - ₹32L",
    match: 91,
    posted: "5 hours ago",
    savedAt: "Yesterday",
    skills: ["Node.js", "React", "PostgreSQL"],
    logo: "R",
    logoColor: "#0066FF",
    status: "applied",
  },
  {
    id: "4",
    title: "Frontend Architect",
    company: "Swiggy",
    location: "Bangalore, India",
    type: "Full-time",
    mode: "Hybrid",
    salary: "₹30L - ₹50L",
    match: 86,
    posted: "2 days ago",
    savedAt: "3 days ago",
    skills: ["React", "System Design", "Micro-Frontends"],
    logo: "S",
    logoColor: "#FC8019",
    status: "active",
  },
  {
    id: "7",
    title: "UI Engineer",
    company: "Atlassian",
    location: "Bangalore, India",
    type: "Full-time",
    mode: "Remote",
    salary: "₹24L - ₹42L",
    match: 77,
    posted: "5 days ago",
    savedAt: "1 week ago",
    skills: ["React", "Design Systems", "A11y"],
    logo: "A",
    logoColor: "#0052CC",
    status: "expired",
  },
];

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState(savedJobsData);
  const [filter, setFilter] = useState<string>("all");

  const removeJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <h1>
          <Bookmark
            size={28}
            style={{ display: "inline", marginRight: 8, color: "var(--warning-500)" }}
          />
          Saved Jobs
        </h1>
        <p>Jobs you&apos;ve bookmarked for later</p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-5)",
        }}
      >
        {[
          { key: "all", label: `All (${jobs.length})` },
          { key: "active", label: `Active (${jobs.filter((j) => j.status === "active").length})` },
          { key: "applied", label: `Applied (${jobs.filter((j) => j.status === "applied").length})` },
          { key: "expired", label: `Expired (${jobs.filter((j) => j.status === "expired").length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`btn ${filter === tab.key ? "btn-primary" : "btn-ghost"} btn-sm`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {filteredJobs.length === 0 ? (
          <div
            className="card"
            style={{ textAlign: "center", padding: "var(--space-12)" }}
          >
            <Bookmark
              size={48}
              style={{ color: "var(--gray-300)", margin: "0 auto var(--space-4)" }}
            />
            <h3 style={{ color: "var(--text-secondary)" }}>No saved jobs</h3>
            <p style={{ color: "var(--text-tertiary)", marginTop: 8 }}>
              Start saving jobs from the search page
            </p>
            <Link
              href="/jobs"
              className="btn btn-primary"
              style={{ marginTop: "var(--space-4)" }}
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card" style={{ padding: "var(--space-5) var(--space-6)" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "var(--radius-lg)",
                  background: `${job.logoColor}12`,
                  color: job.logoColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}
              >
                {job.logo}
              </div>

              <div className="job-info" style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="job-title"
                    style={{
                      fontSize: "1.0625rem",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {job.title}
                  </Link>
                  <span
                    className={`badge ${
                      job.status === "applied"
                        ? "badge-success"
                        : job.status === "expired"
                          ? "badge-danger"
                          : "badge-primary"
                    }`}
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {job.status === "applied" ? "Applied" : job.status === "expired" ? "Expired" : "Active"}
                  </span>
                </div>
                <div className="company-name">{job.company}</div>
                <div className="job-meta" style={{ marginTop: 8 }}>
                  <span>
                    <MapPin size={13} /> {job.location}
                  </span>
                  <span>
                    <Briefcase size={13} /> {job.type}
                  </span>
                  <span>
                    <Monitor size={13} /> {job.mode}
                  </span>
                  <span>
                    <DollarSign size={13} /> {job.salary}
                  </span>
                </div>
                <div className="job-tags" style={{ marginTop: 8 }}>
                  {job.skills.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                    marginTop: 8,
                  }}
                >
                  Saved {job.savedAt}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `conic-gradient(var(--accent-500) ${job.match * 3.6}deg, var(--gray-200) 0)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.8125rem",
                      color: "var(--accent-600)",
                    }}
                  >
                    {job.match}%
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {job.status !== "applied" && job.status !== "expired" && (
                    <Link
                      href={`/jobs/${job.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <Send size={12} /> Apply
                    </Link>
                  )}
                  <button
                    className="btn btn-ghost btn-icon"
                    onClick={() => removeJob(job.id)}
                    title="Remove"
                    style={{ color: "var(--danger-400)" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
