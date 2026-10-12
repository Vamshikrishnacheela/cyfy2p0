import { useState, type FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowRight, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { db } from '../../lib/firebase';
import { CONTACT_INFO as CONTACT } from '../../constants';

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
    <section id="contact" className="scene scene-glow py-20 md:py-28">
      <div className="shell">
        <div className="band relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 md:py-20 text-center">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[36rem] max-w-full rounded-full bg-secondary/15 blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">See what attackers see. <span className="text-secondary">Free.</span></h2>
            <p className="mt-4 text-band-muted leading-relaxed">
              We map your domains, IPs, certificates and email posture, and our SOC team walks you through what we find.
            </p>

            {status === 'success' ? (
              <div className="mt-10 inline-flex flex-col items-center gap-2 rounded-2xl border border-band-border bg-band-surface px-8 py-6" role="status">
                <CheckCircle2 className="w-8 h-8 text-[#3ecf8e]" aria-hidden="true" />
                <p className="font-semibold">Request received.</p>
                <p className="text-sm text-band-muted">Our SOC team will email your snapshot to {email}.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-10 grid sm:grid-cols-[1fr_1fr_auto] gap-3 text-left" noValidate aria-busy={status === 'submitting'}>
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
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-[#1a1206] shadow-lg shadow-secondary/20 hover:brightness-105 disabled:opacity-70 transition"
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
            {status !== 'success' && <p className="mt-3 text-left sm:text-center text-xs text-band-muted">We only use your email to send the snapshot.</p>}

            <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-secondary" aria-hidden="true" />
              Or talk to your security expert:
              <a href={CONTACT.phoneHref} className="font-semibold hover:text-secondary transition-colors">{CONTACT.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
