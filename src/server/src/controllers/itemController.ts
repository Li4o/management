import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { createAssetLog } from './logController.js';

// GET: Fetch all items
export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await prisma.item.findMany();

        res.status(200).json({ success: true, data: items});

    } catch (error) {
        console.error('? Error fetching items:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// POST: Create a new item
export const createItem = async (req:Request, res:Response) => {
    try {
        const classId = req.params.classId as string;
        const { assetTag, name, category, status, location, customFields, description, createdBy } = req.body;

        const newItem = await prisma.item.create({
            data: {
                classId,
                assetTag,
                name,
                category,
                status,
                location,
                customFields,
                description,
                createdBy,
            },
        });

        await createAssetLog({
            itemId: newItem.id,
            action: 'CREATE',
            reason: `Item "${newItem.name}" was created.`,
            createdBy: createdBy,
        });
    } catch (error) {
        console.error('? Error creating item:', error);
        res.status(500).json({ success: false, error: String(error) });  
    }
}

// GET: Fetch the item detail
export const getItemById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const item = await prisma.item.findUnique({ where: { id } });

        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        console.error('? Error fetching item by ID:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// PUT: Update an existing item
export const updateItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { reason, userId, ...updateData } = req.body;

        const updatedItem = await prisma.item.update({
            where: { id },
            data: updateData,
        });

        await createAssetLog({
            itemId: updatedItem.id,
            action: 'UPDATE',
            reason: reason,
            createdBy: userId,
        });

        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        console.error('? Error updating item:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// DELETE: Delete a item
export const deleteItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { reason, userId } = req.body || {};

        if (!id) {
            return res.status(400).json({ success: false, error: 'ID is required' });
        }

        const itemToDelete = await prisma.item.findUnique({
            where: { id },
        });

        if (!itemToDelete) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }

        await createAssetLog({
            itemId: itemToDelete.id,
            action: 'DELETE',
            reason: reason || 'Item deleted',
            createdBy: userId || itemToDelete.createdBy,
        });

        const deletedItem = await prisma.item.delete({
            where: { id },
        });

        res.status(200).json({ success: true, data: deletedItem });
    } catch (error) {
        console.error('? Error deleting item:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};