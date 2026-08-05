import { Router } from 'express';
import { 
    getItems, 
    createItem, 
    getItemById, 
    updateItem, 
    deleteItem 
} from '../controllers/userController.js';

const router = Router({ mergeParams: true });

// GET /api/v1/classes/:classId/items
router.get('/', getItems);

// POST /api/v1/classes/:classId/items
router.post('/', createItem);

// GET /api/v1/classes/:classId/items/:id
router.get('/:id', getItemById);

// PUT /api/v1/classes/:classId/items/:id
router.put('/:id', updateItem);

// DELETE /api/v1/classes/:classId/items/:id
router.delete('/:id', deleteItem);

export default router;