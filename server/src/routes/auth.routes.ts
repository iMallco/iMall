import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  signUpValidation,
  signInValidation,
  setUserTypeValidation,
  resetPasswordValidation
} from '../middleware/validators';

const router = Router();

// Public routes
router.post('/signup', signUpValidation, authController.signUp.bind(authController));
router.post('/signin', signInValidation, authController.signIn.bind(authController));
router.post('/reset-password', resetPasswordValidation, authController.resetPassword.bind(authController));

// Protected routes
router.post('/set-user-type', setUserTypeValidation, authController.setUserType.bind(authController));
router.post('/logout', authenticateToken, authController.logout.bind(authController));
router.get('/me', authenticateToken, authController.getMe.bind(authController));

export default router;
