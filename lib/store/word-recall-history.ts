"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WordRecallScore {
  id: string;
  date: string;
  score: number;
  totalWords: number;
  correctWords: string[];
  missedWords: string[];
}

interface WordRecallHistoryStore {
  scores: WordRecallScore[];
  addScore: (score: Omit<WordRecallScore, "id">) => void;
  clearHistory: () => void;
}

export const useWordRecallHistoryStore = create<WordRecallHistoryStore>()(
  persist(
    (set) => ({
      scores: [],
      addScore: (score) =>
        set((state) => ({
          scores: [
            {
              ...score,
              id: crypto.randomUUID(),
              correctWords: score.correctWords || [],
              missedWords: score.missedWords || [],
            },
            ...state.scores,
          ],
        })),
      clearHistory: () => set({ scores: [] }),
    }),
    {
      name: "word-recall-history",
    }
  )
);
