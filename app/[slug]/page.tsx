import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import SiteFooter from '@/components/SiteFooter';
import { getSeoPage, seoPages } from '@/data/seoPages';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://emailwriter.zenrypro.com';

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getSeoPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${SITE_URL}/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}/${page.slug}`,
      siteName: 'AI Email Writer',
      type: 'website',
    },
  };
}

export default function SeoLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getSeoPage(params.slug);

  if (!page) {
    notFound();
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AppHeader />
      <main>
        <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 md:pb-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge">{page.eyebrow}</span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/generate" className="btn-primary inline-flex items-center gap-2">
                {page.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/" className="btn-ghost">
                Email Writer Home
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[page.primaryKeyword, ...page.relatedKeywords].map((keyword) => (
              <div key={keyword} className="card p-4">
                <p className="text-sm font-medium text-indigo-600">{keyword}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {page.sections.map((section) => (
              <article key={section.title} className="card p-6">
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-3">
            {page.faq.map((item) => (
              <details key={item.question} className="card p-5">
                <summary className="cursor-pointer text-base font-medium text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
