export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json({
    clientId: process.env.GOOGLE_CLIENT_ID || null,
  });
}
