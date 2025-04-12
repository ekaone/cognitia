"use client";

import { motion } from "motion/react";
import { useTMTStore } from "@/lib/store/trail-store";
import ScoreHistoryTable from "./score-history-table";

export default function ResultEvaluator() {
  const {
    elapsedTime,
    mistakes,
    resetTest,
    currentPhaseNumber,
    startNextPhase,
  } = useTMTStore();

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  const getPerformanceFeedback = () => {
    // Simple feedback based on time and mistakes
    // This could be expanded with more sophisticated evaluation
    if (elapsedTime < 15000 && mistakes === 0) {
      return "Excellent performance! Your speed and accuracy are outstanding.";
    } else if (elapsedTime < 30000 && mistakes <= 2) {
      return "Great job! You completed the test with good speed and few mistakes.";
    } else if (elapsedTime < 45000 && mistakes <= 4) {
      return "Good performance. With practice, you can improve your speed and accuracy.";
    } else {
      return "You've completed the test. Regular practice can help improve your performance.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {currentPhaseNumber === 1 ? "Phase 1 Results" : "Phase 2 Results"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Time</h3>
          <p className="text-3xl font-mono font-bold text-emerald-600">
            {formatTime(elapsedTime)}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Mistakes</h3>
          <p className="text-3xl font-bold text-emerald-600">{mistakes}</p>
        </div>
      </div>

      <div className="bg-emerald-50 p-4 rounded-lg w-full mb-8">
        <h3 className="text-lg font-medium text-emerald-700 mb-2">Feedback</h3>
        <p className="text-gray-700">{getPerformanceFeedback()}</p>
      </div>

      {/* Score History Table */}
      <div className="w-full mb-8 bg-white p-4 rounded-lg border border-gray-200">
        <ScoreHistoryTable />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {currentPhaseNumber === 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startNextPhase}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium shadow-sm hover:bg-emerald-700 transition-colors"
          >
            Continue to Phase 2
          </motion.button>
        ) : null}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTest}
          className={`px-6 py-3 ${
            currentPhaseNumber === 1
              ? "bg-white text-emerald-600 border border-emerald-600"
              : "bg-emerald-600 text-white"
          } rounded-lg font-medium shadow-sm hover:bg-opacity-90 transition-colors`}
        >
          {currentPhaseNumber === 1 ? "Retry Phase 1" : "Start Over"}
        </motion.button>
      </div>
    </motion.div>
  );
}
