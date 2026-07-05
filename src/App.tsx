/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Insurance from './components/Insurance';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 76; // Accommodate height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-warm-white antialiased text-text selection:bg-sage/20 selection:text-forest">
      
      {/* Absolute high-end background noise texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-4 select-none mix-blend-overlay">
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03" />
        </svg>
      </div>

      {/* Navigation bar */}
      <Navbar onScrollTo={handleScrollToSection} />

      {/* Hero Header Banner */}
      <Hero onScrollTo={handleScrollToSection} />

      {/* Biography and credentials of Pooja */}
      <About />

      {/* Highly interactive specialization and conditions treated list */}
      <Services onScrollTo={handleScrollToSection} />

      {/* Healing steps flow pathway */}
      <Process />

      {/* Health spending coverage and extended benefit insurance listings */}
      <Insurance />

      {/* Patient booking and scheduled requests logger */}
      <Booking />

      {/* Contact information, clinic maps, and schedule details */}
      <Contact onScrollTo={handleScrollToSection} />

      {/* Regulatory body registration markings and copyrights */}
      <Footer onScrollTo={handleScrollToSection} />

    </div>
  );
}

