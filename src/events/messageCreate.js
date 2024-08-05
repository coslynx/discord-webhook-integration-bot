import { Message } from 'discord.js';
import config from '../utils/config';
import logger from '../utils/logger';
import commands from '../commands';

export default (message: Message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

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
};