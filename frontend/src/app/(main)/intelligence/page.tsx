"use client";

import {
  TrendingUp,
  DollarSign,
  Building2,
  Newspaper,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Sparkles,
  Clock,
  Users,
  Rocket,
  Globe,
  Target,
  Flame,
  Zap,
} from "lucide-react";

const fundedStartups = [
  {
    name: "Zepto",
    round: "Series F",
    amount: "$665M",
    valuation: "$5B",
    sector: "Quick Commerce",
    hiringRoles: 45,
    trend: "up",
    description: "10-min grocery delivery platform expanding rapidly across India",
    logo: "Z",
    logoColor: "#FF2089",
    date: "2 days ago",
  },
  {
    name: "PhysicsWallah",
    round: "Series B",
    amount: "$210M",
    valuation: "$2.8B",
    sector: "EdTech",
    hiringRoles: 32,
    trend: "up",
    description: "Online education platform for competitive exam preparation",
    logo: "PW",
    logoColor: "#1DA1F2",
    date: "1 week ago",
  },
  {
    name: "Perfios",
    round: "Series D",
    amount: "$80M",
    valuation: "$800M",
    sector: "FinTech",
    hiringRoles: 18,
    trend: "up",
    description: "Financial data analytics for banking and lending",
    logo: "P",
    logoColor: "#00B4D8",
    date: "1 week ago",
  },
  {
    name: "Krutrim",
    round: "Series A",
    amount: "$50M",
    valuation: "$1B",
    sector: "AI / LLM",
    hiringRoles: 28,
    trend: "up",
    description: "India's first AI unicorn building large language models",
    logo: "K",
    logoColor: "#FF6B35",
    date: "2 weeks ago",
  },
];

const hiringTrends = [
  { skill: "React / Next.js", demand: 92, change: "+12%", trend: "up" },
  { skill: "Python / FastAPI", demand: 88, change: "+18%", trend: "up" },
  { skill: "AI / ML Engineering", demand: 95, change: "+34%", trend: "up" },
  { skill: "Rust", demand: 64, change: "+28%", trend: "up" },
  { skill: "DevOps / SRE", demand: 80, change: "+8%", trend: "up" },
  { skill: "Ruby on Rails", demand: 35, change: "-15%", trend: "down" },
  { skill: "Angular", demand: 42, change: "-8%", trend: "down" },
  { skill: "Java / Spring", demand: 72, change: "-3%", trend: "down" },
];

const industryNews = [
  {
    title: "Google India announces 2,000 new engineering positions in Bangalore",
    source: "TechCrunch",
    time: "4 hours ago",
    sentiment: "positive",
    companies: ["Google"],
  },
  {
    title: "Flipkart expands engineering team ahead of Big Billion Days 2026",
    source: "Economic Times",
    time: "1 day ago",
    sentiment: "positive",
    companies: ["Flipkart"],
  },
  {
    title: "AI startups in India saw 3x funding increase in Q1 2026",
    source: "YourStory",
    time: "2 days ago",
    sentiment: "positive",
    companies: [],
  },
  {
    title: "Layoff concerns rise at mid-stage startups amid funding winter thaw",
    source: "Mint",
    time: "3 days ago",
    sentiment: "negative",
    companies: [],
  },
  {
    title: "Remote work policies tighten across major IT firms for 2026",
    source: "Business Standard",
    time: "5 days ago",
    sentiment: "neutral",
    companies: ["Infosys", "TCS", "Wipro"],
  },
];

