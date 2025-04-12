"use client";

import { useEffect, useState } from "react";
import { useWRTStore } from "@/lib/store/wrt-store";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";

export default function WordRecallTest() {
  const {
    phase,
    wordList,
    recalledWords,
    score,
    correctWords,
    missedWords,
    startTest,
    startRecallPhase,
    submitRecall,
    resetTest,
  } = useWRTStore();
  const [timeLeft, setTimeLeft] = useState(30);
  const [progress, setProgress] = useState(100);
  const [input, setInput] = useState("");

  // Initialize the test
  useEffect(() => {
    resetTest();
  }, [resetTest]);

  // Timer effect
  useEffect(() => {
    if (phase === "memorize") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            startRecallPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [phase, startRecallPhase]);

  // Progress effect
  useEffect(() => {
    if (phase === "memorize") {
      setProgress((timeLeft / 30) * 100);
    }
  }, [timeLeft, phase]);

  const handleSubmit = () => {
    const words = input
      .toLowerCase()
      .split(/[\s,]+/)
      .filter((word) => word.trim() !== "");
    submitRecall(words);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          {phase === "idle" && (
            <div className="flex flex-col items-center justify-center space-y-4 py-10">
              <h2 className="text-2xl font-semibold text-center">
                Ready to test your memory?
              </h2>
              <p className="text-center text-muted-foreground">
                You will be shown 10 words for 30 seconds. Try to memorize as
                many as you can!
              </p>
              <Button onClick={startTest}>Start Test</Button>
            </div>
          )}

          {phase === "memorize" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Memorize these words</h3>
                  <span className="text-sm font-medium">
                    {timeLeft} seconds left
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wordList.map((word, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4 text-center">
                      <p className="text-lg font-medium">{word}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {phase === "recall" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Recall Phase</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Type all the words you can remember, separated by spaces or
                  commas.
                </p>
                <Textarea
                  placeholder="Type the words you remember..."
                  className="min-h-[150px]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Submit Answers
              </Button>
            </div>
          )}

          {phase === "results" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Your Score: {score} / {wordList.length}
                </h3>
                <p className="text-muted-foreground">
                  You recalled {correctWords.length} out of {wordList.length}{" "}
                  words correctly.
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
                      <li className="text-muted-foreground">
                        No correct words
                      </li>
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
                <Button onClick={resetTest}>Start New Test</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
