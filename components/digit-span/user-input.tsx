"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDigitSpanStore } from "@/lib/store/digit-span-store";

export function UserInput() {
  const { mode, currentSequence, submitAnswer } = useDigitSpanStore();
  const [userInput, setUserInput] = useState<number[]>([]);

  const handleDigitClick = (digit: number) => {
    setUserInput((prev) => [...prev, digit]);
  };

  const handleBackspace = () => {
    setUserInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    submitAnswer(userInput);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-center text-muted-foreground">
          {mode === "forward"
            ? "Enter the digits in the same order"
            : "Enter the digits in reverse order"}
        </p>

        <div className="flex justify-center p-4 mb-4 border rounded-lg min-h-16">
          {userInput.length > 0 ? (
            <div className="flex items-center space-x-2 text-2xl font-bold">
              {userInput.map((digit, index) => (
                <span key={index} className="p-2 border rounded">
                  {digit}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Your answer...</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <Button
            key={digit}
            variant="outline"
            className="text-xl h-14"
            onClick={() => handleDigitClick(digit)}
          >
            {digit}
          </Button>
        ))}
        <Button
          variant="outline"
          className="text-xl h-14"
          onClick={handleBackspace}
        >
          ←
        </Button>
        <Button
          variant="outline"
          className="text-xl h-14"
          onClick={() => handleDigitClick(0)}
        >
          0
        </Button>
        <Button
          className="text-xl h-14"
          onClick={handleSubmit}
          disabled={userInput.length !== currentSequence.length}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
