import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getUser = async (req: Request, res: Response) => {
    try {
        // Fetch users from PostgreSQL
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        }):

        res.status(200).json({
            success: true,
            data: users,
        }):
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success:  false,
            data: 'Internal server error'
        });
    }
};