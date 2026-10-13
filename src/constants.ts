import { Shield, Lock, Terminal, Globe, Cloud, Cpu, Users, Eye, Zap, Search } from 'lucide-react';

export const BRAND_NAME = "CYFY";
export const BRAND_TAGLINE = "Complexity is the Enemy of Cyber Security.";
export const MOTO = "Secure by design, Secure by Default.";

export const MISSION = "With over 20 Years of experience and expertise in Network, Cyber Security, and Digital Transformation in Pharmaceutical, BFSI, and ITES Verticals, we lead our mission to empower organizations with Secure, Scalable, regulatory-compliant, and future-ready solutions.";

export const VISION = "We aim to help small to large enterprises and Businesses to navigate the new reality of Cyber risks with proactive and intelligent cybersecurity platforms & e2e Managed Security Services with 100% adherence to regulatory and compliance requirements.";

export const SERVICES = [
  {
    slug: "ai-soc",
    title: "AI SOC",
    description: "24x7 AI SOC services for continuous monitoring, Alerting and Triaging.",
    plainEnglish: "24/7 Digital Guards: AI-powered surveillance that monitors your systems like a global security team.",
    icon: Search,
    category: "Monitoring"
  },
  {
    slug: "security-consulting",
    title: "Security Consulting",
    description: "Expert guidance to enhance your security posture and address vulnerabilities in your organization.",
    plainEnglish: "Expert Advice: Professional security 'doctors' who diagnose your organization's digital health.",
    icon: Users,
    category: "Consulting"
  },
  {
    slug: "managed-security-services",
    title: "Managed Security Services",
    description: "24x7 AI-driven SOC services ensuring constant monitoring and rapid response to security incidents.",
    plainEnglish: "Full Protection: We manage all your security tools, so you don't have to worry about a thing.",
    icon: Shield,
    category: "Managed"
  },
  {
    slug: "secure-architecture",
    title: "Secure Architecture",
    description: "Designing robust security frameworks for organizations' needs.",
    plainEnglish: "Safe Blueprinting: Designing your company's computer systems to be unhackable from the ground up.",
    icon: Lock,
    category: "Design"
  },
  {
    slug: "web-app-pentest",
    title: "Web App Pentest",
    description: "Proactively identifying vulnerabilities that could jeopardize sensitive user and financial information.",
    plainEnglish: "The 'Ethical' Thief: We try to break into your website so we can find and fix the holes before the real thieves do.",
    icon: Terminal,
    category: "Testing"
  },
  {
    slug: "cloud-security",
    title: "Cloud Security",
    description: "24/7 monitoring and rapid response to threats across your cloud environments.",
    plainEnglish: "Sky Shield: Ensuring that your data stored on the internet (the cloud) stays private and protected.",
    icon: Cloud,
    category: "Cloud"
  },
  {
    slug: "red-blue-teaming",
    title: "Red & Blue Teaming",
    description: "Holistic approach to testing and improving your organization's security posture through adversarial simulations.",
    plainEnglish: "Cyber War-Games: We simulate real-world attacks to train your defenses to be battle-ready.",
    icon: Eye,
    category: "Testing"
  },
  {
    slug: "phishing-paas",
    title: "Phishing as a Service (PaaS)",
    description: "Proactively test and enhance your organization's defenses against phishing attacks.",
    plainEnglish: "Employee Training: We send safe 'fake' trick emails to teach your team how to spot and report the real ones.",
    icon: Globe,
    category: "Human"
  },
  {
    slug: "vciso-services",
    title: "vCISO Services",
    description: "Expert guidance and strategic oversight to safeguard your business from cyber threats.",
    plainEnglish: "Your Security Chief: An expert security leader who coordinates your strategy without the full-time cost.",
    icon: Cpu,
    category: "Executive"
  }
];

export const PARTNERS = [
  "SentinelOne", "Fortinet", "Cloudflare", "SiteWall", "Cloudwaze", "Zscaler", "Microsoft",
  "GlobalSign", "CATO Networks", "CyberArk", "SEQURETEK", "HPE", "Progist", "Checkpoint"
];

export const CONTACT_INFO = {
  email: "info@cyfy.ai",
  address: "3rd Floor, PSM Infra, near Kala Jyothi IT Park, Kondapur, Hyderabad 500084",
  phone: "+91 99668 84343",
};

export const BLOG_POSTS = [
  {
    id: 1,
    title: "The Rise of AI-Driven Cyber Threats in 2026",
    excerpt: "How hackers are using LLMs to craft more sophisticated phishing attacks and what you can do to stay ahead.",
    date: "April 15, 2026",
    author: "CYFY Labs",
    category: "Threat Intelligence",
    image: "https://picsum.photos/seed/cyber1/800/400",
    featured: true,
    readCount: 1250
  },
  {
    id: 2,
    title: "Zero Trust: More Than Just a Buzzword",
    excerpt: "Implementing a true Zero Trust architecture requires a shift in mindset. Here's our step-by-step guide.",
    date: "April 10, 2026",
    author: "SecOps Team",
    category: "Security Strategy",
    image: "https://picsum.photos/seed/cyber2/800/400",
    featured: false,
    readCount: 3400
  },
  {
    id: 3,
    title: "Protecting Cloud Workloads at Scale",
    excerpt: "Cloud-native security challenges and the best practices for securing multi-cloud environments.",
    date: "April 5, 2026",
    author: "Cloud Experts",
    category: "Cloud Security",
    image: "https://picsum.photos/seed/cyber3/800/400",
    featured: true,
    readCount: 890
  },
  {
    id: 4,
    title: "Compliance in the Age of Digital Sovereignty",
    excerpt: "Understanding the evolving landscape of global data protection regulations and how to remain compliant.",
    date: "March 28, 2026",
    author: "Legal Defense",
    category: "Compliance",
    image: "https://picsum.photos/seed/cyber4/800/400",
    featured: false,
    readCount: 2100
  },
  {
    id: 5,
    title: "The Human Element: Social Engineering in 2026",
    excerpt: "Why humans remain the weakest link and how to build a culture of security awareness.",
    date: "March 20, 2026",
    author: "Human Risk Team",
    category: "Human Risk",
    image: "https://picsum.photos/seed/cyber5/800/400",
    featured: false,
    readCount: 1560
  }
];

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
