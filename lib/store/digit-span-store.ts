"use client";

import { create } from "zustand";

type TestState = "instructions" | "displaying" | "input" | "results";
type TestMode = "forward" | "backward";

interface DigitSpanState {
  mode: TestMode;
  testState: TestState;
  currentLevel: number;
  maxLevel: number;
  currentSequence: number[];
  isCorrect: boolean;

  // Actions
  initializeTest: (mode: TestMode) => void;
  startDisplaying: () => void;
  startUserInput: () => void;
  submitAnswer: (answer: number[]) => void;
  resetTest: () => void;
  updateStats: () => void;
}

export const useDigitSpanStore = create<DigitSpanState>((set, get) => ({
  mode: "forward",
  testState: "instructions",
  currentLevel: 3, // Start with 3 digits
  maxLevel: 0,
  currentSequence: [],
  isCorrect: false,

  initializeTest: (mode) => {
    const sequence = generateSequence(3); // Start with 3 digits

    set({
      mode,
      testState: "instructions",
      currentLevel: 3,
      maxLevel: 0,
      currentSequence: sequence,
      isCorrect: false,
    });
  },

  startDisplaying: () => {
    set({ testState: "displaying" });
  },

  startUserInput: () => {
    set({ testState: "input" });
  },

  submitAnswer: (answer) => {
    const { currentSequence, mode, currentLevel } = get();

    // Check if the answer is correct based on mode
    let isCorrect = false;

    if (mode === "forward") {
      isCorrect = arraysEqual(currentSequence, answer);
    } else {
      // For backward mode, compare with reversed sequence
      const reversedSequence = [...currentSequence].reverse();
      isCorrect = arraysEqual(reversedSequence, answer);
    }

    if (isCorrect) {
      // Generate a new sequence with one more digit
      const newLevel = currentLevel + 1;
      const newSequence = generateSequence(newLevel);

      set({
        currentLevel: newLevel,
        currentSequence: newSequence,
        maxLevel: newLevel - 1,
        testState: "displaying",
        isCorrect: true,
      });
    } else {
      // End the test
      set({
        maxLevel: currentLevel,
        testState: "results",
        isCorrect: false,
      });
    }
  },

  resetTest: () => {
    set({
      testState: "instructions",
      currentLevel: 3,
      maxLevel: 0,
      currentSequence: [],
      isCorrect: false,
    });
  },

  updateStats: () => {
    const { mode, maxLevel } = get();

    try {
      // Get existing stats from localStorage
      const savedStatsStr = localStorage.getItem("digitSpanStats");
      const savedStats = savedStatsStr
        ? JSON.parse(savedStatsStr)
        : {
            forward: { history: [], best: 0, average: 0 },
            backward: { history: [], best: 0, average: 0 },
          };

      // Update stats for the current mode
      const modeStats = savedStats[mode];
      const newHistory = [...modeStats.history, maxLevel];
      const newBest = Math.max(modeStats.best, maxLevel);
      const newAverage =
        newHistory.reduce((a, b) => a + b, 0) / newHistory.length;

      // Save updated stats
      const updatedStats = {
        ...savedStats,
        [mode]: {
          history: newHistory,
          best: newBest,
          average: newAverage,
        },
      };

      localStorage.setItem("digitSpanStats", JSON.stringify(updatedStats));
    } catch (error) {
      console.error("Failed to update stats:", error);
    }
  },
}));

// Helper functions
function generateSequence(length: number): number[] {
  const sequence: number[] = [];

  for (let i = 0; i < length; i++) {
    // Generate random digit (0-9)
    const digit = Math.floor(Math.random() * 10);
    sequence.push(digit);
  }

  return sequence;
}

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
