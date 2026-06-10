"use client";

import {
  Users,
  Briefcase,
  FileText,
  Activity,
  TrendingUp,
  ArrowUpRight,
  Shield,
  Clock,
  BarChart3,
  Eye,
  UserPlus,
  Download,
  Search,
  Send,
  Edit3,
  Trash2,
  LogIn,
} from "lucide-react";
import { useState } from "react";

const stats = [
  {
    label: "Total Users",
    value: "1,247",
    change: "+82 this month",
    positive: true,
    icon: Users,
    color: "var(--primary-500)",
    bg: "var(--primary-50)",
  },
  {
    label: "Active Jobs",
    value: "3,845",
    change: "+312 this week",
    positive: true,
    icon: Briefcase,
    color: "var(--accent-500)",
    bg: "var(--accent-50)",
  },
  {
    label: "Resumes Created",
    value: "2,156",
    change: "+45 today",
    positive: true,
    icon: FileText,
    color: "var(--warning-500)",
    bg: "var(--warning-50)",
  },
  {
    label: "Avg ATS Score",
    value: "78.4",
    change: "+2.1 vs last month",
    positive: true,
    icon: BarChart3,
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.08)",
  },
];

const recentUsers = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "user",
    provider: "Google",
    joinedAt: "2 hours ago",
    lastLogin: "2 hours ago",
    initials: "PS",
  },
  {
    id: "2",
    name: "Rahul Patel",
    email: "rahul@example.com",
    role: "user",
    provider: "GitHub",
    joinedAt: "5 hours ago",
    lastLogin: "5 hours ago",
    initials: "RP",
  },
  {
    id: "3",
    name: "Ananya Singh",
    email: "ananya@example.com",
    role: "user",
    provider: "LinkedIn",
    joinedAt: "1 day ago",
    lastLogin: "3 hours ago",
    initials: "AS",
  },
  {
    id: "4",
    name: "Vikram Kumar",
    email: "vikram@example.com",
    role: "user",
    provider: "Google",
    joinedAt: "2 days ago",
    lastLogin: "1 day ago",
    initials: "VK",
  },
  {
    id: "5",
    name: "Admin User",
    email: "admin@jobfinder.com",
    role: "admin",
    provider: "Email",
    joinedAt: "30 days ago",
    lastLogin: "Just now",
    initials: "AU",
  },
];

const activityLog = [
  {
    action: "user.signup",
    user: "Priya Sharma",
    details: "New user registered via Google OAuth",
    time: "2 hours ago",
    icon: UserPlus,
    color: "var(--accent-500)",
  },
  {
    action: "resume.create",
    user: "Rahul Patel",
    details: "Created new resume: 'Full Stack Engineer'",
    time: "3 hours ago",
    icon: FileText,
    color: "var(--primary-500)",
  },
  {
    action: "job.apply",
    user: "Ananya Singh",
    details: "Applied to Senior Developer at Google",
    time: "4 hours ago",
    icon: Send,
    color: "var(--warning-500)",
  },
  {
    action: "resume.edit",
    user: "Vikram Kumar",
    details: "Updated resume: 'React Developer Resume'",
    time: "5 hours ago",
    icon: Edit3,
    color: "var(--primary-500)",
  },
  {
    action: "user.login",
    user: "Priya Sharma",
    details: "Logged in from Bangalore, IN",
    time: "6 hours ago",
    icon: LogIn,
    color: "var(--gray-500)",
  },
  {
    action: "resume.ats_score",
    user: "Ananya Singh",
    details: "ATS score calculated: 87/100",
    time: "7 hours ago",
    icon: BarChart3,
    color: "var(--accent-500)",
  },
  {
    action: "job.save",
    user: "Rahul Patel",
    details: "Saved job: Frontend Architect at Swiggy",
    time: "8 hours ago",
    icon: Eye,
    color: "var(--warning-500)",
  },
  {
    action: "resume.export",
    user: "Vikram Kumar",
    details: "Exported resume as PDF",
    time: "9 hours ago",
    icon: Download,
    color: "var(--gray-600)",
  },
];

const topSkills = [
  { skill: "React", count: 845 },
  { skill: "TypeScript", count: 723 },
  { skill: "Node.js", count: 612 },
  { skill: "Python", count: 589 },
  { skill: "AWS", count: 445 },
  { skill: "Docker", count: 387 },
  { skill: "PostgreSQL", count: 312 },
  { skill: "Next.js", count: 298 },
];

const topCompanies = [
  { company: "Google", count: 234 },
  { company: "Amazon", count: 198 },
  { company: "Microsoft", count: 176 },
  { company: "Flipkart", count: 145 },
  { company: "Razorpay", count: 112 },
];

