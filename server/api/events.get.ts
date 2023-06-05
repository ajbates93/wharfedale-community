import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const data = await prisma.event.findMany({
    where: {
      published: true
    }
  })

  return data
})