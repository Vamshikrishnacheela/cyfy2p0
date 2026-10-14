// Homepage content. Sourced from the CYFY homepage reference (CYFY_Home_Page.pdf)
// and existing project content (constants.ts). Do not add claims that are not in those sources.
import type { LucideIcon } from 'lucide-react';
import {
  Network, ShieldCheck, ClipboardCheck, Server, Flame, AppWindow, Cloud, Fingerprint,
  Factory, Landmark, Pill, Store, Radar, Newspaper, Search, Layers, Settings2, BadgeCheck,
  Users, Timer, Target, Eye, Zap, Brain, Bug, Swords, MailWarning, Compass, Building2, Activity,
} from 'lucide-react';

export interface Metric { icon: LucideIcon; value: string; label: string }
export const HERO_METRICS: Metric[] = [
  { icon: BadgeCheck, value: 'ISO/IEC 27001:2022', label: 'Certified security operations' },
  { icon: Users, value: '24/7', label: 'L1 to L3 analyst coverage' },
  { icon: Timer, value: '30 min', label: 'Mean time to respond, GUARD++ tier' },
  { icon: Target, value: '1,000+', label: 'MITRE ATT&CK detection use cases' },
];

export const CLIENTS = [ 'Sahi', 'TradeWell', 'TheraNym Biologics', 'Interpolitan Money', 'Marico', 'Pi Health Industries', 'IHCL', 'HPCL' ];

export const WHY_STATS = [
  { value: 30, suffix: '+', label: 'IT, network and security OEM partnerships' },
  { value: 1000, suffix: '+', label: 'MITRE ATT&CK use cases in our SIEM' },
  { value: 3, suffix: '', label: 'Service lines under one SLA: NOC, SOC, GRC' },
  { value: 20, suffix: '+', label: 'Years of network and security experience across pharma, BFSI and ITES' },
];

export interface CoverageLine {
  id: string; anchor: string; num: string; title: string; code: string; icon: LucideIcon;
  summary: string; tags: string[]; details: string[]; href: string; cta: string;
}
export const COVERAGE: CoverageLine[] = [
  {
    id: 'network', anchor: 'network-noc', num: '01', title: 'Network', code: 'NOC', icon: Network,
    summary: 'Network as a service with 24/7 infrastructure monitoring and self-healing design.',
    tags: ['LAN, WAN and SD-WAN', 'NGFW and NAC', 'Micro-segmentation'],
    details: ['24/7 infrastructure monitoring and AIOps', 'Designed and run on HPE Aruba, Juniper, Palo Alto Networks and Fortinet', 'IT/OT segmentation to IEC 62443'],
    href: '/service/secure-architecture', cta: 'Explore network',
  },
  {
    id: 'security', anchor: 'security-soc', num: '02', title: 'Security', code: 'SOC', icon: ShieldCheck,
    summary: 'Round-the-clock detection, triage and response by L1 to L3 analysts.',
    tags: ['SIEM and SOAR', 'EDR and XDR', 'Threat intelligence'],
    details: ['In-house Security Team in Hyderabad, staffed around the clock', 'SOAR playbooks contain threats, 30 minute MTTR on the premium tier', 'Weekly threat advisory and a CISO dashboard'],
    href: '/service/managed-security-services', cta: 'Explore security',
  },
  {
    id: 'vapt', anchor: 'vapt-pentesting', num: '03', title: 'VAPT and pentesting', code: '', icon: Bug,
    summary: 'Find the gaps in your applications, people and perimeter before someone else does.',
    tags: ['Web App Pentest', 'Red & Blue Teaming', 'Phishing as a Service'],
    details: ['VAPT on trading systems', 'Adversarial simulations that test and improve your security posture', 'External attack surface review with cyshield'],
    href: '/service/web-app-pentest', cta: 'Explore VAPT',
  },
  {
    id: 'compliance', anchor: 'compliance-grc', num: '04', title: 'Compliance', code: 'GRC', icon: ClipboardCheck,
    summary: 'Audit readiness for the regulators you answer to, maintained all year.',
    tags: ['SEBI CSCRF', 'ISO 27001 and 42001', 'vCISO'],
    details: ['SEBI CSCRF-ready reporting, every week', 'Gap assessment and VAPT ahead of the audit window', 'Audit-ready records from day-to-day operations'],
    href: '/service/vciso-services', cta: 'Explore compliance',
  },
];

