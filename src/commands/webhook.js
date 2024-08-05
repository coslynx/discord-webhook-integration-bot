import { SlashCommandBuilder } from 'discord.js';
import {
  getWebhooks,
  getWebhookInfo,
  triggerWebhook,
} from '../services/webhookService';
import {
  sendErrorMessage,
  sendSuccessMessage,
} from '../utils/messageService';
import logger from '../utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('webhook')
    .setDescription('Trigger a registered webhook')
    .addStringOption((option) =>
      option
        .setName('url')
        .setDescription('The URL of the webhook to trigger')
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

      const webhooks = await getWebhooks();

      const webhook = webhooks.find(
        (webhook) => webhook.url === url && webhook.channelId === channelId
      );

      if (!webhook) {
        return sendErrorMessage(
          interaction,
          'Webhook not found. Please register the webhook first.'
        );
      }

      const triggerResult = await triggerWebhook(webhook, format);

      if (triggerResult) {
        return sendSuccessMessage(interaction, 'Webhook triggered successfully!');
      } else {
        return sendErrorMessage(
          interaction,
          'Failed to trigger webhook. Please check the webhook URL and try again.'
        );
      }
    } catch (error) {
      logger.error('Error triggering webhook:', error);
      return sendErrorMessage(
        interaction,
        'An error occurred while triggering the webhook. Please try again later.'
      );
    }
  },
};