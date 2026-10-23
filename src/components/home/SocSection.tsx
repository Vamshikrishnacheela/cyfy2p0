import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { SOC_PILLARS, SOC_SOURCES, SOC_STAGES, SOC_OUTCOMES } from '../../homeContent';
import { Reveal, Eyebrow } from './ui';

/** Lines from N evenly spaced points on the left to one point on the right. */
function FanIn({ count, highlight }: { count: number; highlight: number }) {
  return (
    <svg viewBox="0 0 60 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const y = ((i + 0.5) / count) * 600;
        const on = i === highlight;
        return (
          <path
            key={i}
            d={`M0,${y} C30,${y} 30,300 60,300`}
            fill="none"
            stroke={on ? 'var(--color-secondary)' : 'rgba(163,190,199,0.35)'}
            strokeWidth={on ? 1.6 : 1}
            vectorEffect="non-scaling-stroke"
            className="flow-dash"
          />
        );
      })}
    </svg>
  );
}

export default function SocSection() {
  const [stage, setStage] = useState(0);
  const [source, setSource] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-100px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = window.setTimeout(() => {
      setStage(s => {
        const next = (s + 1) % SOC_STAGES.length;
        if (next === 0) setSource(src => (src + 1) % SOC_SOURCES.length);
        return next;
      });
    }, 2400);
    return () => window.clearTimeout(id);
  }, [stage, auto, inView, reduce]);

  const current = SOC_STAGES[stage];
  const src = SOC_SOURCES[source];
  const closed = stage === SOC_STAGES.length - 1;

  // Arrow keys move between the Detect / Triage / Respond tabs
  const onStageKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    // Move from the focused tab, which can differ from the selected one
    const from = SOC_STAGES.findIndex(s => `soc-tab-${s.id}` === (e.target as HTMLElement).id);
    const next = ((from < 0 ? stage : from) + delta + SOC_STAGES.length) % SOC_STAGES.length;
    setStage(next);
    setAuto(false);
    document.getElementById(`soc-tab-${SOC_STAGES[next].id}`)?.focus();
  };

  return (
    <section id="soc" className="scene scene-circuit py-20 md:py-28 bg-surface-2">
      <div className="shell">
        <div className="band rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden relative">
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/20 blur-[120px] pointer-events-none" aria-hidden="true" />
          <Reveal className="relative max-w-2xl">
            <Eyebrow onBand>How our SOC works</Eyebrow>
            <h2 className="text-3xl md:text-[2.6rem] font-semibold tracking-tight leading-[1.1]">From alert to closure, round the clock.</h2>
          </Reveal>

          <div className="relative mt-10 grid md:grid-cols-3 gap-6 md:gap-8">
            {SOC_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="border-t border-band-border pt-5">
                <p.icon className="w-5 h-5 text-secondary" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-band-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Pipeline */}
          <div ref={ref} className="relative mt-12 rounded-2xl border border-band-border bg-black/15 p-4 sm:p-6 lg:p-8">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_60px_minmax(0,1.25fr)_48px_minmax(0,1fr)] items-stretch gap-y-3">
              {/* Sources */}
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-band-muted">Your environment</p>
                <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {SOC_SOURCES.map((s, i) => (
                    <li key={s.label}>
                      <button
                        type="button"
                        aria-pressed={i === source}
                        aria-controls="soc-panel"
                        onClick={() => { setSource(i); setStage(0); setAuto(false); }}
                        className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs sm:text-sm transition-colors ${i === source ? 'border-secondary/50 bg-secondary/10 text-band-text' : 'border-band-border bg-band-surface text-band-muted hover:text-band-text'}`}
                      >
                        <s.icon className={`w-4 h-4 shrink-0 ${i === source ? 'text-secondary' : ''}`} aria-hidden="true" />
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block relative mt-7"><FanIn count={SOC_SOURCES.length} highlight={source} /></div>
              <ChevronDown className="lg:hidden mx-auto w-5 h-5 text-band-muted" aria-hidden="true" />

              {/* CYFY SOC */}
              <div className="flex flex-col justify-center">
                <div id="soc-panel" className="rounded-xl border border-band-border bg-band-surface p-4 sm:p-5 shadow-lg shadow-black/20">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">CYFY SOC</p>
                    <p className="font-mono text-[11px] text-band-muted">SIEM + SOAR</p>
                  </div>
                  {/* Heading and summary for the selected environment */}
                  <div className="mt-3 min-h-[6.5rem] sm:min-h-[5.5rem]">
                    <AnimatePresence mode="wait">
                      <motion.div key={source} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <h3 className="text-base font-semibold text-[#7fe3f2]">{src.heading}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-band-muted">{src.summary}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg border border-band-border bg-black/20 p-1" role="tablist" aria-label={`SOC stage for ${src.label}`} onKeyDown={onStageKey}>
                    {SOC_STAGES.map((s, i) => (
                      <button
                        key={s.id}
                        id={`soc-tab-${s.id}`}
                        type="button"
                        role="tab"
                        aria-selected={i === stage}
                        aria-controls="soc-stage-panel"
                        tabIndex={i === stage ? 0 : -1}
                        onClick={() => { setStage(i); setAuto(false); }}
                        className={`rounded-md py-2 text-sm font-medium transition-colors ${i === stage ? 'bg-secondary text-[#1a1206]' : 'text-band-muted hover:text-band-text'}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <div id="soc-stage-panel" role="tabpanel" aria-labelledby={`soc-tab-${current.id}`} className="mt-4 min-h-[6rem] sm:min-h-[5rem]" aria-live={auto ? 'off' : 'polite'}>
                    <AnimatePresence mode="wait">
                      <motion.div key={current.id + source} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <p className="font-mono text-xs text-band-muted">{current.label} · {src.label}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-band-text">{src.stages[current.id]}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-3 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-secondary/10 px-2.5 py-1 font-mono text-[11px] text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
                    {current.status}
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex items-center">
                <svg viewBox="0 0 48 10" preserveAspectRatio="none" className="h-2.5 w-full" aria-hidden="true">
                  <path d="M0,5 L48,5" stroke="rgba(163,190,199,0.5)" strokeWidth="1" vectorEffect="non-scaling-stroke" className="flow-dash" />
                </svg>
              </div>
              <ChevronDown className="lg:hidden mx-auto w-5 h-5 text-band-muted" aria-hidden="true" />

              {/* Outcome */}
              <div className="flex flex-col justify-center">
                <div className={`rounded-xl border p-4 sm:p-5 transition-colors duration-500 ${closed ? 'border-ok/40 bg-ok/10' : 'border-band-border bg-band-surface'}`}>
                  <p className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className={`w-4 h-4 transition-colors ${closed ? 'text-[#3ecf8e]' : 'text-secondary'}`} aria-hidden="true" />
                    Reported and closed
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {SOC_OUTCOMES.map(o => <li key={o} className="text-sm text-band-muted">{o}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
