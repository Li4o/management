import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';

// ==========================================
// Item
// ==========================================
// Get: Fetch all items
export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await prisma.item.findMany();
        
        res.status(200).json({ success: true, data: items});

    } catch (error) {
        console.error('❌ Error fetching items:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// POST: Create a new item
export const createItem = async (req: Request, res: Response) => {
    try {
        const { classId, assetTag, name, category, status, location, customFields, description, createdBy } = req.body;

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

        res.status(201).json({ success: true, data: newItem });

    } catch (error) {
        console.error('❌ Error creating item:', error);
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
        console.error('❌ Error fetching item by ID:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// PUT: Update an existing item
export const updateItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const updateData = req.body;

        const updatedItem = await prisma.item.update({
            where: { id },
            data: updateData,
        });

        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        console.error('❌ Error updating item:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
}

// DELETE: Delete a item
export const deleteItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({ success: false, error: 'ID is required' });
        }

        const deletedItem = await prisma.item.delete({
            where: { id },
        });

        res.status(200).json({ success: true, data: deletedItem });
    } catch (error) {
        console.error('❌ Error deleting item:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

// ==========================================
// Asset Logs
// ==========================================
// Asset Logs
// GET: Fetch all asset logs
export const getAssetLogs = async (req: Request, res: Response) => {
    try {
        const logs = await prisma.assetLog.findMany(); 

        res.status(200).json({ success: true, data: logs });

    } catch (error) {
        console.error('❌ Error fetching asset logs:', error);
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
        console.error('❌ Error fetching asset log by ID:', error);
        res.status(500).json({ success: false, error: String(error) });
    }
};

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
        const user = await prisma.users.findUnique({ where: { id } });

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


// PUT: Update the current logged-in user


// ==========================================
// Custom Fields
// ==========================================
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

// ==========================================
// Class
// ==========================================
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

// PUT: Update a class


// DELETE: Delete a class


// ==========================================
// Log
// ==========================================
// GET: Fetch all logs


// GET: Fetch log detail