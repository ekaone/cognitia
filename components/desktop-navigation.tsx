"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DesktopNavigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={() => scrollToSection("methods")}
          className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 text-xl cursor-pointer"
        >
          Methods
        </button>
        <button
          onClick={() => scrollToSection("data-privacy")}
          className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 text-xl cursor-pointer"
        >
          Data Privacy
        </button>
        <button
          onClick={() => scrollToSection("upcoming")}
          className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 text-xl cursor-pointer"
        >
          Upcoming
        </button>
        <button
          onClick={() => scrollToSection("faq")}
          className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 text-xl cursor-pointer"
        >
          FAQs
        </button>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <a
          href="https://cognitia.featurebase.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 text-xl border-0 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
        >
          <span className="relative z-10">Feedback</span>
          <ExternalLink
            size={16}
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-50"></div>
        </a>
      </div>
    </>
  );
}
