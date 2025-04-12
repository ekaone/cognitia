"use client";

import { Button } from "@/components/ui/button";
import { useDigitSpanStore } from "@/lib/store/digit-span-store";

export function Instructions() {
  const { mode, startDisplaying } = useDigitSpanStore();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Instructions</h2>
        {mode === "forward" ? (
          <p>
            You will be shown a sequence of digits, one at a time. After the
            sequence is complete, try to recall and enter the digits in the{" "}
            <strong>same order</strong> they were presented.
          </p>
        ) : (
          <p>
            You will be shown a sequence of digits, one at a time. After the
            sequence is complete, try to recall and enter the digits in{" "}
            <strong>reverse order</strong> from how they were presented.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">How it works:</h3>
        <ul className="ml-6 space-y-1 list-disc">
          <li>The test starts with a short sequence of digits</li>
          <li>Each digit will be shown for a brief moment</li>
          <li>
            After the sequence ends, enter the digits as you remember them
          </li>
          <li>If correct, the sequence length will increase</li>
          <li>The test ends when you make a mistake</li>
        </ul>
      </div>

      <div className="pt-4">
        <Button onClick={startDisplaying} className="w-full">
          Start Test
        </Button>
      </div>
    </div>
  );
}
