import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://studyflow-id.duckdns.org";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "StudyFlow",
    template: "%s | StudyFlow",
  },
  description:
    "Planner akademik sederhana untuk mahasiswa Indonesia untuk mengatur kuliah, tugas, deadline, dan goal belajar dari satu dashboard.",
  keywords: ["StudyFlow", "planner mahasiswa", "academic planner", "Next.js", "Supabase"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StudyFlow",
    description: "Planner akademik sederhana untuk mahasiswa Indonesia.",
    url: siteUrl,
    siteName: "StudyFlow",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyFlow",
    description: "Planner akademik sederhana untuk mahasiswa Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
