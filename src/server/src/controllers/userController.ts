import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

// Item

// Asset Logs

// Users
// GET: Fetch all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        // Fetch users from PostgreSQL
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        res.status(200).json({ success: true, data: users, });

    } catch (error) {
        console.error('❌ Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: String(error)
        });
    }
};

// POST: Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const saltRouds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRouds);

        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            },
        });

        res.status(201).json({ success: true, data: newUser });

    } catch (error) {
        console.error('❌ Error creating user:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// Custom Field
// Get: Fetch all custom fields
export const getCustomFields = async (req:Request, res:Response) => {
    try {
        // Fetch custom fields from PostgreSQL
        const customFields = await prisma.customFields.findMany();

        res.status(200).json({ success: true, data: customFields});

    } catch (error) {
        console.error('❌ Error fetching custom fields:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// POST: Create a new custom field
export const createCustomField = async (req: Request, res: Response) => {
    try {
        const { name, type, options, createdBy } = req.body;

        const newCustomField = await prisma.customFields.create({
            data: {
                name,
                type,
                options,
                createdBy,
            },
        });

        res.status(201).json({ success: true, data: newCustomField });

    } catch (error) {
        console.error('❌ Error creating custom field:', error);
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
        console.error('❌ Error deleting custom field:', error);
        res.status(500).json({ success: false, error: String(error) });  
    }
}

// Class
// GET: Fetch all classes
export const getClasses = async (req: Request, res: Response) => {
    try {
        // Fetch classes from PostgreSQL
        const classes = await prisma.class.findMany();

        res.status(200).json({ success: true, data: classes });

    } catch (error) {
        console.error('❌ Error fetching classes:', error);
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
        console.error('❌ Error creating classes:', error);
        res.status(500).json({ succuess: false, error: String(error) });
    }
};