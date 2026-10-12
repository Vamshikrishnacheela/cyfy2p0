import { motion } from 'motion/react';
import { PARTNERS } from '../constants';

export default function Partners() {
  return (
    <section className="py-12 border-y border-gray-100 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
          Trusted by Industry Leaders & Partners
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {PARTNERS.map((name) => (
            <motion.div 
              key={name}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="text-lg font-black tracking-tighter text-black/80"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
