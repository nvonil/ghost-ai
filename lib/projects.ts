import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from './prisma'

export interface Project {
  id: string
  name: string
  owned: boolean
}

export async function getProjects(): Promise<{ owned: Project[]; shared: Project[] }> {
  const { userId } = await auth()
  if (!userId) return { owned: [], shared: [] }

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress ?? null

  const [ownedRows, sharedRows] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true },
    }),
    email
      ? prisma.project.findMany({
          where: { collaborators: { some: { email } } },
          orderBy: { createdAt: 'desc' },
          select: { id: true, name: true },
        })
      : Promise.resolve([]),
  ])

  return {
    owned: ownedRows.map((p) => ({ ...p, owned: true })),
    shared: sharedRows.map((p) => ({ ...p, owned: false })),
  }
}
