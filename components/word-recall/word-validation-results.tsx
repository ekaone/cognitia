"use client";

import { useState, useEffect, useCallback } from "react";
import { useTaskStore } from "@/lib/store/use-task-store";
import { useAIService } from "@/lib/use-ai-service";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { AIFeedback } from "../ai-feedback";

interface SimilarWord {
  word1: string;
  word2: string;
}

export function WordValidationResults() {
  const { words, category, timeLimit } = useTaskStore();
  const { validateWords, isLoading, hasApiKey } = useAIService();
  const [validWords, setValidWords] = useState<string[]>([]);
  const [invalidWords, setInvalidWords] = useState<string[]>([]);
  const [similarWords, setSimilarWords] = useState<SimilarWord[]>([]);
  const [isValidated, setIsValidated] = useState(false);

  const validateUserWords = useCallback(async () => {
    if (words.length === 0 || isValidated || isLoading) return;

    // If no API key, consider all words valid
    if (!hasApiKey) {
      setValidWords(words);
      setInvalidWords([]);
      setSimilarWords([]);
      setIsValidated(true);
      return;
    }

    const result = await validateWords(words, category);

    setValidWords(result.validWords || []);
    setInvalidWords(result.invalidWords || []);
    setSimilarWords(result.similarWords || []);
    setIsValidated(true);
  }, [words, category, hasApiKey, validateWords, isValidated, isLoading]);

  useEffect(() => {
    if (!isValidated && !isLoading) {
      validateUserWords();
    }
  }, [validateUserWords, isValidated, isLoading]);

  if (isLoading && !isValidated) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Analyzing Results</h2>
          <p className="text-gray-600">Validating your words...</p>
        </div>

        <div className="flex justify-center my-8">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
        </div>
      </div>
    );
  }

  const uniqueCount = validWords.length;
  const invalidCount = invalidWords.length;
  const similarCount = similarWords.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Results</h2>
        <p className="text-gray-600">
          You named {words.length} words, with {uniqueCount} valid {category} in{" "}
          {timeLimit} seconds
        </p>
      </div>

      <Tabs defaultValue="valid" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="valid" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Valid ({uniqueCount})
          </TabsTrigger>
          <TabsTrigger value="invalid" className="flex items-center gap-1">
            <XCircle className="h-4 w-4" />
            Invalid ({invalidCount})
          </TabsTrigger>
          <TabsTrigger value="similar" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Similar ({similarCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="valid">
          <Card className="p-4 bg-emerald-50 border-emerald-200">
            <ScrollArea className="h-[200px] rounded-md border p-2 bg-white">
              {validWords.length > 0 ? (
                <ul className="space-y-1">
                  {validWords.map((word, index) => (
                    <li key={`valid-${index}`} className="text-sm">
                      {word}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic p-2">
                  No valid words found
                </p>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="invalid">
          <Card className="p-4 bg-amber-50 border-amber-200">
            <ScrollArea className="h-[200px] rounded-md border p-2 bg-white">
              {invalidWords.length > 0 ? (
                <ul className="space-y-1">
                  {invalidWords.map((word, index) => (
                    <li key={`invalid-${index}`} className="text-sm">
                      {word}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic p-2">
                  No invalid words found
                </p>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="similar">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <ScrollArea className="h-[200px] rounded-md border p-2 bg-white">
              {similarWords.length > 0 ? (
                <ul className="space-y-1">
                  {similarWords.map((pair, index) => (
                    <li key={`similar-${index}`} className="text-sm">
                      &quot;{pair.word1}&quot; and &quot;{pair.word2}&quot; are
                      similar
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic p-2">
                  No similar words found
                </p>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      <AIFeedback validWords={validWords} invalidWords={invalidWords} />
    </div>
  );
}
