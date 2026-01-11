"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, User, Chrome } from "lucide-react"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign up:", formData)
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
              Join Popel
            </h1>
            <p style={{ color: "var(--muted)" }}>Create your account and start publishing</p>
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
              Sign up with Google
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
                  Or sign up with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--accent-soft)" }}>
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3.5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--accent-soft)" }}>
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-purple-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--accent-soft)" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-purple-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                <label className="block text-sm font-semibold mb-2" style={{ color: "var(--accent-soft)" }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-purple-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                Create Account
              </button>
            </form>

            <p style={{ color: "var(--muted)" }} className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
