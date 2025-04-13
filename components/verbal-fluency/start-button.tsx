"use client";

import { useTaskStore } from "@/lib/store/use-task-store";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface StartButtonProps {
  onStart?: () => void;
}

export function StartButton({ onStart }: StartButtonProps) {
  const { startTask, category } = useTaskStore();

  const handleStart = () => {
    startTask();
    if (onStart) onStart();
  };

  return (
    <Button
      onClick={handleStart}
      className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg"
      disabled={!category}
    >
      <PlayCircle className="mr-2 h-5 w-5" />
      Start Task
    </Button>
  );
}
