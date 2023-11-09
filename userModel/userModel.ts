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

async function getUserEmail(id:number) {
    let data = await prisma.user.findUnique({
        where:{
            id: id
        }, select: {
            email: true,
            username: true
        }
    })
    return data;
}

async function getAll() {
    const data = await prisma.user.findMany({
        select: {
            username: true,
            first_name: true,
            last_name: true,
        }
    })
    return data;
}

async function deleteUser(username:string){
    await prisma.user.deleteMany({
        where:{ username : username}
    })
}



export { createUser, getUser, getAll, getUserEmail, deleteUser }