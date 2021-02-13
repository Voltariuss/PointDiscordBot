import { Command } from '.';
import { Message, MessageEmbed, TextChannel, User } from 'discord.js';
import { Point, PointService } from '..';

class CmdPoint extends Command {

    public constructor(args: string[], message: Message) {
        super(args, message);
    }

    public execute(): void {
        const args: string[] = super.getArgs();
        const message: Message = super.getMessage();
        const author: User = message.author;
        const channel: TextChannel = <TextChannel> message.channel;
        if (args.length === 1) {
            PointService.getPoint(author)
                .then((point: Point) => {
                    const messageEmbed: MessageEmbed = new MessageEmbed()
                        .setTitle(author.username)
                        .setDescription('Nombre de points : ' + point.getNumber());
                    channel.send(messageEmbed);
                })
                .catch((err: any) => {
                    const errorMessage: string = (err && err.message) ? err.message : PointService.ERROR_UNKNOWN;
                    const messageEmbed: MessageEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Error')
                        .setDescription(errorMessage);
                    channel.send(messageEmbed);
                });
        } else if (['add', 'remove'].indexOf(args[1]) !== -1 && args.length === 4) {
            // const username: string = args[2];
            // const number: number = Number(args[3]);
            switch (args[1]) {
                case 'add': {
                    // TODO: add
                }
                case 'remove': {
                    // TODO: remove
                }
            }
        } else {
            CmdPoint.sendError(channel);
        }
    }

    public static sendError(channel: TextChannel): void {
        const messageEmbed: MessageEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Erreur')
            .setDescription('Argument invalide. Essayez "!point [(add|remove) <username> <quantité>]"');
        channel.send(messageEmbed);
    }
}

export { CmdPoint };
