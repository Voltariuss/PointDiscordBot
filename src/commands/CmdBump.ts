import { Command } from './Command';

class CmdBump implements Command {

    public execute(): boolean {
        return false;
    }
}

export { CmdBump };
