import { body } from 'express-validator';

export const signUpValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const signInValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const setUserTypeValidation = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required'),

  body('userType')
    .isIn(['customer', 'vendor', 'admin'])
    .withMessage('User type must be customer, vendor, or admin')
];

export const resetPasswordValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
];
