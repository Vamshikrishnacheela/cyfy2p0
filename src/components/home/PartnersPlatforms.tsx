import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { OEM_GROUPS } from '../../homeContent';
import { SectionHeader } from './ui';

export default function PartnersPlatforms() {
  const [filter, setFilter] = useState<string>('all');
  const groups = filter === 'all' ? OEM_GROUPS : OEM_GROUPS.filter(g => g.id === filter);

  return (
    <section id="partners" className="scene scene-tint py-20 md:py-28 bg-surface-2">
      <div className="shell">
        <SectionHeader
          eyebrow="Technology partners"
          title="Built on the platforms your team already trusts."
          body="Our top strategic OEM partners. We design and run each of them for you. Full list of 30+ partners on request."
        />

        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter partners">
          {[{ id: 'all', label: 'All' }, ...OEM_GROUPS].map(g => (
            <button
              key={g.id}
              type="button"
              aria-pressed={filter === g.id}
              onClick={() => setFilter(g.id)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${filter === g.id ? 'border-brand-ink bg-brand-ink text-white' : 'border-border-base bg-surface text-text-muted hover:text-text-base hover:border-border-strong'}`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <AnimatePresence initial={false}>
            {groups.map(g => (
              <motion.div key={g.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <h3 className="flex items-center gap-2 border-b border-border-base pb-3 text-sm font-semibold">
                  <g.icon className="w-4 h-4 text-amber-ink" aria-hidden="true" /> {g.label}
                </h3>
                <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {g.partners.map(p => (
                    <li key={p.name} className="rounded-xl border border-border-base bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg hover:shadow-black/5">
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-text-muted">{p.body}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
