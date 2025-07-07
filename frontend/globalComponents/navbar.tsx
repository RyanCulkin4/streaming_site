"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Star,
  Crown,
  Zap,
  Heart,
  Bookmark,
  Download,
  History,
  TrendingUp,
} from "lucide-react";

import { useSession, signIn, signOut } from "next-auth/react";
import AuthModal from "./auth-modal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  const averageSelections = {
    adFreeTokens: 200, // Most users choose 200 tokens
    storage: 100, // Most users choose 100GB storage
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-800/50 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                  AnimeVerse
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                href="/anime"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Anime
              </Link>
              <Link
                href="/manga"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Manga
              </Link>
              <Link
                href="/movies"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Movies
              </Link>
              <Link
                href="/community"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Community
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search anime, manga, movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-xl"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <Search className="h-5 w-5" />
              </Button>

              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500 text-white text-xs">
                      3
                    </Badge>
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="User"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-pink-500 to-violet-500 text-white">
                            U
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-gray-800 border-gray-700"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-white">
                            User Name
                          </p>
                          <p className="text-xs leading-none text-gray-400">
                            user@example.com
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Watchlist</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Downloads</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                        <History className="mr-2 h-4 w-4" />
                        <span>History</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                        <Link
                          href="/dashboard"
                          className="flex items-center w-full"
                        >
                          <TrendingUp className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem
                        className="text-gray-300 hover:text-white hover:bg-gray-700"
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
                  <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 rounded-full px-3 py-1">
                    <Crown className="h-4 w-4 text-pink-400" />
                    <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                      Go Premium
                    </span>
                  </div>

                  {/* Login Button */}
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        averageSelections={averageSelections}
      />
    </>
  );
}
