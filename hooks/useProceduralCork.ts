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
  width: 512, // Generate a 512x512 tileable texture for performance
  height: 512,
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
    // Check sessionStorage to see if we've already generated a texture for this session.
    // This makes it unique per session, but not on every single page navigation.
    const cachedUrl = sessionStorage.getItem('proceduralCorkBg');
    if (cachedUrl) {
      setBackgroundUrl(cachedUrl);
      setIsLoading(false);
      return;
    }

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

      // 2. Add the speckles/granules
      const numSpeckles = finalConfig.width * finalConfig.height * finalConfig.speckleDensity;
      for (let i = 0; i < numSpeckles; i++) {
        const x = Math.random() * finalConfig.width;
        const y = Math.random() * finalConfig.height;
        const size = Math.random() > 0.7 ? 2 : 1; // Most speckles are 1x1, some are 2x2
        ctx.fillStyle = getRandom(finalConfig.speckleColors);
        ctx.fillRect(x, y, size, size);
      }

      // 3. Add a noise layer for realism
      const imageData = ctx.getImageData(0, 0, finalConfig.width, finalConfig.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        // Add a random "tint" to each pixel
        const noise = (Math.random() - 0.5) * 50; // a value between -25 and 25
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