export default function AdminPage() {
  const [userSearch, setUserSearch] = useState("");

  const maxSkillCount = Math.max(...topSkills.map((s) => s.count));

  return (
    <div className="animate-fadeIn">
      <div className="page-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>
              <Shield
                size={28}
                style={{
                  display: "inline",
                  marginRight: 8,
                  color: "var(--primary-500)",
                }}
              />
              Admin Dashboard
            </h1>
            <p>Monitor platform activity, users, and analytics</p>
          </div>
          <span className="badge badge-primary" style={{ padding: "6px 12px" }}>
            <Activity size={14} /> Live
          </span>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "var(--space-5)",
          marginBottom: "var(--space-6)",
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
                    color: stat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
              <div className="stat-change positive">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: "var(--space-6)",
        }}
      >
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Users Table */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.125rem" }}>
                <Users
                  size={18}
                  style={{ display: "inline", marginRight: 8, color: "var(--primary-500)" }}
                />
                Recent Users
              </h3>
              <div style={{ position: "relative", width: 200 }}>
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                  }}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{
                    paddingLeft: 32,
                    height: 34,
                    fontSize: "0.8125rem",
                  }}
                />
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.875rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid var(--border-default)",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "left",
                        padding: "var(--space-3)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      User
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "var(--space-3)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Role
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "var(--space-3)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Provider
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "var(--space-3)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Joined
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "var(--space-3)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Last Login
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers
                    .filter(
                      (u) =>
                        !userSearch ||
                        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearch.toLowerCase())
                    )
                    .map((user) => (
                      <tr
                        key={user.id}
                        style={{
                          borderBottom: "1px solid var(--border-light)",
                          transition: "background var(--transition-fast)",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.background =
                            "var(--gray-50)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.background =
                            "transparent")
                        }
                      >
                        <td style={{ padding: "var(--space-3)" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "var(--space-3)",
                            }}
                          >
                            <div
                              className="avatar avatar-placeholder avatar-sm"
                              style={{ fontSize: "0.6875rem" }}
                            >
                              {user.initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: 500 }}>{user.name}</div>
                              <div
                                style={{
                                  fontSize: "0.75rem",
                                  color: "var(--text-tertiary)",
                                }}
                              >
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "var(--space-3)" }}>
                          <span
                            className={`badge ${user.role === "admin" ? "badge-primary" : "badge-neutral"}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "var(--space-3)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {user.provider}
                        </td>
                        <td
                          style={{
                            padding: "var(--space-3)",
                            color: "var(--text-secondary)",
                            fontSize: "0.8125rem",
                          }}
                        >
                          {user.joinedAt}
                        </td>
                        <td
                          style={{
                            padding: "var(--space-3)",
                            color: "var(--text-secondary)",
                            fontSize: "0.8125rem",
                          }}
                        >
                          {user.lastLogin}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Log */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.125rem" }}>
                <Activity
                  size={18}
                  style={{ display: "inline", marginRight: 8, color: "var(--accent-500)" }}
                />
                Activity Feed
              </h3>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-tertiary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Clock size={12} /> Live updates
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {activityLog.map((log, i) => {
                const Icon = log.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "var(--space-3)",
                      padding: "var(--space-3) 0",
                      borderBottom:
                        i < activityLog.length - 1
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
                        background: `${log.color}15`,
                        color: log.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>
                        <strong>{log.user}</strong>{" "}
                        <span style={{ color: "var(--text-secondary)" }}>
                          {log.details}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                          marginTop: 2,
                        }}
                      >
                        {log.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Top Skills */}
          <div className="card">
            <h4 style={{ marginBottom: "var(--space-4)" }}>
              Most In-Demand Skills
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {topSkills.map((s, i) => (
                <div
                  key={s.skill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text-tertiary)",
                      textAlign: "center",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      width: 90,
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {s.skill}
                  </span>
                  <div className="progress-bar" style={{ flex: 1, height: 6 }}>
                    <div
                      className="progress-bar-fill success"
                      style={{
                        width: `${(s.count / maxSkillCount) * 100}%`,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      width: 36,
                      textAlign: "right",
                    }}
                  >
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Companies */}
          <div className="card">
            <h4 style={{ marginBottom: "var(--space-4)" }}>
              Top Hiring Companies
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {topCompanies.map((c, i) => (
                <div
                  key={c.company}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--space-2) 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "var(--radius-sm)",
                        background: "var(--gray-100)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {c.company}
                    </span>
                  </div>
                  <span
                    className="badge badge-success"
                    style={{ fontSize: "0.6875rem" }}
                  >
                    {c.count} jobs
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Health */}
          <div className="card">
            <h4 style={{ marginBottom: "var(--space-4)" }}>Platform Health</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {[
                { label: "API Uptime", value: "99.9%", status: "good" },
                { label: "Avg Response", value: "142ms", status: "good" },
                { label: "DB Connections", value: "18/50", status: "good" },
                { label: "Redis Cache Hit", value: "94%", status: "good" },
                { label: "Queue Length", value: "3", status: "good" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.8125rem",
                  }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>
                    {item.label}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--accent-500)",
                      }}
                    />
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
