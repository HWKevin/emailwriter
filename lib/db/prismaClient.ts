import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL || '';
  const urlWithPgbouncer = url.includes('pgbouncer=true')
    ? url
    : `${url}${url.includes('?') ? '&' : '?'}pgbouncer=true`;

  return new PrismaClient({
    datasources: {
      db: {
        url: urlWithPgbouncer,
      },
    },
  });
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
