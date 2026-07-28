import { Router }  from 'express';
import { getUsers } from '../controllers/userController.js';

const router = Router();

// GET /api/v1/users
router.get('/', getUsers);

export default router;