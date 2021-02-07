import { CommandManager } from './commands/CommandManager';
import { CommandFactory } from './commands/CommandFactory';

import { Client, Message, User } from 'discord.js';

const client: Client = new Client();

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  } else {
    console.error('Unknown user');
  }
});

client.on('message', (message: Message) => {
  const content: string = message.content;
  if (CommandManager.isCommand(content)) {
    const cmdArgs: string[] = CommandManager.getCommandArgs(content);
    const author: User = message.author;
    const command: Command = CommandFactory.createCommand(cmdArgs, author);
  }
});

client.login('ODA1ODU1NTU2OTMzOTEwNjE4.YBg9eA.xjt4bvZyw429rhOrE9BU8SqyB1c');
