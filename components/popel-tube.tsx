"use client"

import { useState, useEffect } from "react"
import { Play, Eye, MessageCircle, Globe, Brain, Smartphone, Palette, Server, Database } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

const categories = [
  { id: "WEB", label: "Web", icon: Globe },
  { id: "AI/ML", label: "AI/ML", icon: Brain },
  { id: "MOBILE", label: "Mobile", icon: Smartphone },
  { id: "DESIGN", label: "Design", icon: Palette },
  { id: "BACKEND", label: "Backend", icon: Server },
  { id: "DATA", label: "Data", icon: Database },
]

export default function PopelTube() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  )

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <section className="py-12 md:py-20 space-y-12 px-4 md:px-0">
      <div className="space-y-4 pb-8">
        <h2 className="text-3xl md:text-4xl font-bold animate-in fade-in text-white">Popel Tube</h2>
        <p className="text-base md:text-lg text-white">
          Discover amazing projects showcased by creators in our community
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("all")}
          className="px-5 py-2.5 rounded-full font-semibold transition-all duration-300 border flex items-center gap-2 relative overflow-hidden group"
          style={{
            borderColor: selectedCategory === "all" ? "#a78bfa" : "rgba(139, 92, 246, 0.3)",
            color: "#fff",
            background:
              selectedCategory === "all" ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "rgba(139, 92, 246, 0.08)",
            boxShadow: selectedCategory === "all" ? "0 0 20px rgba(139, 92, 246, 0.4)" : "none",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">All Projects</span>
        </button>

        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="px-5 py-2.5 rounded-full font-semibold transition-all duration-300 border flex items-center gap-2 relative overflow-hidden group hover:scale-110"
              style={{
                borderColor: isActive ? "#a78bfa" : "rgba(139, 92, 246, 0.3)",
                color: "#fff",
                background: isActive ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "rgba(139, 92, 246, 0.08)",
                boxShadow: isActive ? "0 0 20px rgba(139, 92, 246, 0.4)" : "none",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-white">Loading projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl relative"
              style={{
                borderColor: "rgba(139, 92, 246, 0.3)",
                background: "linear-gradient(135deg, rgba(21, 16, 39, 0.4), rgba(11, 6, 20, 0.4))",
              }}
            >
              {/* Thumbnail */}
              <div className="relative h-40 bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center overflow-hidden">
                {project.video_url ? (
                  <video src={project.video_url} className="w-full h-full object-cover" preload="metadata" />
                ) : project.image_url ? (
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Play
                    size={48}
                    className="text-white opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold uppercase px-2.5 py-1 rounded-md border text-white"
                      style={{ background: "rgba(139, 92, 246, 0.3)", borderColor: "rgba(139, 92, 246, 0.5)" }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm md:text-base leading-snug text-white">{project.title}</h3>
                </div>
                <p className="text-xs text-white">{project.description?.substring(0, 60)}...</p>
                <div className="flex gap-4 text-sm text-white">
                  <div className="flex items-center gap-1 group/stat hover:text-purple-300 transition-colors">
                    <Eye size={14} />
                    <span className="group-hover/stat:font-semibold">{project.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1 group/stat hover:text-purple-300 transition-colors">
                    <MessageCircle size={14} />
                    <span className="group-hover/stat:font-semibold">{project.comments || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white">No projects in this category yet. Be the first to publish!</p>
        </div>
      )}
    </section>
  )
}
