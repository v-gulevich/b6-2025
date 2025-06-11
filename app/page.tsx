"use client"; // This must be a client component to use hooks

import { useState, useEffect, useRef } from "react";
import BackgroundLights from "@/components/background-lights";
import MindBubble from "@/components/mind-bubble";
import PageTitle from "@/components/page-title";

// --- Data Types and Constants ---
interface BubbleData {
  text: string;
  color: string;
  size: "sm" | "md" | "lg";
  bgImage?: string;
}

interface PositionedBubble extends BubbleData {
  x: number; // top-left x in pixels
  y: number; // top-left y in pixels
  width: number;
  height: number;
  radius: number;
}

// --- Bubble Sizing and Packing Logic ---

function getRelativeBubbleSizes(screenWidth: number, screenHeight: number) {
  const baseDimension = Math.min(screenWidth, screenHeight);
  
  const scaleFactor = 0.33;
  const minSizeMd = 120;
  const maxSizeMd = 220;

  let baseSize = baseDimension * scaleFactor;
  baseSize = Math.max(minSizeMd, Math.min(baseSize, maxSizeMd));

  return {
    sm: baseSize * 0.8,
    md: baseSize,
    lg: baseSize * 1.25,
  };
}

function checkOverlap(bubble1: PositionedBubble, bubble2: PositionedBubble, spacing: number): boolean {
  const dx = (bubble1.x + bubble1.radius) - (bubble2.x + bubble2.radius);
  const dy = (bubble1.y + bubble1.radius) - (bubble2.y + bubble2.radius);
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = bubble1.radius + bubble2.radius + spacing;
  return distance < minDistance;
}

/**
 * Packs bubbles with a primary spiral method and a random-placement fallback
 * to guarantee all bubbles are rendered.
 */
function packBubblesRobust(
  bubbles: BubbleData[],
  screenWidth: number,
  screenHeight: number,
  options: {
    spacing?: number;
    exclusionZone?: { top?: number };
    sizes: { sm: number; md: number; lg: number };
  }
): PositionedBubble[] {
  const { spacing = 0, exclusionZone = { top: 0 }, sizes } = options;
  const topMargin = exclusionZone.top || 0;
  
  const placedBubbles: PositionedBubble[] = [];
  const sortedBubbles = [...bubbles].sort((a, b) => sizes[b.size] - sizes[a.size]);

  const placementAreaY = topMargin;
  const placementAreaHeight = screenHeight - topMargin;
  const placementCenterX = screenWidth / 2;
  const placementCenterY = placementAreaY + placementAreaHeight / 2;

  sortedBubbles.forEach((bubble, index) => {
    const size = sizes[bubble.size];
    const radius = size / 2;
    let placed = false;

    // --- Primary Strategy: Spiral Placement ---
    if (index === 0) {
      placedBubbles.push({ ...bubble, radius, x: placementCenterX - radius, y: placementCenterY - radius, width: size, height: size });
      placed = true;
    } else {
      let angle = Math.random() * 2 * Math.PI;
      let distanceFromCenter = placedBubbles[0].radius; 
      const spiralTightness = 0.5;

      while (distanceFromCenter < Math.max(screenWidth, screenHeight)) {
        const candidateCenterX = placementCenterX + Math.cos(angle) * distanceFromCenter;
        const candidateCenterY = placementCenterY + Math.sin(angle) * distanceFromCenter;
        const candidateBubble: PositionedBubble = { ...bubble, radius, x: candidateCenterX - radius, y: candidateCenterY - radius, width: size, height: size };

        let hasCollision = false;
        for (const placedBubble of placedBubbles) {
          if (checkOverlap(candidateBubble, placedBubble, spacing)) {
            hasCollision = true;
            break;
          }
        }

        if (!hasCollision && candidateBubble.x > 0 && candidateBubble.x + size < screenWidth && candidateBubble.y > topMargin && candidateBubble.y + size < screenHeight) {
          placedBubbles.push(candidateBubble);
          placed = true;
          break;
        }

        angle += 0.3;
        distanceFromCenter += spiralTightness;
      }
    }

    // --- Fallback Strategy: Random Placement ---
    if (!placed) {
      console.warn(`Spiral placement failed for "${bubble.text}". Falling back to random placement.`);
      for (let i = 0; i < 500; i++) { // Try up to 500 times
        const x = Math.random() * (screenWidth - size);
        const y = topMargin + (Math.random() * (screenHeight - topMargin - size));
        const fallbackCandidate: PositionedBubble = { ...bubble, radius, x, y, width: size, height: size };

        let hasCollision = false;
        for (const placedBubble of placedBubbles) {
          if (checkOverlap(fallbackCandidate, placedBubble, spacing)) {
            hasCollision = true;
            break;
          }
        }

        if (!hasCollision) {
          placedBubbles.push(fallbackCandidate);
          placed = true;
          break;
        }
      }
    }
  });

  return placedBubbles;
}

// --- React Component ---

export default function Home() {
  const [positionedBubbles, setPositionedBubbles] = useState<PositionedBubble[]>([]);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const bubbleContents: BubbleData[] = [
    { text: "Creative", color: "from-pink-300 via-purple-200 to-blue-300", bgImage: "/placeholder.svg?height=200&width=200", size: 'lg' },
    { text: "Mind", color: "from-blue-300 via-purple-300 to-pink-300", bgImage: "/placeholder.svg?height=200&width=200", size: 'md' },
    { text: "Ideas", color: "from-cyan-300 via-blue-200 to-purple-300", size: 'sm' },
    { text: "Inspire", color: "from-purple-300 via-pink-200 to-orange-300", size: 'md' },
    { text: "Imagine", color: "from-blue-200 via-cyan-300 to-teal-300", bgImage: "/placeholder.svg?height=200&width=200", size: 'lg' },
    { text: "Create", color: "from-violet-300 via-purple-200 to-fuchsia-300", size: 'sm' },
    { text: "Dream", color: "from-fuchsia-300 via-pink-200 to-rose-300", bgImage: "/placeholder.svg?height=200&width=200", size: 'md' },
    { text: "Explore", color: "from-indigo-300 via-blue-200 to-cyan-300", size: 'lg' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && titleRef.current && mainContainerRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        mainContainerRef.current.style.height = `${viewportHeight}px`;
        
        const titleHeight = titleRef.current.offsetHeight;
        const topExclusionZone = titleHeight + 10;

        const currentBubbleSizes = getRelativeBubbleSizes(viewportWidth, viewportHeight);
        const overlapAmount = currentBubbleSizes.md * 0; 

        const positions = packBubblesRobust(bubbleContents, viewportWidth, viewportHeight, {
          exclusionZone: { top: topExclusionZone },
          spacing: overlapAmount,
          sizes: currentBubbleSizes,
        });
        setPositionedBubbles(positions);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={mainContainerRef} className="bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 relative w-full overflow-hidden">
      <BackgroundLights />
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <div ref={titleRef} className="pointer-events-auto">
          <PageTitle />
        </div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-0">
        {positionedBubbles.map((bubble, index) => (
          <div key={index} className="absolute" style={{ left: `${bubble.x}px`, top: `${bubble.y}px` }}>
            <MindBubble
              gradientColors={bubble.color}
              sizePx={bubble.width} // Pass the calculated size in pixels
              animationDelay={index * 0.2}
              backgroundImage={bubble.bgImage}
            >
              <p className="font-bold text-center text-gray-800 drop-shadow-sm">{bubble.text}</p>
            </MindBubble>
          </div>
        ))}
      </div>
    </div>
  );
}