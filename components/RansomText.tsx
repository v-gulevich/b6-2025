"use client";

import React, { useMemo } from 'react';
import {
  Playfair_Display,
  Bangers,
  Rock_Salt,
  Permanent_Marker,
} from 'next/font/google';

// Load Google fonts
const playfair = Playfair_Display({ subsets: ['latin'], weight: '400' });
const bangers = Bangers({ subsets: ['latin'], weight: '400' });
const rockSalt = Rock_Salt({ subsets: ['latin'], weight: '400' });
const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: '400' });

// Font families
const FONT_FAMILIES: string[] = [
  playfair.style.fontFamily,
  bangers.style.fontFamily,
  rockSalt.style.fontFamily,
  permanentMarker.style.fontFamily,
  'Courier New',
  'Georgia',
  'Impact',
  'Arial Black',
];

// Backgrounds
const BACKGROUNDS: string[] = [
  '#e63946', '#f1faee', '#a8dadc', '#457b9d', '#2a9d8f',
  '#ffb703', '#fb8500', '#8d99ae', '#6a4c93', '#1d3557',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
];

// Ranges
const ROT_RANGE = [-10, 10];
const SKEW_RANGE = [-5, 5];
const SCALE_RANGE = [0.95, 1.05];
const SIZE_RANGE = [24, 28];
const SPACE_WIDTH_EM = 1.5;

function randInRange([min, max]: number[]): number {
  return Math.random() * (max - min) + min;
}

function getContrastColor(bg: string): string {
  if (bg.startsWith('#')) {
    const num = parseInt(bg.slice(1), 16);
    const r = (num >> 16) & 0xff;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    const brightness = (r*299 + g*587 + b*114) / 1000;
    return brightness < 128 ? '#fff' : '#000';
  }
  return '#000';
}

export interface RansomTextProps {
  children: string;
  fontSize?: number; // base font size in px
  sizeDelta?: number; // random delta in px
}

/**
 * RansomText: uses useMemo to generate stable, varied random styles per letter
 */
const RansomText: React.FC<RansomTextProps> = ({ children, fontSize = 26, sizeDelta = 2 }) => {
  const letters = Array.from(children);
  const minSize = fontSize - sizeDelta;
  const maxSize = fontSize + sizeDelta;

  const styles = useMemo(() => letters.map(char => {
    if (char === ' ') return null;
    const bg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
    const color = getContrastColor(bg);
    const rotation = randInRange(ROT_RANGE).toFixed(1);
    const skewX = randInRange(SKEW_RANGE).toFixed(1);
    const skewY = randInRange(SKEW_RANGE).toFixed(1);
    const scale = randInRange(SCALE_RANGE).toFixed(2);
    const letterFontSize = Math.floor(randInRange([minSize, maxSize]));
    return {
      fontFamily: FONT_FAMILIES[Math.floor(Math.random() * FONT_FAMILIES.length)],
      color,
      background: bg,
      padding: '4px 6px',
      transform: `rotate(${rotation}deg) skew(${skewX}deg,${skewY}deg) scale(${scale})`,
      fontSize: `${letterFontSize}px`,
      margin: '0 2px',
      lineHeight: 1,
      boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
      borderRadius: '2px',
      border: '1px solid rgba(0,0,0,0.1)',
      display: 'inline-block' as const,
    };
  }), [children, fontSize, sizeDelta]);

  return (
    <div style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}>
      {letters.map((char, idx) => char === ' ' ? (
        <span key={idx} style={{ display: 'inline-block', width: `${SPACE_WIDTH_EM}em` }} />
      ) : (
        <span key={idx} style={styles[idx]!}>{char}</span>
      ))}
    </div>
  );
};

export default RansomText;
