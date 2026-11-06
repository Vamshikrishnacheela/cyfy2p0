// DRAFT CONTENT, NOT LIVE. Nothing imports this file, so it is left out of the website and its bundle.
//
// These solution cards are written and ready, but existing CYFY content does not confirm that CYFY offers them.
// Once CYFY approves one, move its entry into the matching tab of CAPABILITY_TABS in homeContent.ts.
import {
  AppWindow, CloudCog, Fingerprint, KeyRound, Laptop, Mail, Monitor, RadioTower, Server, Share2, Signpost, Smartphone, Binary, Wifi,
} from 'lucide-react';
import type { Capability } from './homeContent';

export const PENDING_SOLUTIONS: Record<'network-infrastructure' | 'cybersecurity' | 'manage-security-services', Capability[]> = {
  'network-infrastructure': [
    {
      title: 'Enterprise Wireless Solutions', icon: Wifi,
      body: 'Enterprise Wi-Fi planned around how your sites and devices are actually used.',
      details: ['Wi-Fi design and deployment', 'Controller-based and controller-less access points', 'Site surveys, coverage optimisation and interference reduction', 'Support for mobile devices and IoT'],
    },
    {
      title: 'IP Address Management (IPAM)', icon: Binary,
      body: 'One managed record of the addresses and subnets across your network.',
      details: ['Centralised IP, DHCP and DNS management', 'IP tracking and subnet management', 'Network visibility, automation and resource optimisation'],
    },
    {
      title: 'Mobile Device Management (MDM)', icon: Smartphone,
      body: 'Consistent administration for company-owned and personal devices used for work.',
      details: ['Corporate and BYOD device management', 'Centralised visibility and administration', 'Security policy enforcement', 'Automated device-management workflows'],
    },
    {
      title: 'Data Center Infrastructure', icon: Server,
      body: 'Compute, storage and network foundations for modern data center workloads.',
      details: ['Scalable compute, storage and network infrastructure', 'Data center modernisation', 'Workload segmentation and micro-segmentation', 'Hybrid and multi-cloud support'],
    },
    {
      title: 'Private 5G', icon: RadioTower,
      body: 'Dedicated cellular connectivity for enterprise and industrial sites.',
      details: ['Dedicated enterprise connectivity', 'High-speed, low-latency networking', 'Industrial IoT connectivity', 'Network slicing and edge computing'],
    },
  ],
  cybersecurity: [
    {
      title: 'Hardware Security Module (HSM)', icon: KeyRound,
      body: 'Tamper-resistant hardware that safeguards your cryptographic keys.',
      details: ['Secure key generation and storage', 'Encryption-key lifecycle management', 'Support for digital payments, identity and data protection'],
    },
    {
      title: 'Endpoint Data Loss Prevention', icon: Laptop,
      body: 'Controls on how sensitive data is handled on user devices.',
      details: ['Data classification and monitoring on endpoints', 'Prevention of accidental or unauthorised leakage', 'Centralised data protection policies'],
    },
    {
      title: 'Virtual Desktop Infrastructure (VDI)', icon: Monitor,
      body: 'Centrally hosted desktops, so work and data stay under central control.',
      details: ['Secure virtual desktop environments', 'Centralised desktop and data management', 'Secure remote access', 'Scalable workspaces and business continuity'],
    },
  ],
  'manage-security-services': [
    {
      title: 'Zero Trust Network Access (ZTNA)', icon: Fingerprint, interest: 'architecture',
      body: 'Application access granted by identity and device, rather than network location.',
      details: ['Identity-based access control', 'Continuous verification of users and devices', 'Reduced exposure of internal resources'],
    },
    {
      title: 'Cloud Access Security Broker (CASB)', icon: CloudCog, interest: 'architecture',
      body: 'Visibility and policy control over the cloud applications your people use.',
      details: ['Visibility into cloud application usage', 'Access monitoring and policy enforcement', 'Prevention of unauthorised data sharing'],
    },
    {
      title: 'Remote Browser Isolation (RBI)', icon: AppWindow, interest: 'architecture',
      body: 'Risky web content runs away from the user’s device.',
      details: ['Isolation of potentially risky web content', 'Reduced exposure to browser-based threats', 'Session monitoring and activity visibility'],
    },
    {
      title: 'DNS Security', icon: Signpost, interest: 'architecture',
      body: 'Monitoring and protection for the DNS traffic your applications rely on.',
      details: ['DNS threat detection and monitoring', 'Protection against spoofing and cache poisoning', 'Threat intelligence and anomaly detection'],
    },
    {
      title: 'Content Delivery Network (CDN) Security', icon: Share2, interest: 'architecture',
      body: 'Distributed delivery that helps keep public-facing content fast and available.',
      details: ['Distributed content delivery and reduced latency', 'DDoS mitigation', 'SSL encryption and bot management'],
    },
    {
      title: 'Email Security', icon: Mail, interest: 'architecture',
      body: 'Filtering and protection for one of the most targeted channels in the enterprise.',
      details: ['Protection against phishing, malware and spam', 'Email filtering and threat detection', 'Email encryption and data protection'],
    },
  ],
};

// Not in PENDING_SOLUTIONS because the published WAF card covers only what CYFY's content confirms.
// API security, bot management and vulnerability scanning can be added to that card once approved.

// Items from the Under Attack? Services brief that existing CYFY content does not confirm.
// Once CYFY approves one, move it into the named section in underAttackContent.ts.
export const PENDING_THREAT_ITEMS = {
  phishing: {
    'Containment and Response': ['Coordinate isolation or removal of malicious emails where supported.'],
    'Prevention and Awareness': ['Email security configuration and policy assessments.'],
  },
  ransomware: {
    'Ransomware Preparedness': ['Review backup and recovery readiness.', 'Develop recovery procedures.'],
  },
  'insider-threat': {
    'Response and Governance': ['Support evidence preservation.'],
  },
};
