import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined.');
}

// Function to create a Prisma client instance
const createPrismaClient = () => {
  // Check if the URL is for a Neon database
  if (connectionString.includes('neon.tech')) {
    console.log('Using Neon database adapter.');
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
  } else {
    console.log('Using local database connection.');
    // Use the default Prisma client for standard connections (e.g., localhost)
    return new PrismaClient();
  }
};

// Use a global instance to prevent creating too many connections during development hot-reloads.
export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}
