import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    let connectionString = process.env.DATABASE_URL || '';
    connectionString = connectionString.replace(/^["']|["']$/g, '');
    connectionString = connectionString.replace('postgresql://', 'postgres://');
    
    if (connectionString) {
      console.log('Connecting via standard pg Adapter...');
      const pool = new Pool({ connectionString });
      // Typecast to bypass recent @types/pg mismatch with PrismaPg adapter
      const adapter = new PrismaPg(pool as any);
      return new PrismaClient({ adapter });
    }
    
    throw new Error("DATABASE_URL must be specified.");
  })();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
