import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Components
import MobileNavigation from "@/components/mobile-navigation";
import DesktopNavigation from "@/components/desktop-navigation";
import Brand from "@/components/brand";
import SectionEffect from "@/components/section-effect";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Brand />
          <span className="text-2xl font-semibold">Cognitia</span>
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigation />

        {/* Mobile Navigation */}
        <MobileNavigation />
      </header>

      <main className="container mx-auto px-4 pt-20 pb-32 text-center relative">
        <section>
          <SectionEffect
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mb-16"
          >
            {/* Gradient circular background with blur effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full gradient-radial-purple blur-[80px] pointer-events-none"></div>
            <div className="max-w-3xl mx-auto relative z-10">
              <p className="text-purple-400 mb-4 text-2xl">
                Track Cognitive Changes for Brain Health
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-100">
                Smart tools. Simple steps. Better care for your loved ones
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Cognitia offers reliable, research-based cognitive tests
                designed for early detection of dementia-related symptoms.
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors"
              >
                Start Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </SectionEffect>
        </section>
      </main>
    </div>
  );
}
