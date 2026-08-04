import { Router } from 'express';
import { getAssetLogs, getAssetLogById } from '../controllers/userController.js';

const router = Router();

// GET /api/v1/asset-logs
router.get('/', getAssetLogs);

// GET /api/v1/asset-logs/:id
router.get('/:id', getAssetLogById);

export default router;