import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', createUser);

// POST /api/v1/auth/login
router.post('/login', loginUser);

export default router;