import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Info, Scale } from 'lucide-react';
import { SERVICES, enquiryHref } from '../constants';
import { Eyebrow, PrimaryButton, Reveal } from '../components/home/ui';
import { usePageMeta } from '../lib/usePageMeta';
import { THREATS, THREAT_SCOPE, threatBySlug, threatHref, type Threat } from '../underAttackContent';

function ThreatNotFound() {
  usePageMeta({ title: 'Page not found | CYFY', description: 'This CYFY page does not exist.', noindex: true });
  return (
    <div className="shell min-h-[70vh] flex flex-col items-center justify-center text-center pt-28">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <Link to="/#services" className="mt-6 rounded-lg bg-btn px-5 py-3 text-sm font-semibold text-white hover:bg-btn-hover transition-colors">See all services</Link>
    </div>
  );
}

function LinkCards({ cards }: { cards: { to: string; icon: Threat['icon']; title: string; body: string }[] }) {
  return (
    <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map(c => (
        <li key={c.to}>
          <Link to={c.to} className="group flex h-full flex-col rounded-2xl border border-border-base bg-surface p-6 transition-colors hover:border-brand-ink">
            <c.icon className="w-5 h-5 text-brand-ink" aria-hidden="true" />
            <span className="mt-4 font-semibold group-hover:text-brand-ink transition-colors">{c.title}</span>
            <span className="mt-1.5 text-sm leading-relaxed text-text-muted">{c.body}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ThreatDetail({ threat }: { threat: Threat }) {
  usePageMeta({ title: `${threat.heading} | CYFY Solutions`, description: threat.intro });
  const related = threat.related.flatMap(slug => SERVICES.filter(s => s.slug === slug));
  const others = THREATS.filter(t => t.slug !== threat.slug);
  const Icon = threat.icon;

  return (
    <div className="relative hero-bg overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="shell relative pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <Eyebrow>Under Attack? Services</Eyebrow>
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-crit/30 bg-crit/10 text-crit">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </span>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">{threat.heading}</h1>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">{threat.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <aside aria-label={`Contact CYFY about ${threat.label}`} className="rounded-2xl border border-border-base bg-surface p-6 md:p-8 shadow-xl shadow-black/10">
              <h2 className="text-xl font-semibold">Dealing with a suspected {threat.incidentName} incident?</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Tell our security team what you have seen so far. We will discuss your situation and identify the appropriate next steps.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <PrimaryButton to={enquiryHref(threat.interest)}>Send an enquiry <ArrowRight className="w-4 h-4" aria-hidden="true" /></PrimaryButton>
              </div>
            </aside>
          </Reveal>
        </div>

        {threat.notice && (
          <aside aria-label={threat.notice.title} className="mt-12 flex gap-4 rounded-2xl border border-amber-ink/40 bg-surface p-6">
            <Scale className="w-5 h-5 mt-0.5 shrink-0 text-amber-ink" aria-hidden="true" />
            <div>
              <h2 className="font-semibold">{threat.notice.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">{threat.notice.body}</p>
            </div>
          </aside>
        )}

        <section aria-labelledby="threat-capabilities" className="mt-16">
          <h2 id="threat-capabilities" className="text-2xl md:text-3xl font-semibold tracking-tight">How CYFY can help</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {threat.sections.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 3) * 0.05} className="h-full">
                <article className="h-full rounded-2xl border border-border-base bg-surface p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-ink/15 text-brand-ink">
                      <s.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold leading-snug">{s.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {s.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" />{item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="threat-scope" className="mt-16 rounded-2xl border border-border-base bg-surface-2 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 shrink-0 text-brand-ink" aria-hidden="true" />
            <h2 id="threat-scope" className="text-xl font-semibold">What this depends on</h2>
          </div>
          <dl className="mt-5 grid md:grid-cols-3 gap-5">
            {THREAT_SCOPE.points.map(p => (
              <div key={p.title}>
                <dt className="text-sm font-semibold">{p.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 border-t border-border-base pt-4 text-xs leading-relaxed text-text-muted">{THREAT_SCOPE.disclaimer}</p>
        </section>

        <section aria-labelledby="threat-others" className="mt-16">
          <h2 id="threat-others" className="text-2xl font-semibold tracking-tight">Other threat categories</h2>
          <LinkCards cards={others.map(t => ({ to: threatHref(t.slug), icon: t.icon, title: t.heading, body: t.summary }))} />
        </section>

        <section aria-labelledby="threat-related" className="mt-16">
          <h2 id="threat-related" className="text-2xl font-semibold tracking-tight">Related services</h2>
          <LinkCards cards={related.map(s => ({ to: `/service/${s.slug}`, icon: s.icon, title: s.title, body: s.description }))} />
        </section>
      </div>
    </div>
  );
}

export default function ThreatDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const threat = threatBySlug(slug);
  return threat ? <ThreatDetail threat={threat} /> : <ThreatNotFound />;
}
