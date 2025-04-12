"use client"

import { useState } from "react"
import { useWRTStore } from "@/lib/store/wrt-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function RecallInput() {
  const { submitRecall } = useWRTStore()
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    const words = input
      .toLowerCase()
      .split(/[\s,]+/)
      .filter((word) => word.trim() !== "")
    submitRecall(words)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Recall Phase</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Type all the words you can remember, separated by spaces or commas.
        </p>
        <Textarea
          placeholder="Type the words you remember..."
          className="min-h-[150px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">
        Submit Answers
      </Button>
    </div>
  )
}
