import { SlashCommandBuilder } from 'discord.js';
import { getWebhooks } from '../services/webhookService';
import { sendErrorMessage, sendSuccessMessage } from '../utils/messageService';
import logger from '../utils/logger';

export default {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all registered webhooks'),
  async execute(interaction) {
    try {
      const webhooks = await getWebhooks();

      if (webhooks.length === 0) {
        return sendErrorMessage(interaction, 'No webhooks registered yet!');
      }

      const webhookList = webhooks
        .map(
          (webhook) =>
            `- URL: ${webhook.url}\n  Channel: <#${webhook.channelId}>\n  Format: ${webhook.format}`
        )
        .join('\n');

      return sendSuccessMessage(interaction, `Registered Webhooks:\n${webhookList}`);
    } catch (error) {
      logger.error('Error listing webhooks:', error);
      return sendErrorMessage(interaction, 'An error occurred while listing webhooks');
    }
  },
};