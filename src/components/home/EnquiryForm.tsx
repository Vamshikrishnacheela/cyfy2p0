import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { CONTACT_INFO as CONTACT, ENQUIRY_INTERESTS, isEnquiryInterest, type EnquiryInterest } from '../../constants';

// Keep these in sync with the `enquiries` rule in firestore.rules
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const LIMITS = { name: 120, company: 160, email: 256, message: 2000 };
const SUBMIT_TIMEOUT_MS = 15000;
// Humans take longer than this to fill the form; faster submissions are treated as bots
const MIN_FILL_MS = 2500;

type Field = 'name' | 'email' | 'company';

export default function EnquiryForm() {
  const [params] = useSearchParams();
  const fromUrl = params.get('interest');
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' });
  const [interest, setInterest] = useState<EnquiryInterest>(isEnquiryInterest(fromUrl) ? fromUrl : 'managed-soc');
  const [website, setWebsite] = useState(''); // honeypot, hidden from people
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const startedAt = useRef(Date.now());

  // Service-page CTAs link here with ?interest=..., so follow later navigations too
  useEffect(() => { if (isEnquiryInterest(fromUrl)) setInterest(fromUrl); }, [fromUrl]);

  const set = (k: keyof typeof values) => (v: string) => setValues(prev => ({ ...prev, [k]: v }));

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) e.name = 'Enter your name';
    if (!EMAIL_RE.test(values.email.trim()) || values.email.trim().length > LIMITS.email) e.email = 'Enter a valid work email, like name@yourfirm.in';
    if (!values.company.trim()) e.company = 'Enter your company name';
    return e;
  };

  const mailtoFallback = () => {
    const label = ENQUIRY_INTERESTS.find(i => i.id === interest)?.label ?? interest;
    const body = `Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\nInterest: ${label}\n\n${values.message}`;
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${label}`)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === 'submitting') return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = (['name', 'email', 'company'] as Field[]).find(k => e[k]);
      document.getElementById(`enq-${first}`)?.focus();
      return;
    }
    // Bots fill the hidden field or submit instantly: show success without storing anything
    if (website || Date.now() - startedAt.current < MIN_FILL_MS) { setStatus('success'); return; }

    setStatus('submitting');
    try {
      await Promise.race([
        addDoc(collection(db, 'enquiries'), {
          name: values.name.trim().slice(0, LIMITS.name),
          email: values.email.trim(),
          company: values.company.trim().slice(0, LIMITS.company),
          interest,
          message: values.message.trim().slice(0, LIMITS.message),
          page: window.location.pathname.slice(0, 200),
          createdAt: serverTimestamp(),
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Enquiry submission timed out')), SUBMIT_TIMEOUT_MS)),
      ]);
      setStatus('success');
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setStatus('error');
    }
  };

  const inputCls = 'w-full rounded-lg border border-band-border bg-black/20 px-3.5 py-3 text-sm text-band-text placeholder:text-band-muted/70 focus:outline-none focus:border-secondary transition-colors aria-[invalid=true]:border-secondary';
  const labelCls = 'mb-1.5 block text-xs font-medium';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-2 rounded-2xl border border-band-border bg-band-surface p-6" role="status">
        <CheckCircle2 className="w-8 h-8 text-[#3ecf8e]" aria-hidden="true" />
        <p className="font-semibold">Thank you, we have your enquiry.</p>
        <p className="text-sm text-band-muted">A CYFY security specialist will reply to {values.email || 'you'}. For anything urgent, call {CONTACT.phone}.</p>
      </div>
    );
  }

  const text = (id: Field, label: string, type: string, autoComplete: string, placeholder: string) => (
    <div>
      <label htmlFor={`enq-${id}`} className={labelCls}>{label} <span aria-hidden="true" className="text-secondary">*</span></label>
      <input
        id={`enq-${id}`} type={type} required autoComplete={autoComplete} placeholder={placeholder}
        maxLength={LIMITS[id]} value={values[id]} onChange={e => set(id)(e.target.value)}
        aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `enq-${id}-error` : undefined}
        className={inputCls}
      />
      {errors[id] && <p id={`enq-${id}-error`} className="mt-1.5 text-xs text-secondary">{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'} className="grid gap-4 text-left" aria-label="Enquiry form">
      <div className="grid sm:grid-cols-2 gap-4">
        {text('name', 'Name', 'text', 'name', 'Your name')}
        {text('email', 'Work email', 'email', 'email', 'name@yourfirm.in')}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {text('company', 'Company', 'text', 'organization', 'Your company')}
        <div>
          <label htmlFor="enq-interest" className={labelCls}>What do you need help with?</label>
          <select id="enq-interest" value={interest} onChange={e => setInterest(e.target.value as EnquiryInterest)} className={`${inputCls} [&>option]:text-[#142b3b]`}>
            {ENQUIRY_INTERESTS.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="enq-message" className={labelCls}>Message <span className="font-normal text-band-muted">(optional)</span></label>
        <textarea id="enq-message" rows={3} maxLength={LIMITS.message} value={values.message} onChange={e => set('message')(e.target.value)} placeholder="Your environment, timelines or audit deadlines" className={`${inputCls} resize-y`} />
      </div>
      {/* Honeypot: off-screen and skipped by keyboard and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="enq-website">Website</label>
        <input id="enq-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <p className="text-xs text-band-muted">We use these details only to reply to your enquiry.</p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-[#1a1206] shadow-lg shadow-secondary/20 hover:brightness-105 disabled:opacity-70 transition"
        >
          {status === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending</> : <>Talk to a Security Expert <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-sm text-secondary" role="alert">
          We couldn't send your enquiry just now.{' '}
          <a href={mailtoFallback()} className="font-semibold underline underline-offset-2">Send it by email instead</a>{' '}
          or call <a href={CONTACT.phoneHref} className="font-semibold underline underline-offset-2">{CONTACT.phone}</a>.
        </p>
      )}
    </form>
  );
}
