'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function AppHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-lg font-bold text-slate-900 shadow-lg shadow-indigo-500/20">
            EW
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">AI Email Writer</p>
            <p className="text-xs text-slate-500">by ZenryPro</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          {status !== 'loading' && (
            session ? (
              <>
                <Link href="/generate" className="text-sm text-slate-600 transition hover:text-slate-900">
                  Generate
                </Link>
                <Link href="/ai-email-reply-generator" className="text-sm text-slate-600 transition hover:text-slate-900">
                  Reply Generator
                </Link>
                <Link href="/email-subject-line-generator" className="hidden text-sm text-slate-600 transition hover:text-slate-900 md:inline">
                  Subject Lines
                </Link>
                <div className="hidden text-sm text-slate-500 sm:block">
                  {session.user.name || session.user.email}
                </div>
                {session.user.isAdmin && (
                  <span className="badge">Admin</span>
                )}
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-ghost"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/follow-up-email-generator" className="text-sm text-slate-600 transition hover:text-slate-900">
                  Follow-Up
                </Link>
                <Link href="/email-subject-line-generator" className="hidden text-sm text-slate-600 transition hover:text-slate-900 sm:inline">
                  Subject Lines
                </Link>
                <Link href="/login" className="text-sm text-slate-600 transition hover:text-slate-900">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
