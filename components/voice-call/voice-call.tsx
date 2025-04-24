"use client";

import { useState, useCallback } from "react";
import { Phone, PhoneOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useConversation } from "@11labs/react";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    console.error("Microphone permission denied");
    return false;
  }
}

export default function VoiceCall() {
  const [call, setCall] = useState(false);
  const [apiError, setApiError] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("connected");
      setApiError(false);
    },
    onDisconnect: () => {
      console.log("disconnected");
      setCall(false);
    },
    onError: (error: Error | string) => {
      console.log(error);
      const errorMessage = typeof error === "string" ? error : error.message;
      if (
        errorMessage?.includes("API key") ||
        errorMessage?.includes("authentication")
      ) {
        setApiError(true);
        alert(
          "Invalid API key. Please check your ElevenLabs API configuration."
        );
      } else {
        alert("An error occurred during the conversation");
      }
    },
    onMessage: (message) => {
      console.log(message);
    },
  });

  // Start conversation
  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      alert("No permission");
      return;
    }
    const signedUrl = await getSignedUrl();
    const conversationId = await conversation.startSession({ signedUrl });
    console.log(conversationId);
  }

  // Stop conversation
  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  async function getSignedUrl(): Promise<string> {
    try {
      const response = await fetch("/api/signed-url");
      if (!response.ok) {
        const errorData = await response.json();
        if (
          response.status === 401 ||
          response.status === 500 ||
          errorData.detail?.status === "invalid_api_key"
        ) {
          setApiError(true);
          throw new Error(errorData.detail?.message || "Invalid API key");
        }
        throw new Error(
          errorData.detail?.message || "Failed to get signed url"
        );
      }
      const data = await response.json();
      return data.signedUrl;
    } catch (error) {
      if (error instanceof Error && error.message.includes("API key")) {
        setApiError(true);
      }
      throw error;
    }
  }

  const startCall = (start: boolean) => {
    setCall(true);

    startConversation()
      .then(() => {
        console.log("Conversation started");
      })
      .catch((error) => {
        console.error("Error starting conversation:", error);
      });

    if (start) {
      console.log("Start Call");
    }
    // Here you would implement actual recording logic
  };

  const stopCall = (stop: boolean) => {
    setCall(false);

    stopConversation()
      .then(() => {
        console.log("Conversation ended");
      })
      .catch((error) => {
        console.error("Error ending conversation:", error);
      });

    if (stop) {
      console.log("Stop Call");
    } else {
      console.log("Otherwise");
    }
  };

  return (
    <div className="fixed bottom-16 right-6 z-30">
      <AnimatePresence mode="wait">
        {!call ? (
          <motion.button
            key="call-button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
            onClick={() => startCall(true)}
            className={`rounded-full border-2 p-3 transition-colors relative ${
              apiError
                ? "border-red-300 bg-red-50 hover:bg-red-100"
                : "border-green-300 hover:bg-gradient-to-br hover:from-green-200 hover:via-blue-200 hover:to-white bg-gradient-to-br from-green-300 via-blue-300 to-white"
            }`}
            aria-label="Start call"
            disabled={apiError}
          >
            {apiError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
              >
                <AlertCircle className="h-4 w-4 text-white" />
              </motion.div>
            )}
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              <Phone
                className={`h-6 w-6 ${
                  apiError ? "text-red-700" : "text-green-700"
                }`}
              />
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="active-call-ui"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
            className="flex items-center gap-4 bg-red-50 px-4 py-2 rounded-full"
          >
            <div className="flex items-center h-10 gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-green-500 w-1.5 rounded-full"
                  initial={{ height: 5 }}
                  animate={{
                    height: [5, 15 + Math.random() * 15, 5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => stopCall(true)}
              className="rounded-full p-2 bg-red-100 hover:bg-red-200 transition-colors"
              aria-label="End call"
            >
              <PhoneOff className="h-5 w-5 text-red-700" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
