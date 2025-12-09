"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ApiContentItem } from "@/lib/api/endpoints"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ApiContentItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
          const results = await response.json()
          setSearchResults(results)
        } catch (error) {
          console.error("Search error:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-auto px-4 bg-card border border-border rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative p-6 border-b border-border">
          <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search anime, manga, movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:ring-0 text-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-8 text-center text-muted-foreground">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!isLoading && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">No results found for "{searchQuery}"</div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <div className="divide-y divide-border">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  className="w-full p-4 flex gap-4 hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setSearchQuery("")
                    onClose()
                  }}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <span>{item.year}</span>
                      <span>•</span>
                      <span>{item.studio}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded">
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                      {item.episodes && <span className="text-xs text-muted-foreground">{item.episodes} Episodes</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.genres.map((genre) => (
                        <span key={genre} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!isLoading && searchQuery.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">Start typing to search...</div>
          )}
        </div>
      </div>
    </div>
  )
}
