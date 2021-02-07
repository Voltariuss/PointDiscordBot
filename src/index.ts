import { Client } from 'discord.js';

const client: Client = new Client();

client.on('ready', () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  } else {
    console.error('Unknown user');
  }
});

client.login('ODA1ODU1NTU2OTMzOTEwNjE4.YBg9eA.xjt4bvZyw429rhOrE9BU8SqyB1c');
