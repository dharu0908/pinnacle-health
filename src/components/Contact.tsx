import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Compass } from 'lucide-react';
import { OFFICE_HOURS } from '../data';

interface ContactProps {
  onScrollTo: (elementId: string) => void;
}

export default function Contact({ onScrollTo }: ContactProps) {
  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 22, stiffness: 80, duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sage-dark mb-3">
            <span>Find Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-forest leading-tight">
            Contact &amp; <span className="font-serif italic text-sage-dark">location</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Map Column - Left (Clipped beautiful vector) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={scrollRevealVariants}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="w-full aspect-[4/3] rounded-md bg-gradient-to-br from-cream-dark via-sage-light/60 to-sage relative overflow-hidden flex flex-col items-center justify-center border border-cream-dark shadow-sm">
              
              {/* Modern locator overlay */}
              <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-forest/10" />
              
              {/* Interactive Radar Ring */}
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-sage-dark/25 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-sage rounded-full animate-pulse opacity-60" />
                <div className="relative w-12 h-12 bg-forest rounded-full flex items-center justify-center text-cream shadow-md border-2 border-white z-10">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <div className="absolute bottom-6 bg-white/95 backdrop-blur-xs border border-cream-dark px-4 py-2 rounded-sm text-xs font-semibold text-forest uppercase tracking-wider shadow-sm flex items-center gap-1.5 z-10">
                <Compass className="w-3.5 h-3.5 text-sage-dark animate-spin-slow" />
                Windsor, Ontario, Canada
              </div>
            </div>

            <p className="text-xs text-text-soft/80 mt-4 leading-relaxed font-light">
              Conveniently located in Windsor, Ontario. Serving patients across Windsor–Essex County and virtually throughout Ontario.
            </p>
          </motion.div>

          {/* Details Column - Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={scrollRevealVariants}
            className="lg:col-span-7 space-y-6"
          >
            {/* Info lists */}
            <div className="space-y-4">
              
              {/* Item: Location */}
              <div className="flex gap-4 py-3 border-b border-cream-dark/60">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0 text-sage-dark">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-sage-dark mb-1">
                    Location
                  </h4>
                  <p className="text-sm text-text font-light leading-normal">
                    Windsor, Ontario, Canada<br />
                    <span className="text-xs text-text-soft">Exact clinical address provided upon booking</span>
                  </p>
                </div>
              </div>

              {/* Item: Phone */}
              <div className="flex gap-4 py-3 border-b border-cream-dark/60">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0 text-sage-dark">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-sage-dark mb-1">
                    Phone / WhatsApp
                  </h4>
                  <p className="text-sm text-text font-medium leading-normal">
                    <a href="tel:+19053254707" className="hover:text-sage transition-colors">
                      +1 (905) 325-4707
                    </a>
                  </p>
                </div>
              </div>

              {/* Item: Email */}
              <div className="flex gap-4 py-3 border-b border-cream-dark/60">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0 text-sage-dark">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-sage-dark mb-1">
                    Email
                  </h4>
                  <p className="text-sm text-text font-medium leading-normal">
                    <a href="mailto:info@pinnaclehealthwellness.ca" className="hover:text-sage transition-colors">
                      info@pinnaclehealthwellness.ca
                    </a>
                  </p>
                </div>
              </div>

              /* {/* Item: Hours */}
              <div className="flex gap-4 py-3">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0 text-sage-dark">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="w-full">
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-sage-dark mb-2">
                    Office Hours
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 max-w-md">
                    {OFFICE_HOURS.map((oh, i) => (
                      <div key={i} className="flex justify-between items-center text-xs py-0.5 border-b border-cream-dark/20 sm:border-none">
                        <span className="text-text-soft font-light">{oh.day}</span>
                        <span className="text-forest font-medium">{oh.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */

            </div>

            {/* Bottom CTA */}
            <div className="pt-2">
              <button
                onClick={() => onScrollTo('book')}
                className="w-full sm:w-auto px-10 py-4 bg-forest hover:bg-sage-dark text-cream text-xs font-semibold tracking-widest uppercase rounded-sm shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
              >
                Book an Appointment
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
