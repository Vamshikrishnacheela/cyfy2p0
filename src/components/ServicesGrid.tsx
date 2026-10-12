import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div 
            key={service.slug}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ y: -5, borderColor: 'rgba(0, 149, 175, 0.4)' }}
            className="group"
          >
            <Link 
              to={`/service/${service.slug}`}
              className="service-card-immersive p-8 rounded-2xl flex flex-col items-start bg-glass-bg border-border-base transition-colors cursor-pointer block h-full overflow-hidden"
            >
              <div className="w-12 h-12 mb-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-text-base group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              {/* Plain English Toggle/Toggle Effect */}
              <div className="relative overflow-hidden h-24 mb-4">
                <p className="text-sm text-text-muted leading-relaxed absolute inset-0 transition-all duration-500 group-hover:-translate-y-full opacity-100 group-hover:opacity-0">
                  {service.description}
                </p>
                <p className="text-sm text-primary italic leading-relaxed absolute inset-0 translate-y-full transition-all duration-500 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  <span className="font-bold uppercase tracking-widest text-[8px] block mb-1">In Plain English:</span>
                  {service.plainEnglish}
                </p>
              </div>
              <div className="mt-8 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Discover Details</span>
                <div className="w-6 h-px bg-primary/30 flex-grow mx-4"></div>
                <ChevronRight className="w-4 h-4 text-primary" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}


