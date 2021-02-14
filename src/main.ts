import { Client } from 'discord.js';

class Main {

  private static main: Main;

  public static getInstance(): Main {
    if (!this.main) {
      this.main = new Main();
    }
    return this.main;
  }

  private client: Client;

  private constructor() {
    this.setClient(new Client());
  }

  public getClient(): Client {
    return this.client;
  }

  private setClient(client: Client): void {
    this.client = client;
  }
}

export { Main };
