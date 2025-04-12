"use client";

import { useEffect, useState } from "react";
import { useTMTStore } from "@/lib/store/trail-store";

export default function Timer() {
  const { isTimerRunning, elapsedTime } = useTMTStore();
  const [displayTime, setDisplayTime] = useState("00:00.0");

  useEffect(() => {
    const formatTime = (ms: number) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const tenths = Math.floor((ms % 1000) / 100);

      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}.${tenths}`;
    };

    setDisplayTime(formatTime(elapsedTime));

    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        const newElapsedTime = Date.now() - useTMTStore.getState().startTime;
        setDisplayTime(formatTime(newElapsedTime));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, elapsedTime]);

  return (
    <div className="text-2xl font-mono font-semibold text-gray-800">
      {displayTime}
    </div>
  );
}
