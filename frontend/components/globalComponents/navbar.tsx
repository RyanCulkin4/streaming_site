"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Star,
  Crown,
  Zap,
  Heart,
  Bookmark,
  Download,
  History,
  TrendingUp,
} from "lucide-react"

import AuthModal from "./auth-modal"
import SearchModal from "../homeComponents/search-modal"

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const averageSelections = {
    adFreeTokens: 200,
    storage: 100,
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="h-6 w-6 text-primary-foreground fill-current" />
                </div>
                <span className="text-2xl font-bold text-foreground tracking-tight">KokoroTV</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/anime"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Anime
              </Link>
              <Link
                href="/manga"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Manga
              </Link>
              <Link
                href="/movies"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Movies
              </Link>
              <Link
                href="/community"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
              >
                Community
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search anime, manga, movies..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setIsSearchModalOpen(true)
                  }}
                  onFocus={() => setIsSearchModalOpen(true)}
                  className="pl-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 rounded-full h-12 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-card"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-foreground hover:bg-card"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs border-0">
                      3
                    </Badge>
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-border">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            U
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-semibold leading-none text-foreground">User Name</p>
                          <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border" />
                      <DropdownMenuItem className="text-foreground hover:text-foreground hover:bg-muted">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:text-foreground hover:bg-muted">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:text-foreground hover:bg-muted">
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Watchlist</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:text-foreground hover:bg-muted">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Downloads</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:text-foreground hover:bg-muted">
                        <History className="mr-2 h-4 w-4" />
                        <span>History</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border" />
                      <DropdownMenuItem className="text-foreground hover:text-foreground hover:bg-muted">
                        <Link href="/dashboard" className="flex items-center w-full">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground hover:text-foreground hover:bg-muted">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border" />
                      <DropdownMenuItem
                        className="text-foreground hover:text-foreground hover:bg-muted"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Premium Badge */}
                  <div className="hidden sm:flex items-center space-x-2 bg-secondary/50 border border-border rounded-full px-4 py-2 hover:bg-secondary transition-colors cursor-pointer">
                    <Crown className="h-4 w-4 text-foreground" />
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Go Premium</span>
                  </div>

                  {/* Login Button */}
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                  >
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Sign In</span>
                    </div>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        averageSelections={averageSelections}
      />
    </>
  )
}