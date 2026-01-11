"use client"

import { Upload, Share2, TrendingUp } from "lucide-react"

const features = [
  {
    title: "Publish",
    description: "Launch your project in front of builders, students, and founders.",
    icon: Upload,
    color: "#8b5cf6",
  },
  {
    title: "Promote",
    description: "We promote selected projects via reels, shorts, and Popel Tube.",
    icon: Share2,
    color: "#a78bfa",
  },
  {
    title: "Grow",
    description: "Get visibility, feedback, and early traction for your idea.",
    icon: TrendingUp,
    color: "#c4b5fd",
  },
]

export default function Features() {
  return (
    <section className="py-12 md:py-20 space-y-12 px-4 md:px-0">
      <div className="text-center space-y-4 animate-in fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Platform</h2>
        <p className="text-base md:text-lg text-white">Three powerful features to help your projects shine</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <div
              key={idx}
              className="group relative p-8 rounded-2xl transition-all duration-500 hover:scale-105"
              style={{
                background: "transparent",
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color}20, transparent)`,
                }}
              ></div>

              {/* Icon with enhanced glow */}
              <div
                className="mb-6 inline-block p-4 rounded-xl group-hover:scale-125 transition-all duration-500 relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`,
                  boxShadow: `0 0 20px ${feature.color}40, inset 0 0 20px ${feature.color}20`,
                }}
              >
                <Icon size={32} style={{ color: feature.color }} className="group-hover:animate-bounce" />
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-3 relative z-10 text-white">{feature.title}</h3>
              <p className="text-sm md:text-base relative z-10 text-white">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
