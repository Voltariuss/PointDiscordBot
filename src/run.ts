import { Command, CommandFactory, CommandManager, Main } from '.';
import { Client, Message } from 'discord.js';

const client: Client = Main.getInstance().getClient();

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  } else {
    console.error('Unknown user');
  }
});

client.on('message', (message: Message) => {
  if (message.channel.type === 'text') {
    const content: string = message.content;
    if (CommandManager.isCommand(content)) {
      const cmdArgs: string[] = CommandManager.getCommandArgs(content);
      const command: Command = CommandFactory.createCommand(cmdArgs, message);
      if (command) {
        command.execute();
      }
    }
  }
});

client.login('token');
