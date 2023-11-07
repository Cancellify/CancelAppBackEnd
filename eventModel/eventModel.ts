import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function createNewEvent(newEvent: any) {
    const data = await prisma.event.create({data : newEvent})
    console.log(data)
    return data.id
}

async function createAttendance(event: any) {
    await prisma.eventAttendance.create({data: event})
}

async function getEvents(id: number){
    const data = await prisma.eventAttendance.findMany({
        where: {
            userId : id
        }
    })

    return data;
}

async function getEventDetails(eventId: number){
    const data = await prisma.event.findMany({
        where: {
            id : eventId
        }
    })

    return data;
}


export {createNewEvent, createAttendance, getEvents, getEventDetails}