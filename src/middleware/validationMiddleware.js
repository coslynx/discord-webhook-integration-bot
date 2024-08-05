import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';

// Middleware for validating webhook registration requests
export const validateWebhookRegistration = [
  // Validate URL
  body('url')
    .exists()
    .withMessage('Webhook URL is required')
    .isURL()
    .withMessage('Invalid webhook URL'),

  // Validate channel ID
  body('channelId')
    .exists()
    .withMessage('Discord channel ID is required')
    .isInt()
    .withMessage('Invalid Discord channel ID'),

  // Validate format (optional)
  body('format').optional().isString().withMessage('Invalid message format'),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Webhook registration validation failed:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating webhook update requests
export const validateWebhookUpdate = [
  // Validate channel ID (optional)
  body('channelId').optional().isInt().withMessage('Invalid Discord channel ID'),

  // Validate format (optional)
  body('format').optional().isString().withMessage('Invalid message format'),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Webhook update validation failed:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating webhook trigger requests
export const validateWebhookTrigger = [
  // Validate format (optional)
  body('format').optional().isString().withMessage('Invalid message format'),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Webhook trigger validation failed:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating user registration requests
export const validateUserRegistration = [
  // Validate Discord ID
  body('discordId')
    .exists()
    .withMessage('Discord ID is required')
    .isString()
    .withMessage('Invalid Discord ID'),

  // Validate username
  body('username')
    .exists()
    .withMessage('Username is required')
    .isString()
    .withMessage('Invalid username'),

  // Validate discriminator
  body('discriminator')
    .exists()
    .withMessage('Discriminator is required')
    .isString()
    .withMessage('Invalid discriminator'),

  // Validate avatar (optional)
  body('avatar').optional().isString().withMessage('Invalid avatar URL'),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('User registration validation failed:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware for validating user update requests
export const validateUserUpdate = [
  // Validate username (optional)
  body('username').optional().isString().withMessage('Invalid username'),

  // Validate discriminator (optional)
  body('discriminator').optional().isString().withMessage('Invalid discriminator'),

  // Validate avatar (optional)
  body('avatar').optional().isString().withMessage('Invalid avatar URL'),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('User update validation failed:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];