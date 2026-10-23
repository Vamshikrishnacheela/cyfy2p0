import { useState, type FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { db } from '../../lib/firebase';
import { CONTACT_INFO as CONTACT } from '../../constants';
import EnquiryForm from './EnquiryForm';

// Keep these in sync with the `leads` rule in firestore.rules
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DOMAIN_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;
const SUBMIT_TIMEOUT_MS = 15000;

export default function LeadCta() {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');
  const [domainError, setDomainError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    const cleanEmail = email.trim();
    const cleanDomain = domain.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
    const badEmail = !EMAIL_RE.test(cleanEmail) || cleanEmail.length > 256;
    const badDomain = !DOMAIN_RE.test(cleanDomain) || cleanDomain.length > 253;
    setEmailError(badEmail ? 'Enter a valid work email, like name@yourfirm.in' : '');
    setDomainError(badDomain ? 'Enter a domain like yourfirm.in' : '');
    if (badEmail || badDomain) return;

    setStatus('submitting');
    try {
      // Firestore waits indefinitely when offline; fail visibly instead of spinning forever
      await Promise.race([
        addDoc(collection(db, 'leads'), {
          email: cleanEmail,
          domain: cleanDomain,
          source: 'exposure-snapshot',
          createdAt: serverTimestamp(),
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Lead submission timed out')), SUBMIT_TIMEOUT_MS)),
      ]);
      setEmail(cleanEmail);
      setStatus('success');
    } catch (err) {
      console.error('Lead submission failed:', err);
      setStatus('error');
    }
  };

  const inputCls = 'w-full rounded-lg border border-band-border bg-black/20 px-3.5 py-3 text-sm text-band-text placeholder:text-band-muted/70 focus:outline-none focus:border-secondary transition-colors';

  return (
    <section id="contact" aria-labelledby="contact-title" className="scene scene-glow py-20 md:py-28">
      <div className="shell">
        <div className="band relative overflow-hidden rounded-3xl px-5 py-12 sm:px-10 md:py-16">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[36rem] max-w-full rounded-full bg-secondary/15 blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-12">
            <div>
              <h2 id="contact-title" className="text-3xl md:text-[2.6rem] font-semibold tracking-tight leading-[1.1]">Discuss your security needs.</h2>
              <p className="mt-4 mb-8 text-band-muted leading-relaxed">
                Tell us what you need to protect, assess or prove. A CYFY security specialist will reply to discuss scope.
              </p>
              <EnquiryForm />
            </div>

            <div className="flex flex-col gap-5 lg:border-l lg:border-band-border lg:pl-12">
              <div className="rounded-2xl border border-band-border bg-band-surface p-5 sm:p-6">
                <h3 className="text-xl font-semibold tracking-tight">See what attackers see. <span className="text-secondary">Free.</span></h3>
                <p className="mt-2 text-sm text-band-muted leading-relaxed">
                  We map your domains, IPs, certificates and email posture, and our SOC team walks you through what we find.
                </p>

                {status === 'success' ? (
                  <div className="mt-6 flex flex-col items-start gap-2" role="status">
                    <CheckCircle2 className="w-7 h-7 text-[#3ecf8e]" aria-hidden="true" />
                    <p className="font-semibold">Request received.</p>
                    <p className="text-sm text-band-muted">Our SOC team will email your snapshot to {email}.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-6 grid gap-3 text-left" noValidate aria-busy={status === 'submitting'} aria-label="Free exposure snapshot">
                    <div>
                      <label htmlFor="lead-email" className="mb-1.5 block text-xs font-medium">Work email</label>
                      <input
                        id="lead-email" type="email" required autoComplete="email" placeholder="name@yourfirm.in" value={email}
                        onChange={e => setEmail(e.target.value)}
                        aria-invalid={!!emailError} aria-describedby={emailError ? 'lead-email-error' : undefined}
                        className={inputCls}
                      />
                      {emailError && <p id="lead-email-error" className="mt-1.5 text-xs text-secondary">{emailError}</p>}
                    </div>
                    <div>
                      <label htmlFor="lead-domain" className="mb-1.5 block text-xs font-medium">Company domain</label>
                      <input
                        id="lead-domain" type="text" required placeholder="yourfirm.in" value={domain}
                        onChange={e => setDomain(e.target.value)}
                        aria-invalid={!!domainError} aria-describedby={domainError ? 'lead-domain-error' : undefined}
                        className={inputCls}
                      />
                      {domainError && <p id="lead-domain-error" className="mt-1.5 text-xs text-secondary">{domainError}</p>}
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-[#1a1206] shadow-lg shadow-secondary/20 hover:brightness-105 disabled:opacity-70 transition"
                      >
                        {status === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending</> : <>Get my snapshot <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
                      </button>
                    </div>
                  </form>
                )}

                {status === 'error' && (
                  <p className="mt-4 text-sm text-secondary" role="alert">
                    We couldn't submit your request just now. Please email {CONTACT.email} or call {CONTACT.phone}.
                  </p>
                )}
                {status !== 'success' && <p className="mt-3 text-xs text-band-muted">We only use your email to send the snapshot.</p>}
              </div>

              <address className="not-italic rounded-2xl border border-band-border p-5 sm:p-6 space-y-3 text-sm">
                <p className="font-semibold">Prefer to reach us directly?</p>
                <p className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className="hover:text-secondary transition-colors">{CONTACT.email}</a></p>
                <p className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" /><a href={CONTACT.phoneHref} className="hover:text-secondary transition-colors">{CONTACT.phone}</a></p>
                <p className="flex gap-2.5 text-band-muted"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" />{CONTACT.address}</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
