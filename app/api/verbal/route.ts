import { NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { validateWordsPrompt } from "@/lib/ai-prompts";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 30000; // 30 seconds
const MAX_REQUESTS = 20; // Max requests per 30 seconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimit.get(ip);

  if (!userData || now > userData.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userData.count >= MAX_REQUESTS) {
    return false;
  }

  userData.count++;
  return true;
}

// POST handler for word validation
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { words, category, action } = body;

    if (!words || !category || !action) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    if (action !== "validateWords") {
      return NextResponse.json(
        { error: "Invalid action specified" },
        { status: 400 }
      );
    }

    const prompt = validateWordsPrompt(words, category);
    const response = await generateText({
      model: openai("gpt-4"),
      prompt,
      temperature: 0.3,
    });

    if (!response.text) {
      throw new Error("No response from AI model");
    }

    const result = JSON.parse(response.text);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
