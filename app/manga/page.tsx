'use client'

import { useState } from 'react'
import { Menu, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { LoggedInHeader } from '@/components/LoggedIn'
import { Footer } from '@/components/Footer'

// Mock data for manga titles
const mangaData = [
  { id: 1, title: "One Piece", genre: "Adventure", author: "Eiichiro Oda", rating: 4.7 },
  { id: 2, title: "Naruto", genre: "Action", author: "Masashi Kishimoto", rating: 4.5 },
  { id: 3, title: "Attack on Titan", genre: "Dark Fantasy", author: "Hajime Isayama", rating: 4.8 },
  { id: 4, title: "Death Note", genre: "Thriller", author: "Tsugumi Ohba", rating: 4.6 },
  { id: 5, title: "My Hero Academia", genre: "Superhero", author: "Kohei Horikoshi", rating: 4.4 },
  { id: 6, title: "Fullmetal Alchemist", genre: "Adventure", author: "Hiromu Arakawa", rating: 4.9 },
  { id: 7, title: "Dragon Ball", genre: "Action", author: "Akira Toriyama", rating: 4.7 },
  { id: 8, title: "Demon Slayer", genre: "Dark Fantasy", author: "Koyoharu Gotouge", rating: 4.8 },
  { id: 9, title: "Tokyo Ghoul", genre: "Dark Fantasy", author: "Sui Ishida", rating: 4.5 },
  { id: 10, title: "Bleach", genre: "Supernatural", author: "Tite Kubo", rating: 4.6 },
  { id: 11, title: "Hunter x Hunter", genre: "Adventure", author: "Yoshihiro Togashi", rating: 4.9 },
  { id: 12, title: "One Punch Man", genre: "Superhero", author: "ONE", rating: 4.8 },
]

export default function MangaListing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("All")
  const [sortBy, setSortBy] = useState("title")

  const filteredManga = mangaData
    .filter(manga => 
      manga.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (genreFilter === "All" || manga.genre === genreFilter)
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const genres = ["All", ...new Set(mangaData.map(manga => manga.genre))]

  const handleMangaClick = (mangaId: number) => {
    // Implement redirection logic here
    console.log(`Redirecting to manga with id: ${mangaId}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <LoggedInHeader/>
      {/* Main Content */}
      <main className="flex-grow mt-16 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Manga Vault</h1>
          
          {/* Search and Filter Section */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search manga titles..."
                className="pl-8 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="focus:bg-blue-600 focus:text-white">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-700">
                <SelectItem value="title" className="focus:bg-blue-600 focus:text-white">Title</SelectItem>
                <SelectItem value="rating" className="focus:bg-blue-600 focus:text-white">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manga Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredManga.map((manga) => (
              <Card 
                key={manga.id} 
                className="bg-gray-800 text-white cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleMangaClick(manga.id)}
              >
                <CardContent className="p-4">
                  <img
                    src={`/placeholder.svg?height=250&width=200&text=${encodeURIComponent(manga.title)}`}
                    alt={`${manga.title} cover`}
                    className="w-full h-[250px] object-cover mb-4 rounded"
                  />
                  <CardTitle className="text-lg mb-2">{manga.title}</CardTitle>
                  <p className="text-sm text-gray-400 mb-1">Author: {manga.author}</p>
                  <p className="text-sm text-gray-400 mb-1">Genre: {manga.genre}</p>
                  <p className="text-sm text-gray-400">Rating: {manga.rating}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}