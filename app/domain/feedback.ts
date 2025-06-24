import { KeyValueDatabase } from "@/lib/db/kv";

export class FeedbackService {
  #db = new KeyValueDatabase();

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
    console.log("got votes", { sessionId, sessionVotes });
    return sessionVotes;
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
