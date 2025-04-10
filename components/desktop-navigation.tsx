"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <Link
          href="/start"
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors text-xl border border-gray-700 custom-btn-bg"
        >
          Start now
          <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
