import prisma from './prismaClient';

export async function checkUserQuota(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      dailyQuota: true,
      usedToday: true,
      resetDate: true,
    },
  });

  if (!user) return { allowed: false, used: 0, limit: 0, reason: 'User not found' };

  const now = new Date();
  const resetDate = new Date(user.resetDate);

  if (now > resetDate) {
    await prisma.user.update({
      where: { id: userId },
      data: { usedToday: 0, resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    });
    return { allowed: true, used: 0, limit: user.dailyQuota };
  }

  return {
    allowed: user.usedToday < user.dailyQuota,
    used: user.usedToday,
    limit: user.dailyQuota,
  };
}

export async function recordUsage(
  userId: string,
  goal: string,
  recipient: string,
  model: string,
  prompt?: string
) {
  await prisma.user.update({
    where: { id: userId },
    data: { usedToday: { increment: 1 } },
  });

  return await prisma.usageLog.create({
    data: {
      userId,
      prompt: prompt?.slice(0, 2000),
      emailGoal: goal,
      recipient,
      modelUsed: model,
    },
  });
}
