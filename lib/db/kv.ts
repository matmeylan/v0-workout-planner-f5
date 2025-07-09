import { createClient } from "redis";

export class KeyValueDatabase implements Disposable {
  readonly #client = createClient({ url: process.env.REDIS_URL });

  async client() {
    if (!this.#client.isReady && !this.#client.isOpen) {
      await this.#client.connect();
    }
    return this.#client;
  }

  [Symbol.dispose]() {
    this.#client?.destroy();
  }
}
