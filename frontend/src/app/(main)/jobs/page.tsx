"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  BookmarkCheck,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  DollarSign,
  Sparkles,
  X,
  Monitor,
  ExternalLink,
} from "lucide-react";

const allJobs = [
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
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    logo: "G",
    logoColor: "#4285F4",
    description: "Join Google's India engineering team to build next-generation web experiences...",
    source: "LinkedIn",
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
    skills: ["Node.js", "React", "PostgreSQL", "Docker"],
    logo: "R",
    logoColor: "#0066FF",
    description: "Build and scale payment infrastructure that powers millions of businesses...",
    source: "Naukri",
  },
  {
    id: "3",
    title: "React Developer",
    company: "Flipkart",
    location: "Bangalore, India",
    type: "Full-time",
    mode: "On-site",
    salary: "₹20L - ₹35L",
    match: 88,
    posted: "1 day ago",
    skills: ["React", "Redux", "JavaScript", "CSS"],
    logo: "F",
    logoColor: "#F7D000",
    description: "Work on Flipkart's consumer-facing product experience reaching millions...",
    source: "InstaHire",
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
    skills: ["React", "System Design", "TypeScript", "Micro-Frontends"],
    logo: "S",
    logoColor: "#FC8019",
    description: "Define frontend architecture for Swiggy's rapidly growing platform...",
    source: "LinkedIn",
  },
  {
    id: "5",
    title: "Software Engineer II",
    company: "Microsoft",
    location: "Hyderabad, India",
    type: "Full-time",
    mode: "Hybrid",
    salary: "₹22L - ₹40L",
    match: 82,
    posted: "3 days ago",
    skills: ["React", "C#", "Azure", "TypeScript"],
    logo: "M",
    logoColor: "#00A4EF",
    description: "Join Microsoft's Azure team building cloud-native developer tools...",
    source: "Company",
  },
  {
    id: "6",
    title: "Lead Developer — Frontend",
    company: "PhonePe",
    location: "Bangalore, India",
    type: "Full-time",
    mode: "On-site",
    salary: "₹28L - ₹48L",
    match: 79,
    posted: "4 days ago",
    skills: ["React Native", "React", "JavaScript", "Performance"],
    logo: "P",
    logoColor: "#5F259F",
    description: "Lead the frontend team building India's most popular digital payments app...",
    source: "Naukri",
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
    skills: ["React", "TypeScript", "Design Systems", "A11y"],
    logo: "A",
    logoColor: "#0052CC",
    description: "Build beautiful, accessible interfaces for Jira, Confluence, and Trello...",
    source: "LinkedIn",
  },
];

