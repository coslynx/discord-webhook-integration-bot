import mongoose from 'mongoose';

const webhookSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    default: 'default',
  },
});

const Webhook = mongoose.model('Webhook', webhookSchema);

export default Webhook;