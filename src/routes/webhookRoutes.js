import express from 'express';
import {
  createWebhook,
  getWebhooks,
  getWebhook,
  updateWebhook,
  deleteWebhook,
  triggerWebhook,
} from '../services/webhookService';
import { sendErrorMessage, sendSuccessMessage } from '../utils/messageService';
import logger from '../utils/logger';

const router = express.Router();

// Create a new webhook
router.post('/webhooks', async (req, res) => {
  try {
    const { url, channelId, format } = req.body;
    const webhook = await createWebhook(url, channelId, format);

    if (webhook) {
      sendSuccessMessage(res, 'Webhook registered successfully!', webhook);
    } else {
      sendErrorMessage(res, 'Failed to register webhook');
    }
  } catch (error) {
    logger.error('Error creating webhook:', error);
    sendErrorMessage(res, 'An error occurred while registering the webhook');
  }
});

// Get all webhooks
router.get('/webhooks', async (req, res) => {
  try {
    const webhooks = await getWebhooks();
    sendSuccessMessage(res, 'Webhooks retrieved successfully!', webhooks);
  } catch (error) {
    logger.error('Error getting webhooks:', error);
    sendErrorMessage(res, 'Failed to get webhooks');
  }
});

// Get a specific webhook by URL
router.get('/webhooks/:url', async (req, res) => {
  try {
    const webhook = await getWebhook(req.params.url);
    if (!webhook) {
      return sendErrorMessage(res, 'Webhook not found');
    }
    sendSuccessMessage(res, 'Webhook retrieved successfully!', webhook);
  } catch (error) {
    logger.error('Error getting webhook:', error);
    sendErrorMessage(res, 'Failed to get webhook');
  }
});

// Update an existing webhook
router.put('/webhooks/:url', async (req, res) => {
  try {
    const { channelId, format } = req.body;
    const updatedWebhook = await updateWebhook(req.params.url, {
      channelId,
      format,
    });

    if (updatedWebhook) {
      sendSuccessMessage(res, 'Webhook updated successfully!', updatedWebhook);
    } else {
      sendErrorMessage(res, 'Failed to update webhook');
    }
  } catch (error) {
    logger.error('Error updating webhook:', error);
    sendErrorMessage(res, 'An error occurred while updating the webhook');
  }
});

// Delete a webhook
router.delete('/webhooks/:url', async (req, res) => {
  try {
    const deletedWebhook = await deleteWebhook(req.params.url);
    if (deletedWebhook) {
      sendSuccessMessage(res, 'Webhook removed successfully!');
    } else {
      sendErrorMessage(res, 'Failed to remove webhook');
    }
  } catch (error) {
    logger.error('Error deleting webhook:', error);
    sendErrorMessage(res, 'An error occurred while removing the webhook');
  }
});

// Trigger a webhook
router.post('/webhooks/:url/trigger', async (req, res) => {
  try {
    const webhook = await getWebhook(req.params.url);
    if (!webhook) {
      return sendErrorMessage(res, 'Webhook not found');
    }

    const triggerResult = await triggerWebhook(webhook, req.body.format);

    if (triggerResult) {
      sendSuccessMessage(res, 'Webhook triggered successfully!');
    } else {
      sendErrorMessage(res, 'Failed to trigger webhook');
    }
  } catch (error) {
    logger.error('Error triggering webhook:', error);
    sendErrorMessage(res, 'An error occurred while triggering the webhook');
  }
});

export default router;