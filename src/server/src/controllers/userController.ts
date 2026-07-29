import type { Request, Response } from 'express';
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

        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                passwordHash: password,
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
        res.status(500).json({
            success: false,
            error: String(error)
        });
    }
};