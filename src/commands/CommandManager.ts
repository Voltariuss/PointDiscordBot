class CommandManager {

    public static isCommand(msgContent: string): boolean {
        return msgContent.startsWith('!')
    };

    public static getCommandArgs(cmdContent: string) {
        return cmdContent.split(' ');
    }
}

export { CommandManager };
