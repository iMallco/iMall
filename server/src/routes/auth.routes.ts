import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  signUpValidation,
  signInValidation,
  setUserTypeValidation,
  resetPasswordValidation
} from '../middleware/validators';

const router = Router();

// Strict rate limiter for auth routes - prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { success: false, error: 'Too many authentication attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes (with rate limiting)
router.post('/signup', authLimiter, signUpValidation, authController.signUp.bind(authController));
router.post('/signin', authLimiter, signInValidation, authController.signIn.bind(authController));
router.post('/reset-password', authLimiter, resetPasswordValidation, authController.resetPassword.bind(authController));

// Protected routes (require authentication)
router.post('/set-user-type', authenticateToken, setUserTypeValidation, authController.setUserType.bind(authController));
router.post('/logout', authenticateToken, authController.logout.bind(authController));
router.get('/me', authenticateToken, authController.getMe.bind(authController));

export default router;
