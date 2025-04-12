"use client";

import { useEffect, useState } from "react";
import { useDigitSpanStore } from "@/lib/store/digit-span-store";
import { Card } from "@/components/ui/card";

export function DigitDisplay() {
  const { currentSequence, startUserInput } = useDigitSpanStore();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showDigit, setShowDigit] = useState(false);

  useEffect(() => {
    // Initial delay before starting
    const initialDelay = setTimeout(() => {
      displayNextDigit(0);
    }, 1000);

    return () => clearTimeout(initialDelay);
  }, []);

  const displayNextDigit = (index: number) => {
    if (index >= currentSequence.length) {
      // We've shown all digits, move to input phase
      setTimeout(() => {
        startUserInput();
      }, 500);
      return;
    }

    setCurrentIndex(index);
    setShowDigit(true);

    // Show the digit for 1 second
    setTimeout(() => {
      setShowDigit(false);

      // Wait 300ms before showing the next digit
      setTimeout(() => {
        displayNextDigit(index + 1);
      }, 300);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="mb-8 text-center text-muted-foreground">
        Watch carefully...
      </p>

      <Card className="flex items-center justify-center w-32 h-32 text-5xl font-bold">
        {showDigit ? currentSequence[currentIndex] : ""}
      </Card>
    </div>
  );
}
