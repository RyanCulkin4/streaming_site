"use client"
//////////////////////////////// ABOUT THIS CODE ///////////////////////////////
// Designed and Developed by: Ryan C;
// Name: Anime Browse Page Search Bar
//
// Description: This component provides a search bar and filters for browsing anime titles
//
// Core Features:
// - Search bar for quick title search
// - Genre filter dropdown
// - Sort by options (Title, Year, Rating)
//
////////////////////////////////////// Imports ////////////////////////////////
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from 'react'


export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('all')
    const [sortBy, setSortBy] = useState('title')
    //const genres = ['all', ...new Set(animeData.map(anime => anime.genre))]

    return (
        <div>
            <div className="relative flex-grow">

                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search anime..."
                    className="pl-8 rounded-full bg-gray-800 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

    );
}