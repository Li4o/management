import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import assetLogRoutes from './routes/assetLogRoutes.js'
import authRoutes from './routes/authRoutes.js'
import classRoutes from './routes/classRoutes.js'
import customFieldRoutes from './routes/customFieldRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import userMeRoutes from './routes/userMeRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/v1/logs', assetLogRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/classes', classRoutes);
app.use('/api/v1/custom-fields', customFieldRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/users/me', userMeRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`? Server running on http://localhost:${PORT}`);
})