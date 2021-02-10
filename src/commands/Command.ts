import { User } from 'discord.js';

abstract class Command {

    protected readonly args: string[];
    protected author: User;

    public constructor(args: string[], author: User) {
        this.args = args;
        this.author = author;
    }

    public abstract execute(): void;
};

export { Command };
