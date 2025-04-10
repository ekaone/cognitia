"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-300 hover:text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile menu slide-out panel */}
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-gradient-to-b from-[#111827] to-[#1f1031] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <span className="text-xl font-semibold">Menu</span>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-6 space-y-6">
          <div className="space-y-4">
            <Link
              href="#methods"
              className="block text-lg text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              Methods
            </Link>
            <Link
              href="#data-privacy"
              className="block text-lg text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              Data Privacy
            </Link>
            <Link
              href="#upcoming"
              className="block text-lg text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              Upcoming
            </Link>
            <Link
              href="#faqs"
              className="block text-lg text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              FAQs
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-800 space-y-4">
            <Link
              href="/start"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors w-full justify-center border border-gray-700 custom-btn-bg"
              onClick={toggleMenu}
            >
              Start now
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
