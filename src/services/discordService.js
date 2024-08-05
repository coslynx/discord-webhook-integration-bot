import { Client, Intents } from 'discord.js';
import config from '../utils/config';
import logger from '../utils/logger';
import { sendErrorMessage, sendSuccessMessage } from '../utils/messageService';
import { getWebhooks, triggerWebhook } from './webhookService';

// Initialize Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Event listener for when the bot is ready
client.on('ready', async () => {
  try {
    logger.info('Discord bot is ready!');
    // Load all bot commands
    // commands.loadCommands(client); // Assuming you have a commands module

    // Initialize Discord service (you can customize this initialization)
    await initializeDiscordService(client);
  } catch (error) {
    logger.error('Error initializing Discord service:', error);
  }
});

// Event listener for when a message is created
client.on('messageCreate', async (message) => {
  try {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if the message starts with the bot's prefix
    if (!message.content.startsWith(config.getValue('PREFIX'))) return;

    // Extract the command and arguments
    const args = message.content.slice(config.getValue('PREFIX').length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Find the command
    // const command = commands.getCommand(commandName); // Assuming you have a commands module

    // Execute the command if found
    // if (command) {
    //   try {
    //     command.execute(message, args);
    //   } catch (error) {
    //     logger.error(`Error executing command ${commandName}`, error);
    //     message.reply('There was an error trying to execute that command!');
    //   }
    // }

    // Example: Handling a webhook trigger command
    if (commandName === 'webhook') {
      // Extract webhook URL and channel ID from arguments
      const webhookUrl = args[0];
      const channelId = args[1];
      const format = args[2] || 'default'; // Optional format

      // Find the webhook in the registered webhooks
      const webhooks = await getWebhooks();
      const webhook = webhooks.find((webhook) => webhook.url === webhookUrl && webhook.channelId === channelId);

      if (!webhook) {
        return sendErrorMessage(message, 'Webhook not found. Please register the webhook first.');
      }

      // Trigger the webhook
      const triggerResult = await triggerWebhook(webhook, format);

      if (triggerResult) {
        sendSuccessMessage(message, 'Webhook triggered successfully!');
      } else {
        sendErrorMessage(message, 'Failed to trigger webhook. Please check the webhook URL and try again.');
      }
    }
  } catch (error) {
    logger.error('Error handling messageCreate event:', error);
  }
});

// Function to initialize Discord service (you can customize this)
const initializeDiscordService = async (client) => {
  try {
    // Set up any additional Discord-related functionality here
    // For example, register commands, set up slash commands, etc.
    // ...

    // Log in the bot using the Discord API token
    client.login(config.getValue('DISCORD_TOKEN'));
  } catch (error) {
    logger.error('Error logging in to Discord:', error);
  }
};

export default {
  client,
};