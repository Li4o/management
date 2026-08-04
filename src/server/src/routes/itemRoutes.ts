import { Router } from 'express';
import { 
    getItems, 
    createItem, 
    getItemById, 
    updateItem, 
    deleteItem 
} from '../controllers/userController.js';

const router = Router();

// GET /api/v1/items
router.get('/', getItems);

// POST /api/v1/items
router.post('/', createItem);

// GET /api/v1/items/:id
router.get('/:id', getItemById);

// PUT /api/v1/items/:id
router.put('/:id', updateItem);

// DELETE /api/v1/items/:id
router.delete('/:id', deleteItem);

export default router;