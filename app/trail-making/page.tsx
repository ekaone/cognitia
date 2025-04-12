import TMTWrapper from "@/components/trail-making/tmt-wrapper";
import ScoreHistorySection from "@/components/trail-making/score-history-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
          Trail Making Test
        </h1>
        <p className="text-center text-emerald-200/90 mb-8 font-medium">
          A cognitive assessment tool to measure visual attention and task
          switching
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main TMT Test Area - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2">
            <TMTWrapper />
          </div>

          {/* Score History Section - Takes 1/3 of the space on large screens */}
          <div className="lg:col-span-1">
            <ScoreHistorySection />
          </div>
        </div>
      </div>
    </div>
  );
}
