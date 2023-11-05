import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function createUser(newAccount: any) {
    await prisma.user.create({data : newAccount})

}

async function getUser(inputUsername: any){
    let data = await prisma.user.findUnique({
        where: {
            username: inputUsername
        }
    })
    return data
}



export { createUser, getUser }