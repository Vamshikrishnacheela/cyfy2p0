import { Shield, Lock, Terminal, Globe, Cloud, Cpu, Users, Eye, Search, type LucideIcon } from 'lucide-react';

export const BRAND_NAME = "CYFY";
export const BRAND_TAGLINE = "Complexity is the Enemy of Cyber Security.";
export const MOTO = "Secure by design, Secure by Default.";

export const MISSION = "With over 20 Years of experience and expertise in Network, Cyber Security, and Digital Transformation in Pharmaceutical, BFSI, and ITES Verticals, we lead our mission to empower organizations with Secure, Scalable, regulatory-compliant, and future-ready solutions.";

export const VISION = "We aim to help small to large enterprises and Businesses to navigate the new reality of Cyber risks with proactive and intelligent cybersecurity platforms & e2e Managed Security Services with 100% adherence to regulatory and compliance requirements.";

/** Enquiry routing options for the contact form; each service maps onto one of these. */
export const ENQUIRY_INTERESTS = [
  { id: 'managed-soc', label: 'Managed SOC and security' },
  { id: 'assessment', label: 'VAPT and security testing' },
  { id: 'architecture', label: 'Cloud and network security' },
  { id: 'advisory', label: 'vCISO, GRC and consulting' },
  { id: 'other', label: 'Something else' },
] as const;
export type EnquiryInterest = typeof ENQUIRY_INTERESTS[number]['id'];
export const isEnquiryInterest = (v: string | null): v is EnquiryInterest => ENQUIRY_INTERESTS.some(i => i.id === v);

export const SERVICE_GROUPS = [
  { id: 'operations', label: 'Security Operations & Managed Security' },
  { id: 'assurance', label: 'Security Assurance & Offensive Security' },
  { id: 'infrastructure', label: 'Cloud, Network & Infrastructure Security' },
  { id: 'advisory', label: 'Advisory & Strategic Security' },
] as const;
export type ServiceGroupId = typeof SERVICE_GROUPS[number]['id'];

export interface Service {
  slug: string;
  /** Canonical name, used on the service page, navbar and footer */
  title: string;
  /** Other names this service appears under elsewhere on the site */
  aka?: string;
  description: string;
  plainEnglish: string;
  icon: LucideIcon;
  group: ServiceGroupId;
  /** Drawn only from existing CYFY copy (homeContent.ts, About page). Do not add unverified capabilities. */
  included: string[];
  cta: string;
  interest: EnquiryInterest;
}

