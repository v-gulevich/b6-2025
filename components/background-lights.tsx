"use client"

import { useEffect, useState } from "react"

interface Light {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export default function BackgroundLights() {
  const [lights, setLights] = useState<Light[]>([])

  useEffect(() => {
    const colors = [
      "bg-purple-200/30",
      "bg-blue-200/30",
      "bg-pink-200/25",
      "bg-indigo-200/30",
      "bg-cyan-200/25",
      "bg-violet-200/30",
      "bg-fuchsia-200/25",
      "bg-rose-200/25",
    ]

    const generateLights = () => {
      const newLights: Light[] = []
      for (let i = 0; i < 6; i++) {
        newLights.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 250 + 150,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 10,
        })
      }
      setLights(newLights)
    }

    generateLights()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {lights.map((light) => (
        <div
          key={light.id}
          className={`absolute ${light.color} blur-3xl`}
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            transform: "translate(-50%, -50%)",
            animation: `lava-morph ${light.duration}s ease-in-out infinite ${light.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes lava-morph {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          20% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(-50%, -50%) rotate(72deg) scale(1.1);
          }
          40% {
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
            transform: translate(-50%, -50%) rotate(144deg) scale(0.9);
          }
          60% {
            border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%;
            transform: translate(-50%, -50%) rotate(216deg) scale(1.05);
          }
          80% {
            border-radius: 40% 50% 60% 50% / 50% 70% 40% 50%;
            transform: translate(-50%, -50%) rotate(288deg) scale(0.95);
          }
        }
      `}</style>
    </div>
  )
}
