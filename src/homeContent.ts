// Homepage content. Sourced from the CYFY homepage reference (CYFY_Home_Page.pdf)
// and existing project content (constants.ts). Do not add claims that are not in those sources.
import type { LucideIcon } from 'lucide-react';
import {
  Network, ShieldCheck, ClipboardCheck, Server, Flame, AppWindow, Cloud, Fingerprint,
  Factory, Landmark, Pill, Store, Radar, Newspaper, Search, Layers, Settings2, BadgeCheck,
  Users, Timer, Target, Eye, Zap, Bug, Swords, MailWarning, Compass, Building2,
  Cable, Waypoints, UserCheck, ScanSearch, FileLock, Globe,
} from 'lucide-react';
import type { EnquiryInterest } from './constants';

export interface Metric { icon: LucideIcon; value: string; label: string }
export const HERO_METRICS: Metric[] = [
  { icon: BadgeCheck, value: 'ISO/IEC 27001:2022', label: 'Certified security operations' },
  { icon: Users, value: '24/7', label: 'L1 to L3 analyst coverage' },
  { icon: Timer, value: '30 min', label: 'Mean time to respond, GUARD++ tier' },
  { icon: Target, value: '1,000+', label: 'MITRE ATT&CK detection use cases' },
];

// Client logos in CYFY's display order. Files in src/assets/clients are the official logos from each client's own
// website, cropped to their artwork and resized; never recoloured. `plate` is the tile colour behind the logo: white for
// logos designed for light backgrounds, dark for IHCL's white header logo, Zepto's brand purple for its white wordmark.
// `ratio` is width / height of the file. Paytm is the wordmark from its site header, without the adjoining UPI lockup.
// BigBasket is from careers.bigbasket.com. Zepto is from its own Google Play listing because its website blocks automated access.
// Blackbit (12th in the list) is omitted until CYFY supplies its official logo; the company could not be identified.
const clientLogo = (file: string) => new URL(`./assets/clients/${file}`, import.meta.url).href;
export const CLIENT_LOGOS: LogoItem[] = [
  { name: 'Sahi', logo: clientLogo('sahi.svg'), plate: '#ffffff', ratio: 2.28 },
  { name: 'TheraNym Biologics', logo: clientLogo('theranym-biologics.png'), plate: '#ffffff', ratio: 2.36 },
  { name: 'Interpolitan Money', logo: clientLogo('interpolitan-money.png'), plate: '#ffffff', ratio: 10.98 },
  { name: 'Marico', logo: clientLogo('marico.png'), plate: '#ffffff', ratio: 1.00 },
  { name: "Dr. Reddy's", logo: clientLogo('dr-reddys.png'), plate: '#ffffff', ratio: 4.62 },
  { name: 'Aurigene Pharmaceuticals', logo: clientLogo('aurigene-pharmaceutical-services.png'), plate: '#ffffff', ratio: 1.69 },
  { name: 'Amara Raja Batteries', logo: clientLogo('amara-raja.png'), plate: '#ffffff', ratio: 8.49 },
  { name: 'PI Industries', logo: clientLogo('pi-industries.png'), plate: '#ffffff', ratio: 0.94 },
  { name: 'IHCL', logo: clientLogo('ihcl.png'), plate: '#111418', ratio: 2.92 },
  { name: 'HPCL', logo: clientLogo('hpcl.png'), plate: '#ffffff', ratio: 5.30 },
  { name: 'Aurobindo Pharmaceuticals', logo: clientLogo('aurobindo-pharma.png'), plate: '#ffffff', ratio: 2.06 },
  { name: 'upGrad', logo: clientLogo('upgrad.png'), plate: '#ffffff', ratio: 3.90 },
  { name: 'BigBasket', logo: clientLogo('bigbasket.png'), plate: '#ffffff', ratio: 1.83 },
  { name: 'Paytm', logo: clientLogo('paytm.svg'), plate: '#ffffff', ratio: 3.15 },
  { name: 'Zepto', logo: clientLogo('zepto.png'), plate: '#7c1cc0', ratio: 2.99 },
  { name: 'Decathlon', logo: clientLogo('decathlon.svg'), plate: '#ffffff', ratio: 6.65 },
];

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
    id: 'network', anchor: 'network-noc', num: '01', title: 'Network Infrastructure', code: 'NOC', icon: Network,
    summary: 'Network as a service with 24/7 infrastructure monitoring and self-healing design.',
    tags: ['LAN, WAN and SD-WAN', 'NGFW and NAC', 'Micro-segmentation'],
    details: ['24/7 infrastructure monitoring and AIOps', 'Designed and run on HPE Aruba, Juniper, Palo Alto Networks and Fortinet', 'IT/OT segmentation to IEC 62443'],
    href: '/service/secure-architecture', cta: 'Explore network infrastructure',
  },
  {
    id: 'security', anchor: 'security-soc', num: '02', title: 'Security', code: 'SOC', icon: ShieldCheck,
    summary: 'Round-the-clock detection, triage and response by L1 to L3 analysts.',
    tags: ['SIEM and SOAR', 'EDR and XDR', 'Threat intelligence'],
    details: ['In-house Security Team in Hyderabad, staffed around the clock', 'SOAR playbooks contain threats, 30 minute MTTR on the premium tier', 'Weekly threat advisory and COMPASS'],
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
  { icon: BadgeCheck, title: 'Prove', body: 'Weekly advisories, COMPASS and audit-ready records.', outputs: ['Weekly threat advisory', 'COMPASS', 'Audit-ready records'] },
];

