"use server"
//////////////////////////////// ABOUT THIS CODE ///////////////////////////////
// Designed and Developed by: Ryan C;
// Name: Anime Browse Page
//
// Description: This page allows users to browse and search for anime titles
//              based on various filters such as genre and release year.
//
// Core Features:
// - Search bar for quick title search
// - Sorted into categories: Popular Shows, New Episodes, Recommended for You
//
// Future Improvements:
// - Add calendar view for upcoming releases seamlessly with design
//
////////////////////////////////////// Imports ////////////////////////////////
import { Search, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import Navbar from '@/components/globalComponents/navbar'
import { getData } from '@/lib/helper/getData'
import { AnimePageDataType, ContentRowType } from '../../../shared/types'
import { SearchBar } from './components/search'


export default async function AnimeBrowse() {
    
    const animeData = getData<AnimePageDataType[] | null>(
        "http://api_gateway:3001/api/content/anime"
      );

    const continueWatching = getData<ContentRowType | undefined>(
      "http://api_gateway:3001/api/content/continueWatching"
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="pt-16 px-4 md:px-8 lg:px-16">
                <h1 className="text-3xl font-bold my-8">Anime</h1>

                

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <SearchBar />
                </div>

            </main>
        </div>
    )
}