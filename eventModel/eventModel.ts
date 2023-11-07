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

async function getEventsByEvent(id: number){
    const data = await prisma.eventAttendance.findMany({
        where: {
            eventId : id
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

async function updateAttendance(attendance:boolean, userId: number, eventId:number) {
    const data = await prisma.eventAttendance.updateMany({
       where: {
        eventId: eventId,
        userId: userId
       },
       data: {attendance: attendance}
      })
   return data; 
}

async function deleteAttendance(event:number) {
    await prisma.eventAttendance.deleteMany({
        where: {
            eventId: event
        }
    })
}


export {createNewEvent, createAttendance, getEvents, getEventDetails, updateAttendance, getEventsByEvent, deleteAttendance}