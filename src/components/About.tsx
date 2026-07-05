import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle } from 'lucide-react';

export default function About() {
  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 22, stiffness: 80, duration: 0.6 }
    }
  };

  const credentials = [
    'College of Homeopaths of Ontario',
    'Classical Homeopathy',
    'Pediatric Care',
    'Women\'s Health',
    'Virtual Consultations',
    'Windsor, Ontario'
  ];

  return (
    <section id="about" className="py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* About Visuals Left Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={scrollRevealVariants}
            className="lg:col-span-5 relative"
          >
            {/* Visual Photo Box representation */}
            <div className="w-full aspect-[4/5] bg-gradient-to-tr from-cream-dark via-sage-light to-sage rounded-md relative overflow-hidden shadow-xl border border-cream-dark">
              {/* Botanical pattern illustration/emoji */}
              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15 select-none">
                🌿
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/10 to-transparent" />
              
              {/* Overlay Quote */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-lg font-serif italic font-light leading-relaxed">
                "Healing is a journey — I walk it with you."
              </div>
            </div>

            {/* CHO Round Badge */}
            <div className="absolute -top-6 -right-6 bg-gold text-forest w-24 h-24 rounded-full flex flex-col items-center justify-center text-[10px] font-semibold uppercase tracking-wider shadow-lg border-2 border-warm-white text-center p-3">
              <Award className="w-5 h-5 text-forest/80 mb-1" />
              <span>CHO</span>
              <span className="text-[8px] tracking-normal font-light leading-none">Registered</span>
            </div>
          </motion.div>

          {/* About Text Content Right Side */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={scrollRevealVariants}
              className="flex flex-col"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sage-dark mb-3">
                <span className="w-5 h-[1px] bg-sage" />
                <span>About Pooja</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-light text-forest leading-tight mb-6">
                A holistic approach<br />
                to <span className="font-serif italic text-sage-dark">lifelong wellness</span>
              </h2>

              <div className="text-sm sm:text-base font-light text-text-soft leading-relaxed space-y-4 mb-8">
                <p>
                  Welcome. I'm <strong className="text-forest font-medium">Pooja Jani</strong>, a Registered Homeopath licensed with the College of Homeopaths of Ontario (CHO), serving families across Windsor and the surrounding region.
                </p>
                <p>
                  My practice is built on one core belief: <strong className="text-forest font-medium">the body has an innate capacity to heal itself</strong> when given the right support. Homeopathy works by strengthening that capacity — gently, safely, and without side effects.
                </p>
                <p>
                  I take time to understand you as a whole person. Our initial consultation goes beyond symptoms to understand your lifestyle, emotions, history, and constitution. The result is a deeply personalized care plan that honours your unique needs.
                </p>
                <p>
                  I see patients of all ages — from newborns and children to adults and seniors — and offer both in-person consultations in Windsor and virtual appointments for those across Ontario.
                </p>
              </div>

              {/* Tag grid */}
              <div className="flex flex-wrap gap-2.5">
                {credentials.map((cred, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-cream/80 border border-cream-dark px-3.5 py-2 rounded-sm text-xs text-forest/90 font-medium tracking-wide shadow-xs hover:border-sage/40 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
