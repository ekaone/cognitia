"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useTaskStore } from "@/lib/store/use-task-store";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function WordInputBox() {
  const { addWord, words } = useTaskStore();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if the user has entered a new word (by pressing Enter or Space)
    const lastChar = value.slice(-1);
    if (lastChar === "\n" || lastChar === " ") {
      const newWords = value
        .trim()
        .split(/[\s\n]+/)
        .filter(Boolean);

      // Get the last word entered
      const lastWord = newWords[newWords.length - 1];

      if (lastWord) {
        addWord(lastWord);
      }

      // Keep the current input value (don't clear it)
      // This allows users to see what they've typed
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label htmlFor="word-input" className="text-sm font-medium">
          Enter words (press Enter or Space after each word)
        </label>
        <Badge variant="outline" className="bg-emerald-50">
          {words.length} {words.length === 1 ? "word" : "words"}
        </Badge>
      </div>

      <Textarea
        id="word-input"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type words here..."
        className="min-h-[150px] resize-none focus:ring-emerald-500"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
}
