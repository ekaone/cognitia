"use client";

import { useScoreHistoryStore } from "@/lib/store/score-history-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ScoreHistory() {
  const { scores, clearHistory } = useScoreHistoryStore();

  if (scores.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">No History Yet</h3>
            <p className="text-muted-foreground">
              Complete a test to see your history here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Score History</CardTitle>
        <Button variant="destructive" size="sm" onClick={clearHistory}>
          <Trash2 className="h-4 w-4 mr-1" /> Clear History
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scores.map((score, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">
                    Score: {score.score}/{score.totalWords}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(score.date), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="text-sm">
                  <p>Correct words: {score.correctWords.join(", ")}</p>
                  <p>Missed words: {score.missedWords.join(", ")}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
