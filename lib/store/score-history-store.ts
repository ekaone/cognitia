"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScoreRecord {
  date: string;
  score: number;
  totalWords: number;
  correctWords: string[];
  missedWords: string[];
}

interface ScoreHistoryStore {
  scores: ScoreRecord[];
  addScore: (score: ScoreRecord) => void;
  clearHistory: () => void;
}

export const useScoreHistoryStore = create<ScoreHistoryStore>()(
  persist(
    (set) => ({
      scores: [],

      addScore: (score) => {
        set((state) => ({
          scores: [score, ...state.scores].slice(0, 20), // Keep only the 20 most recent scores
        }));
      },

      clearHistory: () => {
        set({ scores: [] });
      },
    }),
    {
      name: "score-history-store",
    }
  )
);
