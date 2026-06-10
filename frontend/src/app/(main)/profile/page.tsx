"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Link2,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Save,
  Camera,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline", marginRight: 4 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" style={{ display: "inline", marginRight: 4 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const initialProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+91 98765 43210",
  location: "Bangalore, India",
  linkedin: "https://linkedin.com/in/alexjohnson",
  github: "https://github.com/alexjohnson",
  summary:
    "Experienced full-stack developer with 5+ years building scalable web applications. Passionate about clean architecture, performance optimization, and mentoring junior developers. Proficient in React, Node.js, and cloud technologies.",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
    "Redis",
  ],
  experience: [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp India",
      location: "Bangalore",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "Led frontend architecture for a SaaS platform serving 50K+ users. Improved performance by 40% through code splitting and SSR.",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "StartupHub",
      location: "Mumbai",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      description:
        "Built and maintained multiple client-facing applications using React and Node.js. Implemented CI/CD pipelines.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "B.Tech Computer Science",
      institution: "IIT Delhi",
      year: "2019",
      gpa: "8.9/10",
    },
  ],
  jobPreferences: {
    roles: ["Frontend Developer", "Full Stack Engineer", "React Developer"],
    locations: ["Bangalore", "Remote"],
    salary: "₹25L - ₹45L",
    workMode: "Hybrid",
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [newSkill, setNewSkill] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    summary: true,
    skills: true,
    experience: true,
    education: true,
    preferences: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 800);
  };

  const SectionHeader = ({
    id,
    icon: Icon,
    title,
  }: {
    id: string;
    icon: React.ElementType;
    title: string;
  }) => (
    <button
      onClick={() => toggleSection(id)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontFamily: "var(--font-sans)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-lg)",
            background: "var(--primary-50)",
            color: "var(--primary-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} />
        </div>
        <h3 style={{ fontSize: "1.0625rem", fontWeight: 700 }}>{title}</h3>
      </div>
      {expandedSections[id] ? (
        <ChevronUp size={18} style={{ color: "var(--text-tertiary)" }} />
      ) : (
        <ChevronDown size={18} style={{ color: "var(--text-tertiary)" }} />
      )}
    </button>
  );

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div className="page-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>My Profile</h1>
            <p>Manage your personal information and job preferences</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              "Saving..."
            ) : saveSuccess ? (
              <>
                <Save size={16} /> Saved!
              </>
            ) : (
              <>
                <Save size={16} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Avatar Section */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-6)",
          marginBottom: "var(--space-6)",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            className="avatar avatar-placeholder avatar-xl"
            style={{
              width: 88,
              height: 88,
              fontSize: "2rem",
            }}
          >
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <button
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--primary-500)",
              color: "white",
              border: "2px solid white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Camera size={13} />
          </button>
        </div>
        <div>
          <h2 style={{ fontSize: "1.375rem" }}>{profile.name}</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Senior Frontend Developer at TechCorp India
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              marginTop: "var(--space-2)",
              fontSize: "0.8125rem",
              color: "var(--text-tertiary)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={13} /> {profile.location}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Mail size={13} /> {profile.email}
            </span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {/* Basic Information */}
        <div className="card">
          <SectionHeader id="basic" icon={User} title="Basic Information" />
          {expandedSections.basic && (
            <div style={{ marginTop: "var(--space-6)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="input"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="input"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="input"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, phone: e.target.value }))
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="input"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, location: e.target.value }))
                    }
                  />
                </div>
                <div className="input-group">
                  <label>
                    <LinkedinIcon />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    className="input"
                    value={profile.linkedin}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, linkedin: e.target.value }))
                    }
                  />
                </div>
                <div className="input-group">
                  <label>
                    <GithubIcon />
                    GitHub
                  </label>
                  <input
                    type="url"
                    className="input"
                    value={profile.github}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, github: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="card">
          <SectionHeader id="summary" icon={User} title="Professional Summary" />
          {expandedSections.summary && (
            <div style={{ marginTop: "var(--space-6)" }}>
              <textarea
                className="input"
                rows={4}
                value={profile.summary}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, summary: e.target.value }))
                }
                style={{ minHeight: 120 }}
              />
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="card">
          <SectionHeader id="skills" icon={Briefcase} title="Skills" />
          {expandedSections.skills && (
            <div style={{ marginTop: "var(--space-6)" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-2)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {profile.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="tag-remove"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-secondary" onClick={addSkill}>
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Experience */}
        <div className="card">
          <SectionHeader id="experience" icon={Briefcase} title="Experience" />
          {expandedSections.experience && (
            <div style={{ marginTop: "var(--space-6)" }}>
              {profile.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  style={{
                    padding: "var(--space-4)",
                    background: "var(--gray-50)",
                    borderRadius: "var(--radius-lg)",
                    marginBottom: idx < profile.experience.length - 1 ? "var(--space-3)" : 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "1rem" }}>{exp.title}</h4>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {exp.company} · {exp.location}
                      </p>
                      <p
                        style={{
                          color: "var(--text-tertiary)",
                          fontSize: "0.8125rem",
                          marginTop: 4,
                        }}
                      >
                        {exp.startDate} – {exp.endDate}
                      </p>
                    </div>
                    <button
                      className="btn btn-ghost btn-icon"
                      style={{ color: "var(--danger-400)" }}
                      onClick={() =>
                        setProfile((p) => ({
                          ...p,
                          experience: p.experience.filter((e) => e.id !== exp.id),
                        }))
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      marginTop: "var(--space-3)",
                      lineHeight: 1.6,
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
              <button
                className="btn btn-secondary"
                style={{ marginTop: "var(--space-3)", width: "100%" }}
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>
          )}
        </div>

        {/* Education */}
        <div className="card">
          <SectionHeader id="education" icon={GraduationCap} title="Education" />
          {expandedSections.education && (
            <div style={{ marginTop: "var(--space-6)" }}>
              {profile.education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    padding: "var(--space-4)",
                    background: "var(--gray-50)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "1rem" }}>{edu.degree}</h4>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {edu.institution}
                      </p>
                      <p
                        style={{
                          color: "var(--text-tertiary)",
                          fontSize: "0.8125rem",
                          marginTop: 4,
                        }}
                      >
                        {edu.year} · GPA: {edu.gpa}
                      </p>
                    </div>
                    <button
                      className="btn btn-ghost btn-icon"
                      style={{ color: "var(--danger-400)" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-secondary"
                style={{ marginTop: "var(--space-3)", width: "100%" }}
              >
                <Plus size={16} /> Add Education
              </button>
            </div>
          )}
        </div>

        {/* Job Preferences */}
        <div className="card" style={{ marginBottom: "var(--space-8)" }}>
          <SectionHeader id="preferences" icon={Briefcase} title="Job Preferences" />
          {expandedSections.preferences && (
            <div style={{ marginTop: "var(--space-6)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                <div className="input-group">
                  <label>Preferred Roles</label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-2)",
                    }}
                  >
                    {profile.jobPreferences.roles.map((role) => (
                      <span key={role} className="badge badge-primary">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label>Preferred Locations</label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-2)",
                    }}
                  >
                    {profile.jobPreferences.locations.map((loc) => (
                      <span key={loc} className="badge badge-neutral">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label>Expected Salary</label>
                  <input
                    type="text"
                    className="input"
                    value={profile.jobPreferences.salary}
                    readOnly
                  />
                </div>
                <div className="input-group">
                  <label>Work Mode</label>
                  <select
                    className="input select"
                    value={profile.jobPreferences.workMode}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        jobPreferences: {
                          ...p.jobPreferences,
                          workMode: e.target.value,
                        },
                      }))
                    }
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Any">Any</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
