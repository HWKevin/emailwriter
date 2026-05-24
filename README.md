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
3. Install dependencies with `npm install`
4. Push the schema with `npx prisma db push`
5. Start the app with `npm run dev`

## SEO Pages

Long-tail SEO page data lives in `data/seoPages.ts`. The first batch targets:

- `ai email writer`
- `ai email generator`
- `ai email reply generator`
- `follow up email generator`
- `cold email generator`
- `professional email generator`
