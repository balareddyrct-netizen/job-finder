import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobFinder Pro — AI-Powered Job Search & Resume Builder",
  description: "Find your dream job with AI-powered resume analysis, ATS scoring, and intelligent job matching across LinkedIn, Naukri, InstaHire, and 100+ company career pages.",
  keywords: "job search, resume builder, ATS score, AI job matching, LinkedIn jobs, Naukri jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
