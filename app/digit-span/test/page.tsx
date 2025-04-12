"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDigitSpanStore } from "@/lib/store/digit-span-store";
import { Instructions } from "@/components/digit-span/instructions";
import { DigitDisplay } from "@/components/digit-span/digit-display";
import { UserInput } from "@/components/digit-span/user-input";
import { Results } from "@/components/digit-span/results";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "forward";

  const { testState, currentLevel, initializeTest, resetTest } =
    useDigitSpanStore();

  useEffect(() => {
    // Initialize the test with the selected mode
    initializeTest(mode as "forward" | "backward");

    // Cleanup on unmount
    return () => {
      resetTest();
    };
  }, [mode, initializeTest, resetTest]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-7xl mx-auto px-4 py-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800 transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/digit-span")}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {mode === "forward" ? "Forward" : "Backward"} Digit Span
                </h1>
              </div>
              <div className="text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                Level: {currentLevel}
              </div>
            </div>

            <Progress
              value={
                testState === "instructions"
                  ? 0
                  : testState === "displaying"
                  ? 33
                  : testState === "input"
                  ? 66
                  : 100
              }
              className="mb-8 h-2 bg-purple-100 dark:bg-purple-900/30"
            />

            <AnimatePresence mode="wait">
              {testState === "instructions" && (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Instructions />
                </motion.div>
              )}
              {testState === "displaying" && (
                <motion.div
                  key="displaying"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <DigitDisplay />
                </motion.div>
              )}
              {testState === "input" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <UserInput />
                </motion.div>
              )}
              {testState === "results" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Results />
                </motion.div>
              )}
            </AnimatePresence>

            {testState === "results" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between mt-8"
              >
                <Button
                  variant="outline"
                  onClick={() => router.push("/digit-span")}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => initializeTest(mode as "forward" | "backward")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
