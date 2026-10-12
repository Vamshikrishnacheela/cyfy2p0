import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

/** Shared layout for /privacy-policy and /terms. */
export function LegalLayout({ title, docTitle, children }: { title: string; docTitle: string; children: ReactNode }) {
  useEffect(() => {
    const prev = document.title;
    document.title = docTitle;
    return () => { document.title = prev; };
  }, [docTitle]);

  return (
    <div className="shell max-w-3xl pt-28 md:pt-36 pb-20 md:pb-28">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-base transition-colors">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to home
      </Link>
      <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-text-muted">CYFY Solutions Pvt Ltd</p>

      <div role="note" className="mt-8 flex gap-3 rounded-xl border border-warn/40 bg-warn/10 p-4 text-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 text-warn" aria-hidden="true" />
        <p>
          <strong>Draft pending CYFY legal approval.</strong> No approved version of this document exists yet.
          Sections marked "Pending approval" must be written or approved by CYFY before this page is relied on.
        </p>
      </div>

      <div className="mt-10 space-y-10">{children}</div>

      <LegalSection title="Contact">
        <p>Questions about this document can be sent to CYFY:</p>
        <ul className="mt-3 space-y-1">
          <li>Email: <a href={`mailto:${CONTACT_INFO.email}`} className="text-brand-ink underline underline-offset-2">{CONTACT_INFO.email}</a></li>
          <li>Phone: <a href={CONTACT_INFO.phoneHref} className="text-brand-ink underline underline-offset-2">{CONTACT_INFO.phone}</a></li>
          <li>Address: {CONTACT_INFO.address}</li>
        </ul>
      </LegalSection>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10" aria-labelledby={`legal-${title.replace(/\W+/g, '-').toLowerCase()}`}>
      <h2 id={`legal-${title.replace(/\W+/g, '-').toLowerCase()}`} className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-sm md:text-base leading-relaxed text-text-muted">{children}</div>
    </section>
  );
}

export function Pending({ what }: { what: string }) {
  return (
    <p className="rounded-lg border border-dashed border-border-strong bg-surface-2 px-4 py-3 text-sm">
      <span className="font-mono text-xs uppercase tracking-wider text-amber-ink">Pending approval</span>
      <span className="block mt-1 text-text-muted">{what}</span>
    </p>
  );
}
