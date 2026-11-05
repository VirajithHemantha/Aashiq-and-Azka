import React from 'react';

/**
 * Renders a name with a clear capital first letter (Cinzel) followed by the
 * rest in the script font, so the initial always reads as a capital.
 */
export const CoupleName: React.FC<{ name: string }> = ({ name }) => (
  <span className="whitespace-nowrap">
    <span className="font-display not-italic font-semibold text-brand-gold-deep text-[0.8em] align-baseline mr-[0.02em]">
      {name.charAt(0).toUpperCase()}
    </span>
    <span className="font-script">{name.slice(1)}</span>
  </span>
);
