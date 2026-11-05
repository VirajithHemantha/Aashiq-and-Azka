import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Link2, Copy, MessageSquareText } from 'lucide-react';
import {
  PREFIXES, PrefixKey, GROOM_NAME, BRIDE_NAME,
  buildDisplayName, buildInviteLink, buildInviteMessage,
} from '../config';
import { Monogram } from './Monogram';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers / non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

export const AdminPage: React.FC = () => {
  const [prefix, setPrefix] = useState<PrefixKey>('mr');
  const [guestName, setGuestName] = useState('');
  const [result, setResult] = useState<{ link: string; displayName: string; message: string } | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter a guest name');
      return;
    }
    const displayName = buildDisplayName(prefix, guestName);
    const link = buildInviteLink(window.location.origin, prefix, guestName);
    setResult({ link, displayName, message: buildInviteMessage(displayName, link) });
  };

  const inputClass =
    'w-full bg-white px-5 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none transition font-serif text-lg text-brand-gold-deep';
  const btnSecondary =
    'flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-brand-gold/50 text-brand-gold-deep font-sans text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-gold/10 transition disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-brand-champagne font-sans text-brand-gold-deep px-4 py-10 sm:py-16">
      <Toaster position="top-center" />
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <Monogram className="w-16 h-16 mx-auto mb-3" />
          <h1 className="font-display text-2xl sm:text-3xl">Invitation Link Generator</h1>
          <p className="text-brand-gold-text font-serif italic mt-1">{GROOM_NAME} &amp; {BRIDE_NAME} · Waleema</p>
        </div>

        <form onSubmit={handleGenerate} className="bg-white/80 rounded-2xl border border-brand-gold/30 shadow-sm p-6 sm:p-8 space-y-5">
          <div>
            <label htmlFor="prefix" className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold-text mb-2">Select Prefix</label>
            <select id="prefix" className={inputClass} value={prefix} onChange={(e) => setPrefix(e.target.value as PrefixKey)}>
              {PREFIXES.map((p) => (
                <option key={p.key} value={p.key}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="guest" className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold-text mb-2">Guest Name</label>
            <input
              id="guest"
              type="text"
              placeholder="e.g. Sanjaya"
              className={inputClass}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-mocha text-brand-gold-light py-4 rounded-xl font-sans tracking-[0.25em] font-bold text-[11px] uppercase hover:bg-brand-mocha/90 transition active:scale-[0.98]"
          >
            <Link2 className="w-4 h-4 text-brand-gold" />
            Generate Link
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={!result}
              className={btnSecondary}
              onClick={async () => { if (result) { await copyText(result.link); toast.success('Link copied!'); } }}
            >
              <Copy className="w-4 h-4" /> Copy Link Only
            </button>
            <button
              type="button"
              disabled={!result}
              className={btnSecondary}
              onClick={async () => { if (result) { await copyText(result.message); toast.success('Message copied!'); } }}
            >
              <MessageSquareText className="w-4 h-4" /> Copy Full Message
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="bg-white/80 rounded-2xl border border-brand-gold/30 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold-text mb-2">Generated Link</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer" className="font-mono text-sm break-all text-brand-gold-text underline decoration-brand-gold/50 underline-offset-4">
                {result.link}
              </a>
            </div>
            <div className="bg-white/80 rounded-2xl border border-brand-gold/30 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold-text mb-2">Message Preview</p>
              <pre className="whitespace-pre-wrap font-serif text-base leading-relaxed text-brand-gold-deep">{result.message}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
