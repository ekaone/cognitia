"use client";

import { useTaskStore } from "@/lib/store/use-task-store";

export function TaskInstructions() {
  const { category, timeLimit } = useTaskStore();

  return (
    <div className="text-center md:text-left">
      <h2 className="text-xl md:text-2xl font-semibold">
        Name as many <span className="text-emerald-600">{category}</span> as you
        can
      </h2>
      <p className="text-gray-600 mt-1">
        You have {timeLimit} seconds to complete this task
      </p>
    </div>
  );
}
