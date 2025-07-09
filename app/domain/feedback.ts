import { KeyValueDatabase } from "@/lib/db/kv";

export class FeedbackService {
  #db = new KeyValueDatabase();

  static sessionId(weekNumber: number, sessionIndex: number): string {
    return `week-${weekNumber}-session-${sessionIndex}`
  }

  async getSessionFeedback(sessionId: string): Promise<SessionFeedback> {
    const client = await this.#db.client();
    const sessionKey = this.key(sessionId);
    const res = await client.get(sessionKey);
    const sessionVotes = res
      ? JSON.parse(res)
      : {
          tooEasy: 0,
          hard: 0,
          outOfReach: 0,
        };
    return sessionVotes;
  }

  async getFeedbackData(sessionId: string): Promise<FeedbackData> {
    const sessionFeedback = await this.getSessionFeedback(sessionId);
    const totalVotes = sessionFeedback.tooEasy + sessionFeedback.hard + sessionFeedback.outOfReach;
    if (totalVotes === 0) {
      return {
        percentages: {
          tooEasy: 0,
          hard: 0,
          outOfReach: 0,
        },
        totalVotes: 0,
      };
    }

    return {
      percentages: {
        tooEasy: Math.round((sessionFeedback.tooEasy / totalVotes) * 100),
        hard: Math.round((sessionFeedback.hard / totalVotes) * 100),
        outOfReach: Math.round((sessionFeedback.outOfReach / totalVotes) * 100),
      },
      totalVotes,
    };
  }

  async setSessionFeedback(sessionId: string, feedback: SessionFeedback) {
    const client = await this.#db.client();
    const sessionKey = this.key(sessionId);
    // Store updated votes
    try {
      await client.set(sessionKey, JSON.stringify(feedback));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  private key(id: string) {
    return `session:${id}`;
  }
}

export interface SessionFeedback {
  tooEasy: number;
  hard: number;
  outOfReach: number;
}

export interface FeedbackData {
  percentages: {
    tooEasy: number;
    hard: number;
    outOfReach: number;
  };
  totalVotes: number;
}