export const STEPS = [
  { icon: Search, title: 'Assess', body: 'Gap assessment, VAPT and an external attack surface review.', outputs: ['Gap assessment', 'VAPT', 'External attack surface review with cyshield'] },
  { icon: Layers, title: 'Architect', body: 'Design the network and security stack with the right OEM platforms.', outputs: ['Network and security design', 'Platform selection from 30+ OEM partners'] },
  { icon: Settings2, title: 'Operate', body: 'Run it 24/7 from our NOC and SOC, with SOAR-driven response.', outputs: ['24/7 NOC and SOC', 'L1 triage, L2 validation, L3 investigation', 'SOAR-driven response'] },
  { icon: BadgeCheck, title: 'Prove', body: 'Weekly advisories, a CISO dashboard and audit-ready records.', outputs: ['Weekly threat advisory', 'CISO dashboard', 'Audit-ready records'] },
];

export const SOC_PILLARS = [
  { icon: Eye, title: 'Always watching', body: '24/7 monitoring across multiple shifts from our in-house Hyderabad SOC.' },
  { icon: Users, title: 'Layered analysts', body: 'L1 triage, L2 validation and L3 investigation, escalated to a SOC lead.' },
  { icon: Zap, title: 'Fast response', body: 'SOAR playbooks contain threats, with a 30 minute MTTR on the premium tier.' },
];

export const SOC_SOURCES: { icon: LucideIcon; label: string }[] = [
  { icon: Server, label: 'Endpoints and servers' },
  { icon: Flame, label: 'Firewalls and IDS' },
  { icon: AppWindow, label: 'Trading and core apps' },
  { icon: Cloud, label: 'AWS, Azure and GCP' },
  { icon: Fingerprint, label: 'Active Directory' },
  { icon: Factory, label: 'OT systems' },
];

export const SOC_STAGES = [
  { id: 'detect', label: 'Detect', status: 'Normalising logs', body: 'Logs from every source are normalised in the SIEM and correlated against 1,000+ MITRE ATT&CK use cases.' },
  { id: 'triage', label: 'Triage', status: 'L1 triage, L2 validating', body: 'L1 analysts triage the alert, L2 validates it, and L3 investigates before escalating to a SOC lead.' },
  { id: 'respond', label: 'Respond', status: 'Containing threat', body: 'A SOAR playbook contains the threat. Premium-tier clients get a 30 minute mean time to respond.' },
];

export const SOC_OUTCOMES = ['Client escalation within SLA', 'Weekly threat advisory', 'CISO dashboard', 'Audit-ready records'];

