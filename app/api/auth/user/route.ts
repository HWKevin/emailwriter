import { getSessionUser, requireAdmin } from '@/lib/auth/getSessionUser';
import prisma from '@/lib/db/prismaClient';

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        isAdmin: true,
        dailyQuota: true,
        usedToday: true,
        resetDate: true,
        createdAt: true,
      },
    });

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { targetEmail, dailyQuota } = body;

    const user = await prisma.user.update({
      where: { email: targetEmail || admin.email },
      data: {
        dailyQuota: dailyQuota !== undefined ? Number(dailyQuota) : undefined,
      },
    });

    return Response.json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