export const SOC_PILLARS = [
  { icon: Eye, title: 'Always watching', body: '24/7 monitoring across multiple shifts from our in-house Hyderabad SOC.' },
  { icon: Users, title: 'Layered analysts', body: 'L1 triage, L2 validation and L3 investigation, escalated to a SOC lead.' },
  { icon: Zap, title: 'Fast response', body: 'SOAR playbooks contain threats, with a 30 minute MTTR on the premium tier.' },
];

export type SocStageId = 'detect' | 'triage' | 'respond';
export interface SocSource {
  icon: LucideIcon; label: string;
  /** Panel heading and one-line summary when this source is selected */
  heading: string; summary: string;
  /** What each SOC stage means for this source. Qualified wording: scope and response actions are agreed per client. */
  stages: Record<SocStageId, string>;
}
export const SOC_SOURCES: SocSource[] = [
  {
    icon: Server, label: 'Endpoints and servers', heading: 'Endpoint and server monitoring',
    summary: 'Endpoint and server logs, including alerts from your EDR or XDR tools, collected in the SIEM and watched around the clock.',
    stages: {
      detect: 'Look for suspicious processes, malware indicators, unusual logins and endpoint security alerts.',
      triage: 'Correlate endpoint events with user activity, asset context and related alerts to judge severity.',
      respond: 'Escalate confirmed threats to your team and support containment or remediation under the agreed response process.',
    },
  },
  {
    icon: Flame, label: 'Firewalls and IDS', heading: 'Network threat detection',
    summary: 'Firewall and IDS logs that show what is crossing your perimeter and moving between network segments.',
    stages: {
      detect: 'Look for suspicious traffic, intrusion alerts, unusual connections and possible policy violations.',
      triage: 'Correlate firewall and IDS events with related activity to separate real threats from routine traffic.',
      respond: 'Escalate validated incidents and coordinate blocking, rule changes or further investigation with the team that owns the network.',
    },
  },
  {
    icon: AppWindow, label: 'Trading and core apps', heading: 'Trading and core application monitoring',
    summary: 'Application and authentication logs from the systems your business cannot afford to have go down.',
    stages: {
      detect: 'Look for abnormal application events, authentication anomalies, unexpected access patterns and application security alerts.',
      triage: 'Correlate application logs with user sessions and system events to understand the possible business impact.',
      respond: 'Prioritise incidents that affect critical applications and coordinate investigation, escalation and recovery with the application owners.',
    },
  },
  {
    icon: Cloud, label: 'AWS, Azure and GCP', heading: 'Cloud security monitoring',
    summary: 'Audit, identity and security logs from your AWS, Azure and GCP accounts, monitored alongside the rest of your estate.',
    stages: {
      detect: 'Look for suspicious cloud activity, risky configuration changes, unusual access and cloud security alerts.',
      triage: 'Correlate cloud audit logs, identity events and available workload alerts to investigate what happened.',
      respond: 'Escalate cloud incidents and coordinate remediation with your cloud or infrastructure team.',
    },
  },
  {
    icon: Fingerprint, label: 'Active Directory', heading: 'Identity and access threat monitoring',
    summary: 'Directory and authentication events, where account misuse and privilege escalation often show up first.',
    stages: {
      detect: 'Look for suspicious sign-in patterns, privilege changes, account misuse and other directory security events.',
      triage: 'Correlate account activity, authentication events and privilege changes to assess whether an identity is compromised.',
      respond: 'Escalate suspected account compromise and coordinate approved containment, access review or remediation.',
    },
  },
  {
    icon: Factory, label: 'OT systems', heading: 'Operational technology security monitoring',
    summary: 'Logs and alerts from supported industrial systems, handled with plant safety and availability in mind.',
    stages: {
      detect: 'Look for suspicious OT events, unusual communication patterns and alerts from supported industrial systems.',
      triage: 'Assess alerts using the available OT telemetry, asset criticality and operational context, weighing safety and availability impact.',
      respond: 'Escalate through the agreed OT response process and coordinate with authorised OT staff before any action that could affect operations.',
    },
  },
];

