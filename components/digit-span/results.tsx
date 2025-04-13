"use client";

import { useEffect } from "react";
import { useDigitSpanStore } from "@/lib/store/digit-span-store";
import { CheckCircle, XCircle } from "lucide-react";

export function Results() {
  const { isCorrect, currentLevel, maxLevel, mode, updateStats } =
    useDigitSpanStore();

  useEffect(() => {
    // Update stats in localStorage
    updateStats();
  }, [updateStats]);

  return (
    <div className="flex flex-col items-center py-8 space-y-6 text-center">
      {isCorrect ? (
        <>
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-bold">Well done!</h2>
          <p>
            You&apos;ve reached level {currentLevel} in the {mode} digit span
            test.
          </p>
          <p className="text-muted-foreground">
            This is a great result! The average adult can remember 7±2 digits
            forward and 5±2 digits backward.
          </p>
        </>
      ) : (
        <>
          <XCircle className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-bold">Test Complete</h2>
          <p>
            You reached level {maxLevel} in the {mode} digit span test.
          </p>
          <p className="text-muted-foreground">
            The average adult can remember 7±2 digits forward and 5±2 digits
            backward.
          </p>
        </>
      )}
    </div>
  );
}
