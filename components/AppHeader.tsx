'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function AppHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-violet-900/40">
            EW
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-white">AI Email Writer</p>
            <p className="text-xs text-slate-400">by ZenryPro</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5">
          {status !== 'loading' && (
            session ? (
              <>
                <Link href="/generate" className="text-sm text-slate-300 transition hover:text-white">
                  Generate
                </Link>
                <Link href="/ai-email-reply-generator" className="text-sm text-slate-300 transition hover:text-white">
                  Reply Generator
                </Link>
                <div className="hidden text-sm text-slate-400 sm:block">
                  {session.user.name || session.user.email}
                </div>
                {session.user.isAdmin && (
                  <span className="badge">Admin</span>
                )}
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-secondary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/follow-up-email-generator" className="text-sm text-slate-300 transition hover:text-white">
                  Follow-Up
                </Link>
                <Link href="/login" className="text-sm text-slate-300 transition hover:text-white">
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
