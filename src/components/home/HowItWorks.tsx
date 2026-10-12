import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { STEPS } from '../../homeContent';
import { SectionHeader } from './ui';

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-120px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = window.setTimeout(() => setActive(a => (a + 1) % STEPS.length), 3200);
    return () => window.clearTimeout(id);
  }, [active, auto, inView, reduce]);

  const select = (i: number) => { setActive(i); setAuto(false); };
  const step = STEPS[active];

  return (
    <section id="how-it-works" className="scene scene-grid scene-fade-bottom pb-20 md:pb-28">
      <div className="shell">
        <SectionHeader
          eyebrow="How CYFY works"
          title="From first assessment to audit-ready, in four steps."
          body="The same team takes you from understanding your exposure to running and proving your security every week."
        />

        <div ref={ref} className="rounded-2xl border border-border-base bg-surface p-5 md:p-8">
          <div className="relative">
            {/* Progress track (desktop) */}
            <div className="hidden lg:block absolute left-5 right-[calc((100%-4.5rem)/4-20px)] top-5 h-px bg-border-base" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-ink to-amber-ink"
                animate={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>

            <ol className="relative grid gap-3 lg:grid-cols-4 lg:gap-6" role="tablist" aria-label="CYFY engagement steps">
              {STEPS.map((s, i) => {
                const isActive = i === active;
                const done = i < active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => select(i)}
                      className={`w-full text-left rounded-xl p-3 lg:p-0 flex lg:block items-start gap-4 transition-colors ${isActive ? 'bg-surface-2 lg:bg-transparent' : ''}`}
                    >
                      <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isActive ? 'border-brand-ink bg-brand-ink text-white scale-110' : done ? 'border-brand-ink bg-surface text-brand-ink' : 'border-border-strong bg-surface text-text-muted'}`}>
                        {done ? <Check className="w-4 h-4" aria-hidden="true" /> : <s.icon className="w-4 h-4" aria-hidden="true" />}
                      </span>
                      <span className="block lg:mt-4">
                        <span className="flex items-baseline gap-2">
                          <span className="font-mono text-xs text-text-subtle">0{i + 1}</span>
                          <span className={`text-base font-semibold ${isActive ? 'text-text-base' : 'text-text-muted'}`}>{s.title}</span>
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-text-muted">{s.body}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-6 lg:mt-8 border-t border-border-base pt-5 min-h-[4.5rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-amber-ink shrink-0">What you get · {step.title}</span>
                <ul className="flex flex-wrap gap-2">
                  {step.outputs.map(o => (
                    <li key={o} className="inline-flex items-center gap-1.5 rounded-full border border-border-base bg-surface-2 px-3 py-1.5 text-sm">
                      <Check className="w-3.5 h-3.5 text-brand-ink" aria-hidden="true" /> {o}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
