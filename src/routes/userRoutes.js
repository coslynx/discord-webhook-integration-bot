import express from 'express';
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getRegisteredWebhooksForUser,
  registerWebhookForUser,
} from '../services/userService';
import { sendErrorMessage, sendSuccessMessage } from '../utils/messageService';
import logger from '../utils/logger';

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = await createUser(req.body);
    sendSuccessMessage(res, 'User created successfully!', user);
  } catch (error) {
    logger.error('Error creating user:', error);
    sendErrorMessage(res, 'Failed to create user');
  }
});

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return sendErrorMessage(res, 'User not found');
    }
    sendSuccessMessage(res, 'User retrieved successfully!', user);
  } catch (error) {
    logger.error('Error getting user:', error);
    sendErrorMessage(res, 'Failed to get user');
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    sendSuccessMessage(res, 'Users retrieved successfully!', users);
  } catch (error) {
    logger.error('Error getting users:', error);
    sendErrorMessage(res, 'Failed to get users');
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return sendErrorMessage(res, 'User not found');
    }
    sendSuccessMessage(res, 'User updated successfully!', updatedUser);
  } catch (error) {
    logger.error('Error updating user:', error);
    sendErrorMessage(res, 'Failed to update user');
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser) {
      return sendErrorMessage(res, 'User not found');
    }
    sendSuccessMessage(res, 'User deleted successfully!');
  } catch (error) {
    logger.error('Error deleting user:', error);
    sendErrorMessage(res, 'Failed to delete user');
  }
});

// Get registered webhooks for a user
router.get('/users/:id/webhooks', async (req, res) => {
  try {
    const webhooks = await getRegisteredWebhooksForUser(req.params.id);
    sendSuccessMessage(res, 'Registered webhooks retrieved successfully!', webhooks);
  } catch (error) {
    logger.error('Error getting registered webhooks:', error);
    sendErrorMessage(res, 'Failed to get registered webhooks');
  }
});

// Register a new webhook for a user
router.post('/users/:id/webhooks', async (req, res) => {
  try {
    const webhook = await registerWebhookForUser(req.params.id, req.body);
    sendSuccessMessage(res, 'Webhook registered successfully!', webhook);
  } catch (error) {
    logger.error('Error registering webhook:', error);
    sendErrorMessage(res, 'Failed to register webhook');
  }
});

export default router;