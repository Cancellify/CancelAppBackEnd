import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()

async function main () {
    // write prisma queries here
}

main ()
    .catch (e => {
        console.error(e.message)
    })
    .finally( async () => {
        await prisma.$disconnect();
    })