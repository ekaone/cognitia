import { BrainCircuit } from "lucide-react";
import WordRecallTest from "@/components/word-recall/word-recall-test";
import WordRecallHistory from "@/components/word-recall/word-recall-history";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-center w-full">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            WordRecall
          </h1>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Word Recall
        </h1>
        <p className="max-w-[42rem] mx-auto text-xl text-gray-300">
          A cognitive assessment tool to measure word recall
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="max-w-md mx-auto lg:mx-0">
            <WordRecallTest />
          </div>
          <div className="max-w-md mx-auto lg:mx-0">
            <WordRecallHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
