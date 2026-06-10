"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Eye,
  Shield,
  Palette,
  Globe,
  Trash2,
  Save,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailJobAlerts: true,
    emailApplicationUpdates: true,
    emailNewsletter: false,
    pushNewJobs: true,
    pushApplicationStatus: true,
    pushIntelligence: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowRecruiters: true,
  });
  const [theme, setTheme] = useState("light");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 500);
  };

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        background: checked
          ? "var(--primary-500)"
          : "var(--gray-300)",
        position: "relative",
        transition: "background var(--transition-fast)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          transition: "left var(--transition-fast)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 720, margin: "0 auto" }}>
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
              <Settings
                size={28}
                style={{
                  display: "inline",
                  marginRight: 8,
                  color: "var(--text-tertiary)",
                }}
              />
              Settings
            </h1>
            <p>Manage your account preferences and notifications</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save size={16} />{" "}
            {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-5)",
        }}
      >
        {/* Appearance */}
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-5)",
            }}
          >
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
              <Palette size={18} />
            </div>
            <h3 style={{ fontSize: "1.0625rem" }}>Appearance</h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-3)",
            }}
          >
            {[
              { key: "light", label: "Light", icon: Sun },
              { key: "dark", label: "Dark", icon: Moon },
              { key: "system", label: "System", icon: Monitor },
            ].map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.key}
                  onClick={() => setTheme(opt.key)}
                  style={{
                    padding: "var(--space-4)",
                    borderRadius: "var(--radius-lg)",
                    border: `2px solid ${theme === opt.key ? "var(--primary-500)" : "var(--border-default)"}`,
                    background:
                      theme === opt.key ? "var(--primary-50)" : "var(--bg-primary)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-sans)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  <Icon
                    size={22}
                    style={{
                      color:
                        theme === opt.key
                          ? "var(--primary-600)"
                          : "var(--text-tertiary)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: theme === opt.key ? 600 : 500,
                      color:
                        theme === opt.key
                          ? "var(--primary-700)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-5)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-lg)",
                background: "var(--warning-50)",
                color: "var(--warning-600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell size={18} />
            </div>
            <h3 style={{ fontSize: "1.0625rem" }}>Notifications</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                key: "emailJobAlerts",
                label: "Job alert emails",
                desc: "Get notified about new matching jobs",
              },
              {
                key: "emailApplicationUpdates",
                label: "Application updates",
                desc: "Receive emails when your application status changes",
              },
              {
                key: "emailNewsletter",
                label: "Weekly newsletter",
                desc: "Hiring trends and career tips",
              },
              {
                key: "pushNewJobs",
                label: "New job notifications",
                desc: "Browser push for high-match jobs",
              },
              {
                key: "pushApplicationStatus",
                label: "Application status alerts",
                desc: "Push notifications for application updates",
              },
              {
                key: "pushIntelligence",
                label: "Intelligence alerts",
                desc: "Notifications about funding and hiring news",
              },
            ].map((item, i, arr) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "var(--space-4) 0",
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid var(--border-light)"
                      : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-tertiary)",
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                <Toggle
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof notifications],
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-5)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-lg)",
                background: "var(--accent-50)",
                color: "var(--accent-600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Eye size={18} />
            </div>
            <h3 style={{ fontSize: "1.0625rem" }}>Privacy</h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                key: "profileVisible",
                label: "Public profile",
                desc: "Make your profile visible to recruiters",
              },
              {
                key: "showEmail",
                label: "Show email",
                desc: "Display your email on your public profile",
              },
              {
                key: "showPhone",
                label: "Show phone",
                desc: "Display your phone number on your public profile",
              },
              {
                key: "allowRecruiters",
                label: "Recruiter messages",
                desc: "Allow recruiters to contact you directly",
              },
            ].map((item, i, arr) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "var(--space-4) 0",
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid var(--border-light)"
                      : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-tertiary)",
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                <Toggle
                  checked={privacy[item.key as keyof typeof privacy]}
                  onChange={() =>
                    setPrivacy((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof privacy],
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className="card"
          style={{
            border: "1px solid var(--danger-400)",
            marginBottom: "var(--space-8)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-4)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-lg)",
                background: "var(--danger-50)",
                color: "var(--danger-500)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Trash2 size={18} />
            </div>
            <h3 style={{ fontSize: "1.0625rem", color: "var(--danger-600)" }}>
              Danger Zone
            </h3>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-4)",
            }}
          >
            Once you delete your account, there is no going back. All your data,
            resumes, and applications will be permanently removed.
          </p>
          <button className="btn btn-danger">
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