export default function IntelligencePage() {
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
              <TrendingUp
                size={28}
                style={{ display: "inline", marginRight: 8, color: "var(--primary-500)" }}
              />
              Hiring Intelligence
            </h1>
            <p>Track funding, hiring trends, and industry news to find hidden opportunities</p>
          </div>
          <div className="badge badge-primary" style={{ padding: "6px 12px", fontSize: "0.8125rem" }}>
            <Sparkles size={14} /> AI-Powered Insights
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "var(--space-4)",
          marginBottom: "var(--space-6)",
        }}
      >
        {[
          {
            label: "Startups Funded (30d)",
            value: "47",
            icon: Rocket,
            color: "var(--primary-500)",
            bg: "var(--primary-50)",
          },
          {
            label: "Total Raised",
            value: "$2.1B",
            icon: DollarSign,
            color: "var(--accent-500)",
            bg: "var(--accent-50)",
          },
          {
            label: "New Job Openings",
            value: "12,400+",
            icon: Target,
            color: "var(--warning-500)",
            bg: "var(--warning-50)",
          },
          {
            label: "Hot Skill: AI/ML",
            value: "+34%",
            icon: Flame,
            color: "var(--danger-500)",
            bg: "var(--danger-50)",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-lg)",
                  background: stat.bg,
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} />
              </div>
              <div className="stat-value" style={{ fontSize: "1.5rem" }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
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
          {/* Recently Funded Startups */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.125rem" }}>
                <Rocket
                  size={18}
                  style={{ display: "inline", marginRight: 8, color: "var(--primary-500)" }}
                />
                Recently Funded Startups
              </h3>
              <span
                className="badge badge-neutral"
                style={{ fontSize: "0.6875rem" }}
              >
                Last 30 days
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {fundedStartups.map((startup) => (
                <div
                  key={startup.name}
                  className="card card-interactive"
                  style={{
                    padding: "var(--space-4)",
                    display: "flex",
                    gap: "var(--space-4)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-lg)",
                      background: `${startup.logoColor}12`,
                      color: startup.logoColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {startup.logo}
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
                        <h4 style={{ fontSize: "1rem", marginBottom: 2 }}>
                          {startup.name}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            gap: "var(--space-2)",
                            fontSize: "0.8125rem",
                          }}
                        >
                          <span className="badge badge-success">
                            {startup.round}
                          </span>
                          <span className="badge badge-primary">
                            {startup.sector}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: "1.125rem",
                            color: "var(--accent-600)",
                          }}
                        >
                          {startup.amount}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-tertiary)",
                          }}
                        >
                          Valuation: {startup.valuation}
                        </div>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)",
                        marginTop: 8,
                        lineHeight: 1.5,
                      }}
                    >
                      {startup.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--primary-600)",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Users size={13} /> {startup.hiringRoles} open roles
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                        }}
                      >
                        {startup.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Skill Demand Trends */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.125rem" }}>
                <Zap
                  size={18}
                  style={{ display: "inline", marginRight: 8, color: "var(--warning-500)" }}
                />
                Skill Demand
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {hiringTrends.map((skill) => (
                <div
                  key={skill.skill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {skill.skill}
                  </div>
                  <div className="progress-bar" style={{ flex: 1, height: 6 }}>
                    <div
                      className={`progress-bar-fill ${skill.demand >= 80 ? "success" : skill.demand >= 50 ? "" : "danger"}`}
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      width: 50,
                      textAlign: "right",
                      color:
                        skill.trend === "up"
                          ? "var(--accent-600)"
                          : "var(--danger-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 2,
                    }}
                  >
                    {skill.trend === "up" ? (
                      <ArrowUpRight size={13} />
                    ) : (
                      <ArrowDownRight size={13} />
                    )}
                    {skill.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry News */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: "1.125rem" }}>
                <Newspaper
                  size={18}
                  style={{ display: "inline", marginRight: 8, color: "var(--primary-500)" }}
                />
                Industry News
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {industryNews.map((news, i) => (
                <div
                  key={i}
                  style={{
                    padding: "var(--space-3) 0",
                    borderBottom:
                      i < industryNews.length - 1
                        ? "1px solid var(--border-light)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "var(--space-3)",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        marginTop: 6,
                        flexShrink: 0,
                        background:
                          news.sentiment === "positive"
                            ? "var(--accent-500)"
                            : news.sentiment === "negative"
                              ? "var(--danger-500)"
                              : "var(--gray-400)",
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          lineHeight: 1.5,
                          cursor: "pointer",
                        }}
                      >
                        {news.title}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                          marginTop: 4,
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                        }}
                      >
                        <span>{news.source}</span>
                        <span>·</span>
                        <span>{news.time}</span>
                        {news.companies.length > 0 && (
                          <>
                            <span>·</span>
                            {news.companies.map((c) => (
                              <span
                                key={c}
                                className="badge badge-neutral"
                                style={{ fontSize: "0.625rem", padding: "1px 6px" }}
                              >
                                {c}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
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
