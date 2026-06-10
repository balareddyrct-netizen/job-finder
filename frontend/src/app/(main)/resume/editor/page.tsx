"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Download,
  Save,
  Eye,
  Edit3,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  FileText,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

const atsCategories = [
  { name: "Contact Information", score: 100, max: 100 },
  { name: "Professional Summary", score: 18, max: 20 },
  { name: "Work Experience", score: 22, max: 25 },
  { name: "Skills Keywords", score: 16, max: 20 },
  { name: "Education", score: 12, max: 15 },
  { name: "Formatting & Structure", score: 14, max: 15 },
  { name: "Action Verbs", score: 10, max: 5 },
];

const suggestions = [
  {
    type: "improvement",
    text: 'Add more quantifiable achievements in your experience section (e.g., "Increased revenue by 30%").',
  },
  {
    type: "improvement",
    text: 'Include keywords from the target job description: "microservices", "CI/CD", "agile".',
  },
  {
    type: "good",
    text: "Strong action verbs used throughout. Great job!",
  },
  {
    type: "good",
    text: "Clean formatting that is ATS-parser friendly.",
  },
];

export default function ResumeEditorPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showAts, setShowAts] = useState(true);
  const totalScore = atsCategories.reduce((a, c) => a + c.score, 0);
  const maxScore = atsCategories.reduce((a, c) => a + c.max, 0);
  const atsPercent = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="animate-fadeIn">
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <Link
            href="/resume"
            className="btn btn-ghost btn-icon"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 style={{ fontSize: "1.25rem" }}>Senior Frontend Developer Resume</h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                fontSize: "0.8125rem",
                color: "var(--text-tertiary)",
                marginTop: 2,
              }}
            >
              <span>Professional Template</span>
              <ChevronRight size={12} />
              <span>Version 3</span>
              <span
                className="badge badge-success"
                style={{ marginLeft: 4, fontSize: "0.6875rem" }}
              >
                Saved
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAts(!showAts)}
          >
            <Sparkles size={14} /> {showAts ? "Hide" : "Show"} ATS
          </button>
          <button className="btn btn-secondary btn-sm">
            <Download size={14} /> Export PDF
          </button>
          <button className="btn btn-primary btn-sm">
            <Save size={14} /> Save
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: showAts ? "1fr 1fr 320px" : "1fr 1fr",
          gap: "var(--space-5)",
          height: "calc(100vh - var(--navbar-height) - 130px)",
        }}
      >
        {/* Editor Pane */}
        <div className="editor-pane">
          <div className="editor-toolbar">
            <div
              style={{
                display: "flex",
                gap: 2,
                borderRight: "1px solid var(--border-light)",
                paddingRight: 8,
                marginRight: 4,
              }}
            >
              <button title="Heading 1">
                <Heading1 size={16} />
              </button>
              <button title="Heading 2">
                <Heading2 size={16} />
              </button>
              <button title="Heading 3">
                <Heading3 size={16} />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: 2,
                borderRight: "1px solid var(--border-light)",
                paddingRight: 8,
                marginRight: 4,
              }}
            >
              <button title="Bold" className="active">
                <Bold size={16} />
              </button>
              <button title="Italic">
                <Italic size={16} />
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: 2,
                borderRight: "1px solid var(--border-light)",
                paddingRight: 8,
                marginRight: 4,
              }}
            >
              <button title="Bullet List">
                <List size={16} />
              </button>
              <button title="Numbered List">
                <ListOrdered size={16} />
              </button>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              <button title="Undo">
                <Undo size={16} />
              </button>
              <button title="Redo">
                <Redo size={16} />
              </button>
            </div>
          </div>
          <div className="editor-body">
            {/* Simulated Tiptap editor content */}
            <div
              contentEditable
              suppressContentEditableWarning
              style={{ outline: "none", minHeight: "100%" }}
            >
              <h1 style={{ fontSize: "1.5rem", marginBottom: 4 }}>
                Alex Johnson
              </h1>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-tertiary)",
                  marginBottom: 16,
                }}
              >
                alex.johnson@example.com · +91 98765 43210 · Bangalore, India
                <br />
                linkedin.com/in/alexjohnson · github.com/alexjohnson
              </p>

              <h2
                style={{
                  fontSize: "1.125rem",
                  color: "var(--primary-700)",
                  marginBottom: 8,
                  borderBottom: "2px solid var(--primary-100)",
                  paddingBottom: 4,
                }}
              >
                Professional Summary
              </h2>
              <p style={{ marginBottom: 16, fontSize: "0.9375rem" }}>
                Experienced full-stack developer with 5+ years building scalable
                web applications. Passionate about clean architecture,
                performance optimization, and mentoring junior developers.
                Proficient in React, Node.js, TypeScript, and cloud
                technologies.
              </p>

              <h2
                style={{
                  fontSize: "1.125rem",
                  color: "var(--primary-700)",
                  marginBottom: 8,
                  borderBottom: "2px solid var(--primary-100)",
                  paddingBottom: 4,
                }}
              >
                Experience
              </h2>
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <strong>Senior Frontend Developer</strong>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    Jan 2022 – Present
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    marginBottom: 6,
                  }}
                >
                  TechCorp India · Bangalore
                </p>
                <ul
                  style={{
                    paddingLeft: 20,
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                  }}
                >
                  <li>
                    Led frontend architecture for a SaaS platform serving 50K+
                    users
                  </li>
                  <li>
                    Improved application performance by 40% through code
                    splitting and SSR
                  </li>
                  <li>Mentored team of 4 junior developers</li>
                  <li>
                    Implemented design system used across 3 product lines
                  </li>
                </ul>
              </div>

              <h2
                style={{
                  fontSize: "1.125rem",
                  color: "var(--primary-700)",
                  marginBottom: 8,
                  borderBottom: "2px solid var(--primary-100)",
                  paddingBottom: 4,
                }}
              >
                Skills
              </h2>
              <p style={{ fontSize: "0.9375rem", marginBottom: 16 }}>
                React · TypeScript · Next.js · Node.js · Python · PostgreSQL ·
                AWS · Docker · GraphQL · Redis · Git · CI/CD
              </p>

              <h2
                style={{
                  fontSize: "1.125rem",
                  color: "var(--primary-700)",
                  marginBottom: 8,
                  borderBottom: "2px solid var(--primary-100)",
                  paddingBottom: 4,
                }}
              >
                Education
              </h2>
              <div>
                <strong>B.Tech Computer Science</strong>
                <br />
                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  IIT Delhi · 2019 · GPA: 8.9/10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Pane */}
        <div className="editor-pane">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--space-3) var(--space-4)",
              borderBottom: "1px solid var(--border-light)",
              background: "var(--gray-50)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Eye size={16} style={{ color: "var(--text-tertiary)" }} />
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                Live Preview
              </span>
            </div>
            <select
              className="input select"
              style={{
                width: 140,
                height: 32,
                fontSize: "0.8125rem",
                padding: "4px 8px",
              }}
              defaultValue="professional"
            >
              <option value="professional">Professional</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div
            className="preview-pane"
            style={{
              flex: 1,
              overflow: "auto",
              padding: "var(--space-8) var(--space-10)",
            }}
          >
            {/* Rendered preview */}
            <div style={{ fontFamily: "'Georgia', serif" }}>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  borderBottom: "2px solid var(--gray-800)",
                  paddingBottom: 6,
                  marginBottom: 4,
                  letterSpacing: "0.02em",
                }}
              >
                ALEX JOHNSON
              </h1>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--gray-500)",
                  marginBottom: 16,
                  lineHeight: 1.8,
                }}
              >
                alex.johnson@example.com | +91 98765 43210 | Bangalore, India
                <br />
                linkedin.com/in/alexjohnson | github.com/alexjohnson
              </p>

              <h2
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid var(--gray-300)",
                  paddingBottom: 4,
                  marginBottom: 8,
                  marginTop: 16,
                }}
              >
                Professional Summary
              </h2>
              <p
                style={{
                  fontSize: "0.8125rem",
                  lineHeight: 1.7,
                  color: "var(--gray-700)",
                }}
              >
                Experienced full-stack developer with 5+ years building scalable
                web applications. Passionate about clean architecture,
                performance optimization, and mentoring junior developers.
              </p>

              <h2
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid var(--gray-300)",
                  paddingBottom: 4,
                  marginBottom: 8,
                  marginTop: 16,
                }}
              >
                Experience
              </h2>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: "0.8125rem" }}>
                    Senior Frontend Developer
                  </strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>
                    Jan 2022 – Present
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--gray-500)",
                    fontStyle: "italic",
                  }}
                >
                  TechCorp India, Bangalore
                </p>
                <ul
                  style={{
                    fontSize: "0.8125rem",
                    lineHeight: 1.7,
                    paddingLeft: 16,
                    color: "var(--gray-700)",
                    marginTop: 4,
                  }}
                >
                  <li>Led frontend architecture serving 50K+ users</li>
                  <li>Improved performance by 40%</li>
                  <li>Mentored team of 4 junior developers</li>
                </ul>
              </div>

              <h2
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid var(--gray-300)",
                  paddingBottom: 4,
                  marginBottom: 8,
                  marginTop: 16,
                }}
              >
                Skills
              </h2>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--gray-700)",
                  lineHeight: 1.7,
                }}
              >
                React, TypeScript, Next.js, Node.js, Python, PostgreSQL, AWS,
                Docker, GraphQL, Redis
              </p>

              <h2
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid var(--gray-300)",
                  paddingBottom: 4,
                  marginBottom: 8,
                  marginTop: 16,
                }}
              >
                Education
              </h2>
              <p style={{ fontSize: "0.8125rem" }}>
                <strong>B.Tech Computer Science</strong>
                <br />
                <span style={{ color: "var(--gray-500)" }}>
                  IIT Delhi · 2019 · GPA: 8.9/10
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ATS Panel */}
        {showAts && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              overflowY: "auto",
            }}
          >
            {/* Score Card */}
            <div className="ats-panel">
              <div className="ats-panel score-header">
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `conic-gradient(var(--accent-500) ${atsPercent * 3.6}deg, var(--gray-200) 0)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
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
                        fontSize: "1.25rem",
                        color: "var(--accent-600)",
                      }}
                    >
                      {atsPercent}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem" }}>ATS Score</h4>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      marginTop: 2,
                    }}
                  >
                    Your resume is well-optimized for ATS systems
                  </p>
                </div>
              </div>

              {/* Categories */}
              {atsCategories.map((cat) => {
                const pct = Math.round((cat.score / cat.max) * 100);
                return (
                  <div key={cat.name} className="ats-category">
                    <div>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          marginBottom: 4,
                        }}
                      >
                        {cat.name}
                      </div>
                      <div className="progress-bar" style={{ width: 140, height: 5 }}>
                        <div
                          className={`progress-bar-fill ${pct >= 80 ? "success" : pct >= 60 ? "" : "warning"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color:
                          pct >= 80
                            ? "var(--accent-600)"
                            : pct >= 60
                              ? "var(--primary-600)"
                              : "var(--warning-600)",
                      }}
                    >
                      {cat.score}/{cat.max}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Suggestions */}
            <div className="ats-panel">
              <h4
                style={{
                  fontSize: "0.9375rem",
                  marginBottom: "var(--space-4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Lightbulb size={16} style={{ color: "var(--warning-500)" }} />
                Suggestions
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-2)",
                }}
              >
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="ats-suggestion"
                    style={{
                      background:
                        s.type === "good"
                          ? "var(--accent-50)"
                          : "var(--primary-50)",
                    }}
                  >
                    {s.type === "good" ? (
                      <CheckCircle2
                        size={16}
                        style={{
                          color: "var(--accent-600)",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                    ) : (
                      <AlertCircle
                        size={16}
                        style={{
                          color: "var(--primary-600)",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                    )}
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
