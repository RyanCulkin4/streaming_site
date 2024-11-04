'use client'

import { useState } from 'react'
import { Menu, Search, User, Bookmark, ThumbsUp, MessageSquare, Eye, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoggedInHeader } from '@/components/LoggedIn'
import { Footer } from '@/components/Footer'

export default function UserGeneratedContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const videos = [
    {
      id: 1,
      title: "My Favorite Anime Opening Songs Compilation",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: 1500000,
      likes: 75000,
      comments: 3200,
      uploadDate: "2023-08-15",
      duration: "15:30",
      user: {
        name: "AnimeEnthusiast",
        avatar: "/placeholder.svg?height=50&width=50"
      }
    },
    {
      id: 2,
      title: "Top 10 Fight Scenes in Shonen Anime: An In-Depth Analysis of Epic Battles",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: 2000000,
      likes: 100000,
      comments: 5000,
      uploadDate: "2023-08-10",
      duration: "20:45",
      user: {
        name: "ActionAnimeReviewer",
        avatar: "/placeholder.svg?height=50&width=50"
      }
    },
    {
      id: 3,
      title: "Anime Music for Studying and Relaxation",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: 500000,
      likes: 30000,
      comments: 1500,
      uploadDate: "2023-08-05",
      duration: "1:00:00",
      user: {
        name: "AnimeMusician",
        avatar: "/placeholder.svg?height=50&width=50"
      }
    },
    {
      id: 4,
      title: "Cosplay Tutorial: How to Make Anime Armor from Scratch Using Everyday Materials",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: 750000,
      likes: 50000,
      comments: 2800,
      uploadDate: "2023-07-28",
      duration: "25:15",
      user: {
        name: "CosplayMaster",
        avatar: "/placeholder.svg?height=50&width=50"
      }
    },
    {
      id: 5,
      title: "Anime Cooking Challenge: Recreating Iconic Dishes",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: 1200000,
      likes: 80000,
      comments: 4000,
      uploadDate: "2023-07-20",
      duration: "18:50",
      user: {
        name: "AnimeFoodie",
        avatar: "/placeholder.svg?height=50&width=50"
      }
    },
    {
      id: 6,
      title: "Exploring the Art Style of Studio Ghibli: A Deep Dive into Miyazaki's Visual Storytelling Techniques",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      views: 900000,
      likes: 70000,
      comments: 3500,
      uploadDate: "2023-07-15",
      duration: "22:30",
      user: {
        name: "AnimeArtist",
        avatar: "/placeholder.svg?height=50&width=50"
      }
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <LoggedInHeader/>
      {/* Main Content */}
      <main className="flex-grow mt-16 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">User Generated Content</h1>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search for videos..." className="pl-8 bg-gray-800 text-white" />
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="bg-gray-800">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 text-xs rounded">
                      {video.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">
                    <div className="line-clamp-2 h-12">
                      {video.title}
                    </div>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={video.user.avatar} alt={video.user.name} />
                        <AvatarFallback>{video.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{video.user.name}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {video.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {video.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {video.comments.toLocaleString()}
                      </span>
                    </div>
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Uploaded on {video.uploadDate}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}