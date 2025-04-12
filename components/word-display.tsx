"use client"

import { useEffect, useState } from "react"
import { useWRTStore } from "@/lib/store/wrt-store"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function WordDisplay() {
  const { wordList, startRecallPhase } = useWRTStore()
  const [timeLeft, setTimeLeft] = useState(30)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Add a separate effect to handle phase transition when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      // Use setTimeout to push this state update to the next event cycle
      const transitionTimeout = setTimeout(() => {
        startRecallPhase()
      }, 0)

      return () => clearTimeout(transitionTimeout)
    }
  }, [timeLeft, startRecallPhase])

  useEffect(() => {
    setProgress((timeLeft / 30) * 100)
  }, [timeLeft])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Memorize these words</h3>
          <span className="text-sm font-medium">{timeLeft} seconds left</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {wordList.map((word, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4 text-center">
              <p className="text-lg font-medium">{word}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
