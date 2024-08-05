import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import config from '../utils/config';
import jwt from 'jsonwebtoken';

// Middleware to authenticate user requests using JWT
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, config.getValue('JWT_SECRET'));

    // Attach the decoded token to the request object for further use
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    logger.error('Error verifying token:', error);

    // Respond with an unauthorized error
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware;