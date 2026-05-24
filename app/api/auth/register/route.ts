import prisma from '@/lib/db/prismaClient';
import { hashPassword, validateEmail, validatePassword } from '@/lib/auth/password';

// In-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // max 5 registrations per window per IP

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  return realIp || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check -- bots fill hidden fields, real users don't
    if (body.honeypot && String(body.honeypot).trim() !== '') {
      return Response.json(
        { user: { id: 'fake', email: body.email || 'bot@caught', name: null, isAdmin: false, createdAt: new Date().toISOString() } },
        { status: 201 }
      );
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const name = body.name ? String(body.name).trim() : null;

    // Rate limit check
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return Response.json(
        { error: `Too many registration attempts. Please try again in ${rateLimit.retryAfterSec} seconds.` },
        { status: 429 }
      );
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return Response.json({ error: emailError }, { status: 400 });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return Response.json({ error: passwordError }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: 'This email is already registered' }, { status: 409 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    const isAdmin = adminEmails.includes(email);

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        isAdmin,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return Response.json({ error: 'Registration failed, please try again later' }, { status: 500 });
  }
}
