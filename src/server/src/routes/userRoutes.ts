import { Router }  from 'express';
import { getUsers } from '../controllers/userController';

const router = Router();

// GET /api/v1/users
router.get('/', getUsers);

export default router;