export const SOC_STAGES: { id: SocStageId; label: string; status: string; body: string }[] = [
  { id: 'detect', label: 'Detect', status: 'Normalising logs', body: 'Logs from every source are normalised in the SIEM and correlated against 1,000+ MITRE ATT&CK use cases.' },
  { id: 'triage', label: 'Triage', status: 'L1 triage, L2 validating', body: 'L1 analysts triage the alert, L2 validates it, and L3 investigates before escalating to a SOC lead.' },
  { id: 'respond', label: 'Respond', status: 'Containing threat', body: 'A SOAR playbook contains the threat. Premium-tier clients get a 30 minute mean time to respond.' },
];

export const SOC_OUTCOMES = ['Client escalation within SLA', 'Weekly threat advisory', 'COMPASS', 'Audit-ready records'];

export interface Capability {
  title: string; body: string; plain?: string; icon: LucideIcon; href?: string;
  /** Shown when the card is expanded */
  details?: string[];
  /** Enquiry topic for the card's Learn More detail, when it differs from the tab's default */
  interest?: EnquiryInterest;
}
export interface CapabilityTab {
  id: string; label: string; icon: LucideIcon; lead: { title: string; body: string }; items: Capability[];
  /** Shown in the Learn More detail. Drawn from existing CYFY copy; do not add unverified capabilities. */
  topics: { title: string; body: string }[];
}
// Only capabilities backed by existing CYFY content appear here. Drafts awaiting CYFY approval are in solutionsPendingApproval.ts.
// Exception: the wireless, IPAM and data center topics below reuse those drafts' wording because the Learn More brief named them.
export const CAPABILITY_TABS: CapabilityTab[] = [
  {
    id: 'network-infrastructure', label: 'Network Infrastructure', icon: Network,
    lead: { title: 'We design and run your network.', body: 'Network as a service with 24/7 infrastructure monitoring and self-healing design.' },
    topics: [
      { title: "Enterprise wired and wireless networking", body: "Campus and branch LAN and WAN built around dependable, high-capacity switching, with enterprise Wi-Fi planned around how your sites and devices are actually used." },
      { title: "Network architecture and connectivity", body: "Network and security design, with platforms selected from 30+ OEM partners, covering LAN, WAN and micro-segmentation." },
      { title: "SD-WAN and network infrastructure management", body: "Software-defined connectivity that links distributed sites under central control, with 24/7 infrastructure monitoring and AIOps from our NOC." },
      { title: "IP address management and network visibility", body: "One managed record of the addresses and subnets across your network, with centralised IP, DHCP and DNS management." },
      { title: "Data center and infrastructure solutions", body: "Compute, storage and network foundations for modern data center workloads, including workload segmentation." },
    ],
    items: [
      {
        title: 'Enterprise Wired Networking', icon: Cable,
        body: 'Campus and branch LAN and WAN built around dependable, high-capacity switching.',
        details: ['Switching infrastructure for branch offices and large sites', 'High-throughput, low-latency connectivity', 'Architecture that scales as sites and users grow', 'Redundant design for availability'],
      },
      {
        title: 'SD-WAN Solutions', icon: Waypoints,
        body: 'Software-defined connectivity that links distributed sites under central control.',
        details: ['Centralised network management and visibility', 'Dynamic traffic routing across links', 'Secure connectivity between distributed locations', 'Support for traditional and cloud-based applications'],
      },
      { title: 'Network and NOC', icon: Network, body: 'Network as a service, 24/7 infrastructure monitoring and AIOps.', href: '/service/secure-architecture' },
      { title: 'Secure Architecture', icon: Building2, body: "Designing robust security frameworks for organizations' needs.", plain: "Designing your company's systems to be secure from the ground up.", href: '/service/secure-architecture' },
      { title: 'Cloud, identity and data', icon: Cloud, body: 'CSPM, CNAPP, IAM, PAM and DLP, built with leading OEMs.', plain: 'Ensuring that your data stored in the cloud stays private and protected.', href: '/service/cloud-security' },
    ],
  },
  {
    id: 'cybersecurity', label: 'Cybersecurity', icon: ShieldCheck,
    lead: { title: 'We protect your access, perimeter and data.', body: 'Controls for your access, perimeter, endpoints and OT, alongside protection for your web applications, web access and sensitive data.' },
    topics: [
      { title: "Data Loss Prevention (DLP)", body: "Controls that keep sensitive information from leaving through the wrong channel, built on data classification and monitoring." },
      { title: "Web Application Firewall (WAF)", body: "A protective layer in front of public-facing web applications that filters SQL injection and cross-site scripting attempts." },
      { title: "Secure Web Gateway (SWG)", body: "Policy-based control over how your users reach the internet, with URL filtering, SSL inspection and blocking of malicious websites." },
      { title: "Protection of enterprise applications and sensitive data", body: "Web application protection that pairs with web application penetration testing, and policies that reduce accidental disclosure and unauthorised exfiltration." },
      { title: "Web and network threat protection", body: "Deep packet inspection and intrusion prevention at the perimeter, with access policy enforced across wired, wireless and VPN connections." },
    ],
    items: [
      {
        title: 'Network Access Control (NAC)', icon: UserCheck, href: '/service/secure-architecture',
        body: 'Know which users and devices are on your network, and decide what each one can reach.',
        details: ['Visibility of connected devices and users', 'Device profiling and authentication', 'Policy enforcement across wired, wireless and VPN access'],
      },
      {
        title: 'Next-Generation Firewall', icon: Flame, href: '/service/secure-architecture',
        body: 'Perimeter protection that inspects traffic by application and content, not just port.',
        details: ['Deep packet inspection and intrusion prevention', 'Application control and SSL inspection', 'Centralised monitoring and policy management'],
      },
      {
        title: 'OT Security', icon: Factory, href: '/service/secure-architecture',
        body: 'IT/OT segmentation to IEC 62443 and secure remote access.',
        details: ['Segmentation between IT and OT networks', 'OT systems monitored by the SOC', 'Detection of unusual communication patterns', 'Handled with plant safety and availability in mind'],
      },
      {
        title: 'EDR and XDR', icon: ScanSearch, href: '/service/managed-security-services',
        body: 'Endpoint detection and response, extended to correlate activity across your environment.',
        details: ['Continuous endpoint monitoring', 'Behavioural analytics for threat detection and investigation', 'Visibility across endpoints, networks, servers and cloud', 'Containment and incident mitigation'],
      },
      {
        title: 'Data Loss Prevention (DLP)', icon: FileLock, href: '/service/cloud-security',
        body: 'Controls that keep sensitive information from leaving through the wrong channel.',
        details: ['Data classification and monitoring', 'Policies that reduce accidental disclosure', 'Controls against unauthorised data exfiltration'],
      },
      {
        title: 'Web Application Firewall (WAF)', icon: AppWindow, interest: 'architecture',
        body: 'A protective layer in front of public-facing web applications.',
        details: ['Protection against common web application attacks', 'Filtering of SQL injection and cross-site scripting attempts', 'Pairs with web application penetration testing'],
      },
      {
        title: 'Secure Web Gateway (SWG)', icon: Globe, interest: 'architecture',
        body: 'Policy-based control over how your users reach the internet.',
        details: ['Blocking of malware and malicious websites', 'URL filtering and SSL inspection', 'Granular web access policies'],
      },
    ],
  },
  {
    id: 'manage-security-services', label: 'Manage Security Services', icon: Target,
    lead: { title: 'We test and keep you audit-ready.', body: 'Find the gaps before someone else does, and maintain audit readiness all year.' },
    topics: [
      { title: "Managed Security Services", body: "Your security tools managed for you, including SIEM and SOAR, EDR and XDR, and threat intelligence." },
      { title: "Managed SOC and SIEM monitoring", body: "24/7 monitoring from our in-house Hyderabad SOC, with logs normalised in the SIEM and correlated against 1,000+ MITRE ATT&CK use cases." },
      { title: "Security operations and threat monitoring", body: "L1 triage, L2 validation and L3 investigation, escalated to a SOC lead and backed by a weekly threat advisory." },
      { title: "Security assessments and advisory services", body: "VAPT, red and blue teaming and phishing simulations to find the gaps, with vCISO and security consulting guidance on your strategy and posture." },
      { title: "Security management and incident response", body: "SOAR playbooks contain threats, with a 30 minute mean time to respond on the GUARD++ tier and one team and one SLA across NOC, SOC and GRC." },
    ],
    items: [
      { title: 'Web App Pentest', icon: Bug, body: 'Proactively identifying vulnerabilities that could jeopardize sensitive user and financial information.', plain: 'We try to break into your website so we can find and fix the holes before real attackers do.', href: '/service/web-app-pentest' },
      { title: 'Red & Blue Teaming', icon: Swords, body: "Testing and improving your organization's security posture through adversarial simulations.", plain: 'We simulate real-world attacks to train your defenses to be battle-ready.', href: '/service/red-blue-teaming' },
      { title: 'Phishing as a Service', icon: MailWarning, body: "Proactively test and enhance your organization's defenses against phishing attacks.", plain: 'Safe simulated phishing emails teach your team how to spot and report the real ones.', href: '/service/phishing-paas' },
      { title: 'vCISO Services', icon: Compass, body: 'Expert guidance and strategic oversight to safeguard your business from cyber threats.', plain: 'An expert security leader who coordinates your strategy without the full-time cost.', href: '/service/vciso-services' },
      { title: 'Security Consulting', icon: Users, body: 'Expert guidance to enhance your security posture and address vulnerabilities in your organization.', plain: "Security specialists who diagnose your organization's digital health.", href: '/service/security-consulting' },
      { title: 'SEBI CSCRF readiness', icon: Landmark, interest: 'assessment', body: 'Gap assessment, VAPT and a 24/7 managed SOC ahead of the audit window, with weekly CSCRF-ready reporting.' },
    ],
  },
];

