import type React from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Verbal Fluency Test",
  description: "A cognitive assessment tool to measure verbal fluency",
};

export default function VerbalFluencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {children}
    </main>
  );
}