const filterOptions = {
  type: ["Full-time", "Part-time", "Contract", "Internship"],
  mode: ["Remote", "Hybrid", "On-site"],
  experience: ["0-2 years", "2-5 years", "5-8 years", "8+ years"],
  source: ["LinkedIn", "Naukri", "InstaHire", "Indeed", "Company"],
};

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const toggleSave = (id: string) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[category] || [];
      if (current.includes(value)) {
        return {
          ...prev,
          [category]: current.filter((v) => v !== value),
        };
      }
      return {
        ...prev,
        [category]: [...current, value],
      };
    });
  };

  const activeFilterCount = Object.values(activeFilters).flat().length;

  const filteredJobs = allJobs.filter((job) => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && !job.company.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (locationQuery && !job.location.toLowerCase().includes(locationQuery.toLowerCase())) {
      return false;
    }
    if (activeFilters.type?.length && !activeFilters.type.includes(job.type)) return false;
    if (activeFilters.mode?.length && !activeFilters.mode.includes(job.mode)) return false;
    if (activeFilters.source?.length && !activeFilters.source.includes(job.source)) return false;
    return true;
  });

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="page-header">
        <h1>Job Search</h1>
        <p>Discover opportunities from LinkedIn, Naukri, InstaHire, and 100+ sources</p>
      </div>

      {/* Search Bar */}
      <div
        className="card"
        style={{
          padding: "var(--space-4)",
          marginBottom: "var(--space-5)",
        }}
      >
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <div style={{ flex: 2, position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-tertiary)",
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Job title, company, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 40 }}
            />
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <MapPin
              size={18}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-tertiary)",
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Location..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              style={{ paddingLeft: 40 }}
            />
          </div>
          <button className="btn btn-primary">
            <Search size={16} /> Search
          </button>
          <button
            className={`btn ${showFilters ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setShowFilters(!showFilters)}
            style={{ position: "relative" }}
          >
            <SlidersHorizontal size={16} /> Filters
            {activeFilterCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "var(--danger-500)",
                  color: "white",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div
            style={{
              marginTop: "var(--space-4)",
              paddingTop: "var(--space-4)",
              borderTop: "1px solid var(--border-light)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "var(--space-5)",
            }}
          >
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category}>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    marginBottom: "var(--space-2)",
                    textTransform: "capitalize",
                  }}
                >
                  {category === "mode" ? "Work Mode" : category}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-1)",
                  }}
                >
                  {options.map((opt) => {
                    const isActive =
                      activeFilters[category]?.includes(opt) || false;
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleFilter(category, opt)}
                        className={`tag ${isActive ? "" : ""}`}
                        style={{
                          cursor: "pointer",
                          border: "none",
                          fontFamily: "var(--font-sans)",
                          background: isActive
                            ? "var(--primary-100)"
                            : "var(--gray-100)",
                          color: isActive
                            ? "var(--primary-700)"
                            : "var(--gray-600)",
                          fontWeight: isActive ? 600 : 500,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-4)",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          <strong style={{ color: "var(--text-primary)" }}>{filteredJobs.length}</strong> jobs
          found
          {activeFilterCount > 0 && (
            <button
              onClick={() => setActiveFilters({})}
              style={{
                marginLeft: 8,
                color: "var(--primary-600)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8125rem",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
              }}
            >
              Clear filters
            </button>
          )}
        </p>
        <select
          className="input select"
          style={{ width: 180, height: 36, fontSize: "0.8125rem", padding: "4px 8px" }}
          defaultValue="relevance"
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="recent">Sort by: Most Recent</option>
          <option value="salary">Sort by: Salary</option>
          <option value="match">Sort by: Match Score</option>
        </select>
      </div>

      {/* Job Listings */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card" style={{ padding: "var(--space-5) var(--space-6)" }}>
            {/* Logo */}
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

            {/* Info */}
            <div className="job-info" style={{ flex: 1 }}>
              <Link
                href={`/jobs/${job.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div className="job-title" style={{ fontSize: "1.0625rem" }}>
                  {job.title}
                </div>
              </Link>
              <div className="company-name" style={{ marginTop: 2 }}>
                {job.company}
              </div>
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
                <span>
                  <Clock size={13} /> {job.posted}
                </span>
              </div>
              <div className="job-tags" style={{ marginTop: 10 }}>
                {job.skills.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
                <span
                  className="badge badge-neutral"
                  style={{ fontSize: "0.6875rem" }}
                >
                  {job.source}
                </span>
              </div>
            </div>

            {/* Right Side */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-3)",
                flexShrink: 0,
              }}
            >
              {/* Match Score */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `conic-gradient(var(--accent-500) ${job.match * 3.6}deg, var(--gray-200) 0)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
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

              {/* Actions */}
              <div style={{ display: "flex", gap: "var(--space-1)" }}>
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => toggleSave(job.id)}
                  style={{
                    color: savedJobs.includes(job.id)
                      ? "var(--warning-500)"
                      : "var(--text-tertiary)",
                  }}
                  title={savedJobs.includes(job.id) ? "Unsave" : "Save"}
                >
                  {savedJobs.includes(job.id) ? (
                    <BookmarkCheck size={18} />
                  ) : (
                    <Bookmark size={18} />
                  )}
                </button>
                <Link
                  href={`/jobs/${job.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: "0.8125rem" }}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
