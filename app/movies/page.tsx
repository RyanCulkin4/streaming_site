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

// Mock data for movies
const movieData = [
  { id: 1, title: "My Hero Academia: Two Heroes", genre: "Superhero", director: "Kenji Nagasaki", rating: 4.5, duration: "96 min" },
  { id: 2, title: "Your Name", genre: "Romance", director: "Makoto Shinkai", rating: 4.8, duration: "106 min" },
  { id: 3, title: "Demon Slayer: Mugen Train", genre: "Action", director: "Haruo Sotozaki", rating: 4.7, duration: "117 min" },
  { id: 4, title: "Spirited Away", genre: "Fantasy", director: "Hayao Miyazaki", rating: 4.9, duration: "125 min" },
  { id: 5, title: "One Piece Film: Red", genre: "Adventure", director: "Goro Taniguchi", rating: 4.6, duration: "115 min" },
  { id: 6, title: "A Silent Voice", genre: "Drama", director: "Naoko Yamada", rating: 4.7, duration: "130 min" },
  { id: 7, title: "Dragon Ball Super: Broly", genre: "Action", director: "Tatsuya Nagamine", rating: 4.5, duration: "100 min" },
  { id: 8, title: "Weathering with You", genre: "Fantasy", director: "Makoto Shinkai", rating: 4.6, duration: "112 min" },
  { id: 9, title: "Jujutsu Kaisen 0", genre: "Supernatural", director: "Sunghoo Park", rating: 4.7, duration: "105 min" },
  { id: 10, title: "The Girl Who Leapt Through Time", genre: "Sci-Fi", director: "Mamoru Hosoda", rating: 4.5, duration: "98 min" },
  { id: 11, title: "Akira", genre: "Sci-Fi", director: "Katsuhiro Otomo", rating: 4.7, duration: "124 min" },
  { id: 12, title: "Princess Mononoke", genre: "Fantasy", director: "Hayao Miyazaki", rating: 4.8, duration: "134 min" },
]

export default function MovieListing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("All")
  const [sortBy, setSortBy] = useState("title")

  const filteredMovies = movieData
    .filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (genreFilter === "All" || movie.genre === genreFilter)
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const genres = ["All", ...new Set(movieData.map(movie => movie.genre))]

  const handleMovieClick = (movieId: number) => {
    // Implement redirection logic here
    console.log(`Redirecting to movie with id: ${movieId}`)
  }

  return (
    <>
      <LoggedInHeader />
      {/* Main Content */}
      <main className="flex-grow mt-16 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Movie Collection</h1>

          {/* Search and Filter Section */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movie titles..."
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

          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="bg-gray-800 text-white cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleMovieClick(movie.id)}
              >
                <CardContent className="p-4">
                  <img
                    src={`/placeholder.svg?height=300&width=200&text=${encodeURIComponent(movie.title)}`}
                    alt={`${movie.title} poster`}
                    className="w-full h-[300px] object-cover mb-4 rounded"
                  />
                  <CardTitle className="text-lg mb-2">{movie.title}</CardTitle>
                  <p className="text-sm text-gray-400 mb-1">Director: {movie.director}</p>
                  <p className="text-sm text-gray-400 mb-1">Genre: {movie.genre}</p>
                  <p className="text-sm text-gray-400 mb-1">Duration: {movie.duration}</p>
                  <p className="text-sm text-gray-400">Rating: {movie.rating}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}