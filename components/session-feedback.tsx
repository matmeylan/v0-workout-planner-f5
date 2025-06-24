"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsDown, ThumbsUp, AlertTriangle, BarChart3 } from "lucide-react";

interface FeedbackData {
  percentages: {
    tooEasy: number;
    hard: number;
    outOfReach: number;
  };
  totalVotes: number;
}

interface SessionFeedbackProps {
  sessionId: string;
}

export function SessionFeedback({ sessionId }: SessionFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFeedback();
    checkIfVoted();
  }, [sessionId]);

  const checkIfVoted = () => {
    const voted = localStorage.getItem(`voted_${sessionId}`);
    setHasVoted(!!voted);
  };

  const loadFeedback = async () => {
    try {
      const response = await fetch(`/api/feedback?sessionId=${sessionId}`);
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error("Failed to load feedback:", error);
    }
  };

  const submitVote = async (vote: "tooEasy" | "hard" | "outOfReach") => {
    if (hasVoted || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, vote }),
      });

      if (response.ok) {
        localStorage.setItem(`voted_${sessionId}`, vote);
        setHasVoted(true);
        await loadFeedback();
      }
    } catch (error) {
      console.error("Failed to submit vote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-4 border-0">
      <CardContent className="p-4 border-gray-200 border-t">
        <div className="flex items-center mb-3">
          <BarChart3 className="h-4 w-4 text-gray-600 mr-2" />
          <h4 className="text-sm font-semibold text-gray-700">
            Comment était cette session ?
          </h4>
        </div>

        {!hasVoted ? (
          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => submitVote("tooEasy")}
              disabled={isLoading}
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              Trop facile
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => submitVote("hard")}
              disabled={isLoading}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              Difficile
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              onClick={() => submitVote("outOfReach")}
              disabled={isLoading}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Trop dur
            </Button>
          </div>
        ) : (
          <div className="mb-4 text-xs text-green-600 bg-green-50 rounded p-2 text-center">
            ✓ Merci pour ton retour !
          </div>
        )}

        {feedback && feedback.totalVotes > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500 mb-2">
              Résultats ({feedback.totalVotes} vote
              {feedback.totalVotes > 1 ? "s" : ""}) :
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <ThumbsDown className="h-3 w-3 mr-1 text-red-500" />
                  Trop facile
                </span>
                <span className="font-medium">
                  {feedback.percentages.tooEasy}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-red-400 h-1 rounded-full"
                  style={{ width: `${feedback.percentages.tooEasy}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <ThumbsUp className="h-3 w-3 mr-1 text-green-500" />
                  Difficile
                </span>
                <span className="font-medium">
                  {feedback.percentages.hard}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-green-400 h-1 rounded-full"
                  style={{ width: `${feedback.percentages.hard}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1 text-orange-500" />
                  Trop dur
                </span>
                <span className="font-medium">
                  {feedback.percentages.outOfReach}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-orange-400 h-1 rounded-full"
                  style={{ width: `${feedback.percentages.outOfReach}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
