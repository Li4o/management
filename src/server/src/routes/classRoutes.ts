import { Router }  from 'express';
import { getClasses, createClass, updateClass, deleteClass } from '../controllers/userController.js';
import customFieldRoutes from './customFieldRoutes.js';

const router = Router();

// GET /api/v1/classes
router.get('/', getClasses);

// POST /api/v1/classes
router.post('/', createClass);

// PUT /api/v1/classes/:id
router.put('/:id', updateClass);

// DELETE /api/v1/classes/:id
router.delete('/:id', deleteClass);

// Forward custom-field endpoints to customFieldRoutes
router.use('/:classId/custom-fields', customFieldRoutes);

export default router;