class CommandFactory {

    public static getCommand(msgContent: string): Command | null {
        let command: Command | null = null;
        const args: string[] = msgContent.split(' ');

        switch (args[0]) {
            case '!vote':
                command = new CmdVote();
                break;
            case '!bump':
                command = new CmdBump();
                break;
        }
        return command;
    }
}