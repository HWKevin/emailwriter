import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.user.email) {
    return null;
  }
  return session.user;
}

export async function requireSessionUser() {
  const user = await getSessionUser();
  if (!user) {
    return null;
  }
  return user;
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user?.isAdmin) {
    return null;
  }
  return user;
}
