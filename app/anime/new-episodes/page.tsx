'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimeCard } from '../components/AnimeCard'

interface Anime {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
}

const newEpisodeAnime: Anime[] = [
  { id: 1, title: "Attack on Titan", genre: "Action", year: 2013, rating: 9.0 },
  { id: 6, title: "My Hero Academia", genre: "Superhero", year: 2016, rating: 8.4 },
  { id: 7, title: "Demon Slayer", genre: "Action", year: 2019, rating: 8.7 },
  { id: 11, title: "One Piece", genre: "Adventure", year: 1999, rating: 8.9 },
  { id: 15, title: "Sword Art Online", genre: "Sci-Fi", year: 2012, rating: 7.5 },
  { id: 17, title: "Haikyuu!!", genre: "Sports", year: 2014, rating: 8.7 },
  { id: 19, title: "Mob Psycho 100", genre: "Supernatural", year: 2016, rating: 8.6 },
  // Add more anime with new episodes here...
]

export default function NewEpisodes() {
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
        <h1 className="text-3xl font-bold my-8">New Episodes</h1>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newEpisodeAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}