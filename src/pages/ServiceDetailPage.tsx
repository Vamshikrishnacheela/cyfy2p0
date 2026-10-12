import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Shield, Zap, Target, BarChart3, Users } from 'lucide-react';
import { SERVICES } from '../constants';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Service Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24 px-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <Link 
          to="/#services" 
          className="inline-flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Service Hub
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <ServiceIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1 block">
                  {service.category} Excellence
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-base">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="text-xl text-text-muted mb-8 leading-relaxed font-medium">
              {service.description}
            </p>

            <div className="bg-glass-bg border border-border-base rounded-3xl p-8 mb-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="w-24 h-24" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                The Core Advantage
              </h3>
              <p className="text-text-base leading-relaxed italic text-lg pr-12">
                "{service.plainEnglish}"
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-text-base">
                  <Target className="w-5 h-5 text-primary" />
                  Key Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Continuous Vulnerability Assessment",
                    "Advanced Threat Intelligent Integration",
                    "Real-time Incident Response & Documentation",
                    "Regulatory Compliance Alignment (ISO/HIPAA)",
                    "Adversarial Simulation & Stress Testing",
                    "Comprehensive Executive Reporting"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-glass-bg border border-border-base hover:border-primary/30 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-text-muted font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visualization/Stat side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass rounded-[40px] p-10 border-border-base relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
               
               <h3 className="text-2xl font-bold mb-8 text-text-base flex items-center gap-3">
                 <BarChart3 className="w-6 h-6 text-primary" />
                 Engagement Metrics
               </h3>

               <div className="space-y-8 relative z-10">
                 {[
                   { label: "Threat Mitigation Speed", value: "99.9%", delay: 0.3 },
                   { label: "Operational Resilience", value: "24/7", delay: 0.4 },
                   { label: "Compliance Score Improvement", value: "+45%", delay: 0.5 }
                 ].map((stat, i) => (
                   <div key={i}>
                     <div className="flex justify-between items-end mb-2">
                       <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{stat.label}</span>
                       <span className="text-2xl font-black text-primary">{stat.value}</span>
                     </div>
                     <div className="w-full h-1 bg-black/5 dark:bg-white/10 light:bg-black/5 rounded-full overflow-hidden">
                       <motion.div
                         initial={{ width: 0 }}
                         whileInView={{ width: "100%" }}
                         transition={{ duration: 1.5, delay: stat.delay }}
                         className="h-full bg-primary"
                       />
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/20">
                 <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                     <Users className="w-6 h-6" />
                   </div>
                   <h4 className="font-bold text-text-base">Speak with an Expert</h4>
                 </div>
                 <p className="text-sm text-text-muted mb-6">
                   Ready to enhance your {service.title} capabilities? Our strategic team is standing by for a deep-dive consultation.
                 </p>
                 <button className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary/80 transition-all shadow-lg shadow-primary/20">
                   Request Strategic Briefing
                 </button>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/20 text-center">
                <p className="text-3xl font-black text-secondary mb-1">0.1s</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-text-muted">Latency Threshold</p>
              </div>
              <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                <p className="text-3xl font-black text-emerald-500 mb-1">ISO</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-text-muted">Compliant Method</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
