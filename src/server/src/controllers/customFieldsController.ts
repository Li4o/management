import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

// Get: Fetch all custom fields
export const getCustomFields = async (req:Request, res:Response) => {
    try {
        // Fetch custom fields from PostgreSQL
        const customFields = await prisma.customFields.findMany();

        res.status(200).json({ success: true, data: customFields});

    } catch (error) {
        console.error('? Error fetching custom fields:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// POST: Create a new custom field
export const createCustomField = async (req: Request, res: Response) => {
    try {
        const classId = req.params.classId as string;
        const { name, type, options, createdBy } = req.body;

        const newCustomField = await prisma.customFields.create({
            data: {
                name,
                type,
                options,
                classId,
                createdBy,
            },
        });

        res.status(201).json({ success: true, data: newCustomField });

    } catch (error) {
        console.error('? Error creating custom field:', error);
        res.status(500).json({ success: false, error: String(error) });  
    }
}

// DELETE: Delete a custom field
export const deleteCustomField = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({ success: false, error: 'ID is required' })
        }

        const deletedCustomField = await prisma.customFields.delete({
            where: { id },
        });

        res.status(203).json({ success: true, data: deletedCustomField });

    } catch (error) {
        console.error('? Error deleting custom field:', error);
        res.status(500).json({ success: false, error: String(error) });  
    }
}