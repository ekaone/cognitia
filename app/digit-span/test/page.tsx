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
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {mode === "forward" ? "Forward" : "Backward"} Digit Span
            </h1>
            <div className="text-sm text-muted-foreground">
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
            className="mb-8"
          />

          {testState === "instructions" && <Instructions />}
          {testState === "displaying" && <DigitDisplay />}
          {testState === "input" && <UserInput />}
          {testState === "results" && <Results />}

          {testState === "results" && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => router.push("/digit-span")}
              >
                Back to Home
              </Button>
              <Button
                onClick={() => initializeTest(mode as "forward" | "backward")}
              >
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
