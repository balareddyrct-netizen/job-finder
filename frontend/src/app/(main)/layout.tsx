"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileText,
  User,
  Bookmark,
  TrendingUp,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Job Search", href: "/jobs", icon: Search },
  { label: "My Resumes", href: "/resume", icon: FileText },
  { label: "Saved Jobs", href: "/saved", icon: Bookmark },
  { label: "Hiring Intelligence", href: "/intelligence", icon: TrendingUp },
];

const bottomItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: "none" }}
            id="mobile-menu-btn"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/dashboard" className="navbar-brand">
            <div className="logo-icon">JF</div>
            <span>JobFinder Pro</span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Search Bar */}
          <div
            style={{
              position: "relative",
              width: "320px",
            }}
          >
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-tertiary)",
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Search jobs, companies..."
              style={{
                paddingLeft: "36px",
                height: "38px",
                fontSize: "0.875rem",
                background: "var(--gray-50)",
                border: "1px solid var(--border-light)",
              }}
            />
          </div>

          {/* Notifications */}
          <button
            className="btn btn-ghost btn-icon"
            style={{ position: "relative" }}
          >
            <Bell size={20} />
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                background: "var(--danger-500)",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
          </button>

          {/* Avatar */}
          <Link href="/profile">
            <div
              className="avatar avatar-placeholder"
              style={{
                width: 36,
                height: 36,
                fontSize: "0.8125rem",
                cursor: "pointer",
              }}
            >
              U
            </div>
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-section">Main Menu</div>
        <div className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} className="icon" />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight
                    size={16}
                    style={{ marginLeft: "auto", opacity: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="sidebar-section" style={{ marginTop: "auto" }}>
          Account
        </div>
        <div className="sidebar-nav">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} className="icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <Link
            href="/"
            className="sidebar-link"
            style={{ color: "var(--danger-500)" }}
          >
            <LogOut size={20} className="icon" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">{children}</main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          #mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
