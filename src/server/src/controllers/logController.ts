import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ActionType } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

interface CreateLogParams {
    itemId: string;
    action: ActionType;
    reason?: string;
    createdBy: string;
}

// POST: Create a asset logs by call
export const createAssetLog = async ({ itemId, action, reason, createdBy }: CreateLogParams) => {
    try {
        return await prisma.assetLog.create({
            data: {
                itemId,
                action,
                reason,
                createdBy,
            },
        });
    } catch (error) {
        console.error('? Failed to create asset log:', error);
    }
};

// GET: Fetch all asset logs
export const getAssetLogs = async (req: Request, res: Response) => {
    try {
        const logs = await prisma.assetLog.findMany(); 

        res.status(200).json({ success: true, data: logs });

    } catch (error) {
        console.error('? Error fetching asset logs:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// GET: Fetch asset logs detail
export const getAssetLogById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const log = await prisma.assetLog.findUnique({ where: { id } });

        if (!log) {
            return res.status(404).json({ success: false, error: 'Asset log not found' });
        }

        res.status(200).json({ success: true, data: log });
    } catch (error) {
        console.error('? Error fetching asset log by ID:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};