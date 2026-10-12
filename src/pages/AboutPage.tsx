import { useEffect } from 'react';
import { BadgeCheck, Briefcase, Database, Network, Cloud, Factory, BrainCircuit, Radar, ClipboardCheck, ScanSearch, Mail, Phone, MapPin, type LucideIcon } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Reveal, Eyebrow, SectionHeader, PrimaryButton, SecondaryButton } from '../components/home/ui';

interface Service { title: string; icon: LucideIcon; body: string; groups?: { label: string; items: string }[] }

const SERVICES: Service[] = [
  { title: 'Cybersecurity Consulting', icon: Briefcase, body: 'Strategic guidance to align technical defenses with business goals.' },
  { title: 'Data Security', icon: Database, body: 'Comprehensive strategies for data protection, classification, and breach prevention.' },
  { title: 'Network Security', icon: Network, body: 'Advanced infrastructure protection including firewall management, segmentation, and secure connectivity.' },
  { title: 'Cloud Security', icon: Cloud, body: 'Examination of posture management (CSPM), threat protection, and security for AWS/Azure environments.' },
  { title: 'OT & IoT Security', icon: Factory, body: 'Specialized protection for Operational Technology and industrial control systems critical for manufacturing and pharma plants.' },
  { title: 'AI Security', icon: BrainCircuit, body: 'Specialized frameworks for securing Artificial Intelligence implementations and ensuring algorithmic integrity.' },
  { title: 'Security Operations Center & MSOC', icon: Radar, body: '24x7 continuous monitoring, threat detection, and rapid incident response delivered from our in-house SOC & MSOC.' },
  {
    title: 'Compliance & GRC (Governance, Risk, and Compliance)', icon: ClipboardCheck,
    body: 'Expert consulting and implementation for global and industry-specific frameworks:',
    groups: [
      { label: 'International Standards', items: 'ISO 27001 (ISMS), ISO 42001 (AI Management), NIST, and IEC 62443 (Industrial Security).' },
      { label: 'Data Privacy', items: 'GDPR, DPDPA, and PCI DSS.' },
      { label: 'Financial & Insurance Regulations', items: 'SEBI CSCRF, RBI, and IRDAI.' },
    ],
  },
  { title: 'Vulnerability Management', icon: ScanSearch, body: 'Comprehensive Vulnerability Assessment and Penetration Testing (VAPT) to identify and mitigate risks across systems and applications.' },
];

const LEADERS = [
  {
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.ctfassets.net%2Fwkud0epjdpn7%2F1CmlPkNN2jPbkyy5GkRk8x%2F2a32aad7c3559d9b9d145b768e91a2fb%2FRakesh_Reddy_ISB_CYSL.png%3Ffm%3Dwebp&f=1&nofb=1&ipt=2acaa90926bb0663844324af5a7c22cfb1da0af525117fd6408e3dddc4353e1a&ipo=images',
    name: 'Rakesh Reddy Gaddam',
    title: 'Founder, CEO & Managing Director',
    bio: 'A visionary leader with 20+ years of experience in network and cybersecurity. He has spearheaded large-scale digital transformation and security initiatives for global enterprises. His mission for CYFY is to empower businesses with proactive security platforms that allow them to innovate with confidence.',
  },
  {
    name: 'Babu VY',
    title: 'Manager, Projects & Security Operations',
    bio: 'With 20+ years of expertise in network and security operations, Babu leads project execution and deployment, ensuring that complex cybersecurity initiatives are delivered with high standards of performance.',
  },
];

const initials = (name: string) => name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('');

