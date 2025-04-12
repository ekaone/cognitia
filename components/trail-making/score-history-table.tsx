"use client";

import { useMemo } from "react";
import { useTMTStore } from "@/lib/store/trail-store";
import { motion } from "motion/react";
import { Trash2, Award, Clock, XCircle } from "lucide-react";

interface ScoreHistoryTableProps {
  compact?: boolean;
}

export default function ScoreHistoryTable({
  compact = false,
}: ScoreHistoryTableProps) {
  const { scoreHistory, clearScoreHistory } = useTMTStore();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(compact ? {} : { hour: "2-digit", minute: "2-digit" }),
    });
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    if (compact) {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  // Group scores by phase
  const scoresByPhase = useMemo(() => {
    const phase1Scores = scoreHistory.filter((score) => score.phase === 1);
    const phase2Scores = scoreHistory.filter((score) => score.phase === 2);

    return {
      phase1: phase1Scores.sort((a, b) => a.time - b.time), // Sort by time (fastest first)
      phase2: phase2Scores.sort((a, b) => a.time - b.time),
    };
  }, [scoreHistory]);

  // Get best scores
  const bestScores = useMemo(() => {
    return {
      phase1: scoresByPhase.phase1[0],
      phase2: scoresByPhase.phase2[0],
    };
  }, [scoresByPhase]);

  if (scoreHistory.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <div className="flex justify-center mb-2">
          <Clock className="text-gray-400" size={24} />
        </div>
        No scores recorded yet. Complete a test to see your results here.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`${
            compact ? "text-lg" : "text-xl"
          } font-semibold text-gray-800`}
        >
          {compact ? "Best Scores" : "Score History"}
        </h3>
        {!compact && (
          <button
            onClick={clearScoreHistory}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Best Scores */}
      {(bestScores.phase1 || bestScores.phase2) && (
        <div className="mb-6">
          {!compact && (
            <h4 className="text-md font-medium text-gray-700 mb-2">
              Best Scores
            </h4>
          )}
          <div className="grid grid-cols-1 gap-3">
            {bestScores.phase1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"
              >
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-emerald-600" />
                  <span className="font-medium text-emerald-800">Phase 1</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-emerald-700 font-mono">
                      {formatTime(bestScores.phase1.time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle size={14} className="text-gray-500" />
                    <span className="text-gray-600">
                      {bestScores.phase1.mistakes}
                    </span>
                  </div>
                </div>
                {!compact && (
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(bestScores.phase1.timestamp)}
                  </div>
                )}
              </motion.div>
            )}

            {bestScores.phase2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"
              >
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-emerald-600" />
                  <span className="font-medium text-emerald-800">Phase 2</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-emerald-700 font-mono">
                      {formatTime(bestScores.phase2.time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle size={14} className="text-gray-500" />
                    <span className="text-gray-600">
                      {bestScores.phase2.mistakes}
                    </span>
                  </div>
                </div>
                {!compact && (
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(bestScores.phase2.timestamp)}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Recent Scores - Only show in compact mode */}
      {compact && scoreHistory.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2">
            Recent Scores
          </h4>
          <div className="space-y-2">
            {scoreHistory
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 3)
              .map((score) => (
                <div
                  key={score.id}
                  className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      Phase {score.phase}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(score.timestamp)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-gray-500" />
                      <span className="text-gray-700 font-mono">
                        {formatTime(score.time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <XCircle size={12} className="text-gray-500" />
                      <span className="text-gray-600">{score.mistakes}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {scoreHistory.length > 3 && (
            <div className="text-center mt-3">
              <span className="text-xs text-gray-500">
                + {scoreHistory.length - 3} more in history
              </span>
            </div>
          )}
        </div>
      )}

      {/* Full Score History Tables - Only in non-compact mode */}
      {!compact && (
        <div className="space-y-6">
          {scoresByPhase.phase1.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Phase 1 History
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mistakes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {scoresByPhase.phase1.map((score) => (
                      <tr key={score.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {formatDate(score.timestamp)}
                        </td>
                        <td className="py-2 px-4 text-sm font-mono text-gray-700">
                          {formatTime(score.time)}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {score.mistakes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {scoresByPhase.phase2.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-2">
                Phase 2 History
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mistakes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {scoresByPhase.phase2.map((score) => (
                      <tr key={score.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {formatDate(score.timestamp)}
                        </td>
                        <td className="py-2 px-4 text-sm font-mono text-gray-700">
                          {formatTime(score.time)}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">
                          {score.mistakes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Clear History button for compact view */}
      {compact && scoreHistory.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={clearScoreHistory}
            className="text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 mx-auto"
          >
            <Trash2 size={12} />
            <span>Clear History</span>
          </button>
        </div>
      )}
    </div>
  );
}
