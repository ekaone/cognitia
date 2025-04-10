import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DesktopNavigation() {
  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="#methods"
          className="text-gray-300 hover:text-white transition-colors text-xl"
        >
          Methods
        </Link>
        <Link
          href="#data-privacy"
          className="text-gray-300 hover:text-white transition-colors text-xl"
        >
          Data Privacy
        </Link>
        <Link
          href="#upcoming"
          className="text-gray-300 hover:text-white transition-colors text-xl"
        >
          Upcoming
        </Link>
        <Link
          href="#faq"
          className="text-gray-300 hover:text-white transition-colors text-xl"
        >
          FAQs
        </Link>
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
