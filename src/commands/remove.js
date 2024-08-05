import { SlashCommandBuilder } from 'discord.js';
import { deleteWebhook } from '../services/webhookService';
import { sendErrorMessage, sendSuccessMessage } from '../utils/messageService';
import logger from '../utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a registered webhook')
    .addStringOption((option) =>
      option
        .setName('url')
        .setDescription('The URL of the webhook to remove')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const url = interaction.options.getString('url');

      const deletedWebhook = await deleteWebhook(url);

      if (deletedWebhook) {
        return sendSuccessMessage(interaction, 'Webhook removed successfully!');
      } else {
        return sendErrorMessage(interaction, 'Failed to remove webhook');
      }
    } catch (error) {
      logger.error('Error removing webhook:', error);
      return sendErrorMessage(interaction, 'An error occurred while removing the webhook');
    }
  },
};