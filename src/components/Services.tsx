import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, PhoneCall, HelpCircle, Sparkles } from 'lucide-react';
import { SPECIALIZATIONS } from '../data';

interface ServicesProps {
  onScrollTo: (elementId: string) => void;
}

export default function Services({ onScrollTo }: ServicesProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conditions based on search query
  const filteredSpecializations = SPECIALIZATIONS.map((spec) => {
    const matchedConditions = spec.conditions.filter((cond) =>
      cond.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const titleMatches = spec.title.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatches = spec.description.toLowerCase().includes(searchQuery.toLowerCase());

    return {
      ...spec,
      isMatch: titleMatches || descMatches || matchedConditions.length > 0,
      matchedConditions, // used to highlight search results
    };
  });

  const hasMatches = filteredSpecializations.some((spec) => spec.isMatch);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        damping: 18,
        stiffness: 90,
      },
    }),
  };

  return (
    <section id="services" className="py-24 bg-cream relative">
      {/* Top subtle line separation */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sage-light/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sage-dark mb-3">
            <span>What I Treat</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-forest leading-tight mb-4">
            Conditions &amp; <span className="font-serif italic text-sage-dark">specializations</span>
          </h2>
          <p className="text-sm sm:text-base font-light text-text-soft leading-relaxed">
            Homeopathy addresses a wide spectrum of acute and chronic conditions by analyzing the individual patient profile. Here are the areas I specialize in:
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search health concerns (e.g., eczema, anxiety, kids)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-cream-dark rounded-full text-sm placeholder-text-soft/60 focus:outline-hidden focus:border-sage focus:ring-3 focus:ring-sage/10 transition-all shadow-xs"
            />
            <Search className="w-5 h-5 text-text-soft/50 absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-sage hover:text-sage-dark uppercase tracking-widest cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-[11px] text-sage-dark font-medium uppercase tracking-wider mt-3">
              {hasMatches ? 'Showing matched categories' : 'No exact matches found'}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSpecializations
              .filter((spec) => !searchQuery || spec.isMatch)
              .map((spec, index) => {
                const isSearching = searchQuery.length > 0;
                return (
                  <motion.div
                    key={spec.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    layout
                    className="bg-white border border-cream-dark/60 rounded-md p-8 relative overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Sage indicator line */}
                    <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-sage-light to-sage-dark transition-all duration-500 group-hover:h-full" />

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-cream/70 group-hover:bg-sage/10 rounded-full flex items-center justify-center text-xl transition-colors duration-300">
                        {spec.icon}
                      </div>
                      <h3 className="font-serif text-xl font-medium text-forest group-hover:text-sage-dark transition-colors duration-300">
                        {spec.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm font-light text-text-soft leading-relaxed mb-6">
                      {spec.description}
                    </p>

                    {/* Conditions */}
                    <div>
                      <h4 className="text-[10px] font-semibold tracking-wider text-forest/70 uppercase mb-3">
                        Treated Symptoms &amp; Concerns:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {spec.conditions.map((cond, i) => {
                          const isHighlighted =
                            isSearching &&
                            cond.toLowerCase().includes(searchQuery.toLowerCase());
                          return (
                            <span
                              key={i}
                              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-300 ${
                                isHighlighted
                                  ? 'bg-gold/25 border-gold text-forest font-medium scale-105 shadow-xs'
                                  : 'bg-cream/50 border-cream-dark/50 text-text-soft'
                              }`}
                            >
                              {cond}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Footer info link */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-xs sm:text-sm text-text-soft max-w-lg mx-auto leading-relaxed"
        >
          Don't see your specific symptom or condition listed above? Homeopathy is an individual treatment that addresses hundreds of other ailments.{' '}
          <button
            onClick={() => onScrollTo('book')}
            className="text-sage-dark hover:text-forest underline font-medium cursor-pointer"
          >
            Book a free discovery call
          </button>{' '}
          to discuss your needs directly with Pooja.
        </motion.p>
      </div>
    </section>
  );
}
