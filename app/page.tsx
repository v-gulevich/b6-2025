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
  bgImage?: string;
  link?: string; // Add link property
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
  const minSizeMd = 100;
  const maxSizeMd = 200;

  let baseSize = baseDimension * scaleFactor;
  baseSize = Math.max(minSizeMd, Math.min(baseSize, maxSizeMd));

  return {
    sm: baseSize * 0.9,
    md: baseSize,
    lg: baseSize * 1.1,
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
 * Places bubbles by finding the most open space on the screen,
 * resulting in a more even, scattered distribution.
 */
function packBubblesEvenly(
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
  // Sorting by size (largest first) is a good heuristic for packing
  const sortedBubbles = [...bubbles].sort((a, b) => sizes[b.size] - sizes[a.size]);

  // --- Placement Logic ---
  sortedBubbles.forEach((bubble) => {
    const size = sizes[bubble.size];
    const radius = size / 2;
    let bestPosition: { x: number; y: number } | null = null;
    let maxMinDistance = -1; // We want to maximize the minimum distance to other bubbles

    // For the very first bubble, place it somewhat centrally but with some randomness.
    if (placedBubbles.length === 0) {
      const x = screenWidth * 0.5 - radius + (Math.random() - 0.5) * 100;
      const y = (screenHeight + topMargin) * 0.5 - radius + (Math.random() - 0.5) * 100;
      placedBubbles.push({ ...bubble, radius, x, y, width: size, height: size });
      return; // Go to the next bubble
    }

    // --- Strategy: Find the most open spot ---
    const CANDIDATE_ATTEMPTS = 200; // More attempts lead to better but slower placement
    for (let i = 0; i < CANDIDATE_ATTEMPTS; i++) {
      // Generate a random candidate position within the screen bounds
      const candidateX = Math.random() * (screenWidth - size);
      const candidateY = topMargin + (Math.random() * (screenHeight - topMargin - size));
      const candidateBubble: PositionedBubble = { ...bubble, radius, x: candidateX, y: candidateY, width: size, height: size };

      // 1. Check for collision with any existing bubble
      let hasCollision = false;
      for (const placedBubble of placedBubbles) {
        if (checkOverlap(candidateBubble, placedBubble, spacing)) {
          hasCollision = true;
          break;
        }
      }
      if (hasCollision) {
        continue; // This candidate is invalid, try another one
      }

      // 2. This is a valid spot. Now, score it by its distance to the nearest neighbor.
      let minDistanceToAnyPlaced = Infinity;
      for (const placedBubble of placedBubbles) {
        const dx = (candidateBubble.x + radius) - (placedBubble.x + placedBubble.radius);
        const dy = (candidateBubble.y + radius) - (placedBubble.y + placedBubble.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistanceToAnyPlaced) {
          minDistanceToAnyPlaced = distance;
        }
      }

      // 3. If this candidate is in a more "open" area, it's our new best
      if (minDistanceToAnyPlaced > maxMinDistance) {
        maxMinDistance = minDistanceToAnyPlaced;
        bestPosition = { x: candidateX, y: candidateY };
      }
    }

    // If we found a good position, use it.
    if (bestPosition) {
      placedBubbles.push({ ...bubble, radius, x: bestPosition.x, y: bestPosition.y, width: size, height: size });
    } else {
      // --- Fallback Strategy: Just find the first available random spot ---
      console.warn(`Could not find an ideal open spot for "${bubble.text}". Falling back to first available.`);
      for (let i = 0; i < 1000; i++) { // Try up to 1000 times
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
          return; // Exit the forEach loop for this bubble
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
    { text: "Сир и мэса", color: "from-pink-300 via-purple-200 to-blue-300", size: 'lg', link: "/sir-mes" },
    { text: "Джуниор дня", color: "from-blue-300 via-purple-300 to-pink-300", size: 'md', link: "/junior-of-the-day" },
    { text: "План-чек", color: "from-cyan-300 via-blue-200 to-purple-300", size: 'sm', link: "/plan-check" },
    { text: "Состав профиля", color: "from-purple-300 via-pink-200 to-orange-300", size: 'md', link: "/members" },
    { text: "Подвиг героев", color: "from-blue-200 via-cyan-300 to-teal-300", size: 'lg', link: "/heroes" },
    { text: "Речёвка и песня", color: "from-violet-300 via-purple-200 to-fuchsia-300", size: 'sm', link: "/songs" },
    { text: "Модульные проекты", color: "from-fuchsia-300 via-pink-200 to-rose-300", size: 'md', link: "/projects" },
    { text: "Мы новое поколение", color: "from-indigo-300 via-blue-200 to-cyan-300", size: 'lg', link: "/new-gen" },
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

        const positions = packBubblesEvenly(bubbleContents, viewportWidth, viewportHeight, {
          exclusionZone: { top: topExclusionZone },
          spacing: overlapAmount,
          sizes: currentBubbleSizes,
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

  }, []);

  return (
    <div ref={mainContainerRef} className="bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 relative w-full">
      <BackgroundLights />
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <div ref={titleRef} className="pointer-events-auto">
          <PageTitle />
        </div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-0">
        {positionedBubbles.map((bubble, index) => {
          // Use the custom link if provided, otherwise fallback to the default bubble page
          const bubblePage = bubble.link || `/bubble-${index + 1}`;
          return (
            <div key={index} className="absolute" style={{ left: `${bubble.x}px`, top: `${bubble.y}px` }}>
              <Link href={bubblePage} className="pointer-events-auto block focus:outline-none" tabIndex={0} aria-label={`Open page for bubble ${index + 1}`}>
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