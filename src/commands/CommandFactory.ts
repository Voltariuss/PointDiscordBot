import { CmdTrade, Command } from '.';
import { User } from 'discord.js';

class CommandFactory {

    public static createCommand(cmdArgs: string[], author: User): Command | null {
        let command: Command = null;

        switch (cmdArgs[0]) {
            case '!trade':
                command = new CmdTrade(cmdArgs, author);
                break;
        }
        return command;
    }
}

export { CommandFactory };
