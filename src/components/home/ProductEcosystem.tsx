import { useState, type ReactNode, type JSX } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { ECOSYSTEM, PRODUCTS, ADVISORIES } from '../../homeContent';
import { SectionHeader, TextLink, SecondaryButton, SEVERITY_STYLES, useHashSelect } from './ui';
import { ProductName, isProductId } from '../ProductName';

type NodeId = typeof ECOSYSTEM[number]['id'];

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border-base bg-surface shadow-xl shadow-black/10 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border-base bg-surface-2 px-4 py-2.5 font-mono text-[11px] text-text-subtle">
        <span>{title}</span><span>Sample data</span>
      </div>
      {children}
    </div>
  );
}

function OsinterView() {
  const p = PRODUCTS.cyshield;
  return (
    <Window title="cyshield / External exposure">
      <dl className="grid grid-cols-3 border-b border-border-base">
        {p.stats.map((s, i) => (
          <div key={s.label} className={`px-4 py-3 ${i ? 'border-l border-border-base' : ''}`}>
            <dt className="text-[11px] text-text-subtle">{s.label}</dt>
            <dd className="text-xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-sm">
          <thead>
            <tr className="text-left text-[11px] text-text-subtle">
              <th className="px-4 py-2 font-normal">Asset</th><th className="px-4 py-2 font-normal">Finding</th><th className="px-4 py-2 font-normal text-right">Severity</th>
            </tr>
          </thead>
          <tbody>
            {p.rows.map(r => (
              <tr key={r.asset} className="border-t border-border-base">
                <td className="px-4 py-2.5 font-mono text-xs">{r.asset}</td>
                <td className="px-4 py-2.5 text-text-muted">{r.finding}</td>
                <td className="px-4 py-2.5 text-right"><span className={`rounded-full border px-2 py-0.5 text-[11px] ${SEVERITY_STYLES[r.severity]}`}>{r.severity}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Window>
  );
}

function cynappticsView() {
  return (
    <Window title="cynapptics / Live intelligence">
      <ul>
        {ADVISORIES.map((a, i) => (
          <li key={a.cve} className={`grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-3 ${i ? 'border-t border-border-base' : ''}`}>
            <span><span className="block text-xs font-semibold text-brand-ink">{a.source}</span><span className="block font-mono text-[10px] text-text-subtle">{a.kind}</span></span>
            <span>
              <span className="block text-sm font-medium">{a.title}</span>
              <span className="mt-1.5 flex flex-wrap gap-1.5">
                <span className="rounded border border-border-base px-1.5 py-0.5 font-mono text-[10px] text-text-muted">{a.cve}</span>
                <span className="rounded border border-crit/30 bg-crit/10 px-1.5 py-0.5 font-mono text-[10px] text-crit">Actively exploited</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

const CSCRF = ['Governance', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];
// Illustrative values only, like the rest of the sample panels; the counts repeat the cyshield and cynapptics samples above
const SAMPLE_READINESS = [92, 88, 81, 95, 86, 74];
const CISO_STATS = [
  { label: 'Open findings', value: PRODUCTS.cyshield.stats[1].value },
  { label: 'Exploited CVEs', value: ADVISORIES.length },
  { label: 'Pillars tracked', value: CSCRF.length },
];
function CisoDashboardView() {
  return (
    <Window title="CISO Dashboard / Security posture">
      <dl className="grid grid-cols-3 border-b border-border-base">
        {CISO_STATS.map((s, i) => (
          <div key={s.label} className={`px-4 py-3 ${i ? 'border-l border-border-base' : ''}`}>
            <dt className="text-[11px] text-text-subtle">{s.label}</dt>
            <dd className="text-xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="p-4">
        <p className="mb-3 text-[11px] text-text-subtle">SEBI CSCRF readiness</p>
        <ul className="space-y-2.5">
          {CSCRF.map((c, i) => (
            <li key={c} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-3 text-sm">
              <span className="text-text-muted">{c}</span>
              <span className="h-1.5 rounded-full bg-surface-2 overflow-hidden" aria-hidden="true">
                <motion.span className="block h-full rounded-full bg-brand-ink" initial={{ width: 0 }} animate={{ width: `${SAMPLE_READINESS[i]}%` }} transition={{ duration: 0.7, delay: i * 0.08 }} />
              </span>
              <span className="text-right text-xs tabular-nums">{SAMPLE_READINESS[i]}%</span>
            </li>
          ))}
        </ul>
      </div>
      <ul className="border-t border-border-base">
        {PRODUCTS.cyshield.rows.slice(0, 2).map((r, i) => (
          <li key={r.asset} className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm ${i ? 'border-t border-border-base' : ''}`}>
            <span className="text-text-muted">{r.finding}</span>
            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] ${SEVERITY_STYLES[r.severity]}`}>{r.severity}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-border-base px-4 py-3 text-xs text-text-muted">Illustrative data only, not a customer's security or compliance status.</p>
    </Window>
  );
}

const DETAIL: Record<NodeId, { title: string; body: string; bullets: string[]; link?: { to: string; label: string }; external?: { href: string; label: string }; View: () => JSX.Element }> = {
  cyshield: { title: PRODUCTS.cyshield.title, body: PRODUCTS.cyshield.body, bullets: PRODUCTS.cyshield.bullets, View: OsinterView },
  cynapptics: { title: PRODUCTS.cynapptics.title, body: PRODUCTS.cynapptics.body, bullets: PRODUCTS.cynapptics.bullets, external: { href: 'https://cynapptics.cyfy.ai/', label: 'Visit Cynapptics' }, View: cynappticsView },
  cisoDashboard: { title: PRODUCTS.cisoDashboard.title, body: PRODUCTS.cisoDashboard.body, bullets: PRODUCTS.cisoDashboard.bullets, link: { to: '/#customers', label: 'See customer results' }, View: CisoDashboardView },
};

export default function ProductEcosystem() {
  const [active, setActive] = useState<NodeId>('cyshield');
  const d = DETAIL[active];
  useHashSelect('platform', ECOSYSTEM.map(n => n.id), id => setActive(id as NodeId));

  return (
    <section id="platform" className="scene scene-network py-20 md:py-28 bg-surface-2">
      <div className="shell">
        <SectionHeader
          eyebrow="CYFY platform"
          title="Our own tools, running inside your environment."
          body="cyshield and cynapptics feed our SOC with what attackers can see and what they are exploiting right now. Select a stage to see how the pieces work together."
        />

        <ol className="grid grid-cols-2 lg:grid-cols-3 gap-3" role="tablist" aria-label="CYFY security ecosystem">
          {ECOSYSTEM.map((n, i) => {
            const isActive = n.id === active;
            return (
              <li key={n.id} className="relative last:col-span-2 lg:last:col-span-1">
                <button
                  id={`platform-${n.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(n.id)}
                  className={`scroll-mt-24 flex flex-col h-full w-full rounded-xl border p-4 text-left transition-all duration-300 ${isActive ? 'border-brand-ink bg-surface shadow-lg shadow-black/10' : 'border-border-base bg-surface/60 hover:border-border-strong hover:bg-surface'}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-amber-ink">0{i + 1} · {n.stage}</span>
                    <n.icon className={`w-4 h-4 ${isActive ? 'text-brand-ink' : 'text-text-subtle'}`} aria-hidden="true" />
                  </span>
                  <span className="mt-3 block font-semibold">{isProductId(n.id) ? <ProductName id={n.id} /> : n.name}</span>
                  <span className="block text-xs text-text-subtle">{n.kind}</span>
                  <span className="mt-2 hidden sm:block text-sm leading-relaxed text-text-muted">{n.body}</span>
                </button>
                {i < ECOSYSTEM.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-surface-2 text-text-subtle" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 rounded-2xl border border-border-base bg-surface p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-ink to-amber-ink" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-[1fr_1.25fr] gap-8 lg:gap-12 items-center"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-3 text-text-muted leading-relaxed">{d.body}</p>
                {d.bullets.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {d.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-sm"><Check className="w-4 h-4 mt-0.5 text-brand-ink shrink-0" aria-hidden="true" />{b}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {d.external && (
                    <SecondaryButton href={d.external.href} external className="whitespace-nowrap">
                      {d.external.label} <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </SecondaryButton>
                  )}
                  {d.link && <TextLink to={d.link.to}>{d.link.label}</TextLink>}
                </div>
              </div>
              <d.View />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-4 flex items-center gap-2 text-xs text-text-subtle">
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /> cyshield is self-hosted, so your exposure data does not leave your network.
        </p>
      </div>
    </section>
  );
}
