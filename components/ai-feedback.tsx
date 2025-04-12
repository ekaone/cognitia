"use client";

import { useState, useEffect, useCallback } from "react";
import { useTaskStore } from "@/lib/store/use-task-store";
import { useAIService } from "@/lib/use-ai-service";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Lightbulb, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AIFeedbackProps {
  validWords: string[];
  invalidWords: string[];
}

interface FeedbackResponse {
  score: number;
  feedback: string;
  suggestions: string[];
  creativity: string;
}

export function AIFeedback({ validWords, invalidWords }: AIFeedbackProps) {
  const { category, timeLimit, words } = useTaskStore();
  const { generateFeedback, isLoading, error, hasApiKey, serverKeyAvailable } =
    useAIService();
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);

  const generateFeedbackCallback = useCallback(async () => {
    if (validWords.length === 0) return;

    const result = await generateFeedback(
      words,
      category,
      timeLimit,
      validWords,
      invalidWords
    );

    if (result) {
      setFeedback(result);
    }
  }, [words, category, timeLimit, validWords, invalidWords, generateFeedback]);

  useEffect(() => {
    generateFeedbackCallback();
  }, [generateFeedbackCallback]);

  // No API key available (neither user nor server)
  if (!hasApiKey && serverKeyAvailable !== true) {
    return (
      <Alert className="bg-blue-50 text-blue-800 border-blue-200 mt-6">
        <Brain className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          Add your OpenAI API key in settings to get AI-powered feedback on your
          performance.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 mt-6 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mb-4" />
        <p className="text-center text-gray-600">
          Analyzing your performance...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!feedback) return null;

  const getCreativityColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "medium":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "high":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Sparkles className="h-5 w-5 text-emerald-600 mr-2" />
          AI Feedback
        </h3>
        <Badge className={getCreativityColor(feedback.creativity)}>
          {feedback.creativity.charAt(0).toUpperCase() +
            feedback.creativity.slice(1)}{" "}
          Creativity
        </Badge>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Performance Score</span>
          <span className="text-sm font-medium">{feedback.score}/100</span>
        </div>
        <Progress value={feedback.score} className="h-2" />
      </div>

      <p className="text-gray-700 mb-4">{feedback.feedback}</p>

      {feedback.suggestions && feedback.suggestions.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold flex items-center mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500 mr-1" />
            Suggestions for Improvement
          </h4>
          <ul className="space-y-1">
            {feedback.suggestions.map((suggestion: string, index: number) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start"
              >
                <span className="text-amber-500 mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
