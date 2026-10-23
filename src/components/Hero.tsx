import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Activity, BadgeCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CyfyIcon } from './CyfyIcon';
import { HERO_METRICS } from '../homeContent';

const TACTICS = [
  { name: 'Initial access', count: 34 },
  { name: 'Credential access', count: 27 },
  { name: 'Lateral movement', count: 18 },
  { name: 'Exfiltration', count: 9 },
];

const TIMELINE = [
  { t: '00:00', label: 'Detected' },
  { t: '00:04', label: 'L1 triage' },
  { t: '00:11', label: 'L2 validated' },
  { t: '00:18', label: 'Contained' },
  { t: '00:26', label: 'Closed' },
];

const seed = [22, 26, 24, 30, 28, 35, 33, 40, 37, 45, 41, 52, 48, 44, 50, 46, 55, 49, 43, 47, 42, 38, 41, 36];
const seedEsc = [3, 4, 3, 5, 4, 6, 5, 7, 6, 8, 6, 9, 8, 7, 8, 7, 9, 8, 6, 7, 6, 5, 6, 5];

function toPath(values: number[], w: number, h: number, max: number, close: boolean) {
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`);
  return close ? `M0,${h} L${pts.join(' L')} L${w},${h} Z` : `M${pts.join(' L')}`;
}

function SocDashboard() {
  const reduce = useReducedMotion();
  const [events, setEvents] = useState(1_840_212);
  const [triaged, setTriaged] = useState(686);
  const [series, setSeries] = useState(seed);
  const [esc, setEsc] = useState(seedEsc);
  const [step, setStep] = useState(reduce ? TIMELINE.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setEvents(e => e + 40 + Math.floor(Math.random() * 120));
      if (Math.random() > 0.6) setTriaged(t => t + 1);
      setSeries(s => [...s.slice(1), Math.max(18, Math.min(56, s[s.length - 1] + Math.round((Math.random() - 0.5) * 12)))]);
      setEsc(s => [...s.slice(1), Math.max(2, Math.min(10, s[s.length - 1] + Math.round((Math.random() - 0.5) * 3)))]);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setStep(s => (s + 1) % (TIMELINE.length + 2)), step >= TIMELINE.length - 1 ? 2600 : 1300);
    return () => window.clearTimeout(id);
  }, [step, reduce]);

  const shown = Math.min(step, TIMELINE.length - 1);
  const status = shown >= 4 ? 'Closed' : shown >= 3 ? 'Contained' : 'Investigating';
  const W = 260, H = 96;

  return (
    <div className="relative" aria-label="Sample CYFY SOC dashboard" role="img">
      {/* Main SOC overview card */}
      <div className="lg:ml-auto lg:w-[90%] rounded-2xl border border-border-base bg-surface/95 shadow-2xl shadow-black/20 backdrop-blur overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-3 border-b border-border-base">
          <div className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
            <Activity className="w-4 h-4 text-amber-ink" aria-hidden="true" />
            SOC overview
            <span className="hidden sm:inline font-mono text-xs text-text-subtle">Last 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <CyfyIcon size={32} scale={2.5} glow={false} className="animate-pulse" />
            <span className="text-[10px] font-bold text-brand-ink uppercase tracking-[0.2em]">Live Protection Active</span>
          </div>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-base border-b border-border-base">
          {[
            { k: 'Events', v: events.toLocaleString('en-US') },
            { k: 'Alerts triaged', v: triaged.toString() },
            { k: 'Escalated', v: '26', amber: true },
            { k: 'Open', v: '0' },
          ].map(s => (
            <div key={s.k} className="bg-surface px-3 sm:px-4 py-3">
              <dt className="text-[11px] text-text-subtle">{s.k}</dt>
              <dd className={`font-mono text-sm sm:text-base tabular-nums ${s.amber ? 'text-amber-ink' : 'text-text-base'}`}>{s.v}</dd>
            </div>
          ))}
        </dl>

        <div className="grid sm:grid-cols-2 gap-5 p-4">
          <div>
            <div className="flex items-center justify-between text-[11px] text-text-subtle mb-2">
              <span>Alerts per hour</span>
              <span className="flex gap-3">
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-brand-ink" />Alerts</span>
                <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-amber-ink" />Escalated</span>
              </span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" style={{ stopColor: 'var(--brand-ink)', stopOpacity: 0.35 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--brand-ink)', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d={toPath(series, W, H, 60, true)} fill="url(#heroArea)" className="transition-all duration-700" />
              <path d={toPath(series, W, H, 60, false)} fill="none" stroke="var(--brand-ink)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d={toPath(esc, W, H, 60, false)} fill="none" stroke="var(--amber-ink)" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] text-text-subtle mb-2">Top MITRE tactics</p>
            <ul className="space-y-2.5">
              {TACTICS.map((t, i) => (
                <li key={t.name}>
                  <div className="flex justify-between text-xs"><span className="text-text-muted">{t.name}</span><span className="font-mono text-text-subtle">{t.count}</span></div>
                  <div className="mt-1 h-1 rounded-full bg-surface-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${i % 2 ? 'bg-amber-ink' : 'bg-brand-ink'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(t.count / 34) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="px-4 pb-3 text-right font-mono text-[10px] text-text-subtle">Sample data</p>
      </div>

      {/* Incident card */}
      <div className="relative z-10 mt-4 lg:-mt-14 lg:w-[19.5rem] rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/25 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-base">
          <span className="flex items-center gap-2 font-mono text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-ink" aria-hidden="true" />
            INC-24817 <span className="text-text-subtle">Sample incident</span>
          </span>
          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${status === 'Investigating' ? 'text-warn border-warn/30 bg-warn/10' : 'text-ok border-ok/30 bg-ok/10'}`}>{status}</span>
        </div>
        <div className="px-4 pt-3">
          <p className="text-sm font-medium leading-snug">Privileged account sign-in from an unrecognised network</p>
          <p className="mt-1 font-mono text-[11px] text-text-subtle">Source: Active Directory · MITRE T1078 Valid Accounts</p>
        </div>
        <ol className="px-4 py-3 space-y-2">
          {TIMELINE.map((s, i) => {
            const done = i < shown || shown === TIMELINE.length - 1;
            const active = i === shown && !done;
            return (
              <li key={s.label} className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${i > shown ? 'opacity-35' : 'opacity-100'}`}>
                <span className="font-mono text-[11px] text-text-subtle w-9">{s.t}</span>
                {done ? <CheckCircle2 className="w-4 h-4 text-ok" aria-hidden="true" /> : <AlertTriangle className={`w-4 h-4 text-warn ${active ? 'animate-pulse' : ''}`} aria-hidden="true" />}
                <span>{s.label}</span>
              </li>
            );
          })}
        </ol>
        <dl className="grid grid-cols-3 border-t border-border-base text-[11px]">
          <div className="px-3 py-2"><dt className="text-text-subtle">Time to contain</dt><dd className="font-mono text-sm">00:18</dd></div>
          <div className="px-3 py-2 border-l border-border-base"><dt className="text-text-subtle">Analyst tier</dt><dd className="font-mono text-sm">L2</dd></div>
          <div className="px-3 py-2 border-l border-border-base"><dt className="text-text-subtle">Playbook</dt><dd className="font-mono text-sm">Block + revoke</dd></div>
        </dl>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="relative hero-bg overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="shell relative pt-28 md:pt-36 pb-16 md:pb-20 grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3 py-1.5 text-xs text-text-muted">
            <BadgeCheck className="w-3.5 h-3.5 text-amber-ink" aria-hidden="true" />
            ISO/IEC 27001:2022 certified MSSP
          </p>
          <h1 className="mt-6 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem] font-semibold tracking-tight">
            24/7 network and security operations for{' '}
            <span className="bg-gradient-to-r from-brand-ink to-amber-ink bg-clip-text text-transparent">enterprises.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            Monitoring, response and audit readiness from one team, covering your network, your security and your compliance. Backed by our own threat intelligence and attack surface tools.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/#contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-btn px-6 py-3.5 text-sm font-semibold text-white hover:bg-btn-hover transition-colors">
              Talk to a Security Expert
            </Link>
            <Link to="/#services" className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface/60 px-6 py-3.5 text-sm font-semibold text-text-base hover:border-brand-ink transition-colors">
              Explore Our Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <SocDashboard />
        </motion.div>
      </div>

      <div className="relative border-t border-border-base bg-surface/40 backdrop-blur-sm">
        <ul className="shell grid grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((m, i) => (
            <li key={m.label} className={`flex items-start gap-3 py-5 lg:py-6 ${i % 2 ? 'pl-4 border-l border-border-base' : 'lg:pl-0'} ${i > 1 ? 'border-t lg:border-t-0 border-border-base' : ''} ${i === 2 ? 'lg:pl-4 lg:border-l' : ''} pr-3`}>
              <span className="mt-0.5 hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-base bg-surface text-amber-ink">
                <m.icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-sm sm:text-base text-text-base">{m.value}</span>
                <span className="block text-xs text-text-muted mt-0.5">{m.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
