"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// List of common words for the test
const wordPool = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "melon",
  "peach",
  "pear",
  "plum",
  "cherry",
  "house",
  "chair",
  "table",
  "window",
  "door",
  "floor",
  "ceiling",
  "wall",
  "roof",
  "room",
  "water",
  "fire",
  "earth",
  "wind",
  "light",
  "dark",
  "sun",
  "moon",
  "star",
  "cloud",
  "book",
  "page",
  "pen",
  "pencil",
  "paper",
  "note",
  "letter",
  "word",
  "line",
  "story",
  "dog",
  "cat",
  "bird",
  "fish",
  "horse",
  "cow",
  "sheep",
  "goat",
  "pig",
  "chicken",
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "car",
  "bus",
  "train",
  "plane",
  "ship",
  "bike",
  "walk",
  "run",
  "jump",
  "swim",
  "happy",
  "sad",
  "angry",
  "calm",
  "excited",
  "tired",
  "hungry",
  "thirsty",
  "hot",
  "cold",
];

type Phase = "idle" | "memorize" | "recall" | "results";

interface WRTStore {
  phase: Phase;
  wordList: string[];
  recalledWords: string[];
  score: number;
  correctWords: string[];
  missedWords: string[];
  startTest: () => void;
  startRecallPhase: () => void;
  submitRecall: (words: string[]) => void;
  resetTest: () => void;
}

// Helper function to get random words
const getRandomWords = (count: number): string[] => {
  const shuffled = [...wordPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const useWRTStore = create<WRTStore>()(
  persist(
    (set, get) => ({
      phase: "idle",
      wordList: [],
      recalledWords: [],
      score: 0,
      correctWords: [],
      missedWords: [],

      startTest: () => {
        const randomWords = getRandomWords(10);
        set({
          phase: "memorize",
          wordList: randomWords,
          recalledWords: [],
          score: 0,
          correctWords: [],
          missedWords: [],
        });
      },

      startRecallPhase: () => {
        set({ phase: "recall" });
      },

      submitRecall: (words: string[]) => {
        const { wordList } = get();
        const normalizedWordList = wordList.map((word) => word.toLowerCase());
        const normalizedRecalledWords = words.map((word) => word.toLowerCase());

        const correctWords = normalizedRecalledWords.filter((word) =>
          normalizedWordList.includes(word)
        );
        const uniqueCorrectWords = Array.from(new Set(correctWords));
        const score = uniqueCorrectWords.length;

        const missedWords = normalizedWordList.filter(
          (word) => !normalizedRecalledWords.includes(word)
        );

        set({
          recalledWords: normalizedRecalledWords,
          score,
          correctWords: uniqueCorrectWords,
          missedWords,
          phase: "results",
        });
      },

      resetTest: () => {
        set({
          phase: "idle",
          wordList: [],
          recalledWords: [],
          score: 0,
          correctWords: [],
          missedWords: [],
        });
      },
    }),
    {
      name: "wrt-store",
    }
  )
);
