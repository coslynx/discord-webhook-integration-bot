import { SlashCommandBuilder } from 'discord.js';
import { createWebhook } from '../services/webhookService';
import { sendErrorMessage, sendSuccessMessage } from '../utils/messageService';
import logger from '../utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register a new webhook')
    .addStringOption((option) =>
      option
        .setName('url')
        .setDescription('The URL of the webhook')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('channel')
        .setDescription('The ID of the Discord channel to receive notifications')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('format')
        .setDescription('The format of the message to be sent to Discord')
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const url = interaction.options.getString('url');
      const channelId = interaction.options.getString('channel');
      const format = interaction.options.getString('format');

      const webhook = await createWebhook(url, channelId, format);

      if (webhook) {
        return sendSuccessMessage(interaction, 'Webhook registered successfully!');
      } else {
        return sendErrorMessage(interaction, 'Failed to register webhook');
      }
    } catch (error) {
      logger.error('Error registering webhook:', error);
      return sendErrorMessage(
        interaction,
        'An error occurred while registering the webhook'
      );
    }
  },
};