"use client"

import type React from "react"
import { useState } from "react"
import { Upload, LinkIcon } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

const categories = ["WEB", "AI/ML", "MOBILE", "DESIGN", "BACKEND", "DATA"]

export default function Publish() {
  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    description: "",
    category: "WEB",
    link: "",
  })

  const [video, setVideo] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string>("")
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  )

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideo(file)
      const preview = URL.createObjectURL(file)
      setVideoPreview(preview)
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
      const preview = URL.createObjectURL(file)
      setThumbnailPreview(preview)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Please sign in to publish a project")
        setLoading(false)
        return
      }

      let videoUrl = null
      let imageUrl = null

      // Upload video if provided
      if (video) {
        const videoPath = `${user.id}/${Date.now()}-video.mp4`
        const { error: videoError } = await supabase.storage.from("project-videos").upload(videoPath, video)

        if (videoError) throw videoError

        const { data: publicData } = supabase.storage.from("project-videos").getPublicUrl(videoPath)
        videoUrl = publicData.publicUrl
      }

      // Upload thumbnail if provided
      if (thumbnail) {
        const imagePath = `${user.id}/${Date.now()}-thumbnail.jpg`
        const { error: imageError } = await supabase.storage.from("project-thumbnails").upload(imagePath, thumbnail)

        if (imageError) throw imageError

        const { data: publicData } = supabase.storage.from("project-thumbnails").getPublicUrl(imagePath)
        imageUrl = publicData.publicUrl
      }

      // Insert project into database
      const { error: insertError } = await supabase.from("projects").insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          user_id: user.id,
          video_url: videoUrl,
          image_url: imageUrl,
          views: 0,
          comments: 0,
        },
      ])

      if (insertError) throw insertError

      setSuccess(true)
      setFormData({ title: "", creator: "", description: "", category: "WEB", link: "" })
      setVideo(null)
      setThumbnail(null)
      setVideoPreview("")
      setThumbnailPreview("")

      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error("Error publishing project:", err)
      setError(err?.message || "Error publishing project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 space-y-12 px-4 md:px-0">
      <div className="space-y-4 pb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Publish Your Project</h2>
        <p className="text-base md:text-lg text-white">Share your creation with our community and get discovered</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400">
            Project published successfully! Check Popel Tube to see it.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400">{error}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl backdrop-blur-sm"
          style={{
            borderColor: "rgba(139, 92, 246, 0.3)",
            background: "linear-gradient(135deg, rgba(21, 16, 39, 0.4), rgba(11, 6, 20, 0.4))",
            border: "1px solid rgba(139, 92, 246, 0.3)",
          }}
        >
          {/* Project Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 text-white"
              style={{
                borderColor: "rgba(139, 92, 246, 0.3)",
                background: "rgba(15, 10, 30, 0.6)",
                color: "#fff",
              }}
              required
            />
          </div>

          {/* Creator Name & Category */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Your Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.creator}
                onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 text-white"
                style={{
                  borderColor: "rgba(139, 92, 246, 0.3)",
                  background: "rgba(15, 10, 30, 0.6)",
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-white">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 text-white"
                style={{
                  borderColor: "rgba(139, 92, 246, 0.3)",
                  background: "rgba(15, 10, 30, 0.6)",
                }}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Description</label>
            <textarea
              placeholder="Tell us about your project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 min-h-28 resize-none transition-all duration-300 text-white"
              style={{ borderColor: "rgba(139, 92, 246, 0.3)", background: "rgba(15, 10, 30, 0.6)" }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Upload Video</label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all hover:border-purple-500"
              style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
            >
              <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="video-upload" />
              <label htmlFor="video-upload" className="cursor-pointer block">
                {videoPreview ? (
                  <div className="space-y-2">
                    <video src={videoPreview} className="w-full h-32 object-cover rounded" />
                    <p className="text-sm font-semibold text-white">Video selected</p>
                  </div>
                ) : (
                  <div className="py-6 space-y-2">
                    <Upload size={32} className="mx-auto text-purple-400" />
                    <p className="text-white">Click to upload video</p>
                    <p className="text-xs text-white">MP4, WebM (Max 100MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Upload Thumbnail</label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all hover:border-purple-500"
              style={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer block">
                {thumbnailPreview ? (
                  <div className="space-y-2">
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail"
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="text-sm font-semibold text-white">Thumbnail selected</p>
                  </div>
                ) : (
                  <div className="py-6 space-y-2">
                    <Upload size={32} className="mx-auto text-purple-400" />
                    <p className="text-white">Click to upload thumbnail</p>
                    <p className="text-xs text-white">PNG, JPG (Max 5MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Project Link (Optional)</label>
            <div className="relative">
              <LinkIcon size={18} className="absolute left-3 top-3.5 text-purple-400" />
              <input
                type="url"
                placeholder="https://..."
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 text-white"
                style={{
                  borderColor: "rgba(139, 92, 246, 0.3)",
                  background: "rgba(15, 10, 30, 0.6)",
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 duration-300 disabled:opacity-50"
            style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
          >
            <Upload size={20} />
            {loading ? "Publishing..." : "Publish Project"}
          </button>
        </form>
      </div>
    </section>
  )
}
