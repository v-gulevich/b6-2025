"use client"

import type { ReactNode } from "react"
// import { useEffect, useState } from "react"

interface MindBubbleProps {
  children: ReactNode;
  className?: string;
  gradientColors?: string;
  sizePx?: number; // New: Accepts size in pixels instead of 'sm' | 'md' | 'lg'
  animationDelay?: number;
  backgroundImage?: string;
}

export default function MindBubble({
  children,
  className = "",
  gradientColors = "from-purple-200 via-blue-200 to-pink-200",
  sizePx = 144, // Default size if none is provided
  animationDelay = 0,
  backgroundImage,
}: MindBubbleProps) {
  // Dynamic values based on the size in pixels
  const fontSize = sizePx * 0.15; // Font size is 15% of the bubble's width
  const halfSize = sizePx / 2;
  const orbit1Distance = sizePx * 0.4;
  // Only one orbit for optimization

  // Unique animation durations
  const morphDuration = 8 + animationDelay * 2
  const pulseDuration = 6 + animationDelay * 1.5

  return (
    <div className={`relative ${className}`}
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
      }}
    >
      {/* Optimized: Single outer glow layer for performance */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColors} blur-xl scale-110 opacity-40 pointer-events-none`}
        style={{
          animation: `morph-outer ${morphDuration}s ease-in-out infinite ${animationDelay}s`,
          willChange: 'transform, border-radius, opacity',
        }}
      />
      {/* Main bubble container */}
      <div
        className={`
        relative backdrop-blur-xl bg-white/60
        shadow-xl blur-md w-full h-full
        transition-transform duration-500 ease-out
        hover:scale-105 hover:bg-white/70
        flex items-center justify-center
        overflow-hidden
      `}
        style={{
          animation: `morph-main ${morphDuration * 1.2}s ease-in-out infinite ${animationDelay * 0.3}s, float ${pulseDuration}s ease-in-out infinite ${animationDelay * 0.7}s`,
          willChange: 'transform, border-radius, background',
        }}
      >
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-lg pointer-events-none"
            style={{ backgroundImage: `url(${backgroundImage})`, animation: `morph-bg ${morphDuration * 0.9}s ease-in-out infinite ${animationDelay * 0.4}s`, willChange: 'border-radius' }}
          />
        )}
        {/* <div
          className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 opacity-70 blur-sm pointer-events-none"
          style={{ animation: `morph-inner ${morphDuration * 0.7}s ease-in-out infinite ${animationDelay * 0.6}s`, willChange: 'border-radius' }}
        /> */}
      </div>

      {/* Content */}
      <div className={`absolute inset-0 flex items-center justify-center z-30 pointer-events-none`}>
        <div
          className={`px-3 py-2 font-bold text-gray-800 text-center`}
          style={{
            fontSize: `${fontSize}px`,
            filter: "none",
            textShadow: "0 2px 4px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {children}
        </div>
      </div>

      {/* Floating particle (optimized: only 1 for less layout thrash) */}
      {/* <div
        className="absolute top-0 left-0 w-3 h-3 bg-white/60 rounded-full blur-sm pointer-events-none"
        style={{
          animation: `orbit ${morphDuration * 1.5}s linear infinite ${animationDelay}s`,
          transformOrigin: `${halfSize}px ${halfSize}px`,
          willChange: 'transform',
        }}
      /> */}

      {/* Dynamic morphing styles, including dynamic orbit distances */}
      <style jsx>{`
        @keyframes morph-main { 0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg) scale(1); } 25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg) scale(1.05); } 50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; transform: rotate(180deg) scale(0.95); } 75% { border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%; transform: rotate(270deg) scale(1.02); } }
        @keyframes morph-outer { 0%, 100% { border-radius: 70% 30% 50% 50% / 50% 70% 30% 50%; transform: rotate(0deg) scale(1.1); } 33% { border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%; transform: rotate(120deg) scale(1.15); } 66% { border-radius: 50% 50% 70% 30% / 30% 50% 50% 70%; transform: rotate(240deg) scale(1.05); } }
        @keyframes morph-inner { 0%, 100% { border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%; } 50% { border-radius: 60% 40% 50% 50% / 50% 50% 60% 40%; } }
        @keyframes morph-bg { 0%, 100% { border-radius: 45% 55% 35% 65% / 55% 35% 65% 45%; } 50% { border-radius: 65% 35% 55% 45% / 35% 65% 45% 55%; } }
        @keyframes float { 0%, 100% { transform: translateY(0px) translateX(0px); } 25% { transform: translateY(-10px) translateX(5px); } 50% { transform: translateY(0px) translateX(-5px); } 75% { transform: translateY(5px) translateX(3px); } }
        @keyframes orbit { 0% { transform: rotate(0deg) translateX(${orbit1Distance}px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(${orbit1Distance}px) rotate(-360deg); } }
      `}</style>
    </div>
  )
}