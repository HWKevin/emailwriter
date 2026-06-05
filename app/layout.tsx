import './globals.css';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import AuthSessionProvider from '@/components/AuthSessionProvider';
import GoogleOneTap from '@/components/GoogleOneTap';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://emailwriter.zenrypro.com';

export const metadata: Metadata = {
  title: {
    default: 'AI Email Writer - Free Professional Email Generator | ZenryPro',
    template: '%s | AI Email Writer',
  },
  description:
    'Generate professional emails, replies, follow-ups, and outreach messages in seconds with AI. Choose tone, length, and language.',
  keywords: [
    'AI email writer',
    'AI email generator',
    'free AI email writer',
    'email reply generator',
    'professional email generator',
    'email subject line generator',
    'subject line generator',
    'follow up email generator',
    'cold email generator',
    'Gmail email writer',
  ],
  authors: [{ name: 'ZenryPro' }],
  creator: 'ZenryPro',
  publisher: 'ZenryPro',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'AI Email Writer',
    title: 'AI Email Writer - Free Professional Email Generator',
    description:
      'Generate professional emails, replies, follow-ups, and outreach messages in seconds with AI.',
    url: siteUrl,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AI Email Writer by ZenryPro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Email Writer - Free Professional Email Generator',
    description: 'Generate professional emails and replies in seconds with AI.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-TBN7GT2S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GT-TBN7GT2S');
          `}
        </Script>
        <AuthSessionProvider>
          <GoogleOneTap />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
