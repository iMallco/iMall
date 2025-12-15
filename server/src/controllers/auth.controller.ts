import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { userStore, UserStore, AuthResult } from '../models/User';
import { authConfig } from '../config/auth';

export class AuthController {
  // Sign Up
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: errors.array()[0].msg
        });
        return;
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = userStore.findByEmail(email);
      if (existingUser) {
        res.status(400).json({
          success: false,
          error: 'Email already registered'
        });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, authConfig.bcryptSaltRounds);

      // Create user
      const user = userStore.create({
        name,
        email,
        password: hashedPassword,
        userType: null
      });

      // Generate token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpiresIn }
      );

      const response: AuthResult = {
        success: true,
        user: UserStore.toResponse(user),
        token
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('SignUp Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create account'
      });
    }
  }

  // Sign In
  async signIn(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: errors.array()[0].msg
        });
        return;
      }

      const { email, password } = req.body;

      // Find user
      const user = userStore.findByEmail(email);
      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
        return;
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
        return;
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpiresIn }
      );

      const response: AuthResult = {
        success: true,
        user: UserStore.toResponse(user),
        token
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('SignIn Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to sign in'
      });
    }
  }

  // Set User Type
  async setUserType(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: errors.array()[0].msg
        });
        return;
      }

      const { userId, userType } = req.body;

      // Find user
      const user = userStore.findById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      // Update user type
      const updatedUser = userStore.update(userId, { userType });
      if (!updatedUser) {
        res.status(500).json({
          success: false,
          error: 'Failed to update user type'
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: UserStore.toResponse(updatedUser)
      });
    } catch (error) {
      console.error('SetUserType Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to set user type'
      });
    }
  }

  // Reset Password (simplified - sends email in production)
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          error: errors.array()[0].msg
        });
        return;
      }

      const { email } = req.body;

      // Find user
      const user = userStore.findByEmail(email);
      if (!user) {
        // Don't reveal if email exists for security
        res.status(200).json({
          success: true,
          message: 'If the email exists, a password reset link has been sent'
        });
        return;
      }

      // In production: Generate reset token and send email
      // For now, just return success
      console.log(`Password reset requested for: ${email}`);

      res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      });
    } catch (error) {
      console.error('ResetPassword Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process password reset'
      });
    }
  }

  // Logout (for token invalidation if needed)
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // In a production app with token blacklist:
      // - Add token to blacklist
      // - Clear refresh tokens

      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      console.error('Logout Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to logout'
      });
    }
  }

  // Get current user
  async getMe(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // Set by auth middleware

      const user = userStore.findById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: UserStore.toResponse(user)
      });
    } catch (error) {
      console.error('GetMe Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user'
      });
    }
  }
}

export const authController = new AuthController();
