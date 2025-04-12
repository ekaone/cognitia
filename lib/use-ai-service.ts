"use client";

import { useState, useEffect, useCallback } from "react";

interface AIResponse {
  validWords?: string[];
  invalidWords?: string[];
  similarWords?: { word: string; suggestions: string[] }[];
  feedback?: string;
  suggestions?: string[];
  modelUsed?: string;
}

export function useAIService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverKeyAvailable, setServerKeyAvailable] = useState<boolean | null>(
    null
  );
  const [currentModel, setCurrentModel] = useState<string>("gpt-4");

  // Validate if the words belong to the category
  const validateWords = useCallback(
    async (words: string[], category: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/verbal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            words,
            category,
            action: "validateWords",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 429) {
            throw new Error(
              "Rate limit reached. Please try again in a few minutes."
            );
          }
          throw new Error(errorData.error || "Failed to validate words");
        }

        const result: AIResponse = await response.json();
        setCurrentModel(result.modelUsed || "gpt-4");

        return {
          validWords: result.validWords || [],
          invalidWords: result.invalidWords || [],
          similarWords: result.similarWords || [],
        };
      } catch (err) {
        console.error("AI validation error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to validate words"
        );
        return { validWords: words, invalidWords: [] };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Generate feedback based on the user's performance
  const generateFeedback = async (
    words: string[],
    category: string,
    timeLimit: number,
    validWords: string[],
    invalidWords: string[]
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/verbal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          words,
          category,
          timeLimit,
          validWords,
          invalidWords,
          action: "generateFeedback",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error(
            "Rate limit reached. Please try again in a few minutes."
          );
        }
        throw new Error(errorData.error || "Failed to generate feedback");
      }

      const result: AIResponse = await response.json();
      setCurrentModel(result.modelUsed || "gpt-4");
      return result;
    } catch (err) {
      console.error("AI feedback error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate feedback"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if server API key is available
  const checkServerApiKey = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/verbal", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API key validation failed");
      }

      const result = await response.json();
      setServerKeyAvailable(result.valid);
      return result.valid;
    } catch (err) {
      console.error("API key validation error:", err);
      setError("API key validation failed. Please check your configuration.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if we have a valid API key from server
  const hasValidApiKey = (): boolean => {
    return serverKeyAvailable === true;
  };

  return {
    validateWords,
    generateFeedback,
    checkServerApiKey,
    isLoading,
    error,
    hasApiKey: hasValidApiKey(),
    serverKeyAvailable,
    currentModel,
  };
}
