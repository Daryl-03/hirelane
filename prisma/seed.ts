import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')
  
  // Create test users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      passwordHash: '$2a$12$example.hash.for.test.purposes',
      subscriptionTier: 'FREE',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      passwordHash: '$2a$12$example.hash.for.test.purposes',
      subscriptionTier: 'PAID',
    },
  })

  // Create test CV
  const cv = await prisma.cV.create({
    data: {
      userId: user1.id,
      extractedData: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-123-4567',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
        experience: [
          {
            title: 'Frontend Developer',
            company: 'Tech Corp',
            startDate: '2022-01',
            endDate: '2024-01',
            description: 'Built modern web applications'
          }
        ],
        education: [
          {
            degree: 'Computer Science',
            school: 'University Example',
            year: '2022'
          }
        ]
      },
    },
  })

  // Create test application
  const application = await prisma.application.create({
    data: {
      userId: user1.id,
      cvId: cv.id,
      jobUrl: 'https://example.com/jobs/frontend-developer',
      jobDescription: 'We are looking for a talented Frontend Developer...',
      adaptedCVLaTeX: '\\documentclass{article}\\begin{document}John Doe CV\\end{document}',
      coverLetterLaTeX: '\\documentclass{article}\\begin{document}Dear Hiring Manager...\\end{document}',
    },
  })

  // Create quota usage
  const currentMonth = new Date().toISOString().slice(0, 7) // "2024-03"
  
  await prisma.quotaUsage.create({
    data: {
      userId: user1.id,
      applicationsUsedThisMonth: 1,
      subscriptionTier: 'FREE',
      monthYear: currentMonth,
    },
  })

  await prisma.quotaUsage.create({
    data: {
      userId: user2.id,
      applicationsUsedThisMonth: 15,
      subscriptionTier: 'PAID',
      monthYear: currentMonth,
    },
  })

  console.log('✅ Seed completed')
  console.log(`📊 Created:`)
  console.log(`   - ${2} users`)
  console.log(`   - ${1} CV`)
  console.log(`   - ${1} application`)
  console.log(`   - ${2} quota usage records`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })