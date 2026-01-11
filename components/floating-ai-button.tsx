"use client"

import { Zap } from "lucide-react"
import { useState } from "react"

export default function FloatingAIButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={() => {
        // AI features to be implemented in future
        console.log("AI features coming soon!")
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-40 float-ai"
      aria-label="AI Assistant"
    >
      <div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center ai-glow ${
          isHovered ? "scale-110" : ""
        }`}
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.8), rgba(139, 92, 246, 0.6))",
        }}
      >
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 40%, rgba(200, 160, 255, 0.4), transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <Zap size={28} className="text-white relative z-10" />
      </div>
      {isHovered && (
        <div
          className="absolute -top-12 right-0 bg-purple-600 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap"
          style={{ background: "rgba(139, 92, 246, 0.9)" }}
        >
          AI Features Soon
        </div>
      )}
    </button>
  )
}
