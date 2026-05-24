import prisma from '../lib/db/prismaClient';

async function main() {
  // Ensure all users have at least 10 daily quota
  await prisma.user.updateMany({
    where: { dailyQuota: { lt: 10 } },
    data: { dailyQuota: 10 },
  });
  console.log('DB initialized successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
