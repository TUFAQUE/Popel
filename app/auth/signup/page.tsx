"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { ArrowRight, Mail, Lock } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        console.error("[v0] SignUp error:", signUpError)
        throw signUpError
      }

      if (data?.user) {
        router.push("/auth/check-email")
      }
    } catch (err: any) {
      console.error("[v0] Error:", err)
      setError(err?.message || "An error occurred during sign up. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err: any) {
      console.error("[v0] Google sign up error:", err)
      setError(err?.message || "Failed to sign up with Google")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "radial-gradient(circle at top, #1a1033, #0b0614)" }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/images/logo.png" alt="Popel" className="h-10 mx-auto mb-6" />
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Join Popel</h1>
          <p className="text-white">Create an account to start showcasing your projects</p>
        </div>

        <div
          className="rounded-2xl border p-6 md:p-8 mb-6"
          style={{
            borderColor: "rgba(139, 92, 246, 0.3)",
            background: "linear-gradient(135deg, rgba(21, 16, 39, 0.8), rgba(11, 6, 20, 0.8))",
          }}
        >
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-purple-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white"
                  style={{
                    borderColor: "rgba(139, 92, 246, 0.3)",
                    background: "rgba(15, 10, 30, 0.8)",
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-purple-400" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white"
                  style={{
                    borderColor: "rgba(139, 92, 246, 0.3)",
                    background: "rgba(15, 10, 30, 0.8)",
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-purple-400" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all text-white"
                  style={{
                    borderColor: "rgba(139, 92, 246, 0.3)",
                    background: "rgba(15, 10, 30, 0.8)",
                  }}
                  required
                />
              </div>
            </div>

            {error && <div className="p-3 rounded-lg bg-red-500 bg-opacity-10 text-red-400 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500 border-opacity-30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-white">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full py-2.5 rounded-lg font-semibold text-white border border-purple-500 hover:bg-purple-900 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-white">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
