import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

/** Selects a tab when the URL hash is `#<prefix>-<id>` (e.g. /#industry-pharma), so nav links can deep-link. */
export function useHashSelect(prefix: string, ids: readonly string[], select: (id: string) => void) {
  const { hash, key } = useLocation();
  useEffect(() => {
    const id = hash.startsWith(`#${prefix}-`) ? hash.slice(prefix.length + 2) : '';
    if (ids.includes(id)) select(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, key]);
}
import { ArrowRight } from 'lucide-react';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, onBand = false }: { children: ReactNode; onBand?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] mb-4 ${onBand ? 'text-secondary' : 'text-amber-ink'}`}>
      <span className="h-px w-6 bg-current opacity-70" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeader({ eyebrow, title, body, action, onBand = false }: {
  eyebrow?: string; title: ReactNode; body?: ReactNode; action?: ReactNode; onBand?: boolean;
}) {
  return (
    <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow onBand={onBand}>{eyebrow}</Eyebrow>}
        <h2 className="text-3xl md:text-[2.6rem] font-semibold tracking-tight leading-[1.1]">{title}</h2>
        {body && <p className={`mt-4 text-base leading-relaxed ${onBand ? 'text-band-muted' : 'text-text-muted'}`}>{body}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setDisplay(value); return; }
    const controls = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: v => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return <span ref={ref} className="tabular-nums">{display.toLocaleString('en-IN')}{suffix}</span>;
}

const btnBase = 'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors';

export function PrimaryButton({ to, href, children, className = '' }: { to?: string; href?: string; children: ReactNode; className?: string }) {
  const cls = `${btnBase} bg-btn text-white hover:bg-btn-hover shadow-sm ${className}`;
  return to ? <Link to={to} className={cls}>{children}</Link> : <a href={href} className={cls}>{children}</a>;
}

export function SecondaryButton({ to, href, external = false, children, className = '' }: { to?: string; href?: string; external?: boolean; children: ReactNode; className?: string }) {
  const cls = `${btnBase} border border-border-strong bg-surface/60 text-text-base hover:border-brand-ink hover:text-brand-ink ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}<span className="sr-only"> (opens in a new tab)</span></a>
    : <a href={href} className={cls}>{children}</a>;
}

export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink ${className}`}>
      {children}
      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-border-base px-2.5 py-1 text-xs text-text-muted ${className}`}>
      {children}
    </span>
  );
}

export const SEVERITY_STYLES: Record<string, string> = {
  Critical: 'text-crit bg-crit/10 border-crit/25',
  High: 'text-warn bg-warn/10 border-warn/25',
  Medium: 'text-text-muted bg-surface-2 border-border-base',
};
