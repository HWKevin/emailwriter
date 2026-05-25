'use client';

import { useState } from 'react';

const TONES = [
  {
    value: 'professional',
    label: 'Professional',
    description: 'Formal, polished, corporate-appropriate',
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Conversational, approachable, friendly',
  },
  {
    value: 'warm',
    label: 'Warm',
    description: 'Thoughtful, respectful, relationship-friendly',
  },
  {
    value: 'persuasive',
    label: 'Persuasive',
    description: 'Clear, confident, action-oriented',
  },
];

interface ToneSelectorProps {
  value: string;
  onChange: (tone: string) => void;
}

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">Tone</label>
      <div className="grid gap-2 sm:grid-cols-2">
        {TONES.map((tone) => {
          const isActive = value === tone.value;
          return (
            <button
              key={tone.value}
              type="button"
              onClick={() => onChange(tone.value)}
              className={`flex-1 rounded-xl border px-4 py-3 text-left transition ${
                isActive
                  ? 'border-indigo-400 bg-indigo-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-100'
              }`}
            >
              <p className={`text-sm font-semibold ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>
                {tone.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{tone.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
