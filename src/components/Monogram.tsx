import React, { useState } from 'react';

/**
 * Couple logo. If the card's logo file is placed at /public/logo.png it is used
 * automatically; otherwise a gold "A & A" monogram in an eight-point Islamic star
 * frame is drawn.
 */
export const Monogram: React.FC<{ className?: string }> = ({ className = 'w-32 h-32' }) => {
  const [useFallback, setUseFallback] = useState(false);

  if (!useFallback) {
    return (
      <img
        src="/logo.png"
        alt="Aashiq & Azka"
        className={`${className} object-contain drop-shadow-sm`}
        onError={() => setUseFallback(true)}
      />
    );
  }

  // Eight-point star (two overlapping squares)
  const square = (rot: number) => (
    <rect
      x="22" y="22" width="56" height="56"
      fill="none" stroke="url(#mg-gold)" strokeWidth="0.8"
      transform={`rotate(${rot} 50 50)`}
    />
  );

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Aashiq & Azka monogram">
      <defs>
        <linearGradient id="mg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e5cd97" />
          <stop offset="50%" stopColor="#c5a059" />
          <stop offset="100%" stopColor="#9a7638" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke="url(#mg-gold)" strokeWidth="1" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="url(#mg-gold)" strokeWidth="0.4" strokeDasharray="1 2" />
      {square(0)}
      {square(45)}
      {[0, 90, 180, 270].map((r) => (
        <circle key={r} cx="50" cy="3" r="1.4" fill="#c5a059" transform={`rotate(${r} 50 50)`} />
      ))}
      <text
        x="50" y="58" textAnchor="middle"
        fontFamily="'Great Vibes', cursive" fontSize="30" fill="url(#mg-gold)"
      >
        A<tspan fontSize="16" dx="1" dy="-3">&amp;</tspan><tspan dx="1" dy="3">A</tspan>
      </text>
    </svg>
  );
};
