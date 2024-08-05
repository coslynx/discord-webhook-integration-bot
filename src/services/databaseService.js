import mongoose from 'mongoose';
import config from '../utils/config';
import logger from '../utils/logger';

const MONGO_URI = config.getValue('MONGO_URI');

let db;

const connectDB = async () => {
  try {
    // Connect to MongoDB
    db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if connection fails
  }
};

const disconnectDB = async () => {
  try {
    if (db) {
      await db.disconnect();
      logger.info('MongoDB disconnected');
    }
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error);
  }
};

// Export functions to manage database connection
export default {
  connectDB,
  disconnectDB,
};