import { Command } from './Command';

class CmdVote implements Command {
    
    public execute(): boolean {
        return false;
    }
}

export { CmdVote };
