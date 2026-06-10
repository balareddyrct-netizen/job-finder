"use client";

import Link from "next/link";
import {
  Briefcase,
  FileText,
  TrendingUp,
  Bookmark,
  ArrowRight,
  MapPin,
  Building2,
  Clock,
  Sparkles,
  Eye,
  CheckCircle2,
  XCircle,
  Send,
  BarChart3,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

// Mock data
const stats = [
  {
    label: "Applications Sent",
    value: "24",
    change: "+5 this week",
    positive: true,
    icon: Send,
    color: "var(--primary-500)",
    bg: "var(--primary-50)",
  },
  {
    label: "Interviews Scheduled",
    value: "6",
    change: "+2 this week",
    positive: true,
    icon: Calendar,
    color: "var(--accent-500)",
    bg: "var(--accent-50)",
  },
  {
    label: "Saved Jobs",
    value: "18",
    change: "3 expiring soon",
    positive: false,
    icon: Bookmark,
    color: "var(--warning-500)",
    bg: "var(--warning-50)",
  },
  {
    label: "Profile Views",
    value: "142",
    change: "+28% vs last week",
    positive: true,
    icon: Eye,
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.08)",
  },
];

const recommendedJobs = [
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
    skills: ["React", "TypeScript", "Next.js"],
    logo: "G",
    logoColor: "#4285F4",
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
    skills: ["Node.js", "React", "PostgreSQL"],
    logo: "R",
    logoColor: "#0066FF",
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
    skills: ["React", "Redux", "JavaScript"],
    logo: "F",
    logoColor: "#F7D000",
  },
];

const recentActivity = [
  {
    icon: Send,
    text: "Applied to Senior Frontend Developer at Google",
    time: "2 hours ago",
    color: "var(--primary-500)",
  },
  {
    icon: CheckCircle2,
    text: "Resume ATS score improved to 92",
    time: "5 hours ago",
    color: "var(--accent-500)",
  },
  {
    icon: Bookmark,
    text: "Saved Full Stack Engineer at Razorpay",
    time: "1 day ago",
    color: "var(--warning-500)",
  },
  {
    icon: Eye,
    text: "Your profile was viewed by Amazon recruiter",
    time: "2 days ago",
    color: "#8B5CF6",
  },
  {
    icon: XCircle,
    text: "Application at Meta moved to rejected",
    time: "3 days ago",
    color: "var(--danger-500)",
  },
];

const applicationPipeline = [
  { stage: "Applied", count: 12, color: "var(--primary-500)" },
  { stage: "Screening", count: 5, color: "var(--warning-500)" },
  { stage: "Interview", count: 4, color: "#8B5CF6" },
  { stage: "Offer", count: 2, color: "var(--accent-500)" },
  { stage: "Rejected", count: 1, color: "var(--danger-400)" },
];

export default function DashboardPage() {
  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="page-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>Good morning, User! 👋</h1>
            <p>Here&apos;s what&apos;s happening with your job search today.</p>
          </div>
          <Link href="/jobs" className="btn btn-primary">
            <Sparkles size={16} /> Find Jobs
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "var(--space-5)",
          marginBottom: "var(--space-8)",
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card card-interactive">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-lg)",
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                  }}
                >
                  <Icon size={22} />
                </div>
                <ArrowUpRight
                  size={18}
                  style={{ color: "var(--text-tertiary)" }}
                />
              </div>
              <div className="stat-value" style={{ marginTop: 12 }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div
                className={`stat-change ${stat.positive ? "positive" : "negative"}`}
              >
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "var(--space-6)",
        }}
      >
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Recommended Jobs */}
          <div className="card">
            <div className="card-header">
              <div>
                <h3 style={{ fontSize: "1.125rem" }}>
                  <Sparkles
                    size={18}
                    style={{
                      display: "inline",
                      marginRight: 8,
                      color: "var(--primary-500)",
                    }}
                  />
                  Recommended for You
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    marginTop: 4,
                  }}
                >
                  Based on your resume and preferences
                </p>
              </div>
              <Link
                href="/jobs"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {recommendedJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="job-card">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "var(--radius-lg)",
                        background: `${job.logoColor}15`,
                        color: job.logoColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "1.125rem",
                        flexShrink: 0,
                      }}
                    >
                      {job.logo}
                    </div>
                    <div className="job-info" style={{ flex: 1 }}>
                      <div className="job-title">{job.title}</div>
                      <div className="company-name">{job.company}</div>
                      <div className="job-meta">
                        <span>
                          <MapPin size={13} /> {job.location}
                        </span>
                        <span>
                          <Briefcase size={13} /> {job.type}
                        </span>
                        <span>
                          <Clock size={13} /> {job.posted}
                        </span>
                      </div>
                      <div className="job-tags">
                        {job.skills.map((s) => (
                          <span key={s} className="tag" style={{ fontSize: "0.75rem" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="match-score">
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          background: `conic-gradient(var(--accent-500) ${job.match * 3.6}deg, var(--gray-200) 0)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
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
                      <div
                        style={{
                          fontSize: "0.6875rem",
                          color: "var(--text-tertiary)",
                          marginTop: 4,
                        }}
                      >
                        Match
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Application Pipeline */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.125rem" }}>
                <BarChart3
                  size={18}
                  style={{
                    display: "inline",
                    marginRight: 8,
                    color: "var(--primary-500)",
                  }}
                />
                Application Pipeline
              </h3>
            </div>
            <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-end" }}>
              {applicationPipeline.map((stage) => (
                <div
                  key={stage.stage}
                  style={{ flex: 1, textAlign: "center" }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      color: stage.color,
                    }}
                  >
                    {stage.count}
                  </div>
                  <div
                    style={{
                      height: Math.max(stage.count * 12, 16),
                      background: stage.color,
                      borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                      margin: "8px 0",
                      opacity: 0.2,
                      transition: "all var(--transition-base)",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    {stage.stage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* ATS Score Quick View */}
          <div className="card" style={{ textAlign: "center" }}>
            <h4 style={{ marginBottom: "var(--space-4)", fontSize: "1rem" }}>
              Resume ATS Score
            </h4>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "conic-gradient(var(--accent-500) 331.2deg, var(--gray-200) 0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 82,
                  height: 82,
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
                    fontSize: "1.5rem",
                    color: "var(--accent-600)",
                  }}
                >
                  92
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--text-tertiary)",
                  }}
                >
                  / 100
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                marginTop: "var(--space-4)",
              }}
            >
              Your resume is ATS-optimized
            </p>
            <Link
              href="/resume"
              className="btn btn-secondary btn-sm"
              style={{ marginTop: "var(--space-3)" }}
            >
              <FileText size={14} /> Improve Score
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h4 style={{ marginBottom: "var(--space-4)", fontSize: "1rem" }}>
              Recent Activity
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {recentActivity.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      padding: "var(--space-3) 0",
                      borderBottom:
                        i < recentActivity.length - 1
                          ? "1px solid var(--border-light)"
                          : "none",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "var(--radius-md)",
                        background: `${activity.color}15`,
                        color: activity.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--text-primary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {activity.text}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                          marginTop: 2,
                        }}
                      >
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h4 style={{ marginBottom: "var(--space-4)", fontSize: "1rem" }}>
              Quick Actions
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              <Link href="/resume/editor" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>
                <FileText size={16} /> Edit Resume
              </Link>
              <Link href="/jobs" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>
                <Briefcase size={16} /> Search Jobs
              </Link>
              <Link href="/intelligence" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>
                <TrendingUp size={16} /> Hiring Intel
              </Link>
              <Link href="/profile" className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>
                <Building2 size={16} /> Update Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