export const SERVICES: Service[] = [
  {
    slug: "ai-soc",
    title: "Managed SOC",
    aka: "AI SOC",
    description: "24x7 AI SOC services for continuous monitoring, alerting and triaging, with L1 to L3 analysts investigating and escalating.",
    plainEnglish: "24/7 Digital Guards: AI-powered surveillance that monitors your systems like a global security team.",
    icon: Search,
    group: "operations",
    included: [
      "24/7 monitoring across multiple shifts from our in-house Hyderabad SOC",
      "Logs normalised in the SIEM and correlated against 1,000+ MITRE ATT&CK use cases",
      "L1 triage, L2 validation and L3 investigation, escalated to a SOC lead",
      "SOAR playbooks to contain threats, with a 30 minute mean time to respond on the GUARD++ tier",
      "Weekly threat advisory, a CISO dashboard and audit-ready records",
    ],
    cta: "Discuss Managed SOC",
    interest: "managed-soc",
  },
  {
    slug: "managed-security-services",
    title: "Managed Security Services",
    description: "24x7 AI-driven SOC services ensuring constant monitoring and rapid response to security incidents.",
    plainEnglish: "Full Protection: We manage all your security tools, so you don't have to worry about a thing.",
    icon: Shield,
    group: "operations",
    included: [
      "Your security tools managed for you: SIEM and SOAR, EDR and XDR, threat intelligence",
      "Round-the-clock detection, triage and response by L1 to L3 analysts",
      "One team and one SLA across NOC, SOC and GRC",
      "Platforms designed and run through our 30+ IT, network and security OEM partnerships",
    ],
    cta: "Discuss Managed Security",
    interest: "managed-soc",
  },
  {
    slug: "web-app-pentest",
    title: "VAPT and Pentesting",
    aka: "Web App Pentest",
    description: "Proactively identifying vulnerabilities that could jeopardize sensitive user and financial information.",
    plainEnglish: "The 'Ethical' Thief: We try to break into your website so we can find and fix the holes before the real thieves do.",
    icon: Terminal,
    group: "assurance",
    included: [
      "Web, mobile and network penetration testing",
      "VAPT on trading systems",
      "External attack surface review with CyShield Pro",
      "Gap assessment and VAPT ahead of the audit window",
    ],
    cta: "Request a Security Assessment",
    interest: "assessment",
  },
  {
    slug: "red-blue-teaming",
    title: "Red & Blue Teaming",
    description: "Holistic approach to testing and improving your organization's security posture through adversarial simulations.",
    plainEnglish: "Cyber War-Games: We simulate real-world attacks to train your defenses to be battle-ready.",
    icon: Eye,
    group: "assurance",
    included: [
      "Adversarial simulations of real-world attacks",
      "Testing and improving your security posture and your defenders' response",
    ],
    cta: "Request a Security Assessment",
    interest: "assessment",
  },
  {
    slug: "phishing-paas",
    title: "Phishing as a Service",
    aka: "PaaS",
    description: "Proactively test and enhance your organization's defenses against phishing attacks.",
    plainEnglish: "Employee Training: We send safe 'fake' trick emails to teach your team how to spot and report the real ones.",
    icon: Globe,
    group: "assurance",
    included: [
      "Safe, simulated phishing emails sent to your team",
      "Helps staff learn to spot and report real phishing attempts",
    ],
    cta: "Request a Security Assessment",
    interest: "assessment",
  },
  {
    slug: "cloud-security",
    title: "Cloud Security",
    description: "24/7 monitoring and rapid response to threats across your cloud environments.",
    plainEnglish: "Sky Shield: Ensuring that your data stored on the internet (the cloud) stays private and protected.",
    icon: Cloud,
    group: "infrastructure",
    included: [
      "24/7 monitoring and response across AWS, Azure and GCP",
      "CSPM, CNAPP, IAM, PAM and DLP, built with leading OEMs",
    ],
    cta: "Review Your Security Architecture",
    interest: "architecture",
  },
  {
    slug: "secure-architecture",
    title: "Secure Architecture and Network",
    aka: "Network and NOC",
    description: "Designing robust security frameworks for organizations' needs, and running the network as a service with 24/7 infrastructure monitoring.",
    plainEnglish: "Safe Blueprinting: Designing your company's computer systems to be secure from the ground up.",
    icon: Lock,
    group: "infrastructure",
    included: [
      "Network and security design, with platforms selected from 30+ OEM partners",
      "LAN, WAN and SD-WAN, NGFW and NAC, and micro-segmentation",
      "Designed and run on HPE Aruba, Juniper, Palo Alto Networks and Fortinet",
      "24/7 infrastructure monitoring and AIOps from our NOC",
      "IT/OT segmentation to IEC 62443 and secure remote access",
    ],
    cta: "Review Your Security Architecture",
    interest: "architecture",
  },
  {
    slug: "vciso-services",
    title: "vCISO and GRC",
    aka: "vCISO Services",
    description: "Expert guidance and strategic oversight to safeguard your business from cyber threats, with audit readiness maintained all year.",
    plainEnglish: "Your Security Chief: An expert security leader who coordinates your strategy without the full-time cost.",
    icon: Cpu,
    group: "advisory",
    included: [
      "A security leader who sets and coordinates your strategy without the full-time cost",
      "Audit readiness for SEBI CSCRF, ISO 27001 and ISO 42001",
      "Gap assessment and VAPT ahead of the audit window",
      "SEBI CSCRF-ready reporting, every week",
    ],
    cta: "Speak to a Security Consultant",
    interest: "advisory",
  },
  {
    slug: "security-consulting",
    title: "Security Consulting",
    description: "Expert guidance to enhance your security posture and address vulnerabilities in your organization.",
    plainEnglish: "Expert Advice: Professional security 'doctors' who diagnose your organization's digital health.",
    icon: Users,
    group: "advisory",
    included: [
      "Strategic guidance to align technical defences with business goals",
      "International standards: ISO 27001, ISO 42001, NIST and IEC 62443",
      "Data privacy: GDPR, DPDPA and PCI DSS",
      "Financial and insurance regulations: SEBI CSCRF, RBI and IRDAI",
    ],
    cta: "Speak to a Security Consultant",
    interest: "advisory",
  },
];

export const serviceBySlug = (slug: string | undefined) => SERVICES.find(s => s.slug === slug);

/** Link to the homepage enquiry form with the routing option preselected. */
export const enquiryHref = (interest: EnquiryInterest) => `/?interest=${interest}#contact`;

export const PARTNERS = [
  "SentinelOne", "Fortinet", "Cloudflare", "SiteWall", "Cloudwaze", "Zscaler", "Microsoft",
  "GlobalSign", "CATO Networks", "CyberArk", "SEQURETEK", "HPE", "Progist", "Checkpoint"
];

export const CONTACT_INFO = {
  email: "info@cyfy.ai",
  address: "3rd Floor, PSM Infra, near Kala Jyothi IT Park, Kondapur, Hyderabad 500084",
  phone: "+91 99668 84343",
  phoneHref: "tel:+919966884343",
};

export const TESTIMONIALS = [
  {
    quote: "CYFY's AI SOC transformed our security posture. We now have 24/7 visibility we never thought possible for our scale.",
    name: "Rajesh Kumar",
    role: "CISO",
    company: "Lumina Tech Pharma",
    image: "https://picsum.photos/seed/person1/100/100"
  },
  {
    quote: "The vCISO services provided by CYFY gave us top-tier strategic security leadership without the overhead of a full-time executive.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Nexus Finance",
    image: "https://picsum.photos/seed/person2/100/100"
  },
  {
    quote: "Their penetration testing revealed critical gaps we had missed for years. The remediation support was second to none.",
    name: "Michael Ross",
    role: "Head of Infrastructure",
    company: "IT Global Services",
    image: "https://picsum.photos/seed/person3/100/100"
  }
];
