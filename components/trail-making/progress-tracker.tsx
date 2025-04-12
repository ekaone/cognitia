"use client";

import { useTMTStore } from "@/lib/store/trail-store";

export default function ProgressTracker() {
  const { currentIndex, items } = useTMTStore();
  const progress = (currentIndex / items.length) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
