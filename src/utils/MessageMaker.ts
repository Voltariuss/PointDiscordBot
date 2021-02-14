import { MessageEmbed } from 'discord.js';

class MessageMaker {

  public static setErrorMessage(message: MessageEmbed): MessageEmbed {
    message
      .setColor('RED')
      .setTitle('Erreur');
    return message;
  }

  public static setInfoMessage(message: MessageEmbed): MessageEmbed {
    message.setColor('BLUE');
    return message;
  }
}

export { MessageMaker };
