"use client"; 

import { useState, useEffect } from 'react';

// --- Configuration for the generator ---
interface CorkConfig {
  width: number;          // Width of the texture to generate
  height: number;         // Height of the texture to generate
  baseColor: string;      // The main background color of the cork
  speckleColors: string[];// An array of colors for the cork granules
  speckleDensity: number; // A value from 0 to 1 controlling speckle count
  noiseAlpha: number;     // Transparency of the noise overlay (0-1)
}

const defaultConfig: CorkConfig = {
  width: 1024, // Increased resolution for higher quality texture
  height: 1024,
  baseColor: '#d2a679',
  speckleColors: [
    '#6b4f3a', '#8a6b52', '#ab8a6f', '#c4a68a', '#a17a58'
  ],
  speckleDensity: 0.25, // 25% of pixels will be speckles
  noiseAlpha: 0.05,
};

// A helper function to get a random item from an array
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const useProceduralCork = (config: Partial<CorkConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...config };
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // --- Caching Logic ---
    // const cachedUrl = sessionStorage.getItem('proceduralCorkBg');
    // if (cachedUrl) {
    //   setBackgroundUrl(cachedUrl);
    //   setIsLoading(false);
    //   return;
    // }

    // Use requestAnimationFrame to ensure we run this when the browser is ready to paint
    const animationFrameId = requestAnimationFrame(() => {
      // Create an off-screen canvas
      const canvas = document.createElement('canvas');
      canvas.width = finalConfig.width;
      canvas.height = finalConfig.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setIsLoading(false);
        return;
      }

      // 1. Fill with the base color
      ctx.fillStyle = finalConfig.baseColor;
      ctx.fillRect(0, 0, finalConfig.width, finalConfig.height);

      // 1.5. Add a subtle radial gradient for depth
      const grad = ctx.createRadialGradient(
        finalConfig.width / 2,
        finalConfig.height / 2,
        finalConfig.width / 8,
        finalConfig.width / 2,
        finalConfig.height / 2,
        finalConfig.width / 1.2
      );
      grad.addColorStop(0, 'rgba(255,255,255,0.08)');
      grad.addColorStop(1, 'rgba(0,0,0,0.10)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, finalConfig.width, finalConfig.height);

      // 2. Add the speckles/granules (increase density, more natural variation)
      const numSpeckles = Math.floor(finalConfig.width * finalConfig.height * finalConfig.speckleDensity * 0.09); // increased density
      for (let i = 0; i < numSpeckles; i++) {
        const x = Math.random() * finalConfig.width;
        const y = Math.random() * finalConfig.height;
        // More size and shape variation
        const r = Math.random() > 0.6 ? 2 + Math.random() * 3 : 0.7 + Math.random() * 1.7;
        ctx.beginPath();
        ctx.ellipse(x, y, r, r * (0.6 + Math.random() * 0.8), Math.random() * Math.PI, 0, 2 * Math.PI);
        ctx.fillStyle = getRandom(finalConfig.speckleColors);
        ctx.globalAlpha = 0.28 + Math.random() * 0.5;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 2.5. Add a few large, soft, semi-transparent ellipses for cork grain
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * finalConfig.width;
        const y = Math.random() * finalConfig.height;
        const rx = 60 + Math.random() * 60;
        const ry = rx * (0.7 + Math.random() * 0.6);
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.03;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 3. Add a noise layer for realism (less intense)
      const imageData = ctx.getImageData(0, 0, finalConfig.width, finalConfig.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const noise = (Math.random() - 0.5) * 18; // a value between -9 and 9
        pixels[i] += noise;     // Red
        pixels[i + 1] += noise; // Green
        pixels[i + 2] += noise; // Blue
      }
      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas to a JPEG data URL
      const url = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
      
      // Save to state and cache
      setBackgroundUrl(url);
      sessionStorage.setItem('proceduralCorkBg', url);
      setIsLoading(false);
    });

    return () => cancelAnimationFrame(animationFrameId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return { backgroundUrl, isLoading };
};