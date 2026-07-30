import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

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

// Class
// GET: List classes
export const getClasses = async (req: Request, res: Response) => {
    try {
        // Fetch classes from PostgreSQL
        const classes = await prisma.classes.findMany();

        res.status(200).json({ successL: true, data: classes });

    } catch (error) {
        console.error('❌ Error fetching classes:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// POST: Create a new class
export const createClass = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        const newClass = await prisma.classes.create({
            data: {
                name,
                description,
            },
        });

        res.status(201).json({ success: true, data: newClass });
        
    } catch (error) {
        console.error('❌ Error fetching classes:', error);
        res.status(500).json({ succuess: false, error: String(error) });
    }
};