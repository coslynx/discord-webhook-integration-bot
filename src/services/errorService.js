import logger from '../utils/logger';

const handleError = (error, interaction, message) => {
  logger.error(message, error);

  if (interaction) {
    interaction.reply({
      content: 'An error occurred. Please try again later.',
      ephemeral: true,
    });
  } else {
    // Handle error in other cases, such as webhooks or API calls
    // Send error notifications or logs to specific channels or services
  }
};

export default {
  handleError,
};