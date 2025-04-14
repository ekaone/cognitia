"use client";

import { useEffect, useState } from "react";
import { useWRTStore } from "@/lib/store/wrt-store";
import { useWordRecallHistoryStore } from "@/lib/store/word-recall-history";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  SkipForward,
  Clock,
  Brain,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WordRecallTest() {
  const {
    phase,
    wordList,
    score,
    correctWords,
    missedWords,
    startTest,
    startRecallPhase,
    submitRecall,
    resetTest,
  } = useWRTStore();
  const { addScore } = useWordRecallHistoryStore();
  const [timeLeft, setTimeLeft] = useState(30);
  const [progress, setProgress] = useState(100);
  const [input, setInput] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // Initialize the test
  useEffect(() => {
    resetTest();
    setInput(""); // Clear input on reset
    setWordCount(0); // Reset word count
  }, [resetTest]);

  // Timer effect - only handles countdown
  useEffect(() => {
    if (phase === "memorize") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [phase]);

  // Separate effect for phase transition
  useEffect(() => {
    if (timeLeft === 0 && phase === "memorize") {
      startRecallPhase();
    }
  }, [timeLeft, phase, startRecallPhase]);

  // Progress effect
  useEffect(() => {
    if (phase === "memorize") {
      setProgress((timeLeft / 30) * 100);
    }
  }, [timeLeft, phase]);

  const handleSubmit = async () => {
    const words = input
      .toLowerCase()
      .split(/[\s,]+/)
      .filter((word) => word.trim() !== "");

    // Submit the recall and wait for the store to update
    submitRecall(words);

    // Wait for the next render cycle to ensure store is updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Get the latest values from the store
    const currentState = useWRTStore.getState();

    // Save the score to history with the updated values
    addScore({
      date: new Date().toISOString(),
      score: currentState.score,
      totalWords: currentState.wordList.length,
      correctWords: currentState.correctWords,
      missedWords: currentState.missedWords,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    // Count words (split by spaces or commas and filter out empty strings)
    const words = value.split(/[\s,]+/).filter((word) => word.trim() !== "");
    setWordCount(words.length);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 shadow-lg bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 justify-center">
        <CardContent className="pt-8">
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center space-y-6 py-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-purple-500" />
                  <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Ready to test your memory?
                  </h2>
                </div>
                <p className="text-center text-muted-foreground max-w-md">
                  You will be shown 10 words for 30 seconds. Try to memorize as
                  many as you can!
                </p>
                <Button
                  onClick={startTest}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Test
                </Button>
              </motion.div>
            )}

            {phase === "memorize" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      Memorize these words
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">
                          {timeLeft} seconds left
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={startRecallPhase}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 border-purple-200 hover:border-purple-300"
                      >
                        <SkipForward className="w-4 h-4" />
                        Skip
                      </Button>
                    </div>
                  </div>
                  <Progress
                    value={progress}
                    className="h-2 bg-purple-100 dark:bg-purple-900/30"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wordList.map((word, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
                        <CardContent className="p-6 text-center">
                          <p className="text-xl font-medium text-purple-900 dark:text-purple-100">
                            {word}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "recall" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-medium mb-2">Recall Phase</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Type all the words you can remember, separated by spaces or
                    commas.
                  </p>
                  <div className="flex justify-end mb-2">
                    <span className="text-sm text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                      Words typed: {wordCount}
                    </span>
                  </div>
                  <Textarea
                    placeholder="Type the words you remember..."
                    className="min-h-[200px] resize-none focus:ring-2 focus:ring-purple-500 border-purple-100 dark:border-purple-900/30"
                    value={input}
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Submit Answers
                </Button>
              </motion.div>
            )}

            {phase === "results" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Your Score: {score} / {wordList.length}
                  </h3>
                  <p className="text-muted-foreground">
                    You recalled {correctWords.length} out of {wordList.length}{" "}
                    words correctly.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h4 className="text-lg font-medium">Correct Words</h4>
                    </div>
                    <div className="space-y-2">
                      {correctWords.length > 0 ? (
                        correctWords.map((word, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              {word}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-muted-foreground p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          No correct words
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <h4 className="text-lg font-medium">Missed Words</h4>
                    </div>
                    <div className="space-y-2">
                      {missedWords.length > 0 ? (
                        missedWords.map((word, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              {word}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-muted-foreground p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          No missed words
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={() => {
                      resetTest();
                      setInput("");
                      setWordCount(0);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-5 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Start New Test
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
