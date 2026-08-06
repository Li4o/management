import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

// GET: Fetch all classes
export const getClasses = async (req: Request, res: Response) => {
    try {
        // Fetch classes from PostgreSQL
        const classes = await prisma.class.findMany();

        res.status(200).json({ success: true, data: classes });

    } catch (error) {
        console.error('? Error fetching classes:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// GET: Fetch class detail
export const getClassById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const classData = await prisma.class.findUnique({ where: { id } });

        if (!classData) {
            return res.status(404).json({ success: false, error: 'Class not found' });
        }

        res.status(200).json({ success: true, data: classData });
    } catch (error) {
        console.error('? Error fetching class by ID:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// POST: Create a new class
export const createClass = async (req: Request, res: Response) => {
    try {
        const { name, description, createdBy } = req.body;

        const newClass = await prisma.class.create({
            data: {
                name,
                description,
                createdBy,
            },
        });

        res.status(201).json({ success: true, data: newClass });
        
    } catch (error) {
        console.error('? Error creating classes:', error);
        res.status(500).json({ succuess: false, error: String(error) });
    }
};

// PUT: Update a class
export const updateClass = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const updateData = req.body;

        const updatedClass = await prisma.class.update({
            where: { id },
            data: updateData,
        });
        res.status(200).json({ success: true, data: updatedClass });
    } catch (error) {
        console.error('? Error updating class:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// DELETE: Delete a class
export const deleteClass = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({ success: false, error: 'ID is required' });
        }

        const deletedClass = await prisma.class.delete({
            where: { id },
        });

        res.status(200).json({ success: true, data: deletedClass });
    } catch (error) {
        console.error('? Error deleting class:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};