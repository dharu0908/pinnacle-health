import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data';

export default function Process() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 90 },
    },
  };

  return (
    <section id="process" className="py-24 bg-forest text-white relative overflow-hidden">
      {/* Decorative vector overlay glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-radial from-sage-light/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-radial from-gold-light/6 to-transparent blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sage-light mb-3">
            <span>How It Works</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
            Your path to <span className="font-serif italic text-gold-light">healing</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connecting line (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[1.5px] bg-gradient-to-r from-transparent via-sage-light/25 to-transparent -z-1" />

          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              variants={cardVariants}
              className="text-center group"
            >
              {/* Step number button representation */}
              <div className="w-14 h-14 border border-sage-light/40 rounded-full flex items-center justify-center font-serif text-lg text-sage-light bg-sage/10 hover:bg-sage/20 hover:border-gold-light/50 transition-all duration-300 mx-auto mb-6 relative z-10 shadow-inner">
                {step.step}
              </div>

              <h4 className="font-serif text-lg font-medium text-white mb-3 group-hover:text-gold-light transition-colors duration-300">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-[220px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
