"use client";

import { useTaskStore } from "@/lib/store/use-task-store";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { motion } from "motion/react";

export function StartButton() {
  const { startTask, category } = useTaskStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={startTask}
        className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
        disabled={!category}
      >
        <PlayCircle className="mr-2 h-6 w-6" />
        Start Task
      </Button>
      {!category && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-amber-600 mt-2 text-center"
        >
          Please select a category first
        </motion.p>
      )}
    </motion.div>
  );
}
