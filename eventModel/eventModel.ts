import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function createNewEvent(newEvent: any) {
    const data = await prisma.event.create({data : newEvent})
return data.id
}

// async function createAttendance(event) {
    
// }

export {createNewEvent}