export default function AboutPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'About CYFY | CYFY Solutions';
    return () => { document.title = prev; };
  }, []);

  return (
    <>
      {/* Company introduction */}
      <section aria-labelledby="about-title" className="scene scene-glow pt-28 md:pt-36 pb-20 md:pb-24">
        <div className="shell grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <Eyebrow>About CYFY</Eyebrow>
            <h1 id="about-title" className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08]">CYFY Solutions Pvt. Ltd.</h1>
            <h2 className="mt-8 text-xl md:text-2xl font-semibold">Organization Profile</h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-text-muted">
              CYFY Solutions Pvt. Ltd. is a premier cybersecurity and managed security services provider dedicated to building secure, scalable, and regulatory-compliant digital environments. Based in Hyderabad, India, we serve as a trusted partner for enterprises in highly regulated sectors—including Pharmaceuticals, BFSI, Manufacturing, and ITES—where robust security frameworks are a business imperative.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:mt-24">
            <div className="flex gap-4 rounded-2xl border border-border-base bg-surface p-6 md:p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-ink/15 text-brand-ink">
                <BadgeCheck className="w-5 h-5" aria-hidden="true" />
              </span>
              <p className="text-sm md:text-base leading-relaxed text-text-muted">
                As an <strong className="font-semibold text-text-base">ISO/IEC 27001:2022 ISMS Certified</strong> organization, we adhere to global best practices for risk management, data confidentiality, and continuous security improvement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core service offerings */}
      <section aria-label="Core Service Offerings" className="scene scene-tint py-20 md:py-28 bg-surface-2">
        <div className="shell">
          <SectionHeader
            eyebrow="What we do"
            title="Core Service Offerings"
            body="We simplify complex security challenges by combining advanced AI-driven technologies with expert-led operations."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 5) * 0.04} className={s.groups ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
                <article className="h-full rounded-2xl border border-border-base bg-surface p-6 transition-colors hover:border-brand-ink/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-ink/15 text-brand-ink">
                    <s.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
                  {s.groups && (
                    <ul className="mt-4 space-y-3">
                      {s.groups.map(g => (
                        <li key={g.label} className="border-l-2 border-brand-ink/40 pl-3 text-sm leading-relaxed">
                          <span className="block font-medium text-text-base">{g.label}</span>
                          <span className="block text-text-muted">{g.items}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section aria-label="Founder & Leadership Background" className="py-20 md:py-28">
        <div className="shell">
          <SectionHeader
            eyebrow="Leadership"
            title="Founder & Leadership Background"
            body="Our leadership team brings over two decades of experience in defending critical infrastructure and managing enterprise risk."
          />
          <div className="grid md:grid-cols-2 gap-5">
            {LEADERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className="h-full rounded-2xl border border-border-base bg-surface p-6 md:p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-btn text-xl font-semibold text-white" aria-hidden="true">
                      {p.image ? <img src={p.image} alt="" className="h-16 w-16 rounded-full object-cover" /> : initials(p.name)}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      <p className="mt-0.5 text-sm text-amber-ink">{p.title}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-sm md:text-base leading-relaxed text-text-muted">{p.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="talk-to-cyfy" aria-label="Contact CYFY" className="scroll-mt-28 pb-20 md:pb-28">
        <div className="shell">
          <Reveal>
            <div className="rounded-2xl border border-border-base bg-surface-2 p-6 md:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <Eyebrow>Contact</Eyebrow>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Talk to CYFY</h2>
                <ul className="mt-6 space-y-3 text-sm md:text-base">
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" />
                    <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-ink transition-colors"><span className="sr-only">Email: </span>{CONTACT_INFO.email}</a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" />
                    <a href={CONTACT_INFO.phoneHref} className="hover:text-brand-ink transition-colors"><span className="sr-only">Phone: </span>{CONTACT_INFO.phone}</a>
                  </li>
                  <li className="flex items-start gap-3 text-text-muted">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-brand-ink" aria-hidden="true" />
                    <span><span className="sr-only">Address: </span>{CONTACT_INFO.address}</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <PrimaryButton to="/#contact">Talk to your security expert</PrimaryButton>
                <SecondaryButton href={`mailto:${CONTACT_INFO.email}`}>Email us</SecondaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
