"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Zap } from "lucide-react"

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "tube", label: "Popel Tube" },
    { id: "publish", label: "Publish" },
  ]

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-500"
      style={{
        borderColor: "var(--border-color)",
        background: "rgba(10, 10, 15, 0.7)",
        boxShadow: "0 4px 30px rgba(139, 92, 246, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Popel Logo"
            className="h-8 md:h-10 hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`nav-link text-sm font-semibold ${
                currentPage === item.id ? "active text-white" : "text-white hover:text-purple-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Auth Links */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/signin" className="nav-link px-4 py-2 text-sm font-semibold text-white hover:text-purple-300">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="btn-primary px-6 py-2.5 rounded-lg text-sm font-semibold text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Zap size={16} />
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-purple-400 transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 animate-in fade-in slide-in-from-top-2 space-y-3"
          style={{ borderColor: "var(--border-color)" }}
        >
          <nav className="flex flex-col gap-3 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`px-4 py-2.5 rounded-lg font-semibold transition-all text-left ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white"
                    : "text-white hover:text-purple-300 hover:bg-purple-900 hover:bg-opacity-30"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t pt-4" style={{ borderColor: "var(--border-color)" }}>
            <Link
              href="/signin"
              className="px-4 py-2.5 rounded-lg font-semibold text-white hover:text-purple-300 text-center transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="btn-primary px-4 py-2.5 rounded-lg font-semibold text-white text-center transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
