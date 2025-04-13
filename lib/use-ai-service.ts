"use client";

import { useState, useCallback } from "react";

const MAX_RETRIES = 3;
const BASE_DELAY = 2000;

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = MAX_RETRIES,
  delay = BASE_DELAY
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok && response.status === 429 && retries > 0) {
      const nextDelay = delay * 2;
      await new Promise((resolve) => setTimeout(resolve, nextDelay));
      return fetchWithRetry(url, options, retries - 1, nextDelay);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      const nextDelay = delay * 2;
      await new Promise((resolve) => setTimeout(resolve, nextDelay));
      return fetchWithRetry(url, options, retries - 1, nextDelay);
    }
    throw error;
  }
}

export function useAIService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateWords = useCallback(
    async (words: string[], category: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWithRetry("/api/verbal", {
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
          throw new Error("Failed to validate words");
        }

        const result = await response.json();
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
        return { validWords: [], invalidWords: [], similarWords: [] };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    validateWords,
    isLoading,
    error,
  };
}
