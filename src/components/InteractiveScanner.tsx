import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Search, Loader2, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function InteractiveScanner() {
  const [query, setQuery] = useState('');
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<null | 'safe' | 'at-risk'>(null);

  const steps = [
    "Initializing CYFY Neural Scan...",
    "Tracing Digital Footprint...",
    "Analyzing Public Records for Data Leaks...",
    "Checking Credential Integrity...",
    "Finalizing Security Appraisal..."
  ];

  const handleScan = (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setScanning(true);
    setResults(null);
    setStep(0);
  };

  useEffect(() => {
    if (scanning && step < steps.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (scanning && step === steps.length) {
       setScanning(false);
       setResults(query.includes('@') ? 'at-risk' : 'safe');
    }
  }, [scanning, step, query]);

  return (
    <section id="interactive-tool" className="py-24 border-b border-border-base bg-bg-base relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-text-base mb-8 tracking-tighter"
            >
              Test Your <br />
              <span className="text-primary">Defensive Posture</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-muted text-lg leading-relaxed mb-10"
            >
              Curious how a hacker sees you? Enter your domain or professional email for a simulation of our AI's reconnaissance process.
            </motion.p>
            
            <form onSubmit={handleScan} className="relative max-w-lg">
               <input 
                 type="text" 
                 placeholder="Enter Domain or Email (e.g. acme.com)" 
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 className="w-full bg-white/[0.03] border border-border-base rounded-2xl py-6 pl-14 pr-32 text-text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
               />
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
               <button 
                type="submit"
                disabled={scanning}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
               >
                 {scanning ? 'Analyzing...' : 'Scan Now'}
               </button>
            </form>

            <p className="mt-6 text-[10px] text-gray-600 uppercase tracking-widest leading-loose">
              * This is a non-invasive educational simulation. No actual attacks are performed. <br />
              Securely powered by the CYFY.ai Experimental Lab.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square glass rounded-[2.5rem] border border-border-base overflow-hidden flex items-center justify-center p-12">
               <AnimatePresence mode="wait">
                 {!scanning && !results && (
                   <motion.div 
                     key="idle"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.2 }}
                     className="text-center"
                   >
                     <div className="w-24 h-24 rounded-3xl bg-primary/5 flex items-center justify-center mx-auto mb-8 border border-primary/20">
                        <Shield className="w-12 h-12 text-primary opacity-50" />
                     </div>
                     <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Awaiting Command Input</p>
                   </motion.div>
                 )}

                 {scanning && (
                   <motion.div 
                     key="scanning"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="text-center w-full"
                   >
                     <div className="relative w-32 h-32 mx-auto mb-10">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                        ></motion.div>
                        <motion.div 
                          animate={{ rotate: -360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-4 border-2 border-secondary border-b-transparent rounded-full"
                        ></motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                     </div>
                     <p className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4">Real-time Analysis</p>
                     <p className="text-text-base text-lg font-bold tracking-tight h-8">{steps[step]}</p>
                     
                     <div className="mt-8 bg-white/5 h-1.5 rounded-full overflow-hidden max-w-[200px] mx-auto">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${(step / steps.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                     </div>
                   </motion.div>
                 )}

                 {results && (
                   <motion.div 
                     key="results"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-center w-full"
                   >
                     <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${results === 'safe' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'} border`}>
                        {results === 'safe' ? <CheckCircle2 className="w-12 h-12 text-emerald-500" /> : <ShieldAlert className="w-12 h-12 text-rose-500" />}
                     </div>
                     <h3 className={`text-2xl font-black mb-4 tracking-tight ${results === 'safe' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {results === 'safe' ? 'Low Surface Exposure' : 'Potential Threat Vectors'}
                     </h3>
                     <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        {results === 'safe' 
                          ? `Our reconnaissance of "${query}" shows limited public-facing vulnerabilities. Maintain standard protocols.` 
                          : `Alert: Multiple data points for "${query}" were detected in leaked databases. Critical patching recommended.`}
                     </p>
                     <button 
                       onClick={() => setResults(null)}
                       className="text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-70 transition-opacity"
                     >
                       ← Clear Appraisal
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
            
            {/* Background geometric accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 border border-border-base rounded-[4rem] rotate-12 opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
