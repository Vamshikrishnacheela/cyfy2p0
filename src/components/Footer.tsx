import { Mail, MapPin, Phone, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CyfyLogo } from './CyfyLogo';
import { FOOTER_COLUMNS } from '../homeContent';
import { CONTACT_INFO as CONTACT } from '../constants';
import { ProductName } from './ProductName';

const BADGES = ['MITRE ATT&CK aligned', 'SEBI CSCRF support', 'RBI cyber framework support'];

export default function Footer() {
  return (
    <footer className="border-t border-border-base bg-surface-2">
      <div className="shell pt-16 pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" aria-label="CYFY home" className="inline-block">
              <CyfyLogo iconSize={38} />
            </Link>
            <address className="mt-6 not-italic space-y-3 text-sm text-text-muted">
              <p className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" /><span>{CONTACT.address}</span></p>
              <p className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className="hover:text-text-base transition-colors">{CONTACT.email}</a></p>
              <p className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" /><a href={CONTACT.phoneHref} className="hover:text-text-base transition-colors">{CONTACT.phone}</a></p>
            </address>
          </div>

          {FOOTER_COLUMNS.map(col => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-ink">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-text-muted hover:text-text-base transition-colors">{'product' in l && l.product ? <ProductName id={l.product} /> : l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-dashed border-border-strong pt-8">
          <ul className="flex flex-wrap gap-2">
            <li className="inline-flex items-center gap-1.5 rounded-lg border border-brand-ink/40 bg-brand-ink/10 px-3 py-1.5 text-xs font-medium">
              <BadgeCheck className="w-3.5 h-3.5 text-amber-ink" aria-hidden="true" /> ISO/IEC 27001:2022 certified
            </li>
            {BADGES.map(b => (
              <li key={b} className="rounded-lg border border-border-base px-3 py-1.5 text-xs text-text-muted">{b}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-text-muted">
            <p>© {new Date().getFullYear()} CYFY Solutions Pvt Ltd. All rights reserved.</p>
            <p className="flex gap-2">
              <Link to="/privacy-policy" className="hover:text-text-base transition-colors">Privacy policy</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms" className="hover:text-text-base transition-colors">Terms</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
