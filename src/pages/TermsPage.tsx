import { LegalLayout, LegalSection, Pending } from '../components/LegalLayout';

const SECTIONS = [
  { title: 'Acceptance of these terms', what: 'Terms under which visitors may use the CYFY website.' },
  { title: 'Use of the website', what: 'Permitted and prohibited uses of the website, including the AI assistant and the exposure snapshot form.' },
  { title: 'Intellectual property', what: 'Ownership of website content, the CYFY name and logo, and product names.' },
  { title: 'Information on this website', what: 'Status of sample data, case studies and threat intelligence shown on the website.' },
  { title: 'Third-party links and services', what: 'Responsibility for third-party websites and services referenced on the website.' },
  { title: 'Disclaimers and limitation of liability', what: 'Warranty disclaimers and liability limits.' },
  { title: 'Governing law', what: 'Governing law and jurisdiction.' },
  { title: 'Changes to these terms', what: 'How and when these terms are updated, and their effective date.' },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms" docTitle="Terms | CYFY">
      {SECTIONS.map(s => (
        <LegalSection key={s.title} title={s.title}>
          <Pending what={`${s.what} To be written or approved by CYFY.`} />
        </LegalSection>
      ))}
    </LegalLayout>
  );
}
