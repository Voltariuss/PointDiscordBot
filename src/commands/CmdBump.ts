import { Command } from '..';

class CmdBump extends Command {

    public execute(): void {
        console.log('Test CmdBump');
    }
}

export { CmdBump };
