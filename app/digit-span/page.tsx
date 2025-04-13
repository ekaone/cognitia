"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Brain, ArrowRight, BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Home() {
  const [stats, setStats] = useState({
    forward: { best: 0 },
    backward: { best: 0 },
  });

  useEffect(() => {
    // Load stats from localStorage
    const loadStats = () => {
      try {
        const savedStats = localStorage.getItem("digitSpanStats");
        if (savedStats) {
          setStats(JSON.parse(savedStats));
        }
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-center w-full">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            DigitSpan
          </h1>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Test Your Memory Capacity
        </h1>
        <p className="max-w-[42rem] mx-auto text-xl text-gray-300">
          Challenge your short-term memory and working memory with our digit
          span test.
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="transition-all hover:shadow-md border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-600">
              Forward Digit Span
            </CardTitle>
            <CardDescription>
              Repeat digits in the same order they are presented
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 text-2xl font-bold text-center">
              <div className="flex space-x-2">
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  3
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  7
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  1
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  9
                </span>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="size-8 mx-6 text-purple-600" />
                </motion.div>
              </div>
              <div className="flex space-x-2">
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  3
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  7
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  1
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  9
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/digit-span/test?mode=forward" className="w-full">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Start Forward Test
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all hover:shadow-md border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-600">
              Backward Digit Span
            </CardTitle>
            <CardDescription>
              Repeat digits in reverse order from how they are presented
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 text-2xl font-bold text-center">
              <div className="flex space-x-2">
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  3
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  7
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  1
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  9
                </span>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="size-8 mx-6 text-purple-600" />
                </motion.div>
              </div>
              <div className="flex space-x-2">
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  9
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  1
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  7
                </span>
                <span className="p-2 border rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                  3
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/digit-span/test?mode=backward" className="w-full">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Start Backward Test
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col items-center mt-12 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Performance
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="mb-4"
        >
          <Link href="/digit-span/stats">
            <Button
              variant="outline"
              className="flex items-center space-x-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:text-purple-700 h-12 px-6"
            >
              <BarChart2 className="w-4 h-4" />
              <span className="font-medium">View Stats</span>
            </Button>
          </Link>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="w-48 border-2 border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm text-purple-600 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Forward Best
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <motion.p
                  className="text-4xl font-bold text-center text-purple-600"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {stats.forward.best}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="w-48 border-2 border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm text-purple-600 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Backward Best
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <motion.p
                  className="text-4xl font-bold text-center text-purple-600"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {stats.backward.best}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
