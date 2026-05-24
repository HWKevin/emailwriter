export interface SeoPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  intro: string;
  ctaLabel: string;
  sections: {
    title: string;
    body: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const seoPages: SeoPage[] = [
  {
    slug: 'ai-email-writer',
    title: 'AI Email Writer - Write Professional Emails Fast',
    description:
      'Use an AI email writer to generate professional emails, replies, follow-ups, and outreach messages with tone and length control.',
    h1: 'AI Email Writer',
    eyebrow: 'Professional email writing tool',
    primaryKeyword: 'ai email writer',
    relatedKeywords: ['free ai email writer', 'email writing assistant', 'professional email writer', 'write emails with ai'],
    intro:
      'Turn a few notes into a polished subject line and email body. Choose the recipient, goal, tone, length, and language, then copy a ready-to-send draft.',
    ctaLabel: 'Write an Email',
    sections: [
      {
        title: 'Clear First Drafts',
        body:
          'A good email needs a purpose, the right tone, and a clear next step. The writer turns rough notes into structured drafts you can edit quickly.',
      },
      {
        title: 'Built for Daily Work',
        body:
          'Use it for managers, clients, professors, recruiters, teammates, or prospects without starting from a blank compose window.',
      },
      {
        title: 'Tone and Length Control',
        body:
          'Switch between professional, casual, warm, and persuasive tones so the message fits the relationship and situation.',
      },
    ],
    faq: [
      {
        question: 'Is the AI email writer free?',
        answer:
          'You can start with a free ZenryPro account and use the daily generation quota to create professional email drafts.',
      },
      {
        question: 'Can it write replies?',
        answer:
          'Yes. Paste the original message into the context field and describe how you want to respond.',
      },
    ],
  },
  {
    slug: 'ai-email-generator',
    title: 'AI Email Generator - Create Emails in Seconds',
    description:
      'Generate emails from scratch with AI, including subject lines, body text, and tone-specific wording.',
    h1: 'AI Email Generator',
    eyebrow: 'Fast email draft generator',
    primaryKeyword: 'ai email generator',
    relatedKeywords: ['email generator ai', 'free email generator', 'email draft generator', 'ai message generator'],
    intro:
      'Describe who you are writing to and what you need to say. The generator creates a subject line and body that you can review and send.',
    ctaLabel: 'Generate an Email',
    sections: [
      {
        title: 'Start With a Goal',
        body:
          'The best email drafts begin with a clear outcome: ask for a meeting, share an update, follow up, apologize, or thank someone.',
      },
      {
        title: 'Add the Details',
        body:
          'Bullet points are enough. Add names, deadlines, context, and constraints so the generated email feels specific.',
      },
      {
        title: 'Edit Before Sending',
        body:
          'AI gives you a polished first draft, but reviewing the details keeps the final message accurate and personal.',
      },
    ],
    faq: [
      {
        question: 'What should I enter into an AI email generator?',
        answer:
          'Enter the recipient, goal, key points, tone, and any context from the previous conversation.',
      },
      {
        question: 'Does it generate a subject line?',
        answer:
          'Yes. The output includes a subject line and an email body.',
      },
    ],
  },
  {
    slug: 'ai-email-reply-generator',
    title: 'AI Email Reply Generator - Respond Faster',
    description:
      'Paste an email and generate a clear, professional reply with the right tone and next step.',
    h1: 'AI Email Reply Generator',
    eyebrow: 'Reply writing assistant',
    primaryKeyword: 'ai email reply generator',
    relatedKeywords: ['email reply generator', 'ai response generator email', 'professional email reply generator', 'gmail reply generator'],
    intro:
      'Replying is easier when the context is already understood. Paste the message you received, explain your answer, and generate a polished response.',
    ctaLabel: 'Generate a Reply',
    sections: [
      {
        title: 'Use the Original Message',
        body:
          'Including the email you received helps the reply acknowledge the right details and avoid sounding disconnected.',
      },
      {
        title: 'Match the Relationship',
        body:
          'A reply to a manager, professor, customer, or prospect needs different wording. Tone controls help you adjust quickly.',
      },
      {
        title: 'Keep the Next Step Clear',
        body:
          'A strong reply confirms, asks, declines, or moves the conversation forward without extra friction.',
      },
    ],
    faq: [
      {
        question: 'Can I paste a long email thread?',
        answer:
          'Yes, but the best results come from pasting the most relevant message and summarizing the answer you want to send.',
      },
      {
        question: 'Can it make replies sound less harsh?',
        answer:
          'Yes. Use the warm or professional tone and include the outcome you need to communicate.',
      },
    ],
  },
  {
    slug: 'follow-up-email-generator',
    title: 'Follow-Up Email Generator - Polite Follow-Ups Fast',
    description:
      'Create polite follow-up emails for sales, interviews, meetings, applications, and unanswered messages.',
    h1: 'Follow-Up Email Generator',
    eyebrow: 'High-intent email workflow',
    primaryKeyword: 'follow up email generator',
    relatedKeywords: ['follow-up email generator', 'ai follow up email', 'polite follow up email', 'sales follow up email generator'],
    intro:
      'Write a follow-up that is clear, respectful, and easy to answer. Add the situation, timing, and desired next step.',
    ctaLabel: 'Write a Follow-Up',
    sections: [
      {
        title: 'Avoid Sounding Pushy',
        body:
          'The right follow-up reminds the recipient why you are writing while leaving room for a simple response.',
      },
      {
        title: 'Useful Across Workflows',
        body:
          'Use follow-ups after interviews, proposals, sales calls, support requests, networking messages, or internal meetings.',
      },
      {
        title: 'Make the Ask Specific',
        body:
          'A clear deadline, question, or next step gives the recipient an easy path to respond.',
      },
    ],
    faq: [
      {
        question: 'How long should a follow-up email be?',
        answer:
          'Most follow-ups should be short: one reminder, one reason, and one clear next step.',
      },
      {
        question: 'Can I use it for interview follow-ups?',
        answer:
          'Yes. Choose follow-up email and add the role, interviewer, timing, and what you want to reinforce.',
      },
    ],
  },
  {
    slug: 'cold-email-generator',
    title: 'Cold Email Generator - Write Outreach Emails With AI',
    description:
      'Generate concise cold outreach emails for prospects, partnerships, sales, and founder-led growth.',
    h1: 'Cold Email Generator',
    eyebrow: 'Outreach email assistant',
    primaryKeyword: 'cold email generator',
    relatedKeywords: ['ai cold email generator', 'sales email generator', 'cold outreach email generator', 'b2b email generator'],
    intro:
      'Create targeted cold emails that explain why you are reaching out, what is relevant to the recipient, and what action you want next.',
    ctaLabel: 'Write Cold Outreach',
    sections: [
      {
        title: 'Relevance Comes First',
        body:
          'Cold emails work better when they mention a real reason for contacting the recipient instead of relying on generic compliments.',
      },
      {
        title: 'Short and Specific',
        body:
          'A concise message with one clear ask is easier to read and easier to answer.',
      },
      {
        title: 'Useful for Testing',
        body:
          'Generate variants for different audiences, value propositions, and calls to action before choosing the strongest draft.',
      },
    ],
    faq: [
      {
        question: 'Can AI write good cold emails?',
        answer:
          'AI can draft strong cold emails when you provide specific recipient context, a relevant reason to reach out, and a clear offer.',
      },
      {
        question: 'Should I personalize the result?',
        answer:
          'Yes. Add recipient-specific details before sending so the email does not feel automated.',
      },
    ],
  },
  {
    slug: 'professional-email-generator',
    title: 'Professional Email Generator - Clear Business Emails',
    description:
      'Generate clear professional emails for workplace communication, clients, managers, professors, and business contacts.',
    h1: 'Professional Email Generator',
    eyebrow: 'Business email writing tool',
    primaryKeyword: 'professional email generator',
    relatedKeywords: ['business email generator', 'formal email generator', 'polite email generator', 'professional email writer'],
    intro:
      'Write workplace emails that sound clear, respectful, and direct. Add the goal and key points, then choose the tone and length.',
    ctaLabel: 'Generate a Professional Email',
    sections: [
      {
        title: 'Sound Polished',
        body:
          'Professional email writing balances clarity, respect, and brevity so the message feels competent without being stiff.',
      },
      {
        title: 'Handle Sensitive Messages',
        body:
          'Use it for apologies, requests, deadline updates, escalations, declines, and negotiation messages.',
      },
      {
        title: 'Copy-Ready Format',
        body:
          'Each draft includes a subject line and body so you can move quickly from idea to inbox.',
      },
    ],
    faq: [
      {
        question: 'Can it make my email more polite?',
        answer:
          'Yes. Choose professional or warm tone and include the direct message you need to soften.',
      },
      {
        question: 'Is it only for business?',
        answer:
          'No. It also works for school, networking, job search, support, and personal administrative messages.',
      },
    ],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
