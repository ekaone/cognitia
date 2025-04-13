"use client";

import {
  useWordRecallHistoryStore,
  WordRecallScore,
} from "@/lib/store/word-recall-history";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function WordRecallHistory() {
  const { scores, clearHistory } = useWordRecallHistoryStore();

  if (scores.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No test history yet. Complete a test to see your results here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Test History</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {scores.map((score) => (
              <ScoreCard key={score.id} score={score} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function ScoreCard({ score }: { score: WordRecallScore }) {
  return (
    <Card className="border-2">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-medium">
              Score: {score.score} / {score.totalWords}
            </h4>
            <p className="text-sm text-muted-foreground">
              {format(new Date(score.date), "MMM d, yyyy h:mm a")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              {score.correctWords?.length || 0} correct
            </p>
            <p className="text-sm text-muted-foreground">
              {score.missedWords?.length || 0} missed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Correct Words</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {score.correctWords?.length > 0 ? (
                score.correctWords.map((word, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-md text-sm"
                  >
                    {word}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No correct words
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Missed Words</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {score.missedWords?.length > 0 ? (
                score.missedWords.map((word, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md text-sm"
                  >
                    {word}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No missed words
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
