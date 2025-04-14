"use client";

import { motion } from "motion/react";
import ScoreHistoryTable from "./score-history-table";

export default function ScoreHistorySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
      className="bg-white rounded-xl shadow-md p-6 h-full"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Your visual attention and task switching Scoreboard
      </h2>
      <ScoreHistoryTable compact={true} />
    </motion.div>
  );
}
