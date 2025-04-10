import { featuresList } from "@/data/features";

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
              <p className="text-gray-300 text-left text-lg">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
