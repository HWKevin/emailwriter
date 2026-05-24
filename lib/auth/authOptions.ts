import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '@/lib/db/prismaClient';
import { verifyPassword } from './password';

type GoogleTokenInfo = {
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
};

async function verifyGoogleOneTapCredential(credential: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
      credential,
    )}`,
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as GoogleTokenInfo;
  const emailVerified = String(payload.email_verified) === 'true';

  if (!payload.sub || !payload.email || payload.aud !== clientId || !emailVerified) {
    return null;
  }

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const user = await prisma.user.upsert({
    where: { email: payload.email },
    update: {
      name: payload.name,
      avatarUrl: payload.picture,
    },
    create: {
      email: payload.email,
      name: payload.name,
      avatarUrl: payload.picture,
      isAdmin: adminEmails.includes(payload.email.toLowerCase()),
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.avatarUrl,
    isAdmin: user.isAdmin,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) {
          return null;
        }

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
          isAdmin: user.isAdmin,
        };
      },
    }),
    CredentialsProvider({
      id: 'google-one-tap',
      name: 'Google One Tap',
      credentials: {
        credential: { label: 'Credential', type: 'text' },
      },
      async authorize(credentials) {
        const credential = credentials?.credential;

        if (!credential) {
          return null;
        }

        return verifyGoogleOneTapCredential(credential);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') return true;

      try {
        if (user.email) {
          const existing = await prisma.user.findUnique({
            where: { email: user.email },
          });
          if (!existing) {
            const adminEmails = (process.env.ADMIN_EMAILS || '')
              .split(',')
              .map((item) => item.trim().toLowerCase())
              .filter(Boolean);
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                avatarUrl: user.image,
                isAdmin: adminEmails.includes(user.email.toLowerCase()),
              },
            });
          }
        }
        return true;
      } catch (error) {
        console.error('OAuth signIn callback error:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      if (account?.provider !== 'credentials' && token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { id: true, isAdmin: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.isAdmin = dbUser.isAdmin;
          }
        } catch (error) {
          console.error('jwt callback DB error:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string | null | undefined;
        session.user.image = token.picture as string | null | undefined;
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
