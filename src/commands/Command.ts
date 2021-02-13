import { Message } from 'discord.js';

abstract class Command {

  protected readonly args: string[];
  protected message: Message;

  public constructor(args: string[], message: Message) {
    this.args = args;
    this.message = message;
  }

  public abstract execute(): void;

  public getArgs(): string[] {
    return this.args;
  }

  public getMessage(): Message {
    return this.message;
  }
};

export { Command };
