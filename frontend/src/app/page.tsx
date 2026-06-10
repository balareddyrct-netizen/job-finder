"use client";

import Link from "next/link";
import {
  Search,
  FileText,
  BarChart3,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

export default function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="navbar-brand">
          <div className="logo-icon">JF</div>
          <span>JobFinder Pro</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#stats">Stats</a>
          <Link href="/login" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-content">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(99, 102, 241, 0.08)",
              borderRadius: "999px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--primary-600)",
              marginBottom: "24px",
            }}
          >
            <Sparkles size={16} />
            AI-Powered Job Matching
          </div>

          <h1>
            Find Your Dream Job
            <br />
            <span style={{ color: "var(--primary-600)", WebkitTextFillColor: "var(--primary-600)" }}>
              Powered by AI
            </span>
          </h1>

          <p className="subtitle">
            Upload your resume and let our AI engine match you with the best
            opportunities across LinkedIn, Naukri, InstaHire, and 100+ company
            career pages. Get ATS-optimized in minutes.
          </p>

          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary btn-lg">
              Start Free <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="value">10,000+</div>
              <div className="label">Active Jobs</div>
            </div>
            <div className="hero-stat">
              <div className="value">500+</div>
              <div className="label">Companies</div>
            </div>
            <div className="hero-stat">
              <div className="value">95%</div>
              <div className="label">ATS Pass Rate</div>
            </div>
            <div className="hero-stat">
              <div className="value">50K+</div>
              <div className="label">Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <div className="overline">Features</div>
            <h2>Everything You Need to Land Your Next Job</h2>
            <p>
              From resume optimization to intelligent job matching, we&apos;ve got
              every step of your job search covered.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon purple">
                <Search size={24} />
              </div>
              <h3>Smart Job Search</h3>
              <p>
                Search across LinkedIn, Naukri, InstaHire, and company career
                pages. Filter by role, location, salary, and work mode.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <FileText size={24} />
              </div>
              <h3>Resume Editor & ATS Score</h3>
              <p>
                Edit your resume in-app with our rich text editor. Get real-time
                ATS scores and actionable improvement suggestions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon amber">
                <Sparkles size={24} />
              </div>
              <h3>AI Job Matching</h3>
              <p>
                Our AI analyzes your skills and experience to recommend the best
                matching jobs with detailed compatibility scores.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon rose">
                <TrendingUp size={24} />
              </div>
              <h3>Hiring Intelligence</h3>
              <p>
                Track recently funded startups, hiring trends, and company
                expansion news to find hidden opportunities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon purple">
                <Shield size={24} />
              </div>
              <h3>Secure Profiles</h3>
              <p>
                Sign up with Google, GitHub, or LinkedIn. Your data is encrypted
                and securely stored with full privacy controls.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <Zap size={24} />
              </div>
              <h3>One-Click Apply</h3>
              <p>
                Save jobs, track applications, and apply with your optimized
                resume — all from a single dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        style={{
          padding: "var(--space-24) 0",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="container">
          <div className="section-header">
            <div className="overline">How It Works</div>
            <h2>Land Your Dream Job in 3 Steps</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--space-8)",
              marginTop: "var(--space-12)",
            }}
          >
            {[
              {
                step: "01",
                icon: <FileText size={28} />,
                title: "Upload Your Resume",
                desc: "Upload your PDF/DOCX or build one from scratch using our editor. Get instant ATS feedback.",
              },
              {
                step: "02",
                icon: <Search size={28} />,
                title: "Discover Opportunities",
                desc: "Our AI scans thousands of openings and recommends jobs that match your profile perfectly.",
              },
              {
                step: "03",
                icon: <BriefcaseBusiness size={28} />,
                title: "Apply & Track",
                desc: "Apply with one click and track all your applications in a single, organized dashboard.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card"
                style={{ textAlign: "center", position: "relative" }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: 900,
                    color: "var(--primary-100)",
                    position: "absolute",
                    top: "16px",
                    right: "24px",
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "var(--radius-xl)",
                    background: "var(--primary-50)",
                    color: "var(--primary-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--space-4)",
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ marginBottom: "var(--space-3)" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section
        id="stats"
        style={{
          padding: "var(--space-16) 0",
          background: "var(--bg-primary)",
        }}
      >
        <div className="container">
          <div className="section-header">
            <div className="overline">Trusted Sources</div>
            <h2>We Search Where The Jobs Are</h2>
            <p>
              Our platform aggregates opportunities from all major job boards and
              company career pages.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "var(--space-10)",
              marginTop: "var(--space-10)",
              flexWrap: "wrap",
              opacity: 0.6,
            }}
          >
            {["LinkedIn", "Naukri", "InstaHire", "Indeed", "Glassdoor", "AngelList"].map(
              (name) => (
                <div
                  key={name}
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--gray-400)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {name}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Next Opportunity?</h2>
          <p>
            Join 50,000+ professionals who use JobFinder Pro to land their dream
            jobs.
          </p>
          <Link href="/signup" className="btn btn-lg">
            Get Started for Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "var(--space-10) 0",
          background: "var(--gray-900)",
          color: "var(--gray-400)",
          fontSize: "0.875rem",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, var(--primary-500), var(--primary-700))",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 900,
                fontSize: "0.875rem",
              }}
            >
              JF
            </div>
            <span style={{ color: "var(--gray-300)", fontWeight: 600 }}>
              JobFinder Pro
            </span>
          </div>
          <div>© 2026 JobFinder Pro. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
