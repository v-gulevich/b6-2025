"use client";
import { useState, useRef } from "react";
import { GalleryImages } from '@/app/libs/consts'

export default function NewGenPage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [prev, setPrev] = useState<number | null>(null);
  const total = GalleryImages.length;
  const touchStartX = useRef<number | null>(null);

  const startAnimation = (dir: 'left' | 'right', nextIdx: number) => {
    if (animating) return;
    setPrev(current);
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(nextIdx);
      setAnimating(false);
      setPrev(null);
    }, 400);
  };

  const goPrev = () => startAnimation('left', (current - 1 + total) % total);
  const goNext = () => startAnimation('right', (current + 1) % total);

  return (
    <div>
      <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 pt-8 pb-8 px-2">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent text-center">
          Галерея
        </h1>
      <div className="flex-1 w-full flex items-center justify-center relative select-none">
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md text-2xl"
          aria-label="Предыдущее фото"
          disabled={animating}
        >
          ‹
        </button>
        <div
          style={{ touchAction: 'pan-y' }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current !== null) {
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (dx > 50) goPrev();
              if (dx < -50) goNext();
            }
            touchStartX.current = null;
          }}
          className="w-full h-full flex items-center justify-center overflow-hidden relative"
        >
          {/* Animate both previous and current images for smooth transition */}
          {prev !== null && (
            <img
              src={GalleryImages[prev].src}
              alt={GalleryImages[prev].description || `Gallery image ${prev + 1}`}
              className={`object-contain w-full h-full absolute top-0 left-0 transition-all duration-400 ease-in-out z-0
                ${direction === 'right' ? 'translate-x-0 opacity-100' : ''}
                ${direction === 'left' ? 'translate-x-0 opacity-100' : ''}
                ${animating && direction === 'right' ? '-translate-x-full opacity-0' : ''}
                ${animating && direction === 'left' ? 'translate-x-full opacity-0' : ''}
              `}
              draggable="false"
              style={{ pointerEvents: 'none' }}
            />
          )}
          <img
            src={GalleryImages[current].src}
            alt={GalleryImages[current].description || `Gallery image ${current + 1}`}
            className={`object-contain w-full h-full absolute top-0 left-0 transition-all duration-400 ease-in-out z-10
              ${!animating ? 'translate-x-0 opacity-100' : ''}
              ${animating && direction === 'right' ? 'translate-x-full opacity-0' : ''}
              ${animating && direction === 'left' ? '-translate-x-full opacity-0' : ''}
            `}
            draggable="false"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md text-2xl"
          aria-label="Следующее фото"
          disabled={animating}
        >
          ›
        </button>
      </div>
      <div className="mt-4 w-full max-w-md flex flex-col items-center">
        <div className="text-base text-gray-700 bg-white/80 rounded-lg px-4 py-2 shadow border border-gray-200 w-full text-center mb-2 min-h-[2.5rem]">
          {GalleryImages[current].description}
        </div>
        <div className="flex gap-1 items-center justify-center text-xs text-gray-500">
          {GalleryImages.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full mx-0.5 ${i === current ? 'bg-purple-500' : 'bg-gray-300'}`}
            />
          ))}
          <span className="ml-2">{current + 1} / {total}</span>
        </div>
      </div>
        </div>
      </div>
  );
}
