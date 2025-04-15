import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

interface ElevenLabsError {
  detail: {
    status: string;
    message: string;
  };
}

export async function GET() {
  const agentId = process.env.AGENT_ID;
  if (!agentId) {
    throw Error("AGENT_ID is not set");
  }
  try {
    const client = new ElevenLabsClient();
    const response = await client.conversationalAi.getSignedUrl({
      agent_id: agentId,
    });
    return NextResponse.json({ signedUrl: response.signed_url });
  } catch (error) {
    console.error("Error:", error);
    // Check if the error has the expected ElevenLabs format
    const elevenLabsError = error as ElevenLabsError;
    if (elevenLabsError?.detail?.status === "invalid_api_key") {
      return NextResponse.json(
        {
          detail: {
            status: elevenLabsError.detail.status,
            message: elevenLabsError.detail.message,
          },
        },
        { status: 401 }
      );
    }
    // Fallback for other types of errors
    return NextResponse.json(
      {
        detail: {
          status: "error",
          message: "An unexpected error occurred",
        },
      },
      { status: 500 }
    );
  }
}
