import { NextRequest, NextResponse } from 'next/server';
import getAIProvider, { SYSTEM_PROMPT } from '@/lib/ai';
import { getSessionUser } from '@/lib/auth/getSessionUser';
import { checkUserQuota, recordUsage } from '@/lib/db/adminService';

export async function POST(request: NextRequest) {
  // Auth check
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json(
      { error: 'Please sign in to generate emails' },
      { status: 401 }
    );
  }

  // Quota check (admin bypass)
  if (!sessionUser.isAdmin) {
    const quota = await checkUserQuota(sessionUser.id);
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: `Daily limit reached. You've used ${quota.used}/${quota.limit} free generations today.`,
          used: quota.used,
          limit: quota.limit,
        },
        { status: 429 }
      );
    }
  }

  try {
    const body = await request.json();
    const { emailType, recipient, goal, keyPoints, context, tone, length, language } = body;

    if (!recipient || !goal) {
      return NextResponse.json(
        { error: 'Recipient and goal are required' },
        { status: 400 }
      );
    }

    const toneLabel =
      tone === 'casual'
        ? 'casual and conversational'
        : tone === 'warm'
          ? 'warm, thoughtful, and respectful'
          : tone === 'persuasive'
            ? 'persuasive, concise, and action-oriented'
            : 'professional and polished';

    let userPrompt = `Write an email for me.\n\n`;
    userPrompt += `- Email type: ${emailType || 'Professional email'}\n`;
    userPrompt += `- Recipient: ${recipient}\n`;
    userPrompt += `- Goal: ${goal}\n`;
    userPrompt += `- Tone: ${toneLabel}\n`;
    userPrompt += `- Length: ${length || 'medium'}\n`;
    userPrompt += `- Language: ${language || 'English'}\n`;
    if (keyPoints) {
      userPrompt += `- Key points to include: ${keyPoints}\n`;
    }
    if (context) {
      userPrompt += `- Additional context or original email: ${context}\n`;
    }

    const provider = getAIProvider();
    const email = await provider.generateText(userPrompt, SYSTEM_PROMPT);

    // Record usage (admin bypass)
    if (!sessionUser.isAdmin) {
      await recordUsage(sessionUser.id, goal, recipient, provider.modelName, userPrompt);
    }

    // Get updated quota info
    let quotaInfo = { used: 0, limit: -1 }; // -1 = unlimited for admin
    if (!sessionUser.isAdmin) {
      const updated = await checkUserQuota(sessionUser.id);
      quotaInfo = { used: updated.used, limit: updated.limit };
    }

    return NextResponse.json({
      email,
      provider: provider.providerName,
      model: provider.modelName,
      quota: quotaInfo,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate email';
    console.error('[generate] error:', message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
