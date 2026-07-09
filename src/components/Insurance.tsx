import React from 'react';
import { motion } from 'motion/react';
import { Building2, CreditCard, FileText, Globe } from 'lucide-react';
import { INSURERS } from '../data';

export default function Insurance() {
  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 22, stiffness: 80, duration: 0.6 }
    }
  };

  const infoCards = [
    {
      icon: <Building2 className="w-5 h-5 text-sage" />,
      title: 'Health Spending Accounts (HSA)',
      description: 'Self-employed individuals and many employees can use their HSA to cover homeopathy consultation fees tax-free.'
    },
    {
      icon: <CreditCard className="w-5 h-5 text-sage" />,
      title: 'Flexible Payment',
      description: 'We accept credit cards, debit, e-transfer, and cash. Sliding scale fees may be available — just ask during your booking.'
    },
    {
      icon: <FileText className="w-5 h-5 text-sage" />,
      title: 'Official Receipts Provided',
      description: 'Detailed official receipts are issued after every visit, including my CHO registration number for insurance claims.'
    },
    {
      icon: <Globe className="w-5 h-5 text-sage" />,
      title: 'Virtual Appointments Available',
      description: 'Secure video consultations are available for patients across Ontario, with the same quality of care as in-person visits.'
    }
  ];

  return (
    <section id="insurance" className="py-24 bg-cream border-t border-cream-dark">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Insurance Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={scrollRevealVariants}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sage-dark mb-3">
              <span className="w-5 h-[1px] bg-sage" />
              <span>Coverage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-forest leading-tight mb-6">
              Insurance &amp; <span className="font-serif italic text-sage-dark">payment</span>
            </h2>

            <div className="text-sm sm:text-base font-light text-text-soft leading-relaxed space-y-4 mb-8">
              <p>
                Many extended health benefit plans cover homeopathy consultations. I am a Registered Homeopath with the College of Homeopaths of Ontario (CHO) and a member of the Ontario Homeopathic Medical Association (OHMA), making my services eligible for reimbursement through several major insurers.
              </p>
              <p>
                I encourage you to contact your insurance provider to ask whether your plan includes coverage for Registered Homeopaths. Many employer group benefit plans include paramedical and complementary medicine coverage.
              </p>
            </div>

            {/* Insurer tag cloud */}
            <h4 className="text-[10px] font-semibold tracking-wider text-forest/70 uppercase mb-4">
              Eligible Extended Benefit Providers:
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {INSURERS.map((insurer, i) => (
                <span
                  key={i}
                  className="bg-white border border-cream-dark/80 px-3.5 py-1.5 rounded-sm text-xs text-forest font-medium shadow-xs"
                >
                  {insurer}
                </span>
              ))}
            </div>
            
            <p className="text-[11px] text-text-soft italic">
              *Coverage varies by plan. Please verify directly with your insurer. Receipts for reimbursement are always provided.
            </p>
          </motion.div>

          {/* Insurance Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={scrollRevealVariants}
            className="grid grid-cols-1 gap-4"
          >
            {infoCards.map((card, i) => (
              <div
                key={i}
                className="bg-white border border-cream-dark/60 rounded-md p-5 flex gap-4 items-start shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 bg-cream/70 rounded-full flex items-center justify-center flex-shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-forest mb-1.5 uppercase tracking-wide">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-soft font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
