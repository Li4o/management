import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

// ==========================================
// User
// ==========================================
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

// GET: Fetch user detail
export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const user = await prisma.users.findUnique({ 
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }});

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('❌ Error fetching user by ID:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// PUT: Update an user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const updateData = req.body;

        const updatedUser = await prisma.users.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('❌ Error updating user:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// DELETE: Delete an user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({ success: false, error: 'ID is required' });
        }

        const deletedUser = await prisma.users.delete({
            where: { id },
        });

        res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// ==========================================
// Authentication
// ==========================================
// POST: User registration
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

// POST: User login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }

        res.status(200).json({ success: true, data: { id: user.id, name: user.name, email: user.email } });

    } catch (error) {
        console.error('❌ Error logging in user:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// ==========================================
// user(me)
// ==========================================
// GET: Fetch the current logged-in user
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id; // Assuming you have middleware that sets req.user 

        const user = await prisma.users.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('❌ Error fetching current user:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// PUT: Update the current logged-in user
export const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id; // Assuming you have middleware that sets req.user
        const updateData = req.body;

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: updateData,
        });

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('❌ Error updating current user:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};