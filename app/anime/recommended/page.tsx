'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { AnimeCard } from '../components/AnimeCard'

interface Anime {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
}

const recommendedAnime: Anime[] = [
  { id: 5, title: "Steins;Gate", genre: "Sci-Fi", year: 2011, rating: 9.1 },
  { id: 8, title: "Code Geass", genre: "Mecha", year: 2006, rating: 8.7 },
  { id: 9, title: "Hunter x Hunter", genre: "Adventure", year: 2011, rating: 9.1 },
  { id: 12, title: "Dragon Ball Z", genre: "Action", year: 1989, rating: 8.7 },
  { id: 13, title: "Neon Genesis Evangelion", genre: "Mecha", year: 1995, rating: 8.5 },
  { id: 14, title: "Cowboy Bebop", genre: "Space Western", year: 1998, rating: 8.9 },
  { id: 16, title: "Tokyo Ghoul", genre: "Dark Fantasy", year: 2014, rating: 7.8 },
  { id: 18, title: "Death Parade", genre: "Psychological", year: 2015, rating: 8.2 },
  { id: 20, title: "The Promised Neverland", genre: "Thriller", year: 2019, rating: 8.4 },
  // Add more recommended anime here...
]

export default function Recommended() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-blue-600 p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center">
          <Link href="/anime" className="flex items-center text-white hover:text-gray-300">
            <ChevronLeft className="h-6 w-6 mr-2" />
            Back to Browse
          </Link>
        </div>
      </header>

      <main className="pt-16 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl font-bold my-8">Recommended for You</h1>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recommendedAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}