"use client";

import Link from "next/link";
import {
  Plus,
  FileText,
  MoreVertical,
  Download,
  Trash2,
  Edit3,
  Star,
  Clock,
  Eye,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const mockResumes = [
  {
    id: "1",
    title: "Senior Frontend Developer Resume",
    template: "Professional",
    atsScore: 92,
    isPrimary: true,
    version: 3,
    updatedAt: "2 hours ago",
    sections: ["Contact", "Summary", "Experience", "Skills", "Education"],
  },
  {
    id: "2",
    title: "Full Stack Engineer Resume",
    template: "Modern",
    atsScore: 78,
    isPrimary: false,
    version: 1,
    updatedAt: "3 days ago",
    sections: ["Contact", "Summary", "Experience", "Projects", "Skills"],
  },
  {
    id: "3",
    title: "Tech Lead Application",
    template: "Minimal",
    atsScore: 85,
    isPrimary: false,
    version: 2,
    updatedAt: "1 week ago",
    sections: ["Contact", "Summary", "Experience", "Leadership", "Skills"],
  },
];

function getScoreColor(score: number) {
  if (score >= 85) return { color: "var(--accent-600)", bg: "var(--accent-50)" };
  if (score >= 70) return { color: "var(--primary-600)", bg: "var(--primary-50)" };
  if (score >= 50) return { color: "var(--warning-600)", bg: "var(--warning-50)" };
  return { color: "var(--danger-600)", bg: "var(--danger-50)" };
}

export default function ResumePage() {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

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
            <h1>My Resumes</h1>
            <p>Create, edit, and optimize your resumes for ATS compatibility</p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <button className="btn btn-secondary">
              <Download size={16} /> Upload PDF
            </button>
            <Link href="/resume/editor" className="btn btn-primary">
              <Plus size={16} /> New Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Resume Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-5)",
        }}
      >
        {mockResumes.map((resume) => {
          const scoreStyle = getScoreColor(resume.atsScore);
          return (
            <div
              key={resume.id}
              className="card card-interactive"
              style={{
                padding: 0,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {resume.isPrimary && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 2,
                  }}
                >
                  <span className="badge badge-primary">
                    <Star size={10} /> Primary
                  </span>
                </div>
              )}

              {/* Preview Area */}
              <div
                style={{
                  height: 200,
                  background: "linear-gradient(135deg, var(--gray-50), var(--gray-100))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  borderBottom: "1px solid var(--border-light)",
                }}
              >
                <div
                  style={{
                    width: 120,
                    background: "white",
                    borderRadius: "var(--radius-sm)",
                    padding: "12px 10px",
                    boxShadow: "var(--shadow-sm)",
                    fontSize: "4px",
                    lineHeight: 1.6,
                    color: "var(--gray-400)",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      height: 3,
                      background: "var(--gray-800)",
                      marginBottom: 3,
                      borderRadius: 1,
                    }}
                  />
                  <div
                    style={{
                      width: "80%",
                      height: 2,
                      background: "var(--gray-200)",
                      marginBottom: 2,
                      borderRadius: 1,
                    }}
                  />
                  <div
                    style={{
                      width: "70%",
                      height: 2,
                      background: "var(--gray-200)",
                      marginBottom: 6,
                      borderRadius: 1,
                    }}
                  />
                  <div
                    style={{
                      width: "40%",
                      height: 3,
                      background: "var(--primary-500)",
                      marginBottom: 3,
                      borderRadius: 1,
                    }}
                  />
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: `${90 - i * 10}%`,
                        height: 2,
                        background: "var(--gray-200)",
                        marginBottom: 2,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  <div
                    style={{
                      width: "40%",
                      height: 3,
                      background: "var(--primary-500)",
                      marginBottom: 3,
                      marginTop: 4,
                      borderRadius: 1,
                    }}
                  />
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: `${85 - i * 15}%`,
                        height: 2,
                        background: "var(--gray-200)",
                        marginBottom: 2,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </div>

                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--space-2)",
                    opacity: 0,
                    transition: "all var(--transition-fast)",
                  }}
                  className="resume-overlay"
                >
                  <Link
                    href={`/resume/editor?id=${resume.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    <Edit3 size={14} /> Edit
                  </Link>
                  <button className="btn btn-secondary btn-sm">
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "var(--space-4) var(--space-5)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      {resume.title}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        gap: "var(--space-3)",
                        fontSize: "0.8125rem",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      <span>{resume.template}</span>
                      <span>v{resume.version}</span>
                    </div>
                  </div>

                  {/* Score chip */}
                  <div
                    style={{
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      background: scoreStyle.bg,
                      color: scoreStyle.color,
                      fontWeight: 700,
                      fontSize: "0.8125rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Sparkles size={12} /> {resume.atsScore}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "var(--space-3)",
                    paddingTop: "var(--space-3)",
                    borderTop: "1px solid var(--border-light)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-tertiary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Clock size={12} /> {resume.updatedAt}
                  </span>

                  <div style={{ position: "relative" }}>
                    <button
                      className="btn btn-ghost btn-icon"
                      onClick={() =>
                        setMenuOpen(menuOpen === resume.id ? null : resume.id)
                      }
                    >
                      <MoreVertical size={16} />
                    </button>
                    {menuOpen === resume.id && (
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "100%",
                          background: "white",
                          border: "1px solid var(--border-default)",
                          borderRadius: "var(--radius-lg)",
                          boxShadow: "var(--shadow-lg)",
                          padding: "var(--space-1)",
                          zIndex: 10,
                          width: 160,
                        }}
                      >
                        <button
                          className="btn btn-ghost"
                          style={{
                            width: "100%",
                            justifyContent: "flex-start",
                            fontSize: "0.8125rem",
                          }}
                        >
                          <Download size={14} /> Export PDF
                        </button>
                        <button
                          className="btn btn-ghost"
                          style={{
                            width: "100%",
                            justifyContent: "flex-start",
                            fontSize: "0.8125rem",
                          }}
                        >
                          <Star size={14} /> Set Primary
                        </button>
                        <button
                          className="btn btn-ghost"
                          style={{
                            width: "100%",
                            justifyContent: "flex-start",
                            fontSize: "0.8125rem",
                            color: "var(--danger-500)",
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* New Resume Card */}
        <Link href="/resume/editor" style={{ textDecoration: "none" }}>
          <div
            className="card card-interactive"
            style={{
              height: "100%",
              minHeight: 330,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-3)",
              border: "2px dashed var(--border-default)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "var(--radius-xl)",
                background: "var(--primary-50)",
                color: "var(--primary-600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={24} />
            </div>
            <h4 style={{ fontSize: "1rem" }}>Create New Resume</h4>
            <p
              style={{
                color: "var(--text-tertiary)",
                fontSize: "0.875rem",
                textAlign: "center",
              }}
            >
              Start from scratch or use a template
            </p>
          </div>
        </Link>
      </div>

      {/* Inline hover CSS */}
      <style jsx>{`
        .resume-overlay {
          opacity: 0 !important;
          background: rgba(0, 0, 0, 0) !important;
        }
        .card-interactive:hover .resume-overlay {
          opacity: 1 !important;
          background: rgba(0, 0, 0, 0.5) !important;
        }
      `}</style>
    </div>
  );
}
