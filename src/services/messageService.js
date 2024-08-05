import { Message } from 'discord.js';
import logger from '../utils/logger';

const sendErrorMessage = (message, errorMessage) => {
  message.reply({ content: errorMessage, ephemeral: true });
};

const sendSuccessMessage = (message, successMessage) => {
  message.reply({ content: successMessage, ephemeral: true });
};

export default {
  sendErrorMessage,
  sendSuccessMessage,
};