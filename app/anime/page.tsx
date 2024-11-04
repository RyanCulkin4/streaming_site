'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LoggedInHeader } from '@/components/LoggedIn'
import { AnimeCard } from './components/AnimeCard'

interface Anime {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  isPopular?: boolean;
  hasNewEpisode?: boolean;
  isRecommended?: boolean;
}

const animeData: Anime[] = [
  { id: 1, title: "Attack on Titan", genre: "Action", year: 2013, rating: 9.0, isPopular: true, hasNewEpisode: true },
  { id: 2, title: "Death Note", genre: "Mystery", year: 2006, rating: 9.0, isPopular: true },
  { id: 3, title: "Fullmetal Alchemist: Brotherhood", genre: "Adventure", year: 2009, rating: 9.1, isPopular: true },
  { id: 4, title: "One Punch Man", genre: "Action", year: 2015, rating: 8.8, isPopular: true },
  { id: 5, title: "Steins;Gate", genre: "Sci-Fi", year: 2011, rating: 9.1, isRecommended: true },
  { id: 6, title: "My Hero Academia", genre: "Superhero", year: 2016, rating: 8.4, hasNewEpisode: true },
  { id: 7, title: "Demon Slayer", genre: "Action", year: 2019, rating: 8.7, isPopular: true, hasNewEpisode: true },
  { id: 8, title: "Code Geass", genre: "Mecha", year: 2006, rating: 8.7, isRecommended: true },
  { id: 9, title: "Hunter x Hunter", genre: "Adventure", year: 2011, rating: 9.1, isRecommended: true },
  { id: 10, title: "Naruto", genre: "Action", year: 2002, rating: 8.3, isPopular: true },
  { id: 11, title: "One Piece", genre: "Adventure", year: 1999, rating: 8.9, hasNewEpisode: true },
  { id: 12, title: "Dragon Ball Z", genre: "Action", year: 1989, rating: 8.7, isRecommended: true },
  { id: 13, title: "Neon Genesis Evangelion", genre: "Mecha", year: 1995, rating: 8.5, isRecommended: true },
  { id: 14, title: "Cowboy Bebop", genre: "Space Western", year: 1998, rating: 8.9, isRecommended: true },
  { id: 15, title: "Sword Art Online", genre: "Sci-Fi", year: 2012, rating: 7.5, hasNewEpisode: true },
  { id: 16, title: "Tokyo Ghoul", genre: "Dark Fantasy", year: 2014, rating: 7.8, isRecommended: true },
  { id: 17, title: "Haikyuu!!", genre: "Sports", year: 2014, rating: 8.7, hasNewEpisode: true },
  { id: 18, title: "Death Parade", genre: "Psychological", year: 2015, rating: 8.2, isRecommended: true },
  { id: 19, title: "Mob Psycho 100", genre: "Supernatural", year: 2016, rating: 8.6, hasNewEpisode: true },
  { id: 20, title: "The Promised Neverland", genre: "Thriller", year: 2019, rating: 8.4, isRecommended: true },
]

interface AnimeRowProps {
  title: string;
  animes: Anime[];
  link: string;
}

const AnimeRow: React.FC<AnimeRowProps> = ({ title, animes, link }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4 flex items-center">
      {title}
      <Link href={link} className="ml-2 hover:text-blue-400 transition-colors">
        <ChevronRight className="h-6 w-6" />
      </Link>
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {animes.map(anime => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  </div>
)

export default function AnimeBrowse() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('title')

  const filteredAnime = animeData
    .filter(anime => 
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === 'all' || anime.genre === selectedGenre)
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'year') return b.year - a.year
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })
 
  const genres = ['all', ...new Set(animeData.map(anime => anime.genre))]

  return (
    <div className="min-h-screen bg-black text-white">
      <LoggedInHeader/>
      <main className="pt-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl font-bold my-8">Browse Anime</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anime..."
              className="pl-8 rounded-full bg-gray-800 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full md:w-[180px] bg-gray-800 text-white">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {genres.map(genre => (
                <SelectItem 
                  key={genre} 
                  value={genre} 
                  className="hover:bg-blue-600 hover:text-white transition-colors"
                >
                  {genre === 'all' ? 'All Genres' : genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-800 text-white">
                Sort By <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white">
              <DropdownMenuItem onClick={() => setSortBy('title')} className="hover:bg-blue-600 hover:text-white transition-colors">Title</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('year')} className="hover:bg-blue-600 hover:text-white transition-colors">Year</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('rating')} className="hover:bg-blue-600 hover:text-white transition-colors">Rating</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <AnimeRow title="Popular Shows" animes={animeData.filter(anime => anime.isPopular).slice(0, 6)} link="/anime/popular" />
          <AnimeRow title="New Episodes" animes={animeData.filter(anime => anime.hasNewEpisode).slice(0, 6)} link="/anime/new-episodes" />
          <AnimeRow title="Recommended for You" animes={animeData.filter(anime => anime.isRecommended).slice(0, 6)} link="/anime/recommended" />

          <h2 className="text-2xl font-bold my-8">All Anime</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}