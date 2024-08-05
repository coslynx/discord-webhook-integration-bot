import dotenv from 'dotenv';

dotenv.config();

const config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  MONGO_URI: process.env.MONGO_URI,
  PREFIX: process.env.PREFIX || '!',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

const getValue = (key) => config[key];

const setDefault = (key, defaultValue) => {
  if (!(key in config)) {
    config[key] = defaultValue;
  }
};

export default {
  getValue,
  setDefault,
};