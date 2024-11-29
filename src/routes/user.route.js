import express from 'express';
import { jwtAuthMiddleware } from '../middlewares/auth.middleware.js';
import {
    signup,
    login,
    profile,
    updatePassword,
   
} from '../controllers/user.controller.js';

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Profile Route
router.get('/profile', jwtAuthMiddleware, profile);

// Update Password Route
router.put('/profile/password', jwtAuthMiddleware, updatePassword);


export default router;
