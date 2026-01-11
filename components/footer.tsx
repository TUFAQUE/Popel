"use client"

import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer
      className="border-t mt-12 md:mt-20 transition-all duration-300"
      style={{ borderColor: "var(--border-color)", background: "rgba(11, 6, 20, 0.5)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-sm md:text-base" style={{ color: "var(--accent-soft)" }}>
              Popel
            </h4>
            <p style={{ color: "var(--text)" }} className="text-xs md:text-sm leading-relaxed">
              Empowering creators and developers to showcase their ideas.
            </p>
          </div>

          {[
            { title: "Platform", items: ["Publish", "Popel Tube", "Discover"] },
            { title: "Company", items: ["About", "Blog", "Contact"] },
            { title: "Resources", items: ["Docs", "Guide", "Support"] },
          ].map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="font-bold text-sm md:text-base" style={{ color: "var(--accent-soft)" }}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{ color: "var(--text)" }}
                      className="text-xs md:text-sm hover:text-purple-300 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p style={{ color: "var(--text)" }} className="text-xs md:text-sm">
              © 2026 Popel. Built for creators.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="p-2 rounded-lg hover:bg-purple-900 hover:bg-opacity-30 transition-all duration-300 hover:scale-110 social-icon"
                    aria-label={item.label}
                  >
                    <Icon size={20} style={{ color: "var(--accent-soft)" }} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
