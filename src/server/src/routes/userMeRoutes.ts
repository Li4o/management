import { Router } from 'express';
import { getCurrentUser, updateCurrentUser } from '../controllers/userController.js';

const router = Router();

// GET /api/v1/users/me
router.get('/me', getCurrentUser);

// PUT /api/v1/users/me
router.put('/me', updateCurrentUser);

export default router;