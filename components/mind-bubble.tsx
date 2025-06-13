"use client";

import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

interface MindBubbleProps {
  children: ReactNode;
  className?: string;
  gradientColors?: string;
  sizePx?: number; // New: Accepts size in pixels instead of 'sm' | 'md' | 'lg'
  animationDelay?: number;
  backgroundImage?: string;
}

const USE_CANVAS = false;

function MindBubbleCanvas({
  sizePx = 144,
  color1 = "#e9d5ff",
  color2 = "#fbcfe8",
  children,
  fontSize = 22,
}: {
  sizePx?: number;
  color1?: string;
  color2?: string;
  children?: ReactNode;
  fontSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let running = true;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, sizePx, sizePx);
      // Morphing parameters
      // const t = (Math.sin(frame / 60) + 1) / 2;
      // const r1 = sizePx / 2 * (0.9 + 0.1 * t);
      // const r2 = sizePx / 2 * (0.8 + 0.2 * (1 - t));
      const t = frame / 60;
      const baseR = (sizePx / 2) * 0.85;
      const morph1 = Math.sin(t) * 0.08;
      const morph2 = Math.cos(t * 0.7) * 0.06;
      const morph3 = Math.sin(t * 1.3 + 1) * 0.04;
      const r1 = baseR * (1 + morph1 + morph2);
      const r2 = baseR * (1 + morph2 + morph3);
      // Gradient
      const grad = ctx.createRadialGradient(
        sizePx / 2,
        sizePx / 2,
        r2,
        sizePx / 2,
        sizePx / 2,
        r1
      );
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(
        sizePx / 2,
        sizePx / 2,
        r1,
        r2,
        Math.sin(t) * 0.5,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.shadowColor = color1 + 'CC'; // Add alpha for stronger visible blur (if color1 is hex)
      ctx.shadowBlur = 160; // Much higher blur for a pronounced effect
      ctx.globalAlpha = 0.95; // Optional: softer look
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();
      if (running) {
        frame++;
        requestAnimationFrame(draw);
      }
    }
    draw();
    return () => {
      running = false;
    };
  }, [sizePx, color1, color2]);

  return (
    <div style={{ position: "relative", width: sizePx, height: sizePx }}>
      <canvas
        ref={canvasRef}
        width={sizePx}
        height={sizePx}
        style={{ width: sizePx, height: sizePx, display: "block" }}
        aria-hidden
      />
      {children && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#222",
            fontSize,
            textAlign: "center",
            pointerEvents: "none",
            textShadow:
              "0 2px 4px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
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

  // Detect Android device
  const isAndroid = true; //typeof window !== 'undefined' && /Android/i.test(navigator.userAgent);

  // Unique animation durations
  const morphDuration = 8 + animationDelay * 2;
  const pulseDuration = 6 + animationDelay * 1.5;

  if (USE_CANVAS || isAndroid) {
    // Use canvas version for Android
    return (
      <MindBubbleCanvas sizePx={sizePx} fontSize={fontSize}>
        {children}
      </MindBubbleCanvas>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
      }}
    >
      {/* Optimized: Single outer glow layer for performance */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColors} blur-xl scale-110 opacity-40 pointer-events-none`}
        style={
          isAndroid
            ? {}
            : {
                animation: `morph-outer ${morphDuration}s ease-in-out infinite ${animationDelay}s`,
                willChange: "transform, border-radius, opacity",
              }
        }
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
        style={
          isAndroid
            ? {}
            : {
                animation: `morph-main ${
                  morphDuration * 1.2
                }s ease-in-out infinite ${
                  animationDelay * 0.3
                }s, float ${pulseDuration}s ease-in-out infinite ${
                  animationDelay * 0.7
                }s`,
                willChange: "transform, border-radius, background",
              }
        }
      >
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-lg pointer-events-none"
            style={
              isAndroid
                ? { backgroundImage: `url(${backgroundImage})` }
                : {
                    backgroundImage: `url(${backgroundImage})`,
                    animation: `morph-bg ${
                      morphDuration * 0.9
                    }s ease-in-out infinite ${animationDelay * 0.4}s`,
                    willChange: "border-radius",
                  }
            }
          />
        )}
        {/* <div
          className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 opacity-70 blur-sm pointer-events-none"
          style={{ animation: `morph-inner ${morphDuration * 0.7}s ease-in-out infinite ${animationDelay * 0.6}s`, willChange: 'border-radius' }}
        /> */}
      </div>

      {/* Content */}
      <div
        className={`absolute inset-0 flex items-center justify-center z-30 pointer-events-none`}
      >
        <div
          className={`px-3 py-2 font-bold text-gray-800 text-center`}
          style={{
            fontSize: `${fontSize}px`,
            filter: "none",
            textShadow:
              "0 2px 4px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.3)",
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
        @keyframes morph-main {
          0%,
          100% {
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
          0%,
          100% {
            border-radius: 70% 30% 50% 50% / 50% 70% 30% 50%;
            transform: rotate(0deg) scale(1.1);
          }
          33% {
            border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%;
            transform: rotate(120deg) scale(1.15);
          }
          66% {
            border-radius: 50% 50% 70% 30% / 30% 50% 50% 70%;
            transform: rotate(240deg) scale(1.05);
          }
        }
        @keyframes morph-inner {
          0%,
          100% {
            border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%;
          }
          50% {
            border-radius: 60% 40% 50% 50% / 50% 50% 60% 40%;
          }
        }
        @keyframes morph-bg {
          0%,
          100% {
            border-radius: 45% 55% 35% 65% / 55% 35% 65% 45%;
          }
          50% {
            border-radius: 65% 35% 55% 45% / 35% 65% 45% 55%;
          }
        }
        @keyframes float {
          0%,
          100% {
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
            transform: rotate(0deg) translateX(${orbit1Distance}px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(${orbit1Distance}px)
              rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
