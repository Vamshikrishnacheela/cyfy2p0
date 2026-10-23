import { LegalLayout, LegalSection, Pending } from '../components/LegalLayout';

// Facts in "What this website collects" are taken from the current code, not from an approved policy:
// EnquiryForm.tsx (enquiries), LeadCta.tsx (leads), Newsletter.tsx (newsletter), ChatBot.tsx (Gemini),
// ThemeToggle.tsx (localStorage), index.html (Google Fonts). Update this list if those change.
const COLLECTED = [
  { what: 'Enquiry form', detail: 'Your name, work email, company, the area you need help with, any message you add and the page you sent it from, stored in Google Firebase Cloud Firestore together with the time of submission.' },
  { what: 'Exposure snapshot form', detail: 'Work email and company domain you enter on the homepage, stored in Google Firebase Cloud Firestore together with the time of submission.' },
  { what: 'Newsletter sign-up', detail: 'The email address you enter, stored in Google Firebase Cloud Firestore together with the time of sign-up.' },
  { what: 'AI assistant chat', detail: 'Messages you type into the chat assistant are sent to Google\'s Gemini API to generate a reply.' },
  { what: 'Theme preference', detail: 'Your light or dark theme choice is stored in your own browser (localStorage) and is not sent to CYFY.' },
  { what: 'Third-party content', detail: 'Fonts are loaded from Google Fonts. This provider receives standard request information such as your IP address.' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy policy" docTitle="Privacy policy | CYFY">
      <LegalSection title="What this website collects">
        <p>This is a factual summary of what the CYFY website currently does with information, prepared for legal review.</p>
        <dl className="mt-4 divide-y divide-border-base rounded-xl border border-border-base bg-surface">
          {COLLECTED.map(c => (
            <div key={c.what} className="p-4">
              <dt className="font-medium text-text-base">{c.what}</dt>
              <dd className="mt-1">{c.detail}</dd>
            </div>
          ))}
        </dl>
      </LegalSection>

      <LegalSection title="Why we use this information">
        <Pending what="Purposes and legal basis for processing each category above, to be approved by CYFY." />
      </LegalSection>

      <LegalSection title="How long we keep it">
        <Pending what="Retention periods for enquiries, leads, newsletter subscriptions and chat messages, to be approved by CYFY." />
      </LegalSection>

      <LegalSection title="Who we share it with">
        <Pending what="Processors and recipients (for example Google Firebase and Google Gemini) and any other sharing, to be approved by CYFY." />
      </LegalSection>

      <LegalSection title="Your rights and choices">
        <Pending what="Access, correction, deletion, unsubscribe and grievance procedures under applicable law (including India's DPDP Act, if applicable), to be approved by CYFY." />
      </LegalSection>

      <LegalSection title="How we protect it">
        <Pending what="Security measures statement, to be approved by CYFY." />
      </LegalSection>

      <LegalSection title="CYFY products and applications">
        <Pending what="Privacy terms for CYFY products and applications (such as cyshield, cynapptics and Cynapptics) are not covered by this website policy. Approved product privacy content has not been provided." />
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <Pending what="How and when this policy is updated, and its effective date, to be approved by CYFY." />
      </LegalSection>
    </LegalLayout>
  );
}
