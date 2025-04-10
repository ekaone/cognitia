import MobileNavigation from "@/components/mobile-navigation";
import DesktopNavigation from "@/components/desktop-navigation";
import Brand from "@/components/brand";
import Hero from "@/components/hero";
import Method from "@/components/method";
import DataPrivacy from "@/components/data-privacy";
import Upcoming from "@/components/upcoming";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Brand />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Cognitia
          </span>
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigation />

        {/* Mobile Navigation */}
        <MobileNavigation />
      </header>

      <main className="container mx-auto px-4 pt-20 pb-32 text-center relative">
        <Hero />
        <Method />
        <DataPrivacy />
        <Upcoming />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
