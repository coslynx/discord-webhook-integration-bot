import { SlashCommandBuilder } from 'discord.js';
import { getWebhook, updateWebhook } from '../services/webhookService';
import { sendErrorMessage, sendSuccessMessage } from '../utils/messageService';
import logger from '../utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Update an existing webhook')
    .addStringOption((option) =>
      option
        .setName('url')
        .setDescription('The URL of the webhook to update')
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

      const existingWebhook = await getWebhook(url);
      if (!existingWebhook) {
        return sendErrorMessage(interaction, 'Webhook not found');
      }

      const updatedWebhook = await updateWebhook(url, {
        channelId,
        format,
      });

      if (updatedWebhook) {
        return sendSuccessMessage(
          interaction,
          'Webhook updated successfully!'
        );
      } else {
        return sendErrorMessage(interaction, 'Failed to update webhook');
      }
    } catch (error) {
      logger.error('Error updating webhook:', error);
      return sendErrorMessage(interaction, 'An error occurred while updating the webhook');
    }
  },
};