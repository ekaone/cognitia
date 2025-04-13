"use client";

import { TaskInstructions } from "@/components/verbal-fluency/task-instructions";
import { CountdownTimer } from "@/components/verbal-fluency/countdown-timer";
import { WordInputBox } from "@/components/verbal-fluency/word-input-box";
import { WordValidationResults } from "@/components/verbal-fluency/word-validation-results";
import { CategorySelector } from "@/components/verbal-fluency/category-selector";
import { StartButton } from "@/components/verbal-fluency/start-button";
import { useTaskStore } from "@/lib/store/use-task-store";
import { Card, CardContent } from "@/components/ui/card";
import { Album, LayoutList, Clock, ListChecks, Bot } from "lucide-react";
import { motion } from "motion/react";

export default function VerbalFluencyPage() {
  const { status } = useTaskStore();

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-center w-full">
        <div className="flex items-center space-x-2">
          <Album className="w-6 h-6 text-emerald-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            VerbalFluency
          </h1>
        </div>
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center pb-2 mb-2 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
        Verbal Fluency Task
      </h1>
      <p className="text-center text-emerald-200/90 mb-8 font-medium">
        A cognitive assessment tool to measure verbal fluency
      </p>
      <Card className="border-2 border-emerald-100">
        <CardContent className="pt-6 space-y-8">
          {status === "waiting" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <p className="text-gray-700 leading-relaxed">
                  This task measures your ability to generate words from a
                  <motion.span
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                    }}
                    className="mx-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium inline-flex items-center"
                  >
                    <ListChecks className="w-4 h-4 mr-1" />
                    specific category
                  </motion.span>
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <LayoutList className="w-4 h-4 text-emerald-600" />
                    <span>Select a category</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>30 seconds time limit</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ x: [0, -4, 4, -4, 4, 0] }} // Shake left-right
                      transition={{
                        duration: 0.6, // Duration of one shake
                        repeat: Infinity, // Keep it going
                        repeatDelay: 2.4, // 3s total interval (0.6 + 2.4)
                        ease: "easeInOut",
                      }}
                    >
                      <Bot className="w-4 h-4 text-emerald-600" />
                    </motion.div>
                    <span>AI Validation</span>
                  </motion.div>
                </div>
              </motion.div>

              <div className="space-y-6">
                <CategorySelector />
                <div className="flex justify-center">
                  <StartButton />
                </div>
              </div>
            </>
          )}

          {status === "active" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <TaskInstructions />
                <CountdownTimer />
              </div>
              <WordInputBox />
            </motion.div>
          )}

          {status === "finished" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <WordValidationResults />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
