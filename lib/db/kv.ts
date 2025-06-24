import { createClient, type Client } from "redis";

export class KeyValueDatabase implements Disposable {
  #client?: Client;

  async client() {
    if (!this.#client) {
      this.#client = createClient({ url: process.env.REDIS_URL });
      await this.#client?.connect();
    }
    return this.#client;
  }

  [Symbol.dispose]() {
    this.#client?.destroy();
  }
}
