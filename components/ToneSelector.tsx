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
      <label className="text-sm font-medium text-slate-200">Tone</label>
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
                  ? 'border-violet-400 bg-violet-500/20 shadow-lg shadow-violet-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <p className={`text-sm font-semibold ${isActive ? 'text-violet-200' : 'text-slate-200'}`}>
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
