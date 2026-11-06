import type { ReactNode } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Eyebrow, PrimaryButton, Reveal, SecondaryButton, TextLink } from '../components/home/ui';
import { ProductName } from '../components/ProductName';
import { PRODUCTS } from '../homeContent';
import { usePageMeta } from '../lib/usePageMeta';

// No approved Threat Labs content exists yet, so everything here restates claims already made elsewhere on the site.
const OFFERINGS: { id: string; name: ReactNode; title: string; body: string; bullets: string[]; action: ReactNode }[] = [
  {
    id: 'cynapptics', name: <ProductName id="cynapptics" />,
    title: PRODUCTS.cynapptics.title, body: PRODUCTS.cynapptics.body, bullets: PRODUCTS.cynapptics.bullets,
    action: (
      <SecondaryButton href="https://cynapptics.cyfy.ai/" external className="whitespace-nowrap">
        Visit CYnapptics <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
      </SecondaryButton>
    ),
  },
  {
    id: 'cyshield', name: <ProductName id="cyshield" />,
    title: PRODUCTS.cyshield.title, body: PRODUCTS.cyshield.body, bullets: PRODUCTS.cyshield.bullets,
    action: <TextLink to="/#platform">See it in the platform</TextLink>,
  },
  {
    id: 'advisory', name: 'Managed SOC reporting',
    title: 'Weekly threat advisories.', body: 'Our Security Team in Hyderabad reports back every week, so leadership and auditors have what they need.',
    bullets: ['Weekly threat advisory', 'COMPASS', 'Audit-ready records'],
    action: <TextLink to="/service/ai-soc">Explore Managed SOC</TextLink>,
  },
];

export default function ThreatLabsPage() {
  usePageMeta({
    title: 'CYFY Threat Labs | CYFY Solutions',
    description: 'Threat intelligence and attack surface tools from CYFY: CYnapptics, CyShield Pro and weekly threat advisories.',
  });

  return (
    // Same background stack as the homepage hero: theme-aware gradient, technical grid and ambient glow
    <section aria-labelledby="threat-labs-title" className="relative hero-bg overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="shell relative pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <Eyebrow>Threat intelligence</Eyebrow>
          <h1 id="threat-labs-title" className="text-4xl md:text-5xl font-semibold tracking-tight">CYFY Threat Labs</h1>
          <p className="mt-5 text-lg leading-relaxed text-text-muted">
            Our own threat intelligence and attack surface tools, and the weekly advisories our Security Team shares with clients.
          </p>
          <div className="mt-8">
            <PrimaryButton to="/#contact">Talk to a Security Expert</PrimaryButton>
          </div>
        </div>

        <h2 className="mt-16 md:mt-20 text-2xl md:text-3xl font-semibold tracking-tight">Tools and reporting available today</h2>
        <ul className="mt-8 grid lg:grid-cols-3 gap-4">
          {OFFERINGS.map((o, i) => (
            <li key={o.id}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border-base bg-surface p-6">
                  <p className="text-sm font-medium text-amber-ink">{o.name}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{o.body}</p>
                  <ul className="mt-5 mb-6 space-y-2">
                    {o.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 mt-0.5 text-brand-ink shrink-0" aria-hidden="true" />{b}</li>
                    ))}
                  </ul>
                  <div className="mt-auto">{o.action}</div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
