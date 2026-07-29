import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

console.log('🔑 DATABASE_URL:', process.env.DATABASE_URL);

// Create a PostgreSQL connection pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Create the adapter using the pool
const adapter = new PrismaPg(pool);

// Initialize PrismaClient with adapter 
export const prisma = new PrismaClient({ adapter });