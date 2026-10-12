import { BadgeCheck, Check } from 'lucide-react';
import { CLIENTS } from '../../homeContent';
import Industries from './Industries';

const BADGES = ['MITRE ATT&CK aligned', 'SEBI CSCRF support', 'RBI cyber framework support'];

export default function TrustStrip() {
  return (
    <section aria-label="Clients and certifications" className="scene scene-strip border-b border-border-base bg-bg-base">
      <div className="shell py-10 md:py-12">
        <p className="text-center text-sm text-text-muted">Trusted by SEBI-regulated brokers, Hospitality, BFSI, Wealth Managers, Manufacturing and Pharma Industries</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {CLIENTS.map(name => (
            <li key={name} className="text-lg font-semibold uppercase tracking-[0.22em] text-text-subtle hover:text-text-base transition-colors">
              {name}
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          <li className="inline-flex items-center gap-1.5 rounded-full border border-brand-ink/40 bg-brand-ink/10 px-3 py-1.5 text-xs font-medium text-text-base">
            <BadgeCheck className="w-3.5 h-3.5 text-amber-ink" aria-hidden="true" /> ISO/IEC 27001:2022 certified
          </li>
          {BADGES.map(b => (
            <li key={b} className="inline-flex items-center gap-1.5 rounded-full border border-border-base px-3 py-1.5 text-xs text-text-muted">
              <Check className="w-3.5 h-3.5 text-brand-ink" aria-hidden="true" /> {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
