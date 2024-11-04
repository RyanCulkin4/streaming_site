'use client'

import { useState, Suspense } from 'react'
import { Menu, Search, User, Bookmark, Grid, List, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from 'next/dynamic'
import { LoggedInHeader } from '@/components/LoggedIn'
import { Footer } from '@/components/Footer'

const ShowCard = dynamic(() => import('./components/show-card'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

export default function BookmarksPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'type'>('date')
  const [filterType, setFilterType] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Mock data for bookmarked media
  /*const bookmarkedMedia = [
    { id: 1, title: "Attack on Titan", type: "Anime", date: "2023-08-15", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Rq7JZTSK5Rv89rBwS7pzBAAchgPYTn.png", description: "A dark fantasy series about humanity's fight against man-eating giants.", likes: 15000, dislikes: 500, author: "Hajime Isayama", genre: 'Horror'},
    { id: 2, title: "One Piece", type: "Manga", date: "2023-08-10", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Rq7JZTSK5Rv89rBwS7pzBAAchgPYTn.png", description: "An adventure manga about a young pirate's quest to become the Pirate King.", likes: 20000, dislikes: 300, author: "Eiichiro Oda", genre: 'Horror'},
    { id: 3, title: "Your Name", type: "Movie", date: "2023-07-28", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Rq7JZTSK5Rv89rBwS7pzBAAchgPYTn.png", description: "A romantic fantasy film about two teenagers who swap bodies.", likes: 18000, dislikes: 200, author: "Makoto Shinkai" , genre: 'Horror'},
    { id: 4, title: "My Hero Academia", type: "Anime", date: "2023-08-05", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Rq7JZTSK5Rv89rBwS7pzBAAchgPYTn.png", description: "A superhero anime series set in a world where most people have superpowers.", likes: 17000, dislikes: 400, author: "Kohei Horikoshi" , genre: 'Horror'},
    { id: 5, title: "Death Note", type: "Manga", date: "2023-08-20", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Rq7JZTSK5Rv89rBwS7pzBAAchgPYTn.png", description: "A psychological thriller manga about a high school student who discovers a supernatural notebook.", likes: 19000, dislikes: 350, author: "Tsugumi Ohba" , genre: 'Horror'},
    { id: 6, title: "Spirited Away", type: "Movie", date: "2023-07-15", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Rq7JZTSK5Rv89rBwS7pzBAAchgPYTn.png", description: "An animated fantasy film about a young girl's adventures in a spirit world.", likes: 21000, dislikes: 150, author: "Hayao Miyazaki" },
    // Add more items to test pagination...
  ]*/

  const mediaTypes = ['All', ...new Set(bookmarkedMedia.map(media => media.type))]

  const filteredAndSortedMedia = bookmarkedMedia
    .filter(media => filterType === 'All' || media.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'type') return a.type.localeCompare(b.type)
      return 0
    })

  const totalPages = Math.ceil(filteredAndSortedMedia.length / itemsPerPage)
  const currentPageItems = filteredAndSortedMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
    <LoggedInHeader/>
      {/* Main Content */}
      <main className="flex-grow mt-16 p-4">
        <div className="container mx-auto">
          {/* Search, Sort, and Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search bookmarks..." className="pl-8 bg-gray-800 text-white" />
            </div>
            <div className="flex space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-gray-800 text-white">
                    Filter: {filterType} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white">
                  {mediaTypes.map((type) => (
                    <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Bookmarked Media */}
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {currentPageItems.map((media) => (
                <Suspense key={media.id} fallback={<div className="h-64 bg-gray-800 animate-pulse rounded-lg"></div>}>
                  <ShowCard media={media} />
                </Suspense>
              ))}
            </div>
          </ScrollArea>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-800 text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-gray-800 text-white"
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}