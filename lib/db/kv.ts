import { createClient } from "redis";

export class KeyValueDatabase implements Disposable {
  #client?: any; // TODO: strong type

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
