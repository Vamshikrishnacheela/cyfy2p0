import {
  ClipboardCheck, Database, Eye, FileSearch, GraduationCap, Headset, LockKeyhole, MailWarning, Radar, Search, ShieldAlert, ShieldCheck, UserCog, UserX,
  type LucideIcon,
} from 'lucide-react';
import type { EnquiryInterest } from './constants';

/**
 * Content for the navbar's Under Attack? Services menu and its detail pages.
 *
 * Every item must trace to existing CYFY copy (homeContent.ts, constants.ts, About page) or carry a qualifier saying
 * what it depends on. Do not add guaranteed outcomes, response times or named EDR/XDR integrations here.
 * Items from the original brief that existing content does not support wait in solutionsPendingApproval.ts.
 */
export interface ThreatSection { title: string; icon: LucideIcon; items: string[] }

export interface Threat {
  slug: string;
  /** Short name used in the menu */
  label: string;
  /** One line under the name in the menu */
  summary: string;
  heading: string;
  intro: string;
  icon: LucideIcon;
  /** Menu link text */
  cta: string;
  /** Used in "Dealing with a suspected ... incident?" */
  incidentName: string;
  sections: ThreatSection[];
  /** Slugs from SERVICES in constants.ts */
  related: string[];
  interest: EnquiryInterest;
  /** Shown as a highlighted notice above the sections */
  notice?: { title: string; body: string };
}

/** The real Contact section on the About page (AboutPage.tsx). */
export const SECURITY_EXPERT_HREF = '/about#contact';

export const threatHref = (slug: string) => `/under-attack/${slug}`;

