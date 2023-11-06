import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function createNewEvent(newEvent: any) {
    await prisma.event.create({data : newEvent})

}

export {createNewEvent}