export interface Capability { title: string; body: string; plain?: string; icon: LucideIcon; href?: string }
export interface CapabilityTab { id: string; label: string; icon: LucideIcon; lead: { title: string; body: string }; items: Capability[] }
export const CAPABILITY_TABS: CapabilityTab[] = [
  {
    id: 'operate', label: 'Operate', icon: Settings2,
    lead: { title: 'We run it, day and night.', body: 'Managed operations for the infrastructure and security stack you depend on, under one SLA.' },
    items: [
      { title: 'Managed SOC', icon: ShieldCheck, body: '24/7 detection, triage and response with L1 to L3 analysts.', plain: '24/7 digital guards: AI-powered surveillance that monitors your systems like a global security team.', href: '/service/ai-soc' },
      { title: 'Network and NOC', icon: Network, body: 'Network as a service, 24/7 infrastructure monitoring and AIOps.' },
      { title: 'Cloud, identity and data', icon: Cloud, body: 'CSPM, CNAPP, IAM, PAM and DLP, built with leading OEMs.', plain: 'Ensuring that your data stored in the cloud stays private and protected.', href: '/service/cloud-security' },
      { title: 'OT and IoT security', icon: Factory, body: 'IT/OT segmentation to IEC 62443 and secure remote access.' },
      { title: 'Security for AI', icon: Brain, body: 'Shadow AI control and protection for enterprise LLMs and copilots.' },
      { title: 'Managed Security Services', icon: Activity, body: '24x7 AI-driven SOC services ensuring constant monitoring and rapid response to security incidents.', plain: "We manage all your security tools, so you don't have to worry about a thing.", href: '/service/managed-security-services' },
    ],
  },
  {
    id: 'test', label: 'Test', icon: Target,
    lead: { title: 'We test it like an attacker would.', body: 'Find the gaps in your applications, people and perimeter before someone else does.' },
    items: [
      { title: 'Web App Pentest', icon: Bug, body: 'Proactively identifying vulnerabilities that could jeopardize sensitive user and financial information.', plain: 'We try to break into your website so we can find and fix the holes before real attackers do.', href: '/service/web-app-pentest' },
      { title: 'Red & Blue Teaming', icon: Swords, body: "Testing and improving your organization's security posture through adversarial simulations.", plain: 'We simulate real-world attacks to train your defenses to be battle-ready.', href: '/service/red-blue-teaming' },
      { title: 'Phishing as a Service', icon: MailWarning, body: "Proactively test and enhance your organization's defenses against phishing attacks.", plain: 'Safe simulated phishing emails teach your team how to spot and report the real ones.', href: '/service/phishing-paas' },
      { title: 'Attack surface management', icon: Radar, body: 'Self-hosted attack surface monitoring with cyshield: domains, ports, TLS, email and DNS hygiene.' },
    ],
  },
  {
    id: 'comply', label: 'Comply', icon: ClipboardCheck,
    lead: { title: 'We keep you audit-ready.', body: 'Audit readiness for the regulators you answer to, maintained all year rather than the week before.' },
    items: [
      { title: 'vCISO Services', icon: Compass, body: 'Expert guidance and strategic oversight to safeguard your business from cyber threats.', plain: 'An expert security leader who coordinates your strategy without the full-time cost.', href: '/service/vciso-services' },
      { title: 'Security Consulting', icon: Users, body: 'Expert guidance to enhance your security posture and address vulnerabilities in your organization.', plain: "Security specialists who diagnose your organization's digital health.", href: '/service/security-consulting' },
      { title: 'Secure Architecture', icon: Building2, body: "Designing robust security frameworks for organizations' needs.", plain: "Designing your company's systems to be secure from the ground up.", href: '/service/secure-architecture' },
      { title: 'SEBI CSCRF readiness', icon: Landmark, body: 'Gap assessment, VAPT and a 24/7 managed SOC ahead of the audit window, with weekly CSCRF-ready reporting.' },
    ],
  },
];

export const PRODUCTS = {
  cyshield: {
    name: 'cyshield', icon: Radar, title: 'See what an attacker sees.',
    body: 'Self-hosted attack surface monitoring that finds your internet-facing exposure without your data leaving your network.',
    bullets: ['Domains, subdomains, ports and services', 'TLS, email and DNS hygiene', 'Prioritised remediation queue'],
    stats: [{ label: 'Assets found', value: '214' }, { label: 'Open findings', value: '17' }, { label: 'New this week', value: '3' }],
    rows: [
      { asset: 'vpn.yourfirm.in', finding: 'Outdated SSL VPN build exposed', severity: 'Critical' },
      { asset: 'mail.yourfirm.in', finding: 'DMARC policy set to none', severity: 'High' },
      { asset: 'uat.yourfirm.in', finding: 'Staging portal indexed publicly', severity: 'High' },
      { asset: 'api.yourfirm.in', finding: 'TLS certificate expires in 9 days', severity: 'Medium' },
    ],
  },
  cynapptics: {
    name: 'Cynapptics', icon: Newspaper, title: 'Threat intelligence your team can act on.',
    body: 'One live view of CERT-In advisories, CVE updates and threat context from more than 50 sources.',
    bullets: ['CERT-In and NVD in one feed', 'Threat actor, IOC and MITRE context', 'Briefings and exports for leadership'],
  },
  day2SecOps: {
    name: 'Day 2 – SecOps', icon: ShieldCheck, title: 'Day 2 – SecOps',
    body: 'Day 2 – SecOps brings security and operations together to close the gap between identifying risks and actually resolving them. It provides unified visibility across security tools, infrastructure, endpoints, networks, and operational environments, enabling teams to detect threats, prioritize risks, coordinate response, and drive effective remediation. By connecting SOC, NOC, GRC, and vCISO functions, Day 2 helps organizations turn security intelligence into actionable operational outcomes.',
  },
};

export const ECOSYSTEM = [
  { id: 'cyshield', stage: 'Exposure', name: 'cyshield', kind: 'CYFY product', icon: Radar, body: 'Finds your internet-facing exposure: domains, ports, services, TLS, email and DNS hygiene.' },
  { id: 'cynapptics', stage: 'Intelligence', name: 'cynapptics', kind: 'CYFY product', icon: Newspaper, body: 'Tells you which CERT-In advisories and CVEs are actively exploited, with IOC and MITRE context.' },
  { id: 'day2SecOps', stage: 'Detect and respond', name: 'Day 2 – SecOps', kind: 'CYFY product', icon: ShieldCheck, body: 'Day 2 – SecOps brings security and operations together to close the gap between identifying risks and actually resolving them.' },
  { id: 'prove', stage: 'Report and prove', name: 'CISO dashboard', kind: 'Managed service', icon: ClipboardCheck, body: 'Weekly threat advisories, a CISO dashboard and audit-ready records for SEBI CSCRF, ISO 27001 and more.' },
] as const;

export interface Advisory {
  source: string; kind: string; title: string; cve: string; product: string;
  technique: string; techniqueName: string; severity: 'Critical' | 'High'; action: string; exposure: string;
}
export const ADVISORIES: Advisory[] = [
  {
    source: 'CERT-In', kind: 'Advisory', title: 'Multiple vulnerabilities in Fortinet FortiOS SSL VPN', cve: 'CVE-2024-21762',
    product: 'FortiOS SSL VPN', technique: 'T1190', techniqueName: 'Exploit Public-Facing Application', severity: 'Critical',
    exposure: 'cyshield checks whether an SSL VPN portal is exposed on your perimeter.',
    action: 'Upgrade FortiOS to a fixed release. Disable SSL VPN until patched if upgrade is not possible.',
  },
  {
    source: 'NVD', kind: 'CVSS 10.0', title: 'Palo Alto PAN-OS GlobalProtect command injection', cve: 'CVE-2024-3400',
    product: 'PAN-OS GlobalProtect', technique: 'T1190', techniqueName: 'Exploit Public-Facing Application', severity: 'Critical',
    exposure: 'cyshield maps GlobalProtect gateways reachable from the internet.',
    action: 'Apply the PAN-OS hotfix for your release and hunt for signs of prior exploitation.',
  },
  {
    source: 'CERT-In', kind: 'Advisory', title: 'Session hijacking in Citrix NetScaler ADC and Gateway', cve: 'CVE-2023-4966',
    product: 'NetScaler ADC and Gateway', technique: 'T1550.004', techniqueName: 'Use Alternate Authentication Material: Web Session Cookie', severity: 'High',
    exposure: 'cyshield flags NetScaler gateways exposed to the internet.',
    action: 'Upgrade NetScaler, then terminate all active and persistent sessions.',
  },
];

