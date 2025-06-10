import BackgroundLights from "@/components/background-lights"
import MindBubble from "@/components/mind-bubble"
import PageTitle from "@/components/page-title"
import CentralEmblem from "@/components/central-emblem"

export default function Home() {
  // Content for each bubble with optional background images
  const bubbleContents = [
    {
      text: "Creative",
      color: "from-pink-300 via-purple-200 to-blue-300",
      position: "top-left",
      bgImage: "/placeholder.svg?height=200&width=200",
    },
    {
      text: "Mind",
      color: "from-blue-300 via-purple-300 to-pink-300",
      position: "top-right",
      bgImage: "/placeholder.svg?height=200&width=200",
    },
    {
      text: "Ideas",
      color: "from-cyan-300 via-blue-200 to-purple-300",
      position: "top-left-mid",
    },
    {
      text: "Inspire",
      color: "from-purple-300 via-pink-200 to-orange-300",
      position: "top-right-mid",
    },
    {
      text: "Imagine",
      color: "from-blue-200 via-cyan-300 to-teal-300",
      position: "bottom-left-mid",
      bgImage: "/placeholder.svg?height=200&width=200",
    },
    {
      text: "Create",
      color: "from-violet-300 via-purple-200 to-fuchsia-300",
      position: "bottom-right-mid",
    },
    {
      text: "Dream",
      color: "from-fuchsia-300 via-pink-200 to-rose-300",
      position: "bottom-left",
      bgImage: "/placeholder.svg?height=200&width=200",
    },
    {
      text: "Explore",
      color: "from-indigo-300 via-blue-200 to-cyan-300",
      position: "bottom-right",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 relative overflow-hidden">
      <BackgroundLights />

      <div className="relative z-10 flex flex-col items-center min-h-screen">
        <PageTitle />

        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CentralEmblem />
        </div> */}

        {/* Bubbles in corners */}
        <div className="fixed inset-0 pointer-events-none">
          {bubbleContents.map((bubble, index) => (
            <div key={index} className={`absolute ${getPositionClasses(bubble.position)}`}>
              <MindBubble
                gradientColors={bubble.color}
                size={index % 3 === 0 ? "lg" : index % 3 === 1 ? "md" : "sm"}
                animationDelay={index * 0.2}
                backgroundImage={bubble.bgImage}
              >
                <p className="font-bold text-center text-gray-800 drop-shadow-sm">{bubble.text}</p>
              </MindBubble>
            </div>
          ))}
        </div>
    </div>
    </div>
  )
}

// Helper function to get position classes based on position name
function getPositionClasses(position: string): string {
  switch (position) {
    case "top-left":
      return "top-[5%] left-[5%]"
    case "top-right":
      return "top-[10%] right-[20%]"
    case "bottom-left":
      return "bottom-[5%] left-[20%]"
    case "bottom-right":
      return "bottom-[5%] right-[5%]"
    case "top-left-mid":
      return "top-[25%] left-[30%]"
    case "top-right-mid":
      return "top-[50%] right-[30%]"
    case "bottom-left-mid":
      return "bottom-[15%] left-[5%]"
    case "bottom-right-mid":
      return "bottom-[50%] right-[5%]"
    default:
      return ""
  }
}
