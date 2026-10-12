import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Loader2, Send } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to subscribe');
      // handleFirestoreError(error, 'create'); // This would throw and crash the UI, we handle it locally here
    }
  };

  return (
    <section className="py-24 bg-bg-base border-t border-border-base relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-black text-text-base mb-4 tracking-tight">Stay Ahead of the <br/><span className="text-primary italic font-serif">Threat Curve</span></h2>
          <p className="text-text-muted mb-10 text-lg">Receive exclusive cyber threat intelligence briefings directly from CYFY Labs.</p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 flex flex-col items-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
                <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Deployment Successful</h3>
                <p className="text-text-muted text-sm mt-2">You are now enrolled in the CYFY Intelligence Feed.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[10px] font-bold uppercase tracking-widest text-emerald-500/70 hover:text-emerald-500 transition-colors"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    required
                    placeholder="intelligence@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/[0.03] dark:bg-white/[0.03] light:bg-black/[0.04] border border-border-base rounded-xl py-4 px-6 text-text-base focus:outline-none focus:border-primary transition-all"
                  />
                  <Send className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Activate Briefing'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mt-4">
              Error: {errorMessage}
            </p>
          )}

          <p className="mt-8 text-[10px] text-text-muted uppercase tracking-widest">
            Stay informed with the latest cybersecurity insights from CYFY.{' '}
            <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-primary transition-colors">Privacy policy</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