export const CASES = [
  {  industry: 'Capital markets', icon: Landmark, metric: '6/6', label: 'SEBI CSCRF pillars assessed and remediated', body: 'Gap assessment, VAPT on trading systems and a 24/7 managed SOC ahead of the audit window.', industryId: 'bfsi' },
  {  industry: 'Wealth management', icon: Building2, metric: '24/7', label: 'SOC coverage on a high-trust wealth platform', body: 'SIEM monitoring with L1 to L3 escalation and a weekly CISO advisory.', industryId: 'bfsi' },
  {  industry: 'Pharmaceuticals', icon: Pill, metric: 'Part 11', label: 'FDA 21 CFR controls mapped and monitored', body: 'Continuous monitoring of validated systems with audit-ready evidence.', industryId: 'pharma' },
];

export const FOUNDER_NOTE = {
  image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.ctfassets.net%2Fwkud0epjdpn7%2F1CmlPkNN2jPbkyy5GkRk8x%2F2a32aad7c3559d9b9d145b768e91a2fb%2FRakesh_Reddy_ISB_CYSL.png%3Ffm%3Dwebp&f=1&nofb=1&ipt=2acaa90926bb0663844324af5a7c22cfb1da0af525117fd6408e3dddc4353e1a&ipo=images',
  greeting: 'To every security leader in a regulated business,',
  paragraphs: [
    'We built CYFY to move enterprise networks and security from reactive to proactive. Too many teams run a dozen point tools and still find out about incidents from their customers.',
    'So we design infrastructure and security together, run it from our own Security Team in Hyderabad, and keep the evidence your auditors ask for ready every week.',
    'Our clients carry less risk and keep running. That is the only measure we hold ourselves to.',
  ],
  name: 'Rakesh Reddy Gaddam',
  role: 'Founder, CYFY Solutions',
};

export interface Industry {
  id: string; name: string; icon: LucideIcon; who: string; frameworks: string[];
  challenges: string[]; solutions: string[];
}
export const INDUSTRIES: Industry[] = [
  {
    id: 'bfsi', name: 'BFSI and capital markets', icon: Landmark, who: 'Brokers, wealth firms and NBFCs.', frameworks: ['RBI', 'SEBI CSCRF'],
    challenges: ['Audit windows under SEBI CSCRF and RBI directions', 'Trading and core applications that cannot go down', 'High-trust platforms holding client wealth data'],
    solutions: ['24/7 managed SOC with L1 to L3 escalation', 'VAPT on trading systems', 'Weekly SEBI CSCRF-ready reporting'],
  },
  {
    id: 'pharma', name: 'Pharma and healthcare', icon: Pill, who: 'Validated systems and patient data.', frameworks: ['FDA 21 CFR Part 11', 'HIPAA'],
    challenges: ['Keeping validated systems compliant as they change', 'Protecting patient and research data', 'Producing audit evidence on demand'],
    solutions: ['Continuous monitoring of validated systems', 'FDA 21 CFR Part 11 controls mapped and monitored', 'Audit-ready evidence'],
  },
  {
    id: 'manufacturing', name: 'Manufacturing', icon: Factory, who: 'Plants, SCADA and converged IT/OT.', frameworks: ['IEC 62443', 'Purdue model'],
    challenges: ['Flat networks where IT and OT meet', 'Plant systems that cannot be patched quickly', 'Remote access into plants'],
    solutions: ['IT/OT segmentation to IEC 62443', 'Secure remote access', 'OT systems monitored by the SOC'],
  },
  {
    id: 'retail', name: 'Retail and e-commerce', icon: Store, who: 'Payments and omnichannel platforms.', frameworks: ['PCI DSS'],
    challenges: ['Cardholder data across stores and online channels', 'Public-facing web apps and APIs', 'SaaS and third-party integrations'],
    solutions: ['Web application penetration testing', 'WAF and secure web gateway', 'PCI DSS audit readiness'],
  },
];

export const FRAMEWORKS = ['SEBI CSCRF', 'RBI', 'IRDAI', 'ISO 27001', 'ISO 42001', 'SOC 2', 'PCI DSS', 'HIPAA', 'GDPR', 'NIST CSF', 'IEC 62443'];