// Deep links from before the renames, so existing bookmarks still reach the same content.
export const LEGACY_HASH_IDS: Record<string, string> = {
  'platform-cisoDashboard': 'platform-compass',
  'cap-security': 'cap-cybersecurity',
};

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
    name: 'CYnapptics', icon: Newspaper, title: 'Threat intelligence your team can act on.',
    body: 'One live view of CERT-In advisories, CVE updates and threat context from more than 50 sources.',
    bullets: ['CERT-In and NVD in one feed', 'Threat actor, IOC and MITRE context', 'Briefings and exports for leadership'],
  },
  compass: {
    name: 'COMPASS', icon: ClipboardCheck, title: 'COMPASS',
    body: 'A leadership view of your security programme, built for CISO-level visibility, governance and decision-making. Everything the SOC does is reported back alongside weekly threat advisories and audit-ready records, so you can see where you stand and decide what comes next.',
    bullets: ['Weekly threat advisory', 'Audit-ready records for SEBI CSCRF, ISO 27001 and more', 'Evidence your auditors can use'],
  },
};

export const ECOSYSTEM = [
  { id: 'cyshield', stage: 'Exposure', name: 'cyshield', kind: 'CYFY product', icon: Radar, body: 'Finds your internet-facing exposure: domains, ports, services, TLS, email and DNS hygiene.' },
  { id: 'cynapptics', stage: 'Intelligence', name: 'CYnapptics', kind: 'CYFY product', icon: Newspaper, body: 'Tells you which CERT-In advisories and CVEs are actively exploited, with IOC and MITRE context.' },
  { id: 'compass', stage: 'Report and prove', name: 'COMPASS', kind: 'Managed service', icon: ClipboardCheck, body: 'CISO-level visibility, governance and decision-making, backed by weekly threat advisories and audit-ready records.' },
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

// Client names are withheld; each case is identified by sector only.
export interface CaseStudy { industry: string; icon: LucideIcon; metric: string; label: string; body: string; industryId: string }
export const CASES: CaseStudy[] = [
  {  industry: 'Capital markets', icon: Landmark, metric: '6/6', label: 'SEBI CSCRF pillars assessed and remediated', body: 'Gap assessment, VAPT on trading systems and a 24/7 managed SOC ahead of the audit window.', industryId: 'bfsi' },
  {  industry: 'Wealth management', icon: Building2, metric: '24/7', label: 'SOC coverage on a high-trust wealth platform', body: 'SIEM monitoring with L1 to L3 escalation and a weekly CISO advisory.', industryId: 'bfsi' },
  {  industry: 'Pharmaceuticals', icon: Pill, metric: 'Part 11', label: 'FDA 21 CFR controls mapped and monitored', body: 'Continuous monitoring of validated systems with audit-ready evidence.', industryId: 'pharma' },
];

export const FOUNDER_NOTE = {
  image: new URL('./assets/people/rakesh-reddy-gaddam.webp', import.meta.url).href,
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

/** A logo tile in a LogoMarquee. `plate` is the tile colour behind the logo; `ratio` is the file's width / height. */
export interface LogoItem { name: string; logo: string; plate: string; ratio: number }
export type PartnerLogo = LogoItem;
// Partner logos as published on https://www.cyfy.ai/our-partners (organisations identified from the artwork).
// Files are the originals with empty margins trimmed; `plate` matches each logo's own background
// (SentinelOne's white wordmark sits on a dark plate), so no logo is recoloured or filtered. `ratio` is width / height of the file.
// Netskope and Palo Alto Networks are the unmodified SVGs from each company's own website.
export const PARTNERS: PartnerLogo[] = [
  { name: 'SentinelOne', logo: new URL('./assets/partners/sentinelone.png', import.meta.url).href, plate: '#111418', ratio: 5.71 },
  { name: 'Fortinet', logo: new URL('./assets/partners/fortinet.png', import.meta.url).href, plate: '#ffffff', ratio: 7.50 },
  { name: 'Cloudflare', logo: new URL('./assets/partners/cloudflare.png', import.meta.url).href, plate: '#ffffff', ratio: 2.67 },
  { name: 'BluSapphire', logo: new URL('./assets/partners/blusapphire.png', import.meta.url).href, plate: '#050c19', ratio: 5.27 },
  { name: 'HPE', logo: new URL('./assets/partners/hpe.png', import.meta.url).href, plate: '#292d3a', ratio: 1.78 },
  { name: 'Zscaler', logo: new URL('./assets/partners/zscaler.png', import.meta.url).href, plate: '#ffffff', ratio: 4.62 },
  { name: 'GlobalSign', logo: new URL('./assets/partners/globalsign.png', import.meta.url).href, plate: '#ffffff', ratio: 4.66 },
  { name: 'Cato Networks', logo: new URL('./assets/partners/cato-networks.png', import.meta.url).href, plate: '#ffffff', ratio: 2.00 },
  { name: 'CyberArk', logo: new URL('./assets/partners/cyberark.png', import.meta.url).href, plate: '#ffffff', ratio: 5.00 },
  { name: 'Sequretek', logo: new URL('./assets/partners/sequretek.png', import.meta.url).href, plate: '#ffffff', ratio: 4.71 },
  { name: 'OPSWAT', logo: new URL('./assets/partners/opswat.png', import.meta.url).href, plate: '#050f22', ratio: 5.55 },
  { name: 'ZeroPort', logo: new URL('./assets/partners/zeroport.png', import.meta.url).href, plate: '#0d0d0d', ratio: 2.30 },
  { name: 'Netskope', logo: new URL('./assets/partners/netskope.svg', import.meta.url).href, plate: '#ffffff', ratio: 6.50 },
  { name: 'Palo Alto Networks', logo: new URL('./assets/partners/palo-alto-networks.svg', import.meta.url).href, plate: '#ffffff', ratio: 5.35 },
];

export const FOOTER_COLUMNS = [
  // Labels match the canonical service titles in constants.ts SERVICES
  { title: 'Services', links: [
    { label: 'Managed SOC', to: '/service/ai-soc' },
    { label: 'VAPT and Pentesting', to: '/service/web-app-pentest' },
    { label: 'Cloud Security', to: '/service/cloud-security' },
    { label: 'Secure Architecture and Network', to: '/service/secure-architecture' },
    { label: 'vCISO and GRC', to: '/service/vciso-services' },
    { label: 'All services', to: '/#services' },
  ] },
  { title: 'Industries', links: [
    { label: 'BFSI and capital markets', to: '/#industries' },
    { label: 'Pharma and healthcare', to: '/#industries' },
    { label: 'Manufacturing', to: '/#industries' },
    { label: 'Retail', to: '/#industries' },
  ] },
  { title: 'Products', links: [
    { label: 'CyShield Pro', product: 'cyshield' as const, to: '/#platform' },
    { label: 'CYnapptics', product: 'cynapptics' as const, to: '/#platform-cynapptics' },
  ] },
  { title: 'Company', links: [
    { label: 'About CYFY', to: '/about' },
    { label: 'Customer stories', to: '/#customers' },
    { label: 'Partners', to: '/#partners' },
    { label: 'Events', to: '/events' },
    { label: 'Contact', to: '/about#contact' },
  ] },
];
