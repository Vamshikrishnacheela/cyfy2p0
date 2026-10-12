import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-dark-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
              Request Your <br />
              <span className="text-secondary italic">Security Audit</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-md leading-relaxed text-lg">
              Connect with our security architects to evaluate your digital perimeter and infrastructure.
            </p>

            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Direct Access</span>
                <p className="text-lg font-medium">{CONTACT_INFO.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Global HQ</span>
                <p className="text-lg font-medium">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 md:p-12 text-black shadow-2xl relative">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Audit Requested</h3>
                  <p className="text-gray-500 text-sm">We've received your inquiry. A specialist will contact you shortly.</p>
                  <button 
                     onClick={() => setFormState('idle')}
                     className="mt-8 bg-black text-white px-8 py-3 rounded font-bold text-xs uppercase tracking-widest"
                  >
                    Go Back
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold mb-2">Secure Consultation</h3>
                  <p className="text-xs text-gray-400 mb-8 uppercase tracking-widest">Connect with our architects</p>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-100 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Corporate Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-100 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                      placeholder="john@company.ai" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Security Concern</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-gray-50 border border-gray-100 rounded px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none"
                      placeholder="How can we help?" 
                    />
                  </div>
                  <button 
                    disabled={formState === 'submitting'}
                    className="w-full bg-black text-white py-4 rounded font-bold text-xs uppercase tracking-widest transition-transform active:scale-[0.98] hover:bg-gray-900"
                  >
                    {formState === 'submitting' ? 'Processing...' : 'Request Audit'}
                  </button>
                  <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest">
                    Emails sent securely to {CONTACT_INFO.email}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

