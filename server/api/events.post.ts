import { PrismaClient, Event, EventStatus } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Event

  const newEvent = await prisma.event.create({
    data: body
  })

  return newEvent
})