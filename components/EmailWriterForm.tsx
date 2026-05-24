'use client';

import { Mail, Sparkles, MessageSquare, User, Target, Languages, Ruler } from 'lucide-react';
import ToneSelector from './ToneSelector';

export interface EmailFormData {
  emailType: string;
  recipient: string;
  goal: string;
  keyPoints: string;
  context: string;
  tone: string;
  length: string;
  language: string;
}

interface EmailWriterFormProps {
  formData: EmailFormData;
  onChange: (field: keyof EmailFormData, value: string) => void;
  onSubmit: () => void;
  isGenerating: boolean;
}

const EMAIL_TYPES = [
  'Professional email',
  'Reply to an email',
  'Follow-up email',
  'Cold outreach',
  'Thank-you email',
  'Apology email',
  'Meeting request',
  'Job application email',
];

export default function EmailWriterForm({ formData, onChange, onSubmit, isGenerating }: EmailWriterFormProps) {
  return (
    <div className="glass-card p-6 space-y-5">
      <h2 className="text-lg font-semibold text-white">Email Details</h2>

      <div>
        <label htmlFor="emailType" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-200">
          <Mail className="h-4 w-4 text-violet-400" />
          Email Type
        </label>
        <select
          id="emailType"
          className="input-field"
          value={formData.emailType}
          onChange={(e) => onChange('emailType', e.target.value)}
        >
          {EMAIL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="recipient" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-200">
          <User className="h-4 w-4 text-violet-400" />
          Recipient <span className="text-red-400">*</span>
        </label>
        <input
          id="recipient"
          type="text"
          placeholder="e.g. my manager, a professor, a potential client"
          className="input-field"
          value={formData.recipient}
          onChange={(e) => onChange('recipient', e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="goal" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-200">
          <Target className="h-4 w-4 text-violet-400" />
          Goal <span className="text-red-400">*</span>
        </label>
        <input
          id="goal"
          type="text"
          placeholder="e.g. ask for a meeting, follow up after an interview, decline politely"
          className="input-field"
          value={formData.goal}
          onChange={(e) => onChange('goal', e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="keyPoints" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-200">
          <MessageSquare className="h-4 w-4 text-violet-400" />
          Key Points
        </label>
        <textarea
          id="keyPoints"
          rows={4}
          placeholder="Add the details the email should include. Bullet points are fine."
          className="input-field resize-none"
          value={formData.keyPoints}
          onChange={(e) => onChange('keyPoints', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="context" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-200">
          <MessageSquare className="h-4 w-4 text-violet-400" />
          Extra Context
        </label>
        <textarea
          id="context"
          rows={3}
          placeholder="Paste the email you are replying to, notes about the relationship, or constraints."
          className="input-field resize-none"
          value={formData.context}
          onChange={(e) => onChange('context', e.target.value)}
        />
      </div>

      <ToneSelector value={formData.tone} onChange={(tone) => onChange('tone', tone)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="length" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-200">
            <Ruler className="h-4 w-4 text-violet-400" />
            Length
          </label>
          <select
            id="length"
            className="input-field"
            value={formData.length}
            onChange={(e) => onChange('length', e.target.value)}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
        <div>
          <label htmlFor="language" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-200">
            <Languages className="h-4 w-4 text-violet-400" />
            Language
          </label>
          <select
            id="language"
            className="input-field"
            value={formData.language}
            onChange={(e) => onChange('language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isGenerating || !formData.recipient || !formData.goal}
        className="btn-primary w-full py-3 text-base font-semibold"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Generating...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            Generate Email
          </span>
        )}
      </button>
    </div>
  );
}