export const THREATS: Threat[] = [
  {
    slug: 'phishing',
    label: 'Phishing',
    summary: 'Suspicious emails, malicious links and stolen credentials.',
    heading: 'Phishing Attack Response',
    intro: 'Phishing attacks target employees through fraudulent emails, malicious links, impersonation and credential-stealing websites. CYFY helps organizations identify suspicious activity, investigate potential compromises and strengthen their defenses against phishing threats.',
    icon: MailWarning,
    cta: 'Explore Phishing Protection',
    incidentName: 'phishing',
    interest: 'managed-soc',
    related: ['phishing-paas', 'ai-soc', 'security-consulting'],
    sections: [
      {
        title: 'Phishing Detection', icon: Radar,
        items: [
          'Identify suspicious email activity and phishing indicators where email logs or alerts are in scope.',
          'Review suspicious links, attachments and impersonation attempts reported by your team or flagged by your security tools.',
          'Monitor relevant email and security alerts through available security monitoring platforms.',
          'Identify suspicious authentication activity and potentially compromised accounts.',
        ],
      },
      {
        title: 'Investigation and Analysis', icon: FileSearch,
        items: [
          'Examine suspicious email headers, sender details, URLs and attachments.',
          'Investigate potentially compromised user accounts and credentials.',
          'Correlate email, endpoint, identity and network alerts where telemetry is available.',
          'Determine the potential scope and severity of an incident.',
        ],
      },
      {
        title: 'Containment and Response', icon: ShieldAlert,
        items: [
          'Recommend password resets and account protection measures.',
          'Coordinate endpoint isolation and other containment actions where authorized.',
          'Escalate confirmed incidents through the agreed incident response process.',
        ],
      },
      {
        title: 'Prevention and Awareness', icon: GraduationCap,
        items: [
          'Phishing as a Service: safe, simulated phishing emails that help staff learn to spot and report real attempts.',
          'Security awareness recommendations.',
          'Review of externally visible TLS, email and DNS hygiene with CyShield Pro.',
          'Recommendations to strengthen authentication and access controls.',
        ],
      },
    ],
  },
  {
    slug: 'ransomware',
    label: 'Ransomware',
    summary: 'Suspicious encryption activity, containment and preparedness.',
    heading: 'Ransomware Detection and Incident Response',
    intro: 'Ransomware can disrupt critical business operations, encrypt valuable information and expose sensitive organizational data. CYFY helps organizations strengthen ransomware preparedness, identify suspicious activity and coordinate security incident response.',
    icon: LockKeyhole,
    cta: 'Explore Ransomware Protection',
    incidentName: 'ransomware',
    interest: 'managed-soc',
    related: ['ai-soc', 'managed-security-services', 'web-app-pentest'],
    sections: [
      {
        title: 'Early Detection', icon: Radar,
        items: [
          'Identify suspicious file activity and potential encryption behavior where endpoint telemetry is available.',
          'Monitor unusual endpoint and server activities.',
          'Detect suspicious authentication and privilege escalation events.',
          'Correlate SIEM alerts with available endpoint and network telemetry.',
          'Identify indicators of compromise and suspicious communication patterns.',
        ],
      },
      {
        title: 'Threat Investigation', icon: Search,
        items: [
          'Investigate potentially compromised endpoints and servers.',
          'Identify affected assets and assess the scope of suspicious activity.',
          'Analyze available logs and security alerts.',
          'Investigate possible initial access and lateral movement.',
          'Assess potential business impact and incident severity.',
        ],
      },
      {
        title: 'Containment and Incident Response', icon: ShieldAlert,
        items: [
          'Coordinate endpoint isolation where supported and authorized.',
          'Escalate critical incidents to the appropriate stakeholders.',
          'Support containment and remediation activities.',
          'Coordinate with infrastructure and IT teams during recovery.',
          'Assist with post-incident investigation and reporting.',
        ],
      },
      {
        title: 'Ransomware Preparedness', icon: ShieldCheck,
        items: [
          'Assess existing security controls and potential exposure.',
          'Recommend endpoint protection and access-control improvements.',
          'Conduct vulnerability assessments and security reviews.',
          'Provide incident response recommendations through security consulting.',
        ],
      },
    ],
  },
  {
    slug: 'insider-threat',
    label: 'Insider Threat',
    summary: 'Unusual access, account misuse and sensitive data movement.',
    heading: 'Insider Threat Detection and Monitoring',
    intro: 'Insider threats can originate from compromised accounts, malicious employees or accidental misuse of organizational access. CYFY helps organizations identify unusual activity, investigate potential misuse and strengthen identity, endpoint and data security controls.',
    icon: UserX,
    cta: 'Explore Insider Threat Protection',
    incidentName: 'insider threat',
    interest: 'managed-soc',
    related: ['ai-soc', 'cloud-security', 'security-consulting'],
    notice: {
      title: 'Monitoring with authorization',
      body: 'Monitoring and investigations take place only with customer authorization and within the agreed scope, and must respect privacy requirements and applicable laws. Findings go to the stakeholders you authorize.',
    },
    sections: [
      {
        title: 'User and Access Monitoring', icon: Eye,
        items: [
          'Identify unusual login patterns and suspicious authentication activity.',
          'Monitor relevant privilege and account changes.',
          'Detect unusual access to sensitive systems and resources.',
          'Identify suspicious access outside expected usage patterns.',
        ],
      },
      {
        title: 'Behavioral Analysis and Investigation', icon: UserCog,
        items: [
          'Correlate user, endpoint, network and identity events.',
          'Investigate unusual data-access activity.',
          'Identify suspicious file transfers and data movement where telemetry is available.',
          'Assess potentially compromised or misused accounts.',
          'Prioritize alerts based on severity and business context.',
        ],
      },
      {
        title: 'Data Protection', icon: Database,
        items: [
          'Use available Data Loss Prevention (DLP) capabilities to identify sensitive data exposure.',
          'Monitor relevant data access and transfer events.',
          'Recommend least-privilege access policies.',
          'Strengthen identity and access management controls.',
        ],
      },
      {
        title: 'Response and Governance', icon: ClipboardCheck,
        items: [
          'Escalate confirmed suspicious activity to authorized stakeholders.',
          'Coordinate account restrictions and access reviews.',
          'Support incident investigation with the logs and records in scope.',
          'Recommend improvements to security policies and access governance.',
          'Provide incident reports and remediation recommendations.',
        ],
      },
    ],
  },
];

export const threatBySlug = (slug: string | undefined) => THREATS.find(t => t.slug === slug);

export const SECURITY_EXPERT = {
  label: 'Talk to a Security Expert',
  summary: "Facing a cybersecurity incident or concerned about your organization's security? Connect with CYFY's security team to discuss your situation and identify the appropriate next steps.",
  icon: Headset,
  to: SECURITY_EXPERT_HREF,
};

/** What every engagement depends on. Shown on each detail page. */
export const THREAT_SCOPE = {
  points: [
    { title: 'Your telemetry', body: 'Detection and investigation cover the environments and log sources onboarded to monitoring.' },
    { title: 'Your authorization', body: 'Containment actions on your accounts, devices or network take place only where you have authorized them.' },
    { title: 'Your tools and engagement', body: 'Some actions rely on your own security tools or third-party integrations, or need a separate engagement.' },
  ],
  disclaimer: 'Results depend on your environment and when an incident is detected, so this page does not promise a particular outcome or response time. Service commitments are set out in your agreement with CYFY.',
};
