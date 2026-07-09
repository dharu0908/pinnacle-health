import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (dark text), 'dark' is for dark backgrounds (light text)
}

export default function BrandLogo({ className = 'h-11', variant = 'light' }: BrandLogoProps) {
  // Determine colors based on the background variant
  const isDarkBg = variant === 'dark';
  
  const outerArchColor = isDarkBg ? '#FBF9F4' : '#2D4A3E';
  const innerArchColor = isDarkBg ? '#B4C3B1' : '#8A9E86';
  const stemColor = isDarkBg ? '#B4C3B1' : '#8A9E86';
  const figureColor = '#E5A93C'; // Gold/orange remains constant for brand identity
  const textColorClass = isDarkBg ? 'text-cream' : 'text-forest';
  const subTextColorClass = isDarkBg ? 'text-cream/80' : 'text-forest/80';
  const separatorColorClass = isDarkBg ? 'bg-cream/30' : 'bg-gold/40';
  const dotColorClass = isDarkBg ? 'bg-cream/80' : 'bg-forest';

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* High-Fidelity SVG of Pinnacle Mountain/Leaf Logo */}
      <svg
        viewBox="0 0 160 140"
        className="h-full w-auto flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left outer arch / leaf (Forest Green or Cream) */}
        <path
          d="M67 17C57 28 35 55 17 106C14 115 13 124 13 126C15 126 23 126 31 120C42 112 55 93 64 73C74 51 77 34 77 22C77 20 75 16 67 17Z"
          fill={outerArchColor}
        />
        {/* Left inner arch (Sage Green or Light Sage) */}
        <path
          d="M65 31C58 41 42 66 33 103C30 115 28 123 28 126C31 126 39 125 45 119C52 112 65 92 72 73C77 60 78 48 78 37C78 33 74 29 65 31Z"
          fill={innerArchColor}
        />
        {/* Right outer arch / leaf (Forest Green/Medium Green or Cream) */}
        <path
          d="M67 17C79 31 106 63 129 104C134 113 138 122 140 126C138 126 128 126 117 119C104 111 88 90 77 69C69 53 66 37 67 17Z"
          fill={isDarkBg ? '#EBF0EB' : '#446254'}
        />
        {/* Right inner arch (Sage Green or Light Sage) */}
        <path
          d="M74 45C83 58 101 84 117 113C121 120 123 124 125 126C123 126 115 125 107 119C95 110 82 92 73 75C68 65 68 55 74 45Z"
          fill={innerArchColor}
        />
        {/* Center Golden/Orange Wellness Figure */}
        {/* Head */}
        <circle cx="78" cy="51" r="7.5" fill={figureColor} />
        {/* Body & Arms reaching up */}
        <path
          d="M78 61C73 66 65 72 58 79C56 81 57 84 60 84C66 84 74 79 79 74C83 71 87 68 91 67C95 66 102 66 109 68C112 69 113 67 111 65C104 59 95 56 86 58C82 59 80 60 78 61Z"
          fill={figureColor}
        />
        <path
          d="M78 61C78 66 82 78 88 94C93 107 98 118 100 122C101 124 99 126 96 126C90 126 84 118 78 105C73 95 71 86 70 77C70 70 74 64 78 61Z"
          fill={figureColor}
        />
        {/* Botanical stem growing inside left (Sage Green or Light Sage) */}
        <path
          d="M33 126C36 120 42 108 48 94C52 84 57 73 60 67C61 65 60 63 58 64C51 68 45 74 40 82C35 89 32 96 30 102"
          stroke={stemColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Small leaves on the stem */}
        {/* Leaf 1 */}
        <path
          d="M44 105C41 105 36 108 34 112C33 114 35 116 38 115C42 113 45 109 46 106C46 105 45 105 44 105Z"
          fill={stemColor}
        />
        {/* Leaf 2 */}
        <path
          d="M48 92C46 91 41 93 39 98C38 100 40 102 43 101C47 99 49 95 50 93C50 92 49 92 48 92Z"
          fill={stemColor}
        />
        {/* Leaf 3 */}
        <path
          d="M52 81C51 79 46 80 43 85C42 87 44 89 47 88C51 86 53 82 54 81C54 81 53 81 52 81Z"
          fill={stemColor}
        />
      </svg>

      {/* Brand Text Block */}
      <div className="flex flex-col justify-center text-left">
        <span className={`font-serif text-lg md:text-xl font-bold leading-none tracking-[0.14em] ${textColorClass}`}>
          PINNACLE
        </span>
        <span className={`font-sans text-[7.5px] md:text-[8.5px] font-semibold leading-none tracking-[0.2em] uppercase mt-1 ${subTextColorClass}`}>
          HEALTH &amp; WELLNESS CLINIC
        </span>
        {/* Elegant separator line */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className={`h-[1px] flex-grow ${separatorColorClass}`} />
          <div className={`w-[3.5px] h-[3.5px] rounded-full ${dotColorClass}`} />
          <div className={`h-[1px] flex-grow ${separatorColorClass}`} />
        </div>
      </div>
    </div>
  );
}
