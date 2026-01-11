"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, Chrome } from "lucide-react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in:", { email, password })
  }

  return (
    <div
      style={{ background: "radial-gradient(circle at top, #1a1033, #0b0614)" }}
      className="min-h-screen flex flex-col"
    >
      <header
        className="border-b px-6 md:px-8 py-4"
        style={{ borderColor: "var(--border-color)", background: "rgba(11, 6, 20, 0.8)" }}
      >
        <Link href="/" className="inline-block">
          <img src="/images/logo.png" alt="Popel Logo" className="h-10 md:h-12" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
              Welcome Back
            </h1>
            <p style={{ color: "var(--muted)" }}>Sign in to your Popel account</p>
          </div>

          <div
            className="p-8 rounded-2xl border space-y-6"
            style={{
              borderColor: "var(--border-color)",
              background: "linear-gradient(135deg, rgba(21, 16, 39, 0.8), rgba(11, 6, 20, 0.8))",
            }}
          >
            <button
              className="w-full py-3 px-4 rounded-lg border font-semibold flex items-center justify-center gap-2 hover:bg-purple-900 hover:bg-opacity-20 transition-all"
              style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
            >
              <Chrome size={20} />
              Continue with Google
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center" style={{ borderColor: "var(--border-color)" }}>
                <div className="w-full border-t" style={{ borderColor: "var(--border-color)" }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2"
                  style={{
                    background: "linear-gradient(135deg, rgba(21, 16, 39, 0.8), rgba(11, 6, 20, 0.8))",
                    color: "var(--muted)",
                  }}
                >
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--accent-soft)" }}>
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-purple-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--border-color)",
                      background: "rgba(15, 10, 30, 0.8)",
                      color: "var(--text)",
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold" style={{ color: "var(--accent-soft)" }}>
                    Password
                  </label>
                  <Link href="#" className="text-sm text-purple-400 hover:text-purple-300">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-purple-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--border-color)",
                      background: "rgba(15, 10, 30, 0.8)",
                      color: "var(--text)",
                    }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:shadow-lg transition-all"
                style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
              >
                Sign In
              </button>
            </form>

            <p style={{ color: "var(--muted)" }} className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
