import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, CheckCircle2, CircleCheck } from 'lucide-react';
import { INDUSTRIES, FRAMEWORKS, CASES } from '../../homeContent';
import { SectionHeader, TextLink, useHashSelect } from './ui';

export default function Industries() {
  const [active, setActive] = useState(INDUSTRIES[0].id);
  useHashSelect('industry', INDUSTRIES.map(i => i.id), setActive);
  const ind = INDUSTRIES.find(i => i.id === active)!;
  const related = CASES.filter(c => c.industryId === active);

  return (
    <section id="industries" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          eyebrow="Industries"
          title="Built for the regulator you answer to."
          body="Select your industry to see the challenges we see most often and how CYFY addresses them."
        />

        <div role="tablist" aria-label="Industries" className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-border-base overflow-hidden bg-border-base gap-px">
          {INDUSTRIES.map(i => {
            const on = i.id === active;
            return (
              <button
                key={i.id}
                id={`industry-${i.id}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="industry-panel"
                onClick={() => setActive(i.id)}
                className={`relative text-left p-5 md:p-6 transition-colors scroll-mt-28 ${on ? 'bg-surface' : 'bg-surface/70 hover:bg-surface'}`}
              >
                {on && <motion.span layoutId="industry-bar" className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-ink to-amber-ink" />}
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${on ? 'bg-secondary/20 text-amber-ink' : 'bg-surface-2 text-text-muted'}`}>
                  <i.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className={`mt-5 block font-semibold ${on ? 'text-text-base' : 'text-text-muted'}`}>{i.name}</span>
                <span className="mt-1 block text-sm text-text-muted">{i.who}</span>
                <span className="mt-4 block font-mono text-[11px] text-brand-ink">{i.frameworks.join(', ')}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id="industry-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 grid md:grid-cols-2 gap-5"
          >
            <div className="rounded-2xl border border-border-base bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-subtle">Common challenges · {ind.name}</p>
              <ul className="mt-4 space-y-3">
                {ind.challenges.map(c => (
                  <li key={c} className="flex items-start gap-3 text-sm"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-warn" aria-hidden="true" />{c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-ink/30 bg-brand-ink/5 p-6 flex flex-col">
              <p className="font-mono text-[11px] uppercase tracking-wider text-brand-ink">How CYFY helps</p>
              <ul className="mt-4 space-y-3">
                {ind.solutions.map(s => (
                  <li key={s} className="flex items-start gap-3 text-sm"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-ok" aria-hidden="true" />{s}</li>
                ))}
              </ul>
              <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-3">
                {related.length > 0
                  ? <TextLink to="/#customers">Related customer {related.length > 1 ? 'stories' : 'story'}</TextLink>
                  : <span />}
                <TextLink to="/#contact">Talk to a Security Expert</TextLink>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col lg:flex-row lg:items-center gap-4">
          <p className="text-sm font-medium shrink-0 lg:w-56">Frameworks we audit and operate against</p>
          <ul className="flex flex-wrap gap-2">
            {FRAMEWORKS.map(f => (
              <li key={f} className="inline-flex items-center gap-1.5 rounded-md border border-border-base bg-surface px-2.5 py-1.5 font-mono text-xs text-text-muted hover:border-brand-ink hover:text-text-base transition-colors">
                <CircleCheck className="w-3.5 h-3.5 text-brand-ink" aria-hidden="true" />{f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
