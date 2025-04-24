"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Particles } from "@/components/magicui/particles";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent horizontal movement on mount
  useEffect(() => {
    // Prevent horizontal touch movement
    document.body.style.overscrollBehaviorX = "none";
    document.documentElement.style.touchAction = "pan-y pinch-zoom";
    document.documentElement.style.overflowX = "hidden";

    return () => {
      document.body.style.overscrollBehaviorX = "auto";
      document.documentElement.style.touchAction = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      document.body.style.touchAction = "pan-y pinch-zoom";
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close menu first
      toggleMenu();
      // Add a small delay to ensure menu closing animation completes
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <div className="md:hidden z-50">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-300 hover:text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile menu slide-out panel */}
      <div
        className={`fixed top-0 right-0 w-[75%] h-full bg-gradient-to-b from-[#111827] to-[#1f1031] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          <Particles
            className="absolute inset-0"
            quantity={50}
            staticity={30}
            ease={80}
            color="#ffffff"
          />
        </div>

        <div className="relative flex justify-between items-center p-6 border-b border-gray-800">
          <span className="text-xl font-semibold">Cognitia</span>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="relative p-6 space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => {
                scrollToSection("methods");
                toggleMenu();
              }}
              className="block text-lg text-gray-300 hover:text-white transition-colors w-full text-left"
            >
              Methods
            </button>
            <button
              onClick={() => {
                scrollToSection("data-privacy");
                toggleMenu();
              }}
              className="block text-lg text-gray-300 hover:text-white transition-colors w-full text-left"
            >
              Data Privacy
            </button>
            <button
              onClick={() => {
                scrollToSection("upcoming");
                toggleMenu();
              }}
              className="block text-lg text-gray-300 hover:text-white transition-colors w-full text-left"
            >
              Upcoming
            </button>
            <button
              onClick={() => {
                scrollToSection("faq");
                toggleMenu();
              }}
              className="block text-lg text-gray-300 hover:text-white transition-colors w-full text-left"
            >
              FAQs
            </button>
          </div>

          <div className="pt-6 border-t border-gray-800 space-y-4">
            <button
              onClick={() => {
                scrollToSection("methods");
                toggleMenu();
              }}
              className="group relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 text-xl border-0 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 w-full justify-center"
            >
              <span className="relative z-10">Start now</span>
              <ArrowRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-50"></div>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
