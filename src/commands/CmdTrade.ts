import { Command } from '.';
import { User } from 'discord.js';

class CmdTrade extends Command {

    public constructor(args: string[], author: User) {
        super(args, author);
    }

    public execute(): void {
        console.log('Test CmdTrade');
    }
}

export { CmdTrade };
