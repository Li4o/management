import { Router }  from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = Router();

// GET /api/v1/users
router.get('/', getUsers);

// POST /api/v1/users
router.post('/', createUser);

export default router;