import {FeedbackService} from "@/app/domain/feedback";
import {NextRequest, NextResponse} from "next/server";

const feedbackService = new FeedbackService();

export async function POST(request: NextRequest) {
  try {
    const { sessionId, vote } = await request.json();

    if (
      !sessionId ||
      !vote ||
      !["tooEasy", "hard", "outOfReach"].includes(vote)
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const sessionVotes = await feedbackService.getSessionFeedback(sessionId);
    sessionVotes[vote as keyof typeof sessionVotes]++;
    await feedbackService.setSessionFeedback(sessionId, sessionVotes);

    return NextResponse.json({ success: true, feedback: await feedbackService.getFeedbackData(sessionId) });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    const sessionVotes = await feedbackService.getSessionFeedback(sessionId);
    const total =
      sessionVotes.tooEasy + sessionVotes.hard + sessionVotes.outOfReach;

    if (total === 0) {
      return NextResponse.json({
        percentages: { tooEasy: 0, hard: 0, outOfReach: 0 },
        totalVotes: 0,
      });
    }

    const percentages = {
      tooEasy: Math.round((sessionVotes.tooEasy / total) * 100),
      hard: Math.round((sessionVotes.hard / total) * 100),
      outOfReach: Math.round((sessionVotes.outOfReach / total) * 100),
    };

    return NextResponse.json({ percentages, totalVotes: total });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
