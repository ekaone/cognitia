"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTaskStore } from "@/lib/store/use-task-store";
import { useAIService } from "@/lib/use-ai-service";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

interface SimilarWord {
  word1: string;
  word2: string;
}

export function WordValidationResults() {
  const { words, category, resetTask } = useTaskStore();
  const router = useRouter();
  const { validateWords, isLoading } = useAIService();
  const [validWords, setValidWords] = useState<string[]>([]);
  const [invalidWords, setInvalidWords] = useState<string[]>([]);
  const [similarWords, setSimilarWords] = useState<SimilarWord[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const validationTimeout = useRef<NodeJS.Timeout | null>(null);

  const validateUserWords = useCallback(async () => {
    if (words.length === 0 || isValidated || isLoading) return;

    if (validationTimeout.current) {
      clearTimeout(validationTimeout.current);
    }

    validationTimeout.current = setTimeout(async () => {
      const result = await validateWords(words, category);
      setValidWords(result.validWords);
      setInvalidWords(result.invalidWords);
      setSimilarWords(result.similarWords);
      setIsValidated(true);
    }, 1000);
  }, [words, category, validateWords, isValidated, isLoading]);

  useEffect(() => {
    if (!isValidated && !isLoading) {
      validateUserWords();
    }
    return () => {
      if (validationTimeout.current) {
        clearTimeout(validationTimeout.current);
      }
    };
  }, [validateUserWords, isValidated, isLoading]);

  const handleTryAgain = () => {
    resetTask();
    router.push("/verbal-fluency");
  };

  if (isLoading && !isValidated) {
    return (
      <div className="flex justify-center my-8">
        <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
      </div>
    );
  }

  const uniqueCount = validWords.length;
  const invalidCount = invalidWords.length;
  const similarCount = similarWords.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
        >
          Results
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          You named {words.length} words in the category &quot;{category}&quot;
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid gap-4"
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-emerald-800">
              Valid Words ({uniqueCount})
            </h3>
          </div>
          <ScrollArea className="h-[100px] rounded-md">
            <div className="flex flex-wrap gap-2">
              {validWords.map((word, index) => (
                <motion.span
                  key={`valid-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {invalidWords.length > 0 && (
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">
                Invalid Words ({invalidCount})
              </h3>
            </div>
            <ScrollArea className="h-[100px] rounded-md">
              <div className="flex flex-wrap gap-2">
                {invalidWords.map((word, index) => (
                  <motion.span
                    key={`invalid-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </ScrollArea>
          </Card>
        )}

        {similarWords.length > 0 && (
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">
                Similar Words ({similarCount})
              </h3>
            </div>
            <ScrollArea className="h-[100px] rounded-md">
              <div className="flex flex-col gap-2">
                {similarWords.map((pair, index) => (
                  <motion.div
                    key={`similar-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm text-blue-700"
                  >
                    <span className="bg-blue-100 px-2 py-1 rounded">
                      {pair.word1}
                    </span>
                    <span className="mx-2">is similar to</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">
                      {pair.word2}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <Button
          onClick={handleTryAgain}
          className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
