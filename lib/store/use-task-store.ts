import { create } from "zustand";
import { persist } from "zustand/middleware";

type TaskStatus = "waiting" | "active" | "finished";

interface TaskState {
  status: TaskStatus;
  category: string;
  timeLimit: number;
  timeRemaining: number;
  words: string[];

  // Actions
  setCategory: (category: string) => void;
  setTimeLimit: (seconds: number) => void;
  startTask: () => void;
  finishTask: () => void;
  resetTask: () => void;
  addWord: (word: string) => void;
  decrementTime: () => void;

  // History
  history: {
    date: string;
    category: string;
    uniqueCount: number;
    totalCount: number;
    score?: number;
  }[];
  addToHistory: (score?: number) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      status: "waiting",
      category: "animals",
      timeLimit: 30,
      timeRemaining: 30,
      words: [],
      history: [],

      setCategory: (category) => set({ category }),

      setTimeLimit: (seconds) =>
        set({
          timeLimit: seconds,
          timeRemaining: seconds,
        }),

      startTask: () =>
        set({
          status: "active",
          words: [],
          timeRemaining: get().timeLimit,
        }),

      finishTask: () => {
        set({ status: "finished" });
        get().addToHistory();
      },

      resetTask: () =>
        set({
          status: "waiting",
          words: [],
          timeRemaining: get().timeLimit,
        }),

      addWord: (word) =>
        set((state) => ({
          words: [...state.words, word.toLowerCase()],
        })),

      decrementTime: () =>
        set((state) => ({
          timeRemaining: Math.max(0, state.timeRemaining - 1),
        })),

      addToHistory: (score) => {
        const { category, words } = get();
        const uniqueWords = Array.from(new Set(words));

        set((state) => ({
          history: [
            {
              date: new Date().toISOString(),
              category,
              uniqueCount: uniqueWords.length,
              totalCount: words.length,
              score,
            },
            ...state.history,
          ],
        }));
      },
    }),
    {
      name: "verbal-fluency-task",
      partialize: (state) => ({
        history: state.history,
        category: state.category,
        timeLimit: state.timeLimit,
      }),
    }
  )
);
