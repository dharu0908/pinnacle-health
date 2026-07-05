import React from 'react';
import { Leaf } from 'lucide-react';

interface FooterProps {
  onScrollTo: (elementId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Pooja', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Book Appointment', id: 'book' },
    { label: 'Insurance & Coverage', id: 'insurance' },
    { label: 'Contact', id: 'contact' },
  ];

  const specsLinks = [
    { label: 'Allergies & Skin', id: 'services' },
    { label: 'Women’s Health & Fertility', id: 'services' },
    { label: 'Pediatrics & Children', id: 'services' },
    { label: 'Anxiety, Stress & Sleep', id: 'services' },
  ];

  return (
    <footer className="bg-forest text-cream/70 py-16 border-t border-forest-dark/40 relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-12">
          
          {/* Column 1 - Brand */}
          <div className="md:col-span-6 flex flex-col space-y-4">
            <button
              onClick={() => onScrollTo('hero')}
              className="flex items-center gap-2 font-serif text-xl font-medium text-white hover:opacity-90 transition-opacity cursor-pointer text-left self-start"
            >
              <Leaf className="w-5 h-5 text-sage-light" />
              <span>
                Pinnacle <span className="text-sage-light font-light">Health & Wellness</span>
              </span>
            </button>
            <p className="text-xs sm:text-sm text-cream/60 leading-relaxed font-light max-w-sm">
              Pinnacle Health &amp; Wellness Clinic offers classical homeopathic care for the whole family. Serving Windsor, Ontario and virtually across the province with compassion, expertise, and commitment to your wellbeing.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onScrollTo(link.id)}
                    className="text-xs text-cream/60 hover:text-sage-light transition-colors cursor-pointer text-left font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Specializations */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-white mb-4">
              Specializations
            </h4>
            <ul className="space-y-2.5">
              {specsLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onScrollTo(link.id)}
                    className="text-xs text-cream/60 hover:text-sage-light transition-colors cursor-pointer text-left font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <hr className="border-cream/10 mb-8" />

        {/* Footer bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-cream/50">
          <p className="text-center sm:text-left font-light">
            © {currentYear} Pinnacle Health &amp; Wellness Clinic · Windsor, Ontario · All rights reserved.
          </p>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-light animate-pulse" />
            <span className="text-[10px] tracking-wider uppercase font-semibold text-cream/80">
              College of Homeopaths of Ontario Registered
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
