import { Router }  from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

// GET /api/v1/users
router.get('/', getUsers);

// GET /api/v1/users/:id
router.get('/:id', getUserById);

// PUT /api/v1/users/:id
router.put('/:id', updateUser);

// DELETE /api/v1/users/:id
router.delete('/:id', deleteUser);

export default router;