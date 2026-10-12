import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { COVERAGE } from '../../homeContent';
import { Reveal, SectionHeader } from './ui';

export default function Coverage() {
  const [active, setActive] = useState('security');
  const { hash, key } = useLocation();

  // Highlight the card a nav link deep-links to (e.g. /#network-noc)
  useEffect(() => {
    const line = COVERAGE.find(l => `#${l.anchor}` === hash);
    if (line) setActive(line.id);
  }, [hash, key]);

  return (
    <section id="services" className="scene scene-grid scene-fade-top py-20 md:py-28">
      <div className="shell">
        <SectionHeader
          eyebrow="Security coverage"
          title="How CYFY covers you."
          body="Four service lines, one team and one SLA. Hover or select a line to see what it includes."
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {COVERAGE.map((line, i) => {
            const isActive = active === line.id;
            return (
              <Reveal key={line.id} delay={i * 0.08}>
                <article
                  id={line.anchor}
                  onMouseEnter={() => setActive(line.id)}
                  onFocus={() => setActive(line.id)}
                  onClick={() => setActive(line.id)}
                  className={`band coverage-card scroll-mt-28 relative h-full flex flex-col rounded-2xl p-6 md:p-7 border transition-all duration-300 ${isActive ? 'border-secondary/50 shadow-xl shadow-black/20 md:-translate-y-1' : 'border-band-border'}`}
                >
                  <div className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r from-primary to-secondary transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-amber-ink">{line.num}</span>
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${isActive ? 'border-secondary/50 text-amber-ink' : 'border-band-border text-band-muted'}`}>
                      <line.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold">
                    {line.title} {line.code && <span className="text-xs font-normal text-band-muted">{line.code}</span>}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-band-muted">{line.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {line.tags.map(t => (
                      <li key={t} className="rounded-full border border-band-border px-2.5 py-1 text-xs text-band-text/85">{t}</li>
                    ))}
                  </ul>

                  <ul className={`mt-6 space-y-2 border-t border-band-border pt-5 transition-all duration-300 ${isActive ? 'opacity-100' : 'md:opacity-40'}`}>
                    {line.details.map(d => (
                      <li key={d} className="flex items-start gap-2 text-sm text-band-text/90">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-amber-ink" aria-hidden="true" /> {d}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={line.href}
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive ? 'text-amber-ink' : 'text-band-muted hover:text-amber-ink'}`}
                  >
                    {line.cta} <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0.5' : ''}`} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
