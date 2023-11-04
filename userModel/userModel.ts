import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function createUser(newAccount: any) {
    await prisma.user.create ({data : newAccount})

}



export { createUser }