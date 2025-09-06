import express from 'express';
import { register, login, me } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// Protected route → requires valid JWT
router.get('/me', authMiddleware, me);

export default router;
