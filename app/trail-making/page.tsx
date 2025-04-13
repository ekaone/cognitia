import { Activity } from "lucide-react";
import TMTWrapper from "@/components/trail-making/tmt-wrapper";
import ScoreHistorySection from "@/components/trail-making/score-history-section";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex justify-center w-full">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              TrailMaking
            </h1>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center pb-2 mb-2 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
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
