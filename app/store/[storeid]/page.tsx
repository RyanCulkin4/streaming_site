'use client'

import { useState } from 'react'
import { Menu, ShoppingCart, Star, Minus, Plus, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ProductDetail() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = {
    id: 1,
    name: "Naruto Shippuden Complete Box Set",
    description: "Experience the entire Naruto Shippuden saga with this comprehensive collector's edition box set. Follow Naruto Uzumaki's journey as he strives to become the strongest ninja and protect his friends and village.",
    price: 199.99,
    rating: 4.8,
    reviews: 1250,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    details: [
      { label: "Format", value: "DVD" },
      { label: "Region", value: "Region 1 (U.S. and Canada)" },
      { label: "Number of Discs", value: "72" },
      { label: "Studio", value: "VIZ Media" },
      { label: "Release Date", value: "October 4, 2022" },
      { label: "Run Time", value: "Approximately 308 hours" },
    ],
    features: [
      "Complete Naruto Shippuden series (Episodes 1-500)",
      "High-quality video and audio",
      "Original Japanese audio with English subtitles",
      "English dub",
      "Special features including behind-the-scenes content",
      "Exclusive art book",
    ],
  }

  const relatedProducts = [
    { id: 2, name: "Naruto Manga Box Set", price: 129.99, image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Naruto Headband", price: 14.99, image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Naruto Poster Set", price: 24.99, image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="bg-blue-600 p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="Website Logo" className="h-8 w-8 mr-4" />
            <Button variant="ghost" size="icon" className="lg:hidden mr-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          <nav className="hidden lg:flex space-x-4 justify-center flex-grow">
            {['Anime', 'Manga', 'Movies', 'Videos', 'Storage', 'Store'].map((item) => (
              <a key={item} href="#" className="hover:text-gray-300">{item}</a>
            ))}
          </nav>
          <div className="flex items-center space-x-4 ml-auto">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden bg-blue-600 p-4 fixed top-16 left-0 right-0 z-40">
          <nav className="flex flex-col space-y-2">
            {['Anime', 'Manga', 'Movies', 'Videos', 'Storage', 'Store'].map((item) => (
              <a key={item} href="#" className="hover:text-gray-300">{item}</a>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-grow mt-16 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src={product.images[0]} alt={product.name} className="w-full h-auto rounded-lg mb-4" />
              <div className="flex justify-center space-x-4">
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`${product.name} view ${index + 1}`} className="w-20 h-20 rounded-md cursor-pointer" />
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-400'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>
              <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
              <p className="mb-6">{product.description}</p>
              <div className="flex items-center mb-6">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))} 
                  className="w-16 mx-2 text-center bg-gray-800"
                />
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-4 mb-6">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-transparent"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" className="mt-8">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="bg-gray-800 p-4 rounded-b-lg">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.details.map((detail, index) => (
                  <div key={index}>
                    <dt className="font-semibold">{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
            <TabsContent value="features" className="bg-gray-800 p-4 rounded-b-lg">
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="bg-gray-800 p-4 rounded-b-lg">
              <p>Reviews content would go here. This could include a list of user reviews, ratings, and a form to submit a new review.</p>
            </TabsContent>
          </Tabs>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="bg-gray-800 rounded-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is this box set region-free?</AccordionTrigger>
                <AccordionContent>
                  No, this box set is Region 1 encoded, which means it's designed for use in the United States and Canada. You'll need a region-free DVD player to watch it in other parts of the world.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does this include English dub?</AccordionTrigger>
                <AccordionContent>
                  Yes, this box set includes both the original Japanese audio with English subtitles and an English dub.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Are there any special features included?</AccordionTrigger>
                <AccordionContent>
                  Yes, the box set includes special features such as behind-the-scenes content and an exclusive art book.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-blue-400">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 p-4 mt-8">
        <nav className="flex justify-center items-center space-x-4">
          {['About Us', 'Values', 'Employees', 'Careers', 'Contact Us'].map((item, index) => (
            <span key={item} className="flex items-center">
              <a href="#" className="hover:text-blue-400">{item}</a>
              {index < 4 && <span className="mx-2 text-gray-600">|</span>}
            </span>
          ))}
        </nav>
      </footer>
    </div>
  )
}