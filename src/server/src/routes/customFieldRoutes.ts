import { Router }  from 'express';
import { getCustomFields, createCustomField, deleteCustomField } from '../controllers/userController.js';

const router = Router();

// GET /api/v1/classes/:classId/custom-fields
router.get('/', getCustomFields);

// POST /api/v1/classes/:classId/custom-fields
router.post('/', createCustomField);

// DELETE /api/v1/classes/:classId/custom-fields/:id
router.post('/', deleteCustomField);

export default router;