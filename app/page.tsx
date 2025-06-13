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

// Static layout data for bubbles, with (x, y) percentage coordinates
const bubbleContents: BubbleData[] = [
  { text: "Состав\nпрофиля", color: "from-purple-300 via-pink-200 to-orange-300", size: 'md', link: "/members", x: 20, y: 28 },
  { text: "Подвиг\nгероев", color: "from-blue-200 via-cyan-300 to-teal-300", size: 'lg', link: "/heroes", x: 75, y: 25 },
  { text: "План-чек", color: "from-cyan-300 via-blue-200 to-purple-300", size: 'md', link: "/plan-check", x: 75, y: 45 },
  { text: "Деятельность и настроения", color: "from-pink-300 via-purple-200 to-blue-300", size: 'lg', link: "/sir-mes", x: 30, y: 52 },
  { text: "Модульные\nпроекты", color: "from-fuchsia-300 via-pink-200 to-rose-300", size: 'md', link: "/projects", x: 78, y: 65 },
  { text: "Речёвка и\nпесня", color: "from-violet-300 via-purple-200 to-fuchsia-300", size: 'md', link: "/songs", x: 40, y: 70 },
  { text: "Джуниор\nдня", color: "from-blue-300 via-purple-300 to-pink-300", size: 'md', link: "/junior-of-the-day", x: 20, y: 87 },
  { text: "Мы новое\nпоколение", color: "from-indigo-300 via-blue-200 to-cyan-300", size: 'lg', link: "/new-gen", x: 78, y: 88 },
];

// --- Static Bubble Sizing ---
const BUBBLE_SIZES: Record<string, number> = {
  sm: 120,
  md: 160,
  lg: 200,
};

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 relative w-full min-h-screen overflow-hidden">
      {/* <BackgroundLights /> */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <div className="pointer-events-auto">
          <PageTitle />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0">
        {bubbleContents.map((bubble, index) => {
          const bubblePage = bubble.link || `/bubble-${index + 1}`;
          const sizePx = BUBBLE_SIZES[bubble.size] || 160;
          return (
            <div
              key={index}
              className="absolute transition-all duration-300 ease-out"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${sizePx}px`,
                height: `${sizePx}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Link href={bubblePage} className="pointer-events-auto block focus:outline-none w-full h-full" tabIndex={0} aria-label={`Open page for ${bubble.text}`}>
                <MindBubble
                  gradientColors={bubble.color}
                  sizePx={sizePx}
                  animationDelay={index * 0.1}
                  backgroundImage={bubble.bgImage}
                >
                  <p className="font-bold text-center text-gray-800 drop-shadow-sm whitespace-pre-line">{bubble.text}</p>
                </MindBubble>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}