import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, DollarSign, Video, MapPin, Heart } from 'lucide-react';

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  const trustItems = [
    { icon: <ShieldCheck className="w-4 h-4 text-sage" />, label: 'CHO Registered' },
    { icon: <DollarSign className="w-4 h-4 text-sage" />, label: 'Insurance Accepted' },
    { icon: <Video className="w-4 h-4 text-sage" />, label: 'In-Person & Virtual' },
    { icon: <MapPin className="w-4 h-4 text-sage" />, label: 'Windsor, ON' },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center relative overflow-hidden bg-cream pt-20"
    >
      {/* Decorative radial background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[65vw] h-[65vw] rounded-full bg-radial from-sage/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-radial from-gold/8 to-transparent blur-3xl" />
      </div>

      {/* Hero Left Content */}
      <div className="px-6 sm:px-12 lg:pl-24 lg:pr-12 py-12 lg:py-20 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-sage-dark mb-6"
          >
            <span className="w-7 h-[1px] bg-sage" />
            <span>Registered Homeopath · Windsor, Ontario</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] text-forest mb-6"
          >
            Healing rooted<br />
            in <span className="font-serif italic text-sage-dark relative">
              nature's wisdom
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-gold/20 -z-10" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base font-light text-text-soft leading-relaxed mb-10 max-w-md"
          >
            Personalized homeopathic care for your whole family. Gentle, natural remedies tailored to you — addressing the root cause, not just the symptoms.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-12"
          >
            <button
              onClick={() => onScrollTo('book')}
              className="group bg-forest hover:bg-sage-dark text-cream font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-sm shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onScrollTo('about')}
              className="bg-transparent hover:bg-sage hover:text-white text-forest border border-sage/65 font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-center"
            >
              Meet Pooja
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-x-6 gap-y-3 border-t border-forest/10 pt-8"
          >
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-[11px] font-medium tracking-wider text-forest/70 uppercase"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Right Visuals */}
      <div className="relative h-full min-h-[400px] lg:min-h-screen flex items-center justify-center overflow-hidden py-16 lg:py-0">
        {/* Background clipped shape */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-sage-light via-sage to-forest"
          style={{ clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />

        {/* Botanical soft overlays */}
        <div className="absolute inset-0 bg-radial-at-t from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-b from-gold-light/15 via-transparent to-transparent pointer-events-none" />

        {/* Decorative elements */}
        <span className="absolute top-[10%] right-[12%] text-white/10 text-9xl select-none pointer-events-none transform rotate-12">🌿</span>
        <span className="absolute bottom-[15%] left-[8%] text-white/10 text-7xl select-none pointer-events-none transform -rotate-45">🌱</span>

        {/* Floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
          className="relative z-10 max-w-[340px] bg-white/15 backdrop-blur-md border border-white/20 rounded-lg p-8 text-cream shadow-2xl mx-6"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl mb-5 shadow-inner">
            🌾
          </div>
          <h3 className="font-serif text-2xl font-light text-white mb-3">
            Your healing begins here
          </h3>
          <p className="text-xs sm:text-sm text-cream/90 font-light leading-relaxed mb-4">
            Every person is unique. Every treatment is tailored. Experience the art of classical homeopathy in the heart of Windsor, Ontario.
          </p>
          <div className="flex items-center gap-2 text-gold-light text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-gold-light" />
            <span>Gentle & Safe Remediation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
