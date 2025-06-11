"use client"; // This must be a client component to use hooks

import { useState, useEffect, useRef } from "react";
import BackgroundLights from "@/components/background-lights";
import MindBubble from "@/components/mind-bubble";
import PageTitle from "@/components/page-title";
import Link from "next/link";

// --- Data Types and Constants ---
interface BubbleData {
  text: string;
  color: string;
  size: "sm" | "md" | "lg";
  x: number; // Left position as a percentage
  y: number; // Top position as a percentage
  bgImage?: string;
  link?: string;
}

interface PositionedBubble extends BubbleData {
  width: number;  // Calculated width in pixels
  height: number; // Calculated height in pixels
}

// Static layout data for bubbles, with (x, y) percentage coordinates
const bubbleContents: BubbleData[] = [
    { text: "Состав\nпрофиля", color: "from-purple-300 via-pink-200 to-orange-300", size: 'md', link: "/members", x: 20, y: 32 },
    { text: "Подвиг\nгероев", color: "from-blue-200 via-cyan-300 to-teal-300", size: 'lg', link: "/heroes", x: 75, y: 25 },
    { text: "План-чек", color: "from-cyan-300 via-blue-200 to-purple-300", size: 'md', link: "/plan-check", x: 75, y: 45 },
    { text: "Деятельность и настроения", color: "from-pink-300 via-purple-200 to-blue-300", size: 'lg', link: "/sir-mes", x: 30, y: 52 },
    { text: "Модульные\nпроекты", color: "from-fuchsia-300 via-pink-200 to-rose-300", size: 'md', link: "/projects", x: 78, y: 65 },
    { text: "Речёвка и\nпесня", color: "from-violet-300 via-purple-200 to-fuchsia-300", size: 'md', link: "/songs", x: 40, y: 70 },
    { text: "Джуниор\nдня", color: "from-blue-300 via-purple-300 to-pink-300", size: 'md', link: "/junior-of-the-day", x: 20, y: 83 },
    { text: "Мы новое\nпоколение", color: "from-indigo-300 via-blue-200 to-cyan-300", size: 'lg', link: "/new-gen", x: 78, y: 88 },
];


// --- Bubble Sizing Logic ---

function getRelativeBubbleSizes(screenWidth: number, screenHeight: number) {
  const baseDimension = Math.min(screenWidth, screenHeight);

  // These scale factors can be adjusted to make bubbles larger or smaller overall.
  const scaleFactor = screenWidth < 768 ? 0.38 : 0.33; // Larger bubbles on smaller screens
  const minSizeMd = 100;
  const maxSizeMd = 200;

  let baseSize = baseDimension * scaleFactor;
  baseSize = Math.max(minSizeMd, Math.min(baseSize, maxSizeMd));

  return {
    sm: baseSize * 0.8,
    md: baseSize,
    lg: baseSize * 1.1,
  };
}

// --- React Component ---

export default function Home() {
  const [positionedBubbles, setPositionedBubbles] = useState<PositionedBubble[]>([]);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && mainContainerRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        mainContainerRef.current.style.height = `${viewportHeight}px`;

        const currentBubbleSizes = getRelativeBubbleSizes(viewportWidth, viewportHeight);

        // Map static bubble data to positioned bubbles with calculated pixel sizes
        const positions = bubbleContents.map(bubble => {
            const size = currentBubbleSizes[bubble.size];
            return {
                ...bubble,
                width: size,
                height: size,
            };
        });
        setPositionedBubbles(positions);
      }
    };

    // Debounce resize handler for performance
    let resizeTimer: NodeJS.Timeout;
    const debouncedHandleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => handleResize(), 100);
    };


    handleResize();
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);

  }, []); // Empty dependency array is correct here

  return (
    <div ref={mainContainerRef} className="bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 relative w-full overflow-hidden">
      <BackgroundLights />

      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <div className="pointer-events-auto">
          <PageTitle />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        {positionedBubbles.map((bubble, index) => {
          const bubblePage = bubble.link || `/bubble-${index + 1}`;
          return (
            <div
              key={index}
              className="absolute transition-all duration-300 ease-out"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                transform: 'translate(-50%, -50%)' // Center the bubble on its coordinates
              }}
            >
              <Link href={bubblePage} className="pointer-events-auto block focus:outline-none" tabIndex={0} aria-label={`Open page for ${bubble.text}`}>
                <MindBubble
                  gradientColors={bubble.color}
                  sizePx={bubble.width}
                  animationDelay={index * 0.1}
                  backgroundImage={bubble.bgImage}
                >
                  <p className="font-bold text-center text-gray-800 drop-shadow-sm">{bubble.text}</p>
                </MindBubble>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}