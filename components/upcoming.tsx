import { Brain } from "lucide-react";
import { upcomingFeatures } from "@/data/upcoming-features";

export default function Upcoming() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-32">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-gray-50 text-4xl font-bold sm:text-5xl mb-6">
          Upcoming Features
        </h2>
        <p className="text-xl text-gray-300">
          We&apos;re working on new assessment tools to provide more
          comprehensive cognitive evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {upcomingFeatures.map((feature, index) => (
          <div key={index} className="group relative h-full">
            {/* Animated gradient background */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-40 transition-all duration-500`}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-gray-900 to-transparent opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Glowing border effect */}
            <div
              className={`absolute -inset-[1px] bg-gradient-to-r ${feature.gradient} rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500`}
            ></div>
            <div
              className={`absolute -inset-[2px] bg-gradient-to-r ${feature.gradient} rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-500 delay-75`}
            ></div>

            {/* Card content */}
            <div className="relative bg-gray-900/50 p-8 rounded-xl h-full flex flex-col backdrop-blur-sm border border-gray-800/50 group-hover:border-transparent transition-all duration-500">
              {/* Icon with gradient background */}
              <div
                className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
                {feature.icon}
              </div>

              <div className="pt-8 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-100 text-left group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                    {feature.title}
                  </h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-gray-800/50 text-gray-300 whitespace-nowrap group-hover:bg-gray-800 transition-colors duration-500">
                    {feature.status}
                  </span>
                </div>
                <p className="text-gray-300 text-left text-lg mb-6 group-hover:text-gray-200 transition-colors duration-500">
                  {feature.description}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-800/50 group-hover:border-gray-700 transition-colors duration-500">
                  <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full w-3/4 group-hover:w-full transition-all duration-1000`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-800 transition-colors">
          <Brain className="w-5 h-5 mr-2" />
          <span>More features coming soon</span>
        </div>
      </div>
    </div>
  );
}
