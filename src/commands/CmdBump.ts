import { Command } from '.';
import { User } from 'discord.js';

class CmdBump extends Command {

    public constructor(args: string[], author: User) {
        super(args, author);
    }

    public execute(): void {
        console.log('Test CmdBump');
    }
}

export { CmdBump };
