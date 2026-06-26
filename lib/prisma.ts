import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const url = process.env.DATABASE_URL ?? ''

function createClient(): PrismaClient {
  if (url.startsWith('prisma+postgres://')) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { withAccelerate } = require('@prisma/extension-accelerate')
    const adapter = new PrismaPg({ connectionString: url })
    return new PrismaClient({ adapter }).$extends(withAccelerate()) as unknown as PrismaClient
  }
  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma
}

export default prisma
