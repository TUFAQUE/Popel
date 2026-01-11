"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const phrases = [
  "Where Projects Get the Spotlight",
  "Showcase Your Creations",
  "Amplify Your Innovation",
  "Empower Your Ideas",
  "Build Your Legacy",
]

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIndex]
    const delay = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < phrase.length) {
          setDisplayText(phrase.substring(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [displayText, phraseIndex, isDeleting])

  return (
    <section className="min-h-screen flex flex-col justify-center py-12 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600 via-purple-700 to-transparent rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 via-black to-transparent rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-purple-600 via-transparent to-transparent rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="text-center space-y-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light flex items-center justify-center gap-2">
            <span className="italic text-purple-400">Welcome To</span>
            <img src="/images/logo.png" alt="Popel" className="h-12 md:h-16 lg:h-20" />
          </h1>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight min-h-[1.4em] px-4 text-white">
            {displayText}
            <span className="text-purple-400 opacity-75 animate-pulse ml-1">|</span>
          </h2>
        </div>

        <div className="space-y-6 pt-4">
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 font-semibold leading-relaxed text-white">
            Popel is not just a platform. It is a promotion engine for creators. Publish once and we amplify your
            project through showcases, reels, and Popel Tube.
          </p>

          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 leading-relaxed text-white font-medium">
            <span className="block">
              Building a community where talent meets opportunity and dreams become reality.
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 px-4">
          <button className="btn-primary px-8 py-3 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
            <Sparkles size={18} />
            Start Publishing
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 rounded-lg font-semibold text-white border border-purple-500 hover:bg-purple-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
