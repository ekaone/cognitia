import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cognitia",
  description: "Explore your mind's space with Cognitia",
  openGraph: {
    title: "Cognitia - Cognitive Assessment Tools",
    description:
      "Explore your mind's space with Cognitia - A suite of cognitive assessment tools including Verbal Fluency, Word Recall, and more.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cognitia - Cognitive Assessment Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognitia - Cognitive Assessment Tools",
    description:
      "Explore your mind's space with Cognitia - A suite of cognitive assessment tools including Verbal Fluency, Word Recall, and more.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
