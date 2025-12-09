"use server"
//////////////////////////////// ABOUT THIS CODE ///////////////////////////////
// Designed and Developed by: Ryan C;
// Name: Anime Browse Page UI Components
//
// Description: This file contains reusable UI components for the Anime Browse Page
//
// Core Features:
// - AnimeCard: Displays individual anime details
// - AnimeRow: Displays a row of AnimeCards with a title and link
//
////////////////////////////////////// Imports ////////////////////////////////
import { ChevronRight } from "lucide-react";
import Link from 'next/link'

////////////////////////////////////// Interfaces //////////////////////////////

interface Anime {
    id: number;
    title: string;
    genre: string;
    year: number;
    rating: number;
    isPopular?: boolean;
    hasNewEpisode?: boolean;
    isRecommended?: boolean;
}

interface AnimeRowProps {
    title: string;
    animes: Anime[];
    link: string;
}

////////////////////////////////////// Exported Components //////////////////////////////

export const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
        <img
            src={`/placeholder.svg?height=225&width=150&text=${encodeURIComponent(anime.title)}`}
            alt={anime.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="font-semibold text-sm mb-1 line-clamp-1">{anime.title}</h3>
            <p className="text-xs text-gray-400">{anime.genre}</p>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>{anime.year}</span>
                <span>★ {anime.rating.toFixed(1)}</span>
            </div>
        </div>
    </div>
)

export const AnimeRow: React.FC<AnimeRowProps> = ({ title, animes, link }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
            {title}
            <Link href={link} className="ml-2 hover:text-blue-400 transition-colors">
                <ChevronRight className="h-6 w-6" />
            </Link>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animes.map(anime => (
                <AnimeCard key={anime.id} anime={anime} />
            ))}
        </div>
    </div>
)
