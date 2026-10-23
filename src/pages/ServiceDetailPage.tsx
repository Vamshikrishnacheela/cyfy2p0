import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Mail, Users, Bot } from 'lucide-react';
import { SERVICES, SERVICE_GROUPS, CONTACT_INFO, serviceBySlug, enquiryHref, type Service } from '../constants';
import { SOC_SOURCES, SOC_STAGES, SOC_OUTCOMES } from '../homeContent';
import { Reveal, Eyebrow, PrimaryButton, SecondaryButton } from '../components/home/ui';
import { usePageMeta } from '../lib/usePageMeta';

const SOC_SLUGS = ['ai-soc', 'managed-security-services'];

// Scoping topics for a Managed SOC conversation. These are questions CYFY asks, not service commitments.
const SOC_SCOPING = [
  'Which environments and log sources are in scope: endpoints, firewalls, core and trading applications, cloud, Active Directory, OT',
  'Who we escalate to, and how incidents are classified by severity',
  'Which response actions the SOC may take directly and which need your approval',
  'Reporting cadence, service reviews and the audit frameworks you report against',
];

function SocDetail() {
  return (
    <>
      <section aria-labelledby="soc-coverage" className="mt-16">
        <h2 id="soc-coverage" className="text-2xl font-semibold tracking-tight">Monitoring coverage</h2>
        <p className="mt-2 text-text-muted">Sources the SOC can monitor in your environment.</p>
        <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {SOC_SOURCES.map(s => (
            <li key={s.label} className="flex items-center gap-3 rounded-xl border border-border-base bg-surface px-4 py-3 text-sm">
              <s.icon className="w-4 h-4 shrink-0 text-brand-ink" aria-hidden="true" />{s.label}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="soc-flow" className="mt-16">
        <h2 id="soc-flow" className="text-2xl font-semibold tracking-tight">From alert to closure</h2>
        <ol className="mt-6 grid md:grid-cols-3 gap-4">
          {SOC_STAGES.map((s, i) => (
            <li key={s.id} className="rounded-2xl border border-border-base bg-surface p-6">
              <span className="font-mono text-xs text-amber-ink">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="soc-ai" className="mt-16 grid md:grid-cols-2 gap-4">
        <h2 id="soc-ai" className="sr-only">Automation and analyst review</h2>
        <div className="rounded-2xl border border-border-base bg-surface p-6">
          <Bot className="w-5 h-5 text-brand-ink" aria-hidden="true" />
          <h3 className="mt-3 font-semibold">What automation does</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            The SIEM normalises and correlates logs from every source against 1,000+ MITRE ATT&amp;CK use cases, and SOAR playbooks carry out agreed containment steps.
          </p>
        </div>
        <div className="rounded-2xl border border-border-base bg-surface p-6">
          <Users className="w-5 h-5 text-brand-ink" aria-hidden="true" />
          <h3 className="mt-3 font-semibold">What analysts do</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            L1 analysts triage each alert, L2 validates it and L3 investigates before it is escalated to a SOC lead and to you.
          </p>
        </div>
      </section>

      <section aria-labelledby="soc-reporting" className="mt-16 grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border-base bg-surface p-6">
          <h2 id="soc-reporting" className="text-lg font-semibold">Reporting and governance</h2>
          <ul className="mt-4 space-y-2.5">
            {SOC_OUTCOMES.map(o => (
              <li key={o} className="flex items-start gap-2.5 text-sm"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-ok" aria-hidden="true" />{o}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border-base bg-surface-2 p-6">
          <h2 className="text-lg font-semibold">What we agree with you before onboarding</h2>
          <ul className="mt-4 space-y-2.5">
            {SOC_SCOPING.map(o => (
              <li key={o} className="flex items-start gap-2.5 text-sm text-text-muted"><Check className="w-4 h-4 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" />{o}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ServiceNotFound() {
  usePageMeta({ title: 'Service not found | CYFY', description: 'This CYFY service page does not exist.', noindex: true });
  return (
    <div className="shell min-h-[70vh] flex flex-col items-center justify-center text-center pt-28">
      <h1 className="text-3xl font-semibold">Service not found</h1>
      <Link to="/#services" className="mt-6 rounded-lg bg-btn px-5 py-3 text-sm font-semibold text-white hover:bg-btn-hover transition-colors">See all services</Link>
    </div>
  );
}

function ServiceDetail({ service }: { service: Service }) {
  usePageMeta({ title: `${service.title} | CYFY Solutions`, description: service.description });
  const group = SERVICE_GROUPS.find(g => g.id === service.group)!;
  const related = SERVICES.filter(s => s.group === service.group && s.slug !== service.slug);
  const Icon = service.icon;

  return (
    <div className="relative hero-bg overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="shell relative pt-28 md:pt-36 pb-20 md:pb-28">
        <Link to="/#services" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-base transition-colors">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All services
        </Link>

        <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <Eyebrow>{group.label}</Eyebrow>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-ink/30 bg-brand-ink/10 text-brand-ink">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{service.title}</h1>
            </div>
            {service.aka && <p className="mt-3 text-sm text-text-subtle">Also known as {service.aka}</p>}
            <p className="mt-6 text-lg leading-relaxed text-text-muted">{service.description}</p>
            <p className="mt-6 border-l-2 border-amber-ink pl-4 text-text-base leading-relaxed">
              <span className="block text-xs font-mono uppercase tracking-wider text-amber-ink mb-1">In plain terms</span>
              {service.plainEnglish}
            </p>

            <h2 className="mt-12 text-2xl font-semibold tracking-tight">What's included</h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {service.included.map(item => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border-base bg-surface p-4 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-ok" aria-hidden="true" />
                  <span className="text-text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <aside aria-label={`Contact CYFY about ${service.title}`} className="rounded-2xl border border-border-base bg-surface p-6 md:p-8 shadow-xl shadow-black/10">
              <h2 className="text-xl font-semibold">{service.cta}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Tell us about your environment and what you need. A CYFY security specialist will reply to discuss scope.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <PrimaryButton to={enquiryHref(service.interest)}>{service.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" /></PrimaryButton>
                <SecondaryButton href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(`Enquiry: ${service.title}`)}`}>
                  <Mail className="w-4 h-4" aria-hidden="true" /> Email {CONTACT_INFO.email}
                </SecondaryButton>
              </div>
            </aside>
          </Reveal>
        </div>

        {SOC_SLUGS.includes(service.slug) && <SocDetail />}

        {related.length > 0 && (
          <section aria-labelledby="related-services" className="mt-20">
            <h2 id="related-services" className="text-2xl font-semibold tracking-tight">Related services</h2>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(r => (
                <li key={r.slug}>
                  <Link to={`/service/${r.slug}`} className="group flex h-full flex-col rounded-2xl border border-border-base bg-surface p-6 transition-colors hover:border-brand-ink">
                    <r.icon className="w-5 h-5 text-brand-ink" aria-hidden="true" />
                    <span className="mt-4 font-semibold group-hover:text-brand-ink transition-colors">{r.title}</span>
                    <span className="mt-1.5 text-sm leading-relaxed text-text-muted">{r.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceBySlug(slug);
  return service ? <ServiceDetail service={service} /> : <ServiceNotFound />;
}
