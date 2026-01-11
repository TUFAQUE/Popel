"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import PopelTube from "@/components/popel-tube"
import Publish from "@/components/publish"
import Footer from "@/components/footer"
import FloatingAIButton from "@/components/floating-ai-button"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero />
            <Features />
          </>
        )
      case "tube":
        return <PopelTube />
      case "publish":
        return <Publish />
      default:
        return <Hero />
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "radial-gradient(circle at 50% 0%, rgba(26, 16, 51, 0.8), rgba(11, 6, 20, 1))",
      }}
    >
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">{renderPage()}</main>
      <Footer />
      <FloatingAIButton />
    </div>
  )
}
