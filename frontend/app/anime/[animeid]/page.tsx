'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Plus, Star, Menu, X, Pause, Volume2, VolumeX, ThumbsUp, ThumbsDown, PenSquare, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { format } from 'date-fns'

type Reviews = {
  'reviewid': number,
  'animeid': number,
  'userid': number,
  'ratting': number,
  'review_text': string,
  'review_date': string,
  'likes': number,
  'dislikes': number
}

export default function AnimeShowPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(100)
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const volumeControlRef = useRef<HTMLDivElement>(null)
  const volumeControlTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navItems = ['Home', 'Anime', 'Manga', 'Community', 'Premium']

  const show = {
    title: "Cosmic Explorers",
    description: "In the year 3000, humanity has spread across the galaxy. Follow the adventures of the crew of the starship Nebula as they explore uncharted worlds, encounter alien civilizations, and unravel the mysteries of the universe.",
    rating: 4.7,
    year: 2023,
    seasons: 2,
    episodes: 24,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    status: "Ongoing",
    nextEpisode: "Saturday, 10:00 PM",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    progress: 65,
  }

  const episodes = [
    { number: 1, title: "The Journey Begins", duration: "24:15", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "The crew of the Nebula embarks on their first mission, facing unexpected challenges as they leave Earth's solar system." },
    { number: 2, title: "Strange New Worlds", duration: "23:55", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "Captain Zara Vega and her team encounter a mysterious planet with bizarre physical properties, testing their scientific knowledge and survival skills." },
    { number: 3, title: "The Nebula Incident", duration: "25:10", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "A cosmic anomaly threatens to tear the ship apart, forcing the crew to make difficult decisions that will impact their entire mission." },
    { number: 4, title: "Echoes of the Past", duration: "24:30", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "The discovery of an ancient alien artifact leads to revelations about the history of the galaxy and humanity's place in it." },
    { number: 5, title: "The Quantum Conundrum", duration: "24:45", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "Dr. Elara Nova's experiments with quantum technology have unexpected consequences, altering the fabric of reality around the Nebula." },
    { number: 6, title: "Diplomatic Tensions", duration: "23:50", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "The crew must navigate complex interstellar politics when they become entangled in a conflict between two alien species." },
    { number: 7, title: "The Void's Whisper", duration: "25:05", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "Strange occurrences aboard the ship lead the crew to suspect that something unknown and potentially dangerous has come aboard." },
    { number: 8, title: "Time's Reflection", duration: "24:20", thumbnail: "/placeholder.svg?height=1080&width=1920", description: "A temporal anomaly causes past and future versions of the crew to coexist, challenging their understanding of cause and effect." },
  ]

  const cast = [
    { name: "Aria Starlight", role: "Captain Zara Vega", avatar: "/placeholder.svg?height=96&width=96" },
    { name: "Leo Cosmos", role: "Dr. Elara Nova", avatar: "/placeholder.svg?height=96&width=96" },
    { name: "Orion Nebula", role: "Commander Rigel Orion", avatar: "/placeholder.svg?height=96&width=96" },
  ]

  const animeCompanies = [
    "Sakura Studios",
    "Neon Horizon Entertainment",
    "Mystic Moon Productions",
    "Quantum Anime Network",
    "Yggdrasil Creations",
    "Cyber Samurai Animation",
    "Starlight Visions",
    "Dragonscale Studios",
    "Ethereal Realms Media",
    "Nexus Wave Productions"
  ]

  const reviews: Reviews[] = [
    {
      reviewid: 1,
      animeid: 1,
      userid: 101,
      ratting: 5,
      review_text: "Cosmic Explorers is a mind-blowing journey through space and time. The character development is outstanding, and the plot twists keep you on the edge of your seat. A must-watch for any sci-fi fan!",
      review_date: "2023-09-15T14:30:00Z",
      likes: 120,
      dislikes: 5
    },
    {
      reviewid: 2,
      animeid: 1,
      userid: 102,
      ratting: 4,
      review_text: "While the visuals are stunning and the concept is intriguing, I felt that some episodes dragged a bit. Overall, it's a solid show with great potential for future seasons.",
      review_date: "2023-09-10T09:15:00Z",
      likes: 85,
      dislikes: 12
    },
    {
      reviewid: 3,
      animeid: 1,
      userid: 103,
      ratting: 5,
      review_text: "The world-building in Cosmic Explorers is phenomenal. Each planet and alien species feels unique and well-thought-out. The philosophical questions raised throughout the series add depth to the exciting space adventures.",
      review_date: "2023-09-20T18:45:00Z",
      likes: 150,
      dislikes: 3
    }
  ]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = volume / 100
    }
  }, [isMuted, volume])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setIsVolumeControlVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
    setIsMuted(newVolume[0] === 0)
  }

  const handleVolumeControlEnter = () => {
    setIsVolumeControlVisible(true)
    if (volumeControlTimeoutRef.current) {
      clearTimeout(volumeControlTimeoutRef.current)
    }
  }

  const handleVolumeControlLeave = () => {
    volumeControlTimeoutRef.current = setTimeout(() => {
      setIsVolumeControlVisible(false)
    }, 2000)
  }

  const handleCreateReview = () => {
    // Implement review creation logic here
    console.log("Create review clicked")
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    console.log(`User rated: ${rating} stars`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu Icon */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white md:hidden">
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Website Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-bold text-xl">AnimeFlix</span>
            </Link>

            {/* Navigation Buttons */}
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* User Avatar */}
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Login Banner */}
      {isBannerVisible && (
        <div className="fixed top-16 left-0 right-0 bg-orange-500 text-white py-2 px-4 flex items-center justify-center z-40">
          <p className="text-center flex-grow">You need to login to use all of our site's features</p>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gray-900 text-white transition duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="p-6">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-white">
            <X className="h-6 w-6" />
          </button>
          <nav className="mt-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className={`pt-16 ${isBannerVisible ? 'mt-10' : ''}`}>
        {/* Hero Section with Video Background */}
        <section className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src={show.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{show.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  {show.rating}
                </span>
                <span>{show.year}</span>
                <span>{show.seasons} Seasons</span>
                <span>{show.episodes} Episodes</span>
              </div>
              <div className="flex space-x-4 mb-4">
                {show.genre.map((genre) => (
                  <span key={genre} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 max-w-2xl mb-6">{show.description}</p>
              <div className="flex items-center space-x-4">
                <Button className="bg-white text-black hover:bg-gray-200">
                  <Play className="w-5 h-5 mr-2" />
                  Play
                </Button>
                <Button variant="outline" onClick={handleCreateReview}>
                  <PenSquare className="w-5 h-5 mr-2" />
                  Write a Review
                </Button>
                <Button variant="outline">
                  <Plus className="w-5 h-5 mr-2" />
                  My List
                </Button>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transition-colors duration-200 ease-in-out"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoveredRating || userRating) ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                        fill={star <= userRating ? 'currentColor' : 'none'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Video Controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div
                ref={volumeControlRef}
                className="relative"
                onMouseEnter={handleVolumeControlEnter}
                onMouseLeave={handleVolumeControlLeave}
              >
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div 
                  className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-lg transition-all duration-300 ease-in-out ${
                    isVolumeControlVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <Slider
                    orientation="vertical"
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="h-24"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Show Details */}
        <section className="p-6 md:p-12">
          <Tabs defaultValue="episodes" className="w-full">
            <TabsList>
              <TabsTrigger value="episodes">Episodes</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="cast">Cast</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="episodes">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {episodes.map((episode) => (
                  <div key={episode.number} className="relative group overflow-hidden rounded-lg">
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={episode.thumbnail}
                        alt={`Episode ${episode.number}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg transition-all duration-300 group-hover:blur-sm"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-90 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="text-white">
                        <h3 className="font-semibold text-lg drop-shadow-md">{episode.title}</h3>
                        <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{episode.description}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {episode.duration}
                        </span>
                        <span className="text-white text-lg font-bold drop-shadow-md">
                          Episode {episode.number}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Show Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p>{show.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Next Episode</p>
                    <p>{show.nextEpisode}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Seasons</p>
                    <p>{show.seasons}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Episodes</p>
                    <p>{show.episodes}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Production Company</p>
                    <p>{animeCompanies[0]}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Distributor</p>
                    <p>{animeCompanies[1]}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="cast">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {cast.map((member) => (
                  <div key={member.name} className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.reviewid} className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>U{review.userid}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">User {review.userid}</p>
                          <p className="text-sm text-gray-400">{format(new Date(review.review_date), 'PPP')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`w-5 h-5 ${
                              index < review.ratting ? 'text-yellow-400' : 'text-gray-400'
                            }`}
                            fill={index < review.ratting ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{review.review_text}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {review.likes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        {review.dislikes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Progress Bar */}
        <section className="p-6 md:p-12">
          <h3 className="text-xl font-semibold mb-4">Continue Watching</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Episode 7</span>
              <span>13:45 remaining</span>
            </div>
            <Progress value={show.progress} className="w-full" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/help" className="hover:text-white">Help Center</Link>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            © 2023 AnimeFlix. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  )
}