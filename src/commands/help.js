import { SlashCommandBuilder } from 'discord.js';
import {
  getWebhooks,
  getWebhookInfo,
} from '../services/webhookService';
import {
  sendErrorMessage,
  sendSuccessMessage,
} from '../utils/messageService';
import logger from '../utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands'),
  async execute(interaction) {
    try {
      const commands = await getWebhooks();
      const commandList = commands
        .map((command) => {
          const commandInfo = getWebhookInfo(command.url);
          return `- \`/webhook ${command.url} ${command.channelId} ${command.format}\` - ${commandInfo.description}`;
        })
        .join('\n');
      return sendSuccessMessage(
        interaction,
        `Here are all the available commands:\n${commandList}`
      );
    } catch (error) {
      logger.error('Error getting commands:', error);
      return sendErrorMessage(
        interaction,
        'An error occurred while getting the commands'
      );
    }
  },
};