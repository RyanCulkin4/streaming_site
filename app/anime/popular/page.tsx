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

const popularAnime: Anime[] = [
  { id: 1, title: "Attack on Titan", genre: "Action", year: 2013, rating: 9.0 },
  { id: 2, title: "Death Note", genre: "Mystery", year: 2006, rating: 9.0 },
  { id: 3, title: "Fullmetal Alchemist: Brotherhood", genre: "Adventure", year: 2009, rating: 9.1 },
  { id: 4, title: "One Punch Man", genre: "Action", year: 2015, rating: 8.8 },
  { id: 7, title: "Demon Slayer", genre: "Action", year: 2019, rating: 8.7 },
  { id: 10, title: "Naruto", genre: "Action", year: 2002, rating: 8.3 },
  // Add more popular anime here...
]

export default function PopularShows() {
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
        <h1 className="text-3xl font-bold my-8">Popular Shows</h1>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {popularAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}