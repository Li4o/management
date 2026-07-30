import { Router }  from 'express';
import { getClasses, createClass } from '../controllers/userController.js';

const router = Router();

// GET /api/v1/classes
router.get('/', getClasses);

// POST /api/v1/classes
router.post('/', createClass);

export default router;