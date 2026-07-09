import React from 'react';
// @ts-ignore
import finalopLogo from '../finalop.png';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ className = 'h-11', variant = 'light' }: BrandLogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={finalopLogo}
        alt="Pinnacle Health & Wellness Clinic Logo"
        className="h-full w-auto object-contain block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