export interface PartnerLogo { name: string; logo: string; plate: string; ratio: number }
// Partner logos as published on https://www.cyfy.ai/our-partners (organisations identified from the artwork).
// Files are the originals with empty margins trimmed; `plate` matches each logo's own background
// (SentinelOne's white wordmark sits on a dark plate), so no logo is recoloured or filtered. `ratio` is width / height of the file.
export const PARTNERS: PartnerLogo[] = [
  { name: 'SentinelOne', logo: new URL('./assets/partners/sentinelone.png', import.meta.url).href, plate: '#111418', ratio: 5.71 },
  { name: 'Fortinet', logo: new URL('./assets/partners/fortinet.png', import.meta.url).href, plate: '#ffffff', ratio: 7.50 },
  { name: 'Cloudflare', logo: new URL('./assets/partners/cloudflare.png', import.meta.url).href, plate: '#ffffff', ratio: 2.67 },
  { name: 'BluSapphire', logo: new URL('./assets/partners/blusapphire.png', import.meta.url).href, plate: '#050c19', ratio: 5.27 },
  { name: 'HPE', logo: new URL('./assets/partners/hpe.png', import.meta.url).href, plate: '#292d3a', ratio: 1.78 },
  { name: 'Zscaler', logo: new URL('./assets/partners/zscaler.png', import.meta.url).href, plate: '#ffffff', ratio: 4.62 },
  { name: 'Infraon', logo: new URL('./assets/partners/infraon.png', import.meta.url).href, plate: '#f9f9f9', ratio: 4.05 },
  { name: 'GlobalSign', logo: new URL('./assets/partners/globalsign.png', import.meta.url).href, plate: '#ffffff', ratio: 4.66 },
  { name: 'Cato Networks', logo: new URL('./assets/partners/cato-networks.png', import.meta.url).href, plate: '#ffffff', ratio: 2.00 },
  { name: 'CyberArk', logo: new URL('./assets/partners/cyberark.png', import.meta.url).href, plate: '#ffffff', ratio: 5.00 },
  { name: 'Sequretek', logo: new URL('./assets/partners/sequretek.png', import.meta.url).href, plate: '#ffffff', ratio: 4.71 },
  { name: 'Innspark', logo: new URL('./assets/partners/innspark.png', import.meta.url).href, plate: '#1d3d59', ratio: 2.74 },
  { name: 'OPSWAT', logo: new URL('./assets/partners/opswat.png', import.meta.url).href, plate: '#050f22', ratio: 5.55 },
  { name: 'ZeroPort', logo: new URL('./assets/partners/zeroport.png', import.meta.url).href, plate: '#0d0d0d', ratio: 2.30 },
];

export const FOOTER_COLUMNS = [
  { title: 'Services', links: [
    { label: 'Managed SOC', to: '/service/ai-soc' },
    { label: 'Network and NOC', to: '/#capabilities' },
    { label: 'VAPT', to: '/service/web-app-pentest' },
    { label: 'Attack surface management', to: '/#platform' },
    { label: 'vCISO', to: '/service/vciso-services' },
  ] },
  { title: 'Industries', links: [
    { label: 'BFSI and capital markets', to: '/#industries' },
    { label: 'Pharma and healthcare', to: '/#industries' },
    { label: 'Manufacturing', to: '/#industries' },
    { label: 'Retail', to: '/#industries' },
  ] },
  { title: 'Products', links: [
    { label: 'CyShield Pro', product: 'cyshield' as const, to: '/#platform' },
    { label: 'Cynapptics', product: 'cynapptics' as const, to: '/#platform-cynapptics' },
  ] },
  { title: 'Resources', links: [
    { label: 'Customer stories', to: '/#customers' },
  ] },
  { title: 'Company', links: [
    { label: 'About CYFY', to: '/#why-cyfy' },
    { label: 'Partners', to: '/#partners' },
    { label: 'Contact', to: '/#contact' },
  ] },
];
