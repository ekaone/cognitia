"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { useTMTStore } from "@/lib/store/trail-store";
import Timer from "./timer";
import ProgressTracker from "./progress-tracker";

export default function TMTGrid() {
  const { items, mistakes, handleItemClick, isTimerRunning, stopTimer } =
    useTMTStore();

  // Stop timer when component unmounts if it's running
  useEffect(() => {
    return () => {
      if (isTimerRunning) {
        stopTimer();
      }
    };
  }, [isTimerRunning, stopTimer]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-6">
        <Timer />
        <div className="text-gray-600">
          Mistakes: <span className="font-semibold">{mistakes}</span>
        </div>
      </div>

      <ProgressTracker />

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6 w-full">
        {items.map((item) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              backgroundColor: item.isCompleted ? "rgb(16 185 129)" : "white",
            }}
            whileHover={!item.isCompleted ? { scale: 1.05 } : {}}
            whileTap={!item.isCompleted ? { scale: 0.95 } : {}}
            onClick={() => handleItemClick(item.id)}
            disabled={item.isCompleted}
            className={`
              aspect-square flex items-center justify-center rounded-lg text-xl font-bold shadow-sm
              ${
                item.isCompleted
                  ? "bg-emerald-500 text-white cursor-default"
                  : "bg-white text-gray-800 hover:shadow-md transition-shadow"
              }
            `}
          >
            {item.value}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
