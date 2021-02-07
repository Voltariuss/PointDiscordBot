class CommandManager {

    public static isCommand(msgContent: string): boolean {
        return msgContent.startsWith('!')
    };
}

export { CommandManager };
