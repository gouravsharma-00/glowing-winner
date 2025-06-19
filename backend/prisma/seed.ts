import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()

  const alice = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' },
  })

  const bob = await prisma.user.create({
    data: { name: 'Bob', email: 'bob@example.com' },
  })

  await prisma.event.createMany({
    data: [
      {
        name: 'React Native Meetup',
        location: 'Bangalore',
        startTime: new Date('2025-06-22T00:00:00Z'),
      },
      {
        name: 'GraphQL Workshop',
        location: 'Mumbai',
        startTime: new Date('2025-06-22T00:00:00Z'),
      },
    ],
  })

  console.log('✅ Seeded users and events!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
