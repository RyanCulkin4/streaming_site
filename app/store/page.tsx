'use client'

import { useState } from 'react'
import { Menu, Search, ShoppingCart, Star, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LoggedInHeader } from '@/components/LoggedIn'
import { Footer } from '@/components/Footer'

export default function StoreListings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const storeItems = [
    {
      id: 1,
      name: "Naruto Shippuden Complete Box Set",
      description: "All episodes of Naruto Shippuden in one collector's edition box set.",
      price: 199.99,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 2,
      name: "Attack on Titan Figurine",
      description: "Limited edition Eren Yeager figurine from Attack on Titan.",
      price: 59.99,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 3,
      name: "My Hero Academia Manga Set",
      description: "Volumes 1-20 of the My Hero Academia manga series.",
      price: 149.99,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 4,
      name: "Dragon Ball Z T-Shirt",
      description: "Official Dragon Ball Z t-shirt featuring Goku.",
      price: 24.99,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 5,
      name: "One Piece Wanted Poster Set",
      description: "Set of 9 wanted posters from One Piece.",
      price: 34.99,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 6,
      name: "Death Note Replica Notebook",
      description: "Replica of the Death Note from the anime series.",
      price: 19.99,
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=200"
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <LoggedInHeader/>
      {/* Main Content */}
      <main className="flex-grow mt-16 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Store Listings</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search items..." className="pl-8 rounded-full bg-gray-800 text-white" />
            </div>
            <div className="flex space-x-4 w-full md:w-auto">
              <Select>
                <SelectTrigger className="w-[180px] bg-gray-800 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="boxsets">Box Sets</SelectItem>
                  <SelectItem value="figurines">Figurines</SelectItem>
                  <SelectItem value="manga">Manga</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="posters">Posters</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-gray-800 text-white">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Store Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeItems.map((item) => (
              <Card key={item.id} className="bg-gray-800 text-white">
                <CardHeader>
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription className="text-gray-400">{item.description}</CardDescription>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                    <span className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      {item.rating}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
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