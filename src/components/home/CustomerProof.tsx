import type { ReactNode } from 'react';
import { CheckCircle2, BadgeCheck, Radar, Newspaper } from 'lucide-react';
import { CASES, FOUNDER_NOTE, INDUSTRIES } from '../../homeContent';
import { Reveal, SectionHeader, TextLink } from './ui';
import { ProductName } from '../ProductName';

const SHIFTS = ['Shift A', 'Shift B', 'Shift C'];
const CSCRF = ['Governance', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

function Tile({ children, title, className = '' }: { children: ReactNode; title: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border-base bg-surface p-5 flex flex-col transition-colors hover:border-border-strong ${className}`}>
      <div className="flex-1">{children}</div>
      <p className="mt-4 font-semibold leading-snug">{title}</p>
    </div>
  );
}

export default function CustomerProof() {
  return (
    <section id="customers" className="scene scene-teal py-20 md:py-28 bg-surface-2">
      <div className="shell">
        <SectionHeader eyebrow="Customer proof" title="Proof from teams that answer to a regulator." />

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => {
            const industry = INDUSTRIES.find(x => x.id === c.industryId)!;
            return (
              <Reveal key={c.label} delay={i * 0.08}>
                <article className="group relative h-full flex flex-col rounded-2xl border border-border-base bg-surface p-6 md:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 hover:border-border-strong">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-ink to-amber-ink" aria-hidden="true" />
                  <p className="text-sm font-medium text-text-muted">Client name withheld</p>
                  <p className="mt-5 flex items-center gap-1.5 text-xs font-medium text-amber-ink">
                    <c.icon className="w-3.5 h-3.5" aria-hidden="true" /> {c.industry}
                  </p>
                  <p className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-brand-ink to-brand-ink/70 bg-clip-text text-transparent">{c.metric}</p>
                  <h3 className="mt-3 font-semibold leading-snug">{c.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{c.body}</p>
                  <TextLink to={`/#industry-${c.industryId}`} className="mt-auto pt-6">See {industry.name.split(' ')[0]} coverage</TextLink>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 md:mt-24">
          <Reveal>
            <h2 className="text-3xl md:text-[2.6rem] font-semibold tracking-tight leading-[1.1] mb-10">Why regulated teams choose CYFY.</h2>
          </Reveal>
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-5">
            <Reveal>
              <figure className="h-full rounded-2xl border border-border-base bg-surface p-7 md:p-8 shadow-xl shadow-black/5 flex flex-col">
                <p className="text-sm text-text-subtle">A note from our founder</p>
                <blockquote className="mt-4 flex-1">
                  <p className="font-semibold">{FOUNDER_NOTE.greeting}</p>
                  {FOUNDER_NOTE.paragraphs.map(p => <p key={p} className="mt-4 text-sm md:text-base leading-relaxed text-text-muted">{p}</p>)}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  {/* <span className="flex h-10 w-10 items-center justify-center rounded-full bg-btn text-white font-semibold" aria-hidden="true">{FOUNDER_NOTE.name[0]}</span> */}
                  <img src={FOUNDER_NOTE.image} alt={FOUNDER_NOTE.name} className="h-10 w-10 rounded-full object-cover" />
                  <span><span className="block font-semibold text-sm">{FOUNDER_NOTE.name}</span><span className="block text-xs text-text-muted">{FOUNDER_NOTE.role}</span></span>
                </figcaption>
              </figure>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-5">
              <Reveal delay={0.05}>
                <Tile title="One team for your NOC and SOC, under one SLA." className="h-full">
                  <ul className="space-y-2">
                    {['NOC Network uptime', 'SOC Threat response', 'GRC Audit evidence'].map(x => (
                      <li key={x} className="flex items-center justify-between rounded-lg border border-border-base bg-surface-2 px-3 py-2 text-xs text-text-muted">
                        {x}<CheckCircle2 className="w-4 h-4 text-brand-ink" aria-hidden="true" />
                      </li>
                    ))}
                  </ul>
                </Tile>
              </Reveal>
              <Reveal delay={0.1}>
                <Tile title="An in-house Security Team, staffed around the clock." className="h-full">
                  <div className="rounded-lg border border-border-base bg-surface-2 p-3">
                    <div className="flex justify-between font-mono text-[10px] text-text-subtle"><span>00:00</span><span>08:00</span><span>16:00</span><span>24:00</span></div>
                    <div className="mt-2 grid grid-cols-3 gap-1">
                      {SHIFTS.map((s, i) => (
                        <span key={s} className={`rounded px-2 py-1.5 text-center text-xs ${i === 1 ? 'bg-secondary text-[#1a1206] font-medium' : 'bg-surface text-text-muted'}`}>{s}</span>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-text-muted">L1 to L3 analysts and a SOC lead on every shift</p>
                  </div>
                </Tile>
              </Reveal>
              <Reveal delay={0.15}>
                <Tile title="SEBI CSCRF-ready reporting, every week." className="h-full">
                  <ul className="space-y-1.5 rounded-lg border border-border-base bg-surface-2 p-3">
                    {CSCRF.map(c => (
                      <li key={c} className="grid grid-cols-[5rem_1fr] items-center gap-2 text-[11px] text-text-muted">
                        {c}<span className="h-1.5 rounded-full bg-gradient-to-r from-brand-ink to-amber-ink" />
                      </li>
                    ))}
                  </ul>
                </Tile>
              </Reveal>
              <Reveal delay={0.2}>
                <Tile title="Our own tools, so you see what our analysts see." className="h-full !bg-secondary/10 !border-secondary/30">
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between gap-2 rounded-lg border border-border-base bg-surface px-3 py-2 text-xs">
                      <span className="flex items-center gap-2"><Radar className="w-3.5 h-3.5 text-brand-ink" aria-hidden="true" /><ProductName id="cyshield" /></span>
                      <span className="rounded bg-secondary/20 px-1.5 py-0.5 text-[10px] text-amber-ink">3 new exposures</span>
                    </li>
                    <li className="flex items-center justify-between gap-2 rounded-lg border border-border-base bg-surface px-3 py-2 text-xs">
                      <span className="flex items-center gap-2"><Newspaper className="w-3.5 h-3.5 text-brand-ink" aria-hidden="true" /><ProductName id="cynapptics" /></span>
                      <span className="rounded bg-secondary/20 px-1.5 py-0.5 text-[10px] text-amber-ink">CERT-In advisory</span>
                    </li>
                  </ul>
                </Tile>
              </Reveal>
              <Reveal delay={0.25} className="sm:col-span-2">
                <div className="flex items-center gap-4 rounded-2xl border border-border-base bg-surface p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-ink to-amber-ink text-white">
                    <BadgeCheck className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">ISO/IEC 27001:2022 certified</span>
                    <span className="block text-sm text-text-muted">Processes and controls for client data, access and operations, independently certified.</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
