"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/lib/store/use-task-store";
import { Progress } from "@/components/ui/progress";

export function CountdownTimer() {
  const { timeLimit, timeRemaining, status, decrementTime, finishTask } =
    useTaskStore();

  // Calculate progress percentage
  const progressPercentage = (timeRemaining / timeLimit) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "active") {
      interval = setInterval(() => {
        decrementTime();

        if (timeRemaining <= 0) {
          clearInterval(interval);
          finishTask();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, timeRemaining, decrementTime, finishTask]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              className="text-emerald-600 transition-all duration-300 ease-in-out"
              strokeWidth="8"
              strokeDasharray={264}
              strokeDashoffset={264 - (progressPercentage / 100) * 264}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <span className="text-2xl font-bold">{timeRemaining}</span>
      </div>
      <Progress value={progressPercentage} className="w-24 h-2 mt-2" />
    </div>
  );
}
