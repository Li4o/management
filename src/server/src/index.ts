import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import classRoutes from './routes/classRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount User Routes
app.use('/api/v1/users', userRoutes);
// Mount Class Routes
app.use('/api/v1/classes', classRoutes);

app.listen(PORT, () => {
    console.log(`? Server running on http://localhost:${PORT}`);
})