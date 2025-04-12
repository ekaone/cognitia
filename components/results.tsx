"use client";

import { useWRTStore } from "@/lib/store/wrt-store";
import { useScoreHistoryStore } from "@/lib/store/score-history-store";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function Results() {
  const { wordList, score, correctWords, missedWords, resetTest } =
    useWRTStore();
  const { addScore } = useScoreHistoryStore();

  const handleSaveAndRestart = () => {
    addScore({
      date: new Date().toISOString(),
      score,
      totalWords: wordList.length,
      correctWords,
      missedWords,
    });
    resetTest();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">
          Your Score: {score} / {wordList.length}
        </h3>
        <p className="text-muted-foreground">
          You recalled {correctWords.length} out of {wordList.length} words
          correctly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium mb-3 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            Correct Words
          </h4>
          <ul className="space-y-2">
            {correctWords.length > 0 ? (
              correctWords.map((word, index) => (
                <li
                  key={index}
                  className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md"
                >
                  {word}
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No correct words</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-3 flex items-center">
            <XCircle className="mr-2 h-5 w-5 text-red-500" />
            Missed Words
          </h4>
          <ul className="space-y-2">
            {missedWords.length > 0 ? (
              missedWords.map((word, index) => (
                <li
                  key={index}
                  className="p-2 bg-red-50 dark:bg-red-900/20 rounded-md"
                >
                  {word}
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No missed words</li>
            )}
          </ul>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={handleSaveAndRestart}>
          Save Score & Start New Test
        </Button>
      </div>
    </div>
  );
}
