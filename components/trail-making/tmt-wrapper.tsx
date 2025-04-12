"use client";

import { useEffect } from "react";
import TestInstructions from "./test-instructions";
import TMTGrid from "./tmt-grid";
import ResultEvaluator from "./result-evaluator";
import { useTMTStore } from "@/lib/store/trail-store";

export default function TMTWrapper() {
  const { phase, resetTest } = useTMTStore();

  // Reset test when component unmounts
  useEffect(() => {
    return () => {
      resetTest();
    };
  }, [resetTest]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300">
      {phase === "instructions" && <TestInstructions />}
      {phase === "test" && <TMTGrid />}
      {phase === "results" && <ResultEvaluator />}
    </div>
  );
}
