"use client";

import { useState } from "react";
import { TaskInstructions } from "@/components/word-recall/task-instructions";
import { CountdownTimer } from "@/components/word-recall/countdown-timer";
import { WordInputBox } from "@/components/word-recall/word-input-box";
import { WordValidationResults } from "@/components/word-recall/word-validation-results";
import { CategorySelector } from "@/components/word-recall/category-selector";
import { StartButton } from "@/components/word-recall/start-button";
import { useTaskStore } from "@/lib/store/use-task-store";
import { Card, CardContent } from "@/components/ui/card";

export default function WordRecallPage() {
  const { status } = useTaskStore();
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Verbal Fluency Task
        </h1>

        {showInstructions && status === "waiting" && (
          <Card className="mb-6 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-center text-gray-700">
                This task measures your ability to generate words from a
                specific category. Select a category, then name as many items as
                you can within the time limit.
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            {status === "waiting" && (
              <div className="space-y-6">
                <TaskInstructions />
                <CategorySelector />
                <div className="flex justify-center">
                  <StartButton onStart={() => setShowInstructions(false)} />
                </div>
              </div>
            )}

            {status === "active" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <TaskInstructions />
                  <CountdownTimer />
                </div>
                <WordInputBox />
              </div>
            )}

            {status === "finished" && <WordValidationResults />}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
