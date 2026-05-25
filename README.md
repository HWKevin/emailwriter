# AI Email Writer

ZenryPro productivity tool for generating professional emails, replies, follow-ups, cold outreach, thank-you notes, apology emails, meeting requests, and job application emails.

## Stack

- Next.js 14
- NextAuth with credentials, Google, GitHub, and Google One Tap
- Prisma + PostgreSQL
- OpenAI-compatible or Anthropic-compatible AI provider
- Tailwind CSS

## Local Setup

1. Copy `.env.local.example` to `.env.local`
2. Fill in database, auth, and AI provider environment variables
3. Create the `emailwriter` PostgreSQL schema with `prisma/init-emailwriter-schema.sql`
4. Install dependencies with `npm install`
5. Push the schema with `npx prisma db push`
6. Start the app with `npm run dev`

## Database Isolation

This project uses the `emailwriter` PostgreSQL schema so it can share one Supabase database with other ZenryPro tools without table-name conflicts. See `docs/database-strategy.md` for the migration path toward shared accounts, SSO, quotas, subscriptions, and unified history.

## SEO Pages

Long-tail SEO page data lives in `data/seoPages.ts`. The first batch targets:

- `ai email writer`
- `ai email generator`
- `ai email reply generator`
- `follow up email generator`
- `cold email generator`
- `professional email generator`
