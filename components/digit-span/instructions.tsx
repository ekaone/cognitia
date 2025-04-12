"use client";

import { Button } from "@/components/ui/button";
import { useDigitSpanStore } from "@/lib/store/digit-span-store";

export function Instructions() {
  const { mode, startDisplaying } = useDigitSpanStore();

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Instructions
        </h2>
        {mode === "forward" ? (
          <p className="text-lg text-muted-foreground">
            You will be shown a sequence of digits, one at a time. After the
            sequence is complete, try to recall and enter the digits in the{" "}
            <strong className="text-purple-600">same order</strong> they were
            presented.
          </p>
        ) : (
          <p className="text-lg text-muted-foreground">
            You will be shown a sequence of digits, one at a time. After the
            sequence is complete, try to recall and enter the digits in{" "}
            <strong className="text-purple-600">reverse order</strong> from how
            they were presented.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-600">How it works:</h3>
        <ul className="ml-6 space-y-3 list-disc text-lg text-muted-foreground">
          <li>The test starts with a short sequence of digits</li>
          <li>Each digit will be shown for a brief moment</li>
          <li>
            After the sequence ends, enter the digits as you remember them
          </li>
          <li>If correct, the sequence length will increase</li>
          <li>The test ends when you make a mistake</li>
        </ul>
      </div>

      <div className="pt-6">
        <Button
          onClick={startDisplaying}
          className="w-full py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Test
        </Button>
      </div>
    </div>
  );
}
