"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"

interface MindBubbleProps {
  children: ReactNode
  className?: string
  gradientColors?: string
  size?: "sm" | "md" | "lg"
  animationDelay?: number
  backgroundImage?: string
}

export default function MindBubble({
  children,
  className = "",
  gradientColors = "from-purple-200 via-blue-200 to-pink-200",
  size = "md",
  animationDelay = 0,
  backgroundImage,
}: MindBubbleProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, animationDelay * 1000)

    return () => clearTimeout(timer)
  }, [animationDelay])

  // Size classes for dynamic shapes
  const sizeClasses = {
    sm: "w-24 h-24 md:w-28 md:h-28",
    md: "w-32 h-32 md:w-36 md:h-36",
    lg: "w-40 h-40 md:w-44 md:h-44",
  }

  // Font size classes
  const fontSizeClasses = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
  }

  // Generate unique animation duration for each bubble
  const morphDuration = 8 + animationDelay * 2
  const pulseDuration = 6 + animationDelay * 1.5

  return (
    <div
      className={`relative ${className} transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Outer glow effect - blurred */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColors} blur-xl scale-125 opacity-50`}
        style={{
          animation: `morph-outer ${morphDuration}s ease-in-out infinite ${animationDelay}s`,
        }}
      />

      {/* Secondary glow layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColors} blur-lg scale-110 opacity-60`}
        style={{
          animation: `morph-middle ${morphDuration * 0.8}s ease-in-out infinite ${animationDelay * 0.5}s`,
        }}
      />

      {/* Main bubble container with dynamic morphing - highly blurred */}
      <div
        className={`
        relative backdrop-blur-xl bg-white/60
        shadow-xl blur-md
        ${sizeClasses[size]}
        transition-all duration-500 ease-out
        hover:scale-105 hover:bg-white/70
        flex items-center justify-center
        overflow-hidden
      `}
        style={{
          animation: `morph-main ${morphDuration * 1.2}s ease-in-out infinite ${animationDelay * 0.3}s, 
                     float ${pulseDuration}s ease-in-out infinite ${animationDelay * 0.7}s`,
        }}
      >
        {/* Background image if provided - highly blurred */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-lg"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              animation: `morph-bg ${morphDuration * 0.9}s ease-in-out infinite ${animationDelay * 0.4}s`,
            }}
          />
        )}

        {/* Inner light overlay with morphing - blurred */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 opacity-70 blur-sm"
          style={{
            animation: `morph-inner ${morphDuration * 0.7}s ease-in-out infinite ${animationDelay * 0.6}s`,
          }}
        />
      </div>

      {/* Content - Sharp and completely separate from blurred bubble */}
      <div
        className={`absolute inset-0 ${sizeClasses[size]} flex items-center justify-center z-30 pointer-events-none`}
      >
        <div
          className={`${fontSizeClasses[size]} px-3 py-2 font-bold text-gray-800 text-center`}
          style={{
            filter: "none",
            textShadow: "0 2px 4px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {children}
        </div>
      </div>

      {/* Floating particles around bubble */}
      <div
        className="absolute w-3 h-3 bg-white/60 rounded-full blur-sm"
        style={{
          animation: `orbit ${morphDuration * 1.5}s linear infinite ${animationDelay}s`,
          transformOrigin: `${sizeClasses[size].includes("w-24") ? "48px" : sizeClasses[size].includes("w-32") ? "64px" : "80px"} ${sizeClasses[size].includes("h-24") ? "48px" : sizeClasses[size].includes("h-32") ? "64px" : "80px"}`,
        }}
      />
      <div
        className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
        style={{
          animation: `orbit-reverse ${morphDuration * 2}s linear infinite ${animationDelay * 0.5}s`,
          transformOrigin: `${sizeClasses[size].includes("w-24") ? "36px" : sizeClasses[size].includes("w-32") ? "48px" : "60px"} ${sizeClasses[size].includes("h-24") ? "36px" : sizeClasses[size].includes("h-32") ? "48px" : "60px"}`,
        }}
      />

      {/* Dynamic morphing styles */}
      <style jsx>{`
        @keyframes morph-main {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(0deg) scale(1);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: rotate(90deg) scale(1.05);
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
            transform: rotate(180deg) scale(0.95);
          }
          75% {
            border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%;
            transform: rotate(270deg) scale(1.02);
          }
        }

        @keyframes morph-outer {
          0%, 100% {
            border-radius: 70% 30% 50% 50% / 50% 70% 30% 50%;
            transform: rotate(0deg) scale(1.25);
          }
          33% {
            border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%;
            transform: rotate(120deg) scale(1.3);
          }
          66% {
            border-radius: 50% 50% 70% 30% / 30% 50% 50% 70%;
            transform: rotate(240deg) scale(1.2);
          }
        }

        @keyframes morph-middle {
          0%, 100% {
            border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%;
            transform: rotate(0deg) scale(1.1);
          }
          50% {
            border-radius: 60% 40% 40% 60% / 40% 60% 60% 40%;
            transform: rotate(180deg) scale(1.15);
          }
        }

        @keyframes morph-inner {
          0%, 100% {
            border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%;
          }
          50% {
            border-radius: 60% 40% 50% 50% / 50% 50% 60% 40%;
          }
        }

        @keyframes morph-bg {
          0%, 100% {
            border-radius: 45% 55% 35% 65% / 55% 35% 65% 45%;
          }
          50% {
            border-radius: 65% 35% 55% 45% / 35% 65% 45% 55%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(0px) translateX(-5px);
          }
          75% {
            transform: translateY(5px) translateX(3px);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }

        @keyframes orbit-reverse {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(30px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
