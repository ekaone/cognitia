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
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6" />
          <h1 className="text-2xl font-bold">DigitSpan</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Test Your Memory Capacity
        </h1>
        <p className="max-w-[42rem] text-muted-foreground text-xl">
          Challenge your short-term memory and working memory with our digit
          span test.
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Forward Digit Span</CardTitle>
            <CardDescription>
              Repeat digits in the same order they are presented
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 text-2xl font-bold text-center">
              <div className="flex space-x-2">
                <span className="p-2 border rounded">3</span>
                <span className="p-2 border rounded">7</span>
                <span className="p-2 border rounded">1</span>
                <span className="p-2 border rounded">9</span>
              </div>
              <ArrowRight className="mx-4" />
              <div className="flex space-x-2">
                <span className="p-2 border rounded">3</span>
                <span className="p-2 border rounded">7</span>
                <span className="p-2 border rounded">1</span>
                <span className="p-2 border rounded">9</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/digit-span/test?mode=forward" className="w-full">
              <Button className="w-full">Start Forward Test</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Backward Digit Span</CardTitle>
            <CardDescription>
              Repeat digits in reverse order from how they are presented
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 text-2xl font-bold text-center">
              <div className="flex space-x-2">
                <span className="p-2 border rounded">3</span>
                <span className="p-2 border rounded">7</span>
                <span className="p-2 border rounded">1</span>
                <span className="p-2 border rounded">9</span>
              </div>
              <ArrowRight className="mx-4" />
              <div className="flex space-x-2">
                <span className="p-2 border rounded">9</span>
                <span className="p-2 border rounded">1</span>
                <span className="p-2 border rounded">7</span>
                <span className="p-2 border rounded">3</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/digit-span/test?mode=backward" className="w-full">
              <Button className="w-full">Start Backward Test</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col items-center mt-8 space-y-4">
        <h2 className="text-2xl font-bold">Your Performance</h2>
        <div className="flex items-center space-x-4">
          <Card className="w-40">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">Forward Best</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-3xl font-bold text-center">
                {stats.forward.best}
              </p>
            </CardContent>
          </Card>
          <Card className="w-40">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">Backward Best</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-3xl font-bold text-center">
                {stats.backward.best}
              </p>
            </CardContent>
          </Card>
          <Link href="/digit-span/stats">
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4" />
              <span>View Stats</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
