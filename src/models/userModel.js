import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  discriminator: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  registeredWebhooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Webhook',
    },
  ],
});

const User = mongoose.model('User', userSchema);

export default User;