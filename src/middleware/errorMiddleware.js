import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

// Middleware for handling errors in Express.js routes
const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error to the console
  logger.error(err.message, err);

  // Set the response status code based on the error type
  let status = 500;
  if (err.name === 'ValidationError') {
    status = 400;
  }

  // Send a formatted error response to the client
  res.status(status).json({
    error: {
      message: err.message,
      // Additional error details can be included here, like stack trace for debugging
    },
  });
};

export default errorMiddleware;