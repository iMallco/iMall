import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';

interface JwtPayload {
  userId: string;
  email: string;
}

// Extend Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Access token required'
      });
      return;
    }

    jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(403).json({
          success: false,
          error: 'Invalid or expired token'
        });
        return;
      }

      const payload = decoded as JwtPayload;
      req.userId = payload.userId;
      req.userEmail = payload.email;
      next();
    });
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};
