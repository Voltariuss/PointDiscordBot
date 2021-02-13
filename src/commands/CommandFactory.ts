import { CmdPoint, Command } from '.';
import { Message } from 'discord.js';

class CommandFactory {

  public static createCommand(cmdArgs: string[], message: Message): Command | null {
    let command: Command = null;

    switch (cmdArgs[0]) {
      case '!point':
        command = new CmdPoint(cmdArgs, message);
        break;
    }
    return command;
  }
}

export { CommandFactory };
