"use client"

import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"

export default function CheckEmailPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "radial-gradient(circle at top, #1a1033, #0b0614)" }}
    >
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full" style={{ background: "rgba(139, 92, 246, 0.2)" }}>
              <CheckCircle size={48} style={{ color: "var(--accent)" }} />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Check Your Email
          </h1>
          <p style={{ color: "var(--text)" }} className="text-base">
            We've sent you a confirmation link to verify your email address.
          </p>
        </div>

        <div
          className="rounded-2xl border p-6 md:p-8 mb-6 space-y-4"
          style={{
            borderColor: "var(--border-color)",
            background: "linear-gradient(135deg, rgba(21, 16, 39, 0.8), rgba(11, 6, 20, 0.8))",
          }}
        >
          <div className="flex justify-center mb-4">
            <Mail size={32} style={{ color: "var(--accent-soft)" }} />
          </div>
          <p style={{ color: "var(--text)" }} className="text-sm md:text-base">
            Click the link in your email to complete your registration and start showcasing your projects on Popel.
          </p>
          <p style={{ color: "var(--muted)" }} className="text-xs md:text-sm">
            If you don't see the email, check your spam folder.
          </p>
        </div>

        <Link
          href="/auth/signin"
          className="inline-block px-6 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:shadow-lg transition-all duration-300"
          style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
