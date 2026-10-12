import { motion } from 'motion/react';
import { BookOpen, ShieldCheck, Fingerprint, MousePointer2, AlertCircle } from 'lucide-react';

export default function CyberLiteracy() {
  const securityLessons = [
    {
      title: "The MFA Shield",
      concept: "Multi-Factor Authentication",
      simple: "It's like having a physical lock AND a fingerprint scanner on your door. Even if someone steals your key, they can't get in without your finger.",
      tip: "Enable MFA on your email and banking apps today.",
      icon: Fingerprint
    },
    {
      title: "Phishing Hook",
      concept: "Social Engineering",
      simple: "Fraudsters pretend to be people you trust (like your boss or your bank) to trick you into giving them your 'keys'.",
      tip: "Never click links in emails that ask for urgent password resets.",
      icon: MousePointer2
    },
    {
      title: "The Update Guard",
      concept: "Patch Management",
      simple: "Software updates aren't just for new features; they are often 'repairs' for invisible holes in your digital walls.",
      tip: "Turn on 'Automatic Updates' for your phone and computer.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 bg-bg-base relative overflow-hidden border-b border-border-base">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-text-base mb-6 tracking-tight"
          >
            Security <span className="text-secondary italic font-serif">Simplified</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-2xl mx-auto text-lg"
          >
            Cybersecurity doesn't have to be technical. Understanding these three core ideas can protect you from 90% of modern digital threats.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityLessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl glass border border-border-base hover:border-secondary/30 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-bg-base flex items-center justify-center mb-6 border border-border-base group-hover:bg-secondary/10 group-hover:border-secondary/30 transition-colors">
                <lesson.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mb-2">{lesson.concept}</h3>
              <h4 className="text-xl font-bold text-text-base mb-4">{lesson.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed mb-6 italic">
                "{lesson.simple}"
              </p>
              <div className="pt-6 border-t border-border-base flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary leading-tight">Pro Tip: {lesson.tip}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="px-10 py-6 rounded-3xl bg-secondary/5 border border-secondary/20 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-8"
            >
                <div>
                   <h5 className="text-text-base font-bold text-xl mb-2">Want a personal security briefing?</h5>
                   <p className="text-text-muted text-sm">Download our 'Cyber Safety for Humans' guide (PDF) for more plain-English tips.</p>
                </div>
                <button className="bg-secondary text-black px-8 py-3 rounded font-black text-[10px] uppercase tracking-widest hover:bg-secondary/80 transition-colors shrink-0">
                    Get Free Guide
                </button>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
