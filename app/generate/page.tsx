'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import AppHeader from '@/components/AppHeader';
import SiteFooter from '@/components/SiteFooter';
import EmailWriterForm, { type EmailFormData } from '@/components/EmailWriterForm';
import EmailPreview from '@/components/EmailPreview';

interface QuotaInfo {
  used: number;
  limit: number;
}

export default function GeneratePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<EmailFormData>({
    emailType: 'Professional email',
    recipient: '',
    goal: '',
    keyPoints: '',
    context: '',
    tone: 'professional',
    length: 'medium',
    language: 'English',
  });
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [quota, setQuota] = useState<QuotaInfo>({ used: 0, limit: -1 });

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login?callbackUrl=/generate');
      return;
    }
    if (status === 'authenticated' && session?.user && !session.user.isAdmin) {
      fetch('/api/auth/user')
        .then((r) => r.json())
        .then((data) => {
          if (data?.user) {
            setQuota({
              used: data.user.usedToday ?? 0,
              limit: data.user.dailyQuota ?? 10,
            });
          }
        })
        .catch(() => {});
    }
  }, [status, router, session?.user?.isAdmin]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const requestEmail = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.error || 'Failed to generate email');
    }

    return data;
  };

  const handleGenerate = async () => {
    setError('');
    setIsGenerating(true);
    try {
      let data;
      let lastError: unknown;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          data = await requestEmail();
          break;
        } catch (error) {
          lastError = error;
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 900 * (attempt + 1)));
          }
        }
      }

      if (!data) {
        const message = lastError instanceof Error ? lastError.message : 'Network error. Please try again.';
        setError(message.includes('Unexpected token') ? 'The server returned an invalid response. Please try again.' : message);
        return;
      }

      setEmail(data.email);
      if (data.quota) {
        setQuota(data.quota);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Network error. Please try again.';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const isUnlimited = quota.limit === -1;

  return (
    <div className="min-h-screen">
      <Script
        id="json-ld-webapp"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Email Writer',
            url: process.env.NEXT_PUBLIC_APP_URL || 'https://emailwriter.zenrypro.com',
            description: 'Generate professional emails, replies, follow-ups, and outreach messages in seconds with AI.',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Any',
          }),
        }}
      />

      <AppHeader />

      <main>
        {/* Quota Badge */}
        {!isUnlimited && (
          <div className="mx-auto max-w-6xl px-4 pt-4">
            <div className="inline-flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-2">
              <span className="text-xs text-slate-400">Daily Quota</span>
              <span
                className={`text-lg font-bold ${
                  quota.used >= quota.limit ? 'text-red-500' : 'text-indigo-500'
                }`}
              >
                {quota.used}/{quota.limit}
              </span>
              {quota.used >= quota.limit && (
                <span className="text-xs text-red-500">Limit reached — try again tomorrow</span>
              )}
            </div>
          </div>
        )}

        {/* Generator */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Generate Your Email
            </h1>
            <p className="mt-2 text-slate-500">
              Add the goal, recipient, and key points. AI will draft a subject line and ready-to-send body.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <EmailWriterForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleGenerate}
              isGenerating={isGenerating}
            />
            <EmailPreview
              email={email}
              onRegenerate={handleGenerate}
            />
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
