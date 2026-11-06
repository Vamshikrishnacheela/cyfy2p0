import { useEffect, useRef, type FocusEvent, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SECURITY_EXPERT, THREATS, threatHref } from '../underAttackContent';

const PANEL_ID = 'under-attack-panel';

interface Props {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

/**
 * Navbar button and mega-menu for 640px and wider; the mobile drawer has its own list in Navbar.tsx.
 * The panel is positioned against the <nav>, so it stays on screen however far the button sits from the edge.
 */
export default function UnderAttackMenu({ open, onToggle, onClose }: Props) {
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusFirstOnOpen = useRef(false);
  const onThreatPage = pathname.startsWith('/under-attack/');

  const links = () => Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);

  // The navbar's own outside-click check treats the whole header as inside, so its empty space would not close this
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!wrapperRef.current?.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && focusFirstOnOpen.current) links()[0]?.focus();
    focusFirstOnOpen.current = false;
  }, [open]);

  const onButtonKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    if (open) links()[0]?.focus();
    else { focusFirstOnOpen.current = true; onToggle(); }
  };

  const onPanelKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); buttonRef.current?.focus(); return; }
    const items = links();
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    const next = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: items.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    items[(next + items.length) % items.length]?.focus();
  };

  /** Tabbing out of the menu closes it. relatedTarget is null for clicks inside the panel's own padding. */
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) onClose();
  };

  return (
    <div ref={wrapperRef} className="hidden sm:block" onBlur={onBlur}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={onToggle}
        onKeyDown={onButtonKeyDown}
        className={`inline-flex items-center gap-1.5 rounded-lg bg-btn px-3.5 py-2.5 text-sm font-semibold uppercase text-white transition-colors hover:bg-btn-hover ${open ? 'bg-btn-hover' : ''} ${onThreatPage ? 'ring-2 ring-amber-ink ring-offset-2 ring-offset-bg-base' : ''}`}
      >
        <ShieldAlert className="w-4 h-4" aria-hidden="true" />
        Under Attack? Services
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={PANEL_ID}
            onKeyDown={onPanelKeyDown}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute top-full right-5 md:right-8 w-[min(52rem,calc(100%-2.5rem))] md:w-[min(52rem,calc(100%-4rem))] pt-2 whitespace-normal"
          >
            <div className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-xl border border-border-base border-t-2 border-t-amber-ink bg-surface p-3 shadow-2xl shadow-black/30">
              <div className="px-2 pt-1 pb-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-amber-ink">Under Attack? Services</p>
                <p className="mt-1 text-sm text-text-muted">Choose the threat you are concerned about, or speak directly to our security team.</p>
              </div>

              <ul className="grid gap-2 lg:grid-cols-3">
                {THREATS.map(t => {
                  const to = threatHref(t.slug);
                  return (
                    <li key={t.slug}>
                      <Link
                        to={to}
                        onClick={onClose}
                        aria-current={pathname === to ? 'page' : undefined}
                        className={`group flex h-full gap-3 rounded-lg border p-3.5 transition-colors lg:flex-col ${pathname === to ? 'border-brand-ink bg-surface-2' : 'border-border-base hover:border-brand-ink/60 hover:bg-surface-2'}`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-crit/10 text-crit">
                          <t.icon className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <span className="flex flex-1 flex-col">
                          <span className="text-sm font-semibold text-text-base">{t.label}</span>
                          <span className="mt-1 mb-3 text-xs leading-relaxed text-text-muted">{t.summary}</span>
                          <span className="mt-auto inline-flex items-start gap-1 text-xs font-medium text-brand-ink">
                            {t.cta}
                            <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                to={SECURITY_EXPERT.to}
                onClick={onClose}
                className="group mt-2 flex flex-col gap-3 rounded-lg bg-surface-2 p-3.5 sm:flex-row sm:items-center"
              >
                <span className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-ink/15 text-brand-ink">
                    <SECURITY_EXPERT.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-text-base">{SECURITY_EXPERT.label}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-text-muted">{SECURITY_EXPERT.summary}</span>
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-btn px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-btn-hover sm:ml-auto">
                  {SECURITY_EXPERT.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
