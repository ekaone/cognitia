import { create } from "zustand"
import { persist } from "zustand/middleware"

type Item = {
  id: number
  value: string
  isCompleted: boolean
}

type Phase = "instructions" | "test" | "results"

type ScoreRecord = {
  id: string
  timestamp: number
  phase: number
  time: number
  mistakes: number
}

interface TMTState {
  phase: Phase
  currentPhaseNumber: number
  items: Item[]
  currentIndex: number
  startTime: number
  elapsedTime: number
  isTimerRunning: boolean
  mistakes: number
  scoreHistory: ScoreRecord[]

  startTest: () => void
  handleItemClick: (id: number) => void
  startTimer: () => void
  stopTimer: () => void
  resetTest: () => void
  startNextPhase: () => void
  saveScore: (phase: number, time: number, mistakes: number) => void
  clearScoreHistory: () => void
}

// Helper function to generate items for Phase 1 (numbers only)
const generatePhase1Items = (): Item[] => {
  const items: Item[] = []
  for (let i = 1; i <= 15; i++) {
    items.push({
      id: i,
      value: i.toString(),
      isCompleted: false,
    })
  }
  return shuffleItems(items)
}

// Helper function to generate items for Phase 2 (numbers and letters)
const generatePhase2Items = (): Item[] => {
  const items: Item[] = []
  const letters = "ABCDEFGHIJKLMNO"

  for (let i = 0; i < 8; i++) {
    items.push({
      id: i * 2 + 1,
      value: (i + 1).toString(),
      isCompleted: false,
    })

    items.push({
      id: i * 2 + 2,
      value: letters[i],
      isCompleted: false,
    })
  }

  return shuffleItems(items)
}

// Helper function to shuffle items
const shuffleItems = (items: Item[]): Item[] => {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Create the persisted store
export const useTMTStore = create<TMTState>()(
  persist(
    (set, get) => ({
      phase: "instructions",
      currentPhaseNumber: 1,
      items: generatePhase1Items(),
      currentIndex: 0,
      startTime: 0,
      elapsedTime: 0,
      isTimerRunning: false,
      mistakes: 0,
      scoreHistory: [],

      startTest: () => {
        set({ phase: "test" })
      },

      handleItemClick: (id: number) => {
        const { items, currentIndex, isTimerRunning, startTimer, currentPhaseNumber } = get()

        // Find the clicked item
        const clickedItemIndex = items.findIndex((item) => item.id === id)
        const clickedItem = items[clickedItemIndex]

        // For Phase 1, we need to check if the clicked value is the next number in sequence
        // For Phase 2, we need to check if it's the next item in the alternating sequence
        let isCorrectItem = false

        if (currentPhaseNumber === 1) {
          // In Phase 1, the expected next value is currentIndex + 1
          isCorrectItem = Number.parseInt(clickedItem.value) === currentIndex + 1
        } else {
          // In Phase 2, we need to check if it's the next item in the alternating sequence
          const expectedValue =
            currentIndex % 2 === 0
              ? (Math.floor(currentIndex / 2) + 1).toString() // Number
              : String.fromCharCode(65 + Math.floor(currentIndex / 2)) // Letter

          isCorrectItem = clickedItem.value === expectedValue
        }

        if (isCorrectItem) {
          // Start timer on first correct click
          if (currentIndex === 0 && !isTimerRunning) {
            startTimer()
          }

          // Update the item to mark it as completed
          const updatedItems = [...items]
          updatedItems[clickedItemIndex] = {
            ...clickedItem,
            isCompleted: true,
          }

          // Check if this was the last item
          const isLastItem = currentIndex === items.length - 1

          if (isLastItem) {
            // Stop timer and show results
            const endTime = Date.now()
            const elapsedTime = endTime - get().startTime

            // Save the score
            get().saveScore(get().currentPhaseNumber, elapsedTime, get().mistakes)

            set({
              items: updatedItems,
              currentIndex: currentIndex + 1,
              isTimerRunning: false,
              elapsedTime,
              phase: "results",
            })
          } else {
            // Move to next item
            set({
              items: updatedItems,
              currentIndex: currentIndex + 1,
            })
          }
        } else {
          // Increment mistake counter for incorrect clicks
          set({ mistakes: get().mistakes + 1 })
        }
      },

      startTimer: () => {
        set({
          startTime: Date.now(),
          isTimerRunning: true,
        })
      },

      stopTimer: () => {
        const { startTime } = get()
        set({
          isTimerRunning: false,
          elapsedTime: Date.now() - startTime,
        })
      },

      resetTest: () => {
        set({
          phase: "instructions",
          currentPhaseNumber: 1,
          items: generatePhase1Items(),
          currentIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          isTimerRunning: false,
          mistakes: 0,
        })
      },

      startNextPhase: () => {
        set({
          phase: "instructions",
          currentPhaseNumber: 2,
          items: generatePhase2Items(),
          currentIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          isTimerRunning: false,
          mistakes: 0,
        })
      },

      saveScore: (phase, time, mistakes) => {
        const newScore: ScoreRecord = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          phase,
          time,
          mistakes,
        }

        set((state) => ({
          scoreHistory: [...state.scoreHistory, newScore],
        }))
      },

      clearScoreHistory: () => {
        set({ scoreHistory: [] })
      },
    }),
    {
      name: "tmt-scores", // name of the item in localStorage
      partialize: (state) => ({ scoreHistory: state.scoreHistory }), // only store scoreHistory
    },
  ),
)
