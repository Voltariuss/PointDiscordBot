import { CmdBump, CmdVote, Command } from '.';
import { User } from 'discord.js';

class CommandFactory {

    public static createCommand(cmdArgs: string[], author: User): Command | null {
        let command: Command = null;

        switch (cmdArgs[0]) {
            case '!vote':
                command = new CmdVote(cmdArgs, author);
                break;
            case '!bump':
                command = new CmdBump(cmdArgs, author);
                break;
        }
        return command;
    }
}

export { CommandFactory };
