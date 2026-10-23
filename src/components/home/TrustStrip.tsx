import { BadgeCheck, Check } from 'lucide-react';
import { CLIENT_LOGOS } from '../../homeContent';
import LogoMarquee from './LogoMarquee';

const BADGES = ['MITRE ATT&CK aligned', 'SEBI CSCRF support', 'RBI cyber framework support'];

export default function TrustStrip() {
  return (
    <section aria-label="Clients and certifications" className="scene scene-strip border-b border-border-base bg-bg-base py-10 md:py-12">
      <p className="shell text-center text-sm text-text-muted">Trusted by SEBI-regulated brokers, Hospitality, BFSI, Wealth Managers, Manufacturing and Pharma Industries</p>
      {/* Same full-width marquee as Technology Partners */}
      <div className="mt-6">
        <LogoMarquee logos={CLIENT_LOGOS} label="Clients" />
      </div>
      <ul className="shell mt-8 flex flex-wrap justify-center gap-2">
        <li className="inline-flex items-center gap-1.5 rounded-full border border-brand-ink/40 bg-brand-ink/10 px-3 py-1.5 text-xs font-medium text-text-base">
          <BadgeCheck className="w-3.5 h-3.5 text-amber-ink" aria-hidden="true" /> ISO/IEC 27001:2022 certified
        </li>
        {BADGES.map(b => (
          <li key={b} className="inline-flex items-center gap-1.5 rounded-full border border-border-base px-3 py-1.5 text-xs text-text-muted">
            <Check className="w-3.5 h-3.5 text-brand-ink" aria-hidden="true" /> {b}
          </li>
        ))}
      </ul>
    </section>
  );
}
