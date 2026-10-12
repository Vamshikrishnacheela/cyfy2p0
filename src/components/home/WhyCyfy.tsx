import { Check } from 'lucide-react';
import { WHY_STATS } from '../../homeContent';
import { Reveal, Eyebrow, Counter } from './ui';

const VALUE = [
  'One partner for NOC, SOC and GRC, under one SLA',
  'Continuous visibility from our in-house Hyderabad SOC',
  'Audit evidence kept ready every week, not the week before',
];

export default function WhyCyfy() {
  return (
    <section id="why-cyfy" className="scene scene-tint py-20 md:py-28 bg-surface-2">
      <div className="shell grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <Reveal>
          <Eyebrow>Why CYFY</Eyebrow>
          <h2 className="text-3xl md:text-[2.6rem] font-semibold tracking-tight leading-[1.1]">
            We design, secure and run your network and security operations.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-text-muted max-w-xl">
            One accountable team replaces a patchwork of point tools and vendors, so your people can focus on the business while we keep it protected and compliant.
          </p>
          <ul className="mt-8 space-y-3">
            {VALUE.map(v => (
              <li key={v} className="flex items-start gap-3 text-sm md:text-base">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-ink/15 text-brand-ink"><Check className="w-3 h-3" aria-hidden="true" /></span>
                {v}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid sm:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-base bg-border-base">
            {WHY_STATS.map(s => (
              <div key={s.label} className="bg-surface p-6 md:p-7">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-brand-ink to-amber-ink bg-clip-text text-transparent">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-2 block text-sm text-text-muted leading-snug" aria-hidden="true">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
