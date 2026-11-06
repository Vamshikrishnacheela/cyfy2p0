import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import type { Capability, CapabilityTab } from '../../homeContent';
import { PrimaryButton } from './ui';

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * "Learn More" detail for a Solutions category, or for one of its cards.
 * Portalled by Capabilities and kept below CustomCursor's z-index, because the site hides the native cursor
 * (which also rules out a native <dialog>: its top layer would cover the custom cursor).
 */
export default function SolutionDetailModal({ tab, item, enquiryTo, onClose }: { tab: CapabilityTab; item?: Capability; enquiryTo: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable?.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="solution-detail-title"
        className="relative flex w-full max-h-[88dvh] sm:max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-border-base bg-surface text-text-base shadow-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25 }}
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-ink to-amber-ink" aria-hidden="true" />

        <div className="flex items-start justify-between gap-4 border-b border-border-base p-6 pb-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-amber-ink">{item ? tab.label : 'Solutions'}</p>
            <h2 id="solution-detail-title" className="mt-2 text-2xl font-semibold tracking-tight">{item?.title ?? tab.label}</h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="shrink-0 rounded-lg border border-border-base p-2 text-text-muted transition-colors hover:border-brand-ink hover:text-brand-ink">
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <p className="text-sm leading-relaxed text-text-muted">{item?.body ?? tab.lead.body}</p>
          {item?.plain && <p className="mt-3 border-l-2 border-amber-ink pl-3 text-sm leading-relaxed">In plain terms: {item.plain}</p>}
          {item?.details && (
            <ul className="mt-3 space-y-1.5 border-l-2 border-amber-ink pl-3 text-sm leading-relaxed">
              {item.details.map(d => <li key={d}>{d}</li>)}
            </ul>
          )}

          <h3 className="mt-6 text-sm font-semibold">{item ? `More in ${tab.label}` : 'What this covers'}</h3>
          <dl className="mt-3 divide-y divide-border-base border-y border-border-base">
            {tab.topics.map(t => (
              <div key={t.title} className="py-3">
                <dt className="text-sm font-medium">{t.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-muted">{t.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-border-base p-4 sm:px-6">
          {/* Closing first releases the scroll lock, so the page can glide to the enquiry form */}
          <div onClick={onClose}><PrimaryButton to={enquiryTo}>Talk to a Security Expert</PrimaryButton></div>
          <button type="button" onClick={onClose} className="text-sm font-medium text-text-muted transition-colors hover:text-text-base">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
