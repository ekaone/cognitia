"use client";

import { motion } from "motion/react";
import { useTMTStore } from "@/lib/store/trail-store";

export default function TestInstructions() {
  const { startTest, currentPhaseNumber } = useTMTStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
    >
      <motion.h2
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent"
      >
        {currentPhaseNumber === 1
          ? "Phase 1: Numbers"
          : "Phase 2: Numbers & Letters"}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-gray-700 space-y-4 text-lg leading-relaxed"
      >
        {currentPhaseNumber === 1 ? (
          <>
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">•</span>
              In this test, you will see numbers from 1 to 15 scattered on the
              screen.
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">•</span>
              Click on each number in ascending order (1, 2, 3, ...) as quickly
              as possible.
            </p>
          </>
        ) : (
          <>
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">•</span>
              In this phase, you will see numbers and letters scattered on the
              screen.
            </p>
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">•</span>
              Click on them in alternating order: 1, A, 2, B, 3, C, and so on.
            </p>
          </>
        )}
        <p className="flex items-center gap-2 text-emerald-600 font-medium">
          <span className="text-emerald-500">•</span>
          The timer will start when you click on the first correct item.
        </p>
      </motion.div>

      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={startTest}
        className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-emerald-200 transition-all duration-300"
      >
        Start Test
      </motion.button>
    </motion.div>
  );
}
