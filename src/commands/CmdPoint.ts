import { Command } from '.';
import { Message, MessageEmbed, TextChannel, User } from 'discord.js';
import { MessageMaker, Point, PointService } from '..';

class CmdPoint extends Command {

  public static INTERNAL_ERROR_OCCURED: string = 'Une erreur interne a eu lieu.';
  public static INVALID_ARGUMENTS: string = 'Argument invalide. Essayez "!point [(add|remove) <username> <quantité>]"';

  public constructor(args: string[], message: Message) {
    super(args, message);
  }

  public execute(): void {
    const args: string[] = super.getArgs();
    const message: Message = super.getMessage();
    const author: User = message.author;
    const channel: TextChannel = <TextChannel>message.channel;
    const response: MessageEmbed = new MessageEmbed();
    const subCmd: string = (args.length >= 2) ? args[1] : null;
    switch (subCmd) {
      case 'add': {
        if (args.length === 4) {
          const user: User = message.mentions.users.first();
          const number: number = Number(args[3]);
          PointService.addPoint(user.id, number)
            .then((): void => {
              response
                .setTitle('Ajout de points')
                .setDescription(`${number} points ont été ajoutés au joueur ${user.username}.`);
              MessageMaker.setInfoMessage(response);
              channel.send(response);
            })
            .catch((): void => {
              response.setDescription(CmdPoint.INTERNAL_ERROR_OCCURED);
              MessageMaker.setErrorMessage(response);
              channel.send(response);
            });
        } else {
          response.setDescription(CmdPoint.INVALID_ARGUMENTS);
          MessageMaker.setErrorMessage(response);
          channel.send(response);
        }
        break;
      }
      case 'remove': {
        if (args.length === 4) {
          const user: User = message.mentions.users.first();
          const number: number = Number(args[3]);
          PointService.removePoint(user.id, number)
            .then((): void => {
              response
                .setTitle('Suppression de points')
                .setDescription(`${number} points ont été retirés au joueur ${user.username}.`);
              MessageMaker.setInfoMessage(response);
              channel.send(response);
            })
            .catch((): void => {
              response.setDescription(CmdPoint.INTERNAL_ERROR_OCCURED);
              MessageMaker.setErrorMessage(response);
              channel.send(response);
            });
        } else {
          response.setDescription(CmdPoint.INVALID_ARGUMENTS);
          MessageMaker.setErrorMessage(response);
          channel.send(response);
        }
        break;
      }
      case 'reset': {
        if (args.length === 3) {
          const user: User = message.mentions.users.first();
          PointService.resetPoint(user.id)
            .then((): void => {
              response
                .setTitle('Réinitialisation de points')
                .setDescription(`Les points du joueur ${user.username} ont été réinitialisés.`);
              MessageMaker.setInfoMessage(response);
              channel.send(response);
            })
            .catch((): void => {
              response.setDescription(CmdPoint.INTERNAL_ERROR_OCCURED);
              MessageMaker.setErrorMessage(response);
              channel.send(response);
            });
        } else {
          response.setDescription(CmdPoint.INVALID_ARGUMENTS);
          MessageMaker.setErrorMessage(response);
          channel.send(response);
        }
        break;
      }
      case 'info': {
        if (args.length === 2 || args.length === 3) {
          const user: User = (args.length === 2) ? author : message.mentions.users.first();
          PointService.getPoint(user.id)
            .then((point: Point): void => {
              response
                .setTitle(user.username)
                .setDescription('Nombre de points : ' + point.getNumber());
              MessageMaker.setInfoMessage(response);
              channel.send(response);
            })
            .catch((): void => {
              response.setDescription(CmdPoint.INTERNAL_ERROR_OCCURED);
              MessageMaker.setErrorMessage(response);
              channel.send(response);
            });
        } else {
          response.setDescription(CmdPoint.INVALID_ARGUMENTS);
          MessageMaker.setErrorMessage(response);
          channel.send(response);
          break;
        }
        break;
      }
      default: {
        response.setDescription(CmdPoint.INVALID_ARGUMENTS);
        MessageMaker.setErrorMessage(response);
        channel.send(response);
        break;
      }
    }
  }
}

export { CmdPoint };
