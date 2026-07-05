import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Leaf, Calendar } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (elementId: string) => void;
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'How It Works', id: 'process' },
    { label: 'Insurance', id: 'insurance' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileOpen(false);
    onScrollTo(id);
  };

  return (
    <>
      <nav
        id="mainNav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-md border-b border-cream-dark/30 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2 font-serif text-lg md:text-xl font-medium text-forest hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          <Leaf className="w-5 h-5 text-sage animate-pulse" />
          <span>
            Pinnacle <span className="text-sage font-light">Health & Wellness</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs font-medium tracking-widest text-forest/90 uppercase relative py-1 hover:text-sage transition-colors cursor-pointer group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sage transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('book')}
            className="flex items-center gap-2 bg-forest hover:bg-sage-dark text-cream text-xs font-medium tracking-wider uppercase px-5 py-2.5 rounded-sm shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Consultation
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden text-forest hover:text-sage transition-colors p-1 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-forest/40 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream p-8 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <span className="font-serif text-lg text-forest font-medium">
                    Pinnacle <span className="text-sage font-light">Wellness</span>
                  </span>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="text-forest hover:text-sage p-1 cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className="text-left font-serif text-2xl text-forest hover:text-sage-dark transition-colors py-1 cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleLinkClick('book')}
                  className="w-full text-center bg-forest hover:bg-sage-dark text-cream text-sm font-medium tracking-wider uppercase py-3.5 rounded-sm shadow-md transition-colors cursor-pointer"
                >
                  Book Appointment
                </button>
                <p className="text-center text-[10px] text-forest/50 tracking-wide uppercase mt-4">
                  Registered with College of Homeopaths of Ontario
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
