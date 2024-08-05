import { Client, Intents } from 'discord.js';
import config from './utils/config';
import logger from './utils/logger';
import commands from './commands';
import services from './services';

// Create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Event listener for when the bot is ready
client.on('ready', () => {
  logger.info('Bot is ready!');

  // Load all bot commands
  commands.loadCommands(client);

  // Initialize all bot services
  services.initializeServices(client);
});

// Event listener for when a message is created
client.on('messageCreate', (message) => {
  // Check if the message starts with the bot's prefix
  if (!message.content.startsWith(config.getValue('PREFIX'))) return;

  // Extract the command and arguments
  const args = message.content.slice(config.getValue('PREFIX').length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Find the command
  const command = commands.getCommand(commandName);

  // Execute the command if found
  if (command) {
    try {
      command.execute(message, args);
    } catch (error) {
      logger.error(`Error executing command ${commandName}`, error);
      message.reply('There was an error trying to execute that command!');
    }
  }
});

// Login the bot using the Discord API token
client.login(config.getValue('DISCORD_TOKEN'));