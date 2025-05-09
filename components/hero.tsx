"use client";

import Link from "next/link";
import { ArrowRight, Play, Pause } from "lucide-react";
import SectionEffect from "@/components/section-effect";
import { AuroraText } from "@/components/magicui/aurora-text";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative">
      <SectionEffect
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="mb-16"
      >
        {/* Gradient circular background with blur effect and smooth animation */}
        <motion.div
          initial={{ opacity: 0.7, scale: 0.98 }}
          animate={{
            opacity: [0.7, 0.85, 0.7],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, repeatType: "reverse" },
            scale: { duration: 6, repeat: Infinity, repeatType: "reverse" },
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] rounded-full gradient-radial-purple blur-[40px] md:blur-[80px] pointer-events-none will-change-transform will-change-opacity"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col items-center gap-8">
            <p className="text-purple-400 text-2xl">
              Track Cognitive Changes for Brain Health
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={togglePlayPause}
                className="relative group w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-700/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative flex items-center justify-center w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isPlaying ? "pause" : "play"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </button>
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex items-center h-10 gap-1"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-purple-500 w-1.5 rounded-full"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-100 text-center">
              Smart tools. Simple steps. Better care for your{" "}
              <AuroraText>loved</AuroraText> ones
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto mt-8">
            Cognitia offers reliable, research-based cognitive tests designed
            for early detection of dementia-related symptoms.
          </p>
          <Link
            href="/digit-span"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors relative overflow-hidden"
          >
            Try Digit Span Test
            <ArrowRight size={20} />
          </Link>
        </div>
      </SectionEffect>
      <audio
        ref={audioRef}
        className="hidden"
        onEnded={() => setIsPlaying(false)}
        controls
        preload="none"
      >
        <source
          src="https://res.cloudinary.com/ddjsyskef/video/upload/v1744794081/cognitia/orsnczm7zteqixum6wjb.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}
