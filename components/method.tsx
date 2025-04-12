import { featuresList } from "@/data/features";
import Link from "next/link";

export default function Method() {
  return (
    <div id="methods" className="max-w-7xl mx-auto px-4 mt-42">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-gray-50 text-4xl font-bold sm:text-5xl mb-6">
          Cognitive Assessment Tools
        </h2>
        <p className="text-xl text-gray-300">
          Discover our suite of research-backed tools designed to help you track
          and understand cognitive changes over time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresList.map((feature, index) => (
          <div
            key={index}
            className="group relative p-[1px] rounded-xl bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent hover:from-purple-500/30 hover:via-purple-500/20 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/60 transition-colors">
              <div className="text-purple-400 mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-100 text-left">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-left text-lg mb-6">
                {feature.desc}
              </p>
              {feature.link && (
                <Link
                  href={feature.link}
                  className="group/link relative inline-flex items-center text-left transition-all duration-300"
                >
                  <span className="relative z-10 font-medium text-amber-600 hover:text-amber-500">
                    Start Assessment
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 relative z-10 transition-transform duration-300 group-hover/link:translate-x-1 text-amber-600 group-hover/link:text-amber-500"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-600 group-hover/link:w-full transition-all duration-300"></span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
