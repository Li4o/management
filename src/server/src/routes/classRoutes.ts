import { Router }  from 'express';
import { getClasses, createClass } from '../controllers/userController.js';
import customFieldRoutes from './customFieldRoutes.js';

const router = Router();

// GET /api/v1/classes
router.get('/', getClasses);

// POST /api/v1/classes
router.post('/', createClass);

// Forward custom-field endpoints to customFieldRoutes
router.use('/:classId/custom-fields', customFieldRoutes);

export default router;