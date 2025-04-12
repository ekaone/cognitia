"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LineChart } from "@/components/ui/chart2";
import { motion } from "motion/react";

export default function StatsPage() {
  const [stats, setStats] = useState({
    forward: {
      history: [],
      best: 0,
      average: 0,
    },
    backward: {
      history: [],
      best: 0,
      average: 0,
    },
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
        // Set default empty stats if there's an error
        setStats({
          forward: {
            history: [],
            best: 0,
            average: 0,
          },
          backward: {
            history: [],
            best: 0,
            average: 0,
          },
        });
      }
    };

    loadStats();
  }, []);

  const forwardData = {
    labels: stats.forward.history.map((_, i) => `Test ${i + 1}`),
    datasets: [
      {
        label: "Forward Span",
        data: stats.forward.history,
        borderColor: "hsl(270, 100%, 50%)",
        backgroundColor: "hsl(270, 100%, 50%, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const backwardData = {
    labels: stats.backward.history.map((_, i) => `Test ${i + 1}`),
    datasets: [
      {
        label: "Backward Span",
        data: stats.backward.history,
        borderColor: "hsl(330, 100%, 50%)",
        backgroundColor: "hsl(330, 100%, 50%, 0.1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-7xl mx-auto px-4 py-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 w-full max-w-7xl"
      >
        <Link href="/digit-span">
          <Button
            variant="ghost"
            size="icon"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Performance Stats
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800 transition-all">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-600">
                Forward Digit Span
              </CardTitle>
              <CardDescription>
                Your performance on forward digit span tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 text-center border-2 border-purple-100 dark:border-purple-900/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Best Score</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.forward.best}
                  </p>
                </div>
                <div className="p-4 text-center border-2 border-purple-100 dark:border-purple-900/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.forward.average.toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800 transition-all">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-600">
                Backward Digit Span
              </CardTitle>
              <CardDescription>
                Your performance on backward digit span tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 text-center border-2 border-purple-100 dark:border-purple-900/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Best Score</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.backward.best}
                  </p>
                </div>
                <div className="p-4 text-center border-2 border-purple-100 dark:border-purple-900/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.backward.average.toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full"
      >
        <Tabs defaultValue="forward" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-purple-50 dark:bg-purple-900/20">
            <TabsTrigger
              value="forward"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Forward History
            </TabsTrigger>
            <TabsTrigger
              value="backward"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Backward History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="forward" className="mt-6">
            <Card className="border-2 border-purple-100 dark:border-purple-900/30">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-600">
                  Forward Span History
                </CardTitle>
                <CardDescription>Your performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {stats.forward.history.length > 0 ? (
                  <LineChart
                    data={forwardData}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1,
                          },
                          grid: {
                            color: "rgba(147, 51, 234, 0.1)",
                          },
                        },
                        x: {
                          grid: {
                            color: "rgba(147, 51, 234, 0.1)",
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No data available yet. Complete some tests to see your
                    progress.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="backward" className="mt-6">
            <Card className="border-2 border-purple-100 dark:border-purple-900/30">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-purple-600">
                  Backward Span History
                </CardTitle>
                <CardDescription>Your performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {stats.backward.history.length > 0 ? (
                  <LineChart
                    data={backwardData}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1,
                          },
                          grid: {
                            color: "rgba(147, 51, 234, 0.1)",
                          },
                        },
                        x: {
                          grid: {
                            color: "rgba(147, 51, 234, 0.1)",
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No data available yet. Complete some tests to see your
                    progress.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
