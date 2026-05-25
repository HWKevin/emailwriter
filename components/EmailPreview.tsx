'use client';

import { Copy, RefreshCw, Check, Mail } from 'lucide-react';
import { useState } from 'react';

interface EmailPreviewProps {
  email: string;
  onRegenerate: () => void;
}

export default function EmailPreview({ email, onRegenerate }: EmailPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!email) {
    return (
      <div className="card flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Mail className="h-8 w-8 text-indigo-500" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">Your Email Will Appear Here</h3>
        <p className="max-w-sm text-sm text-slate-500">
          Add the recipient, goal, and key points to create a polished email with a subject line.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Generated Email</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            className="btn-ghost inline-flex items-center gap-1.5"
            title="Regenerate"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              copied
                ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                : 'btn-ghost'
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="letter-preview">{email}</div>
    </div>
  );
}
