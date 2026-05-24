'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import AppHeader from '@/components/AppHeader';
import SiteFooter from '@/components/SiteFooter';
import { ArrowDown, ArrowRight, CheckCircle2, Mail, MessageSquareReply, Send, Shield, Sparkles, Zap, ChevronDown } from 'lucide-react';

const features = [
  {
    icon: Mail,
    title: 'Everyday Email Drafts',
    description: 'Write professional emails, thank-you notes, apologies, meeting requests, and job application emails from a few notes.',
  },
  {
    icon: MessageSquareReply,
    title: 'Fast Replies',
    description: 'Paste the original message and get a clear response that acknowledges context without sounding generic.',
  },
  {
    icon: Send,
    title: 'Outreach Ready',
    description: 'Create concise follow-ups and cold outreach emails with a direct ask, subject line, and natural tone.',
  },
];

const useCases = [
  'Professional email',
  'Email reply generator',
  'Follow-up email',
  'Cold outreach',
  'Thank-you email',
  'Apology email',
  'Meeting request',
  'Job application email',
];

const faqs = [
  {
    question: 'What can this AI email writer generate?',
    answer:
      'It can generate professional emails, replies, follow-ups, cold outreach messages, thank-you notes, apology emails, meeting requests, and job application emails.',
  },
  {
    question: 'Does it include a subject line?',
    answer:
      'Yes. Each generation returns a subject line and a complete email body that you can review, edit, and copy.',
  },
  {
    question: 'Can I control the tone and length?',
    answer:
      'Yes. You can choose professional, casual, warm, or persuasive tone, plus short, medium, or detailed length.',
  },
  {
    question: 'Is this useful for Gmail?',
    answer:
      'Yes. The first version gives you copy-ready drafts for Gmail or any inbox. Gmail draft integration is a natural next step for logged-in users.',
  },
  {
    question: 'Do I need to sign up?',
    answer:
      'You can explore the product freely, and generation uses the ZenryPro account system so your quota and future history features stay connected.',
  },
];

export default function Home() {
  const { data: session } = useSession();
  const ctaHref = session ? '/generate' : '/register';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AI Email Writer',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://emailwriter.zenrypro.com',
    description: 'Generate professional emails, replies, follow-ups, and outreach messages in seconds with AI.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      <Script
        id="json-ld-webapp"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <AppHeader />

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 text-center md:pb-16 md:pt-24">
          <span className="badge">ZenryPro productivity tool</span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            AI Email <span style={{ color: 'var(--accent)' }}>Writer</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400 sm:text-xl">
            Write professional emails, replies, follow-ups, and outreach messages in seconds with tone, length, and language control.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href={ctaHref} className="btn-primary inline-flex items-center gap-2">
              {session ? 'Go to Writer' : 'Start Writing'}
              {session ? <ArrowRight className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </Link>
            {!session && (
              <Link href="/login" className="btn-secondary inline-flex items-center gap-2">
                Sign In
              </Link>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15">
                    <Icon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Built for Real Inbox Work</h2>
              <p className="mt-3 text-slate-400">
                The goal is not just pretty wording. Each draft includes a clear ask, the right level of politeness, and enough context to send with small edits.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-violet-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: 'Describe the Goal', description: 'Tell the writer who the email is for and what outcome you want.' },
              { icon: Shield, title: 'Add Context', description: 'Paste notes, constraints, or the message you are replying to.' },
              { icon: Sparkles, title: 'Copy and Send', description: 'Review the subject and body, then copy the final draft into your inbox.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/20 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mt-2 text-slate-400">A practical email tool for the ZenryPro matrix.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="glass-card group">
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-base font-medium text-white transition hover:text-violet-200">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="glass-card mx-auto max-w-3xl p-8 text-center md:p-12">
            <Sparkles className="mx-auto mb-4 h-10 w-10" style={{ color: 'var(--accent)' }} />
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Write the Next Email Faster</h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-400">
              Turn rough notes into a polished subject line and email body without wrestling with a blank compose box.
            </p>
            <Link href={ctaHref} className="btn-primary mt-6 inline-flex items-center gap-2">
              {session ? 'Open Writer' : 'Sign Up for Free'}
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
