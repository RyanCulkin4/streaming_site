'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { User, Bookmark, Search, ThumbsUp, ThumbsDown, Eye, Clock, TrendingUp, Star, ShoppingCart, Menu, X } from 'lucide-react';
import Image from "next/image";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import useCheckUserToken from '../app/api/middleware/userLoggedIn';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import queryData from './querydata';
import { Anime, User as Type, Manga, Movies, Videos, Store, Books, Announcements, SubscriptionTiers, Polls, UpcomingReleases, CommunityHighlights, Episodes, Reviews, SiteData } from '@/app/api/types/types';
import Rating from './starRating';


interface LoggedInSectionOneProps { onLoad: () => void; }

export function LoggedInHeader() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const [siteData, setSiteData] = useState<SiteData>();

    const router = useRouter();
    const { isUserLoggedIn, userId } = useCheckUserToken(); // Call oks at the top level of the component

    useEffect(() => {
        const fetchSiteData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const result = await queryData<SiteData>(token, 'website_variables', 'in', ['nav_items', 'important_info'], 1);
                // Check if the result is of type SiteData before setting the state
                setSiteData(result); // Now you can safely set the SiteData

            } catch (error) {
                console.error('Failed to fetch site data:', error);
            }
        };

        fetchSiteData();
    }, []);

    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Loading userId...</p>
            </div>
        );
    }

    if (!siteData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Loading siteData...</p>
            </div>
        );
    }

    const handleUserButtonPress = () => {
        if (isUserLoggedIn) {
            router.push(`/users/settings`);
        } else {
            setIsBannerVisible(true); // Show banner if user is not logged in
        }
    };

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-gradient-to-b bg-blue-600 to-transparent z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Hamburger Menu Icon */}
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white md:hidden">
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image
                                src=""
                                alt="Website Logo"
                                width={40}
                                height={40}
                                className="mr-2"
                            />
                        </Link>

                        {/* Navigation Buttons */}
                        <nav className="hidden md:flex space-x-4">
                            {Array.isArray(siteData) && Array.isArray(siteData[0].nav_items) && siteData[0].nav_items.map((item: string) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>

                        {/* User and Cart Icons */}
                        <div className="w-auto h-8">
                            <div className="flex items-center space-x-4 ml-auto">
                                <button onClick={() => { /* Handle shopping cart */ }} className="ghost-button">
                                    <ShoppingCart className="h-6 w-6" />
                                    <span className="sr-only">Shopping cart</span>
                                </button>
                                <Link href="/bookmarks">
                                    <Bookmark className="h-6 w-6 text-yellow-400" />
                                </Link>
                                <User onClick={handleUserButtonPress} className="h-9 w-6 hover:text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Login Reminder Banner */}
            {isBannerVisible && (
                <div className="fixed top-16 left-0 right-0 bg-orange-500 text-white py-2 px-4 flex items-center justify-center z-40">
                    <p className="text-center flex-grow">You need to login to use all of our site's features!</p>
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
                className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } w-64 bg-gray-900 text-white transition duration-300 ease-in-out z-50 md:hidden`}
            >
                <div className="p-6">
                    <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-white">
                        <X className="h-6 w-6" />
                    </button>
                    <nav className="mt-8">
                        {Array.isArray(siteData?.nav_items) && siteData.nav_items.map((item) => (
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
        </>
    );
}


export const LoggedInSectionOne: React.FC<LoggedInSectionOneProps> = ({ onLoad }) => {

    const [animeData, setAnimeData] = useState<Anime[]>([]);
    const [upcomingReleases, setUpcomingReleases] = useState<UpcomingReleases[]>([]); // Assuming Release is a defined type
    const [communityHighlights, setCommunityHighlights] = useState<CommunityHighlights[]>([]); // Assuming Release is a defined type

    useEffect(() => {
        const fetchAnimeData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const result = await queryData<Anime[]>(token, 'anime', 'ex', ['none'], 8);
                // Check if the result is of type SiteData before setting the state
                setAnimeData(result); // Now you can safely set the SiteData

            } catch (error) {
                console.error('Failed to fetch site data:', error);
            }
        };

        fetchAnimeData();
    }, []);

    useEffect(() => {
        const loadTimeout = setTimeout(() => {
            onLoad(); // Notify that loading is complete
        }, 1000);

        return () => clearTimeout(loadTimeout);
    }, [onLoad]);

    function formatNumber(num: number): string {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1) + 'B';
        }
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + 'M';
        }
        if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    if (!animeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Loading ...</p>
            </div>
        );
    }


    //scroll-section p-4 snap-start flex-col items-center justify-center h-[calc(100vh-4rem)] 
    return (
        <>
            <section className="scroll-section h-[calc(100vh-4rem)] snap-start flex flex-col items-center p-3">
                <div className="w-full">
                    <div className="mb-4">
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search for Something across our site . . "
                                className="pl-8 pr-8 rounded-full text-center"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Left Column - Upcoming Releases */}
                        <div className="w-[15%] pl-1">
                            <Card className="bg-gray-800">
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-bold mb-4 text-center">Upcoming Releases</h3>
                                    <ul className="space-y-2">
                                        {upcomingReleases.map((release, index) => (
                                            <Link href={`/DO_SOMTHING_HERE/${index}`}>
                                                <li key={index} className="text-sm">
                                                    <span className="font-semibold">{release.title}</span>
                                                    <br />
                                                    <span className="text-gray-400">{new Date(release.date).toLocaleDateString()}</span>
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Middle Column - Shows */}
                        <div className="w-[70%]">
                            <Tabs defaultValue="recent" className="mb-8">
                                <TabsList className="grid w-full grid-cols-3 bg-blue-600">
                                    <TabsTrigger value="recent" className="data-[state=active]:bg-blue-700">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Recent
                                    </TabsTrigger>
                                    <TabsTrigger value="trending" className="data-[state=active]:bg-blue-700">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Trending
                                    </TabsTrigger>
                                    <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-700">
                                        <Star className="w-4 h-4 mr-2" />
                                        Favorites
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="recent">
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        {animeData.map((item) => (
                                            <Card key={item.animeid} className="bg-gray-800 overflow-hidden group"> {/* Use animeid as the key */}
                                                <CardContent className="p-0 relative">
                                                    <Link href={`/anime/${item.animeid}`}><div className="relative aspect-[2/3]">
                                                        <img src={`/anime/anime_key_visuals/${item.animeid}.jpg`} alt={item.romaji_title} className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm" />
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-white overflow-y-auto">
                                                            <div className="absolute top-0 left-0 right-0 p-2">
                                                                <p className="text-lg font-bold mb-2 text-center text-white">{item.romaji_title}</p>
                                                                <div className="text-xs text-gray-300 text-center">
                                                                    {item.genre.map((item2) => (
                                                                        <span key={item2} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                                                                            {item2}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-sm mb-2 line-clamp-6 leading-7">{item.description}</p>
                                                            </div>
                                                            <div className=" absolute bottom-12 flex items-center text-sm mb-1">
                                                                ({formatNumber(item.anime_ratings)}) &nbsp;
                                                                <Rating average_rating={item.average_rating} />
                                                            </div>
                                                            <p className="absolute bottom-0 text-sm mt-1">Released: {new Date(item.release_date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="trending">
                                    <p className="text-center">Content for trending anime would go here.</p>
                                </TabsContent>
                                <TabsContent value="favorites">
                                    <p className="text-center">Your favorite anime would be displayed here.</p>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Right Column - Community Highlights */}
                        <div className="w-[15%] pr-1">
                            <Card className="bg-gray-800">
                                <CardContent className="p-4">
                                    <h3 className="text-xl font-bold mb-4 text-center">Community Highlights</h3>
                                    <ul className="space-y-4">
                                        {communityHighlights.map((highlight, index) => (
                                            <Link href={`/DO_SOMETHING_HERE/${index}`}>
                                                <li key={index} className="text-sm">
                                                    <p className="font-semibold">{highlight.title}</p>
                                                    <p className="text-gray-400">by {highlight.author}</p>
                                                    <p className="text-gray-400">
                                                        {highlight.likes && `${highlight.likes.toLocaleString()} likes`}
                                                        {highlight.comments && `${highlight.comments.toLocaleString()} comments`}
                                                        {highlight.views && `${highlight.views.toLocaleString()} views`}
                                                    </p>
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export function LoggedInSectionTwo() {
    const [sortBy, setSortBy] = useState<string>('likes')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [progressFilter, setProgressFilter] = useState<string>('all')
    const [polls, setPolls] = useState<Polls[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPollData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const result = await queryData<Polls[]>(token, 'polls', 'ex', ['none'], 10);
                // Check if the result is of type SiteData before setting the state
                setPolls(result); // Now you can safely set the SiteData
                setIsLoading(false)

            } catch (error) {
                console.error('Failed to fetch site data:', error);
            }
        };

        fetchPollData();
    }, []);

    const filteredAndSortedPolls = polls
        .filter(poll => categoryFilter === 'all' || poll.category === categoryFilter)
        .filter(poll => statusFilter === 'all' || poll.status === statusFilter)
        .filter(poll => progressFilter === 'all' || poll.progress === progressFilter)
        .sort((a, b) => {
            if (sortBy === 'likes') return b.likes - a.likes
            if (sortBy === 'views') return b.views - a.views
            if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime()
            if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime()
            return 0
        })

    return (
        <section className="scroll-section h-[calc(100vh-4rem)] snap-start p-8">
            <div className="min-h-screen text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center">Popular Polls</h1>
                    <div className="bg-gray-900 rounded-lg p-6 h-">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div>
                                <label htmlFor="sort-select" className="block text-sm font-medium text-gray-400 mb-2">Sort by</label>
                                <Select onValueChange={(value) => setSortBy(value)}>
                                    <SelectTrigger id="sort-select" className="w-full bg-gray-800 text-white border-gray-700">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                                        <SelectItem value="newest" className="focus:bg-gray-700 focus:text-white">Newest to Oldest</SelectItem>
                                        <SelectItem value="oldest" className="focus:bg-gray-700 focus:text-white">Oldest to Newest</SelectItem>
                                        <SelectItem value="likes" className="focus:bg-gray-700 focus:text-white">Most Likes</SelectItem>
                                        <SelectItem value="views" className="focus:bg-gray-700 focus:text-white">Most Views</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="category-select" className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                <Select onValueChange={(value) => setCategoryFilter(value)}>
                                    <SelectTrigger id="category-select" className="w-full bg-gray-800 text-white border-gray-700">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                                        <SelectItem value="all" className="focus:bg-gray-700 focus:text-white">All Categories</SelectItem>
                                        <SelectItem value="Anime" className="focus:bg-gray-700 focus:text-white">Anime</SelectItem>
                                        <SelectItem value="Manga" className="focus:bg-gray-700 focus:text-white">Manga</SelectItem>
                                        <SelectItem value="Videos" className="focus:bg-gray-700 focus:text-white">Videos</SelectItem>
                                        <SelectItem value="Website" className="focus:bg-gray-700 focus:text-white">Website</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="status-select" className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                                <Select onValueChange={(value) => setStatusFilter(value)}>
                                    <SelectTrigger id="status-select" className="w-full bg-gray-800 text-white border-gray-700">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                                        <SelectItem value="all" className="focus:bg-gray-700 focus:text-white">All Statuses</SelectItem>
                                        <SelectItem value="In Voting" className="focus:bg-gray-700 focus:text-white">In Voting</SelectItem>
                                        <SelectItem value="Passed" className="focus:bg-gray-700 focus:text-white">Passed</SelectItem>
                                        <SelectItem value="Failed" className="focus:bg-gray-700 focus:text-white">Failed</SelectItem>
                                        <SelectItem value="Vetoed" className="focus:bg-gray-700 focus:text-white">Vetoed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="progress-select" className="block text-sm font-medium text-gray-400 mb-2">Progress</label>
                                <Select onValueChange={(value) => setProgressFilter(value)}>
                                    <SelectTrigger id="progress-select" className="w-full bg-gray-800 text-white border-gray-700">
                                        <SelectValue placeholder="Progress" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                                        <SelectItem value="all" className="focus:bg-gray-700 focus:text-white">All Progress</SelectItem>                                        <SelectItem value="In Queue" className="focus:bg-gray-700 focus:text-white">In Queue</SelectItem>
                                        <SelectItem value="In Progress" className="focus:bg-gray-700 focus:text-white">In Progress</SelectItem>
                                        <SelectItem value="Completed" className="focus:bg-gray-700 focus:text-white">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {isLoading ? (
                                <p className="text-center">Loading polls...</p>
                            ) : error ? (
                                <p className="text-center text-red-500">{error}</p>
                            ) : filteredAndSortedPolls.length === 0 ? (
                                <p className="text-center">No polls found matching the current filters.</p>
                            ) : (
                                filteredAndSortedPolls.map((poll) => (
                                    <div key={poll.pollid} className="p-6 bg-gray-800 rounded-lg">
                                        <Link href={`/polls/${poll.pollid}`} className="font-semibold text-xl mb-2 hover:text-blue-400">{poll.title}</Link>
                                        <p className="text-base text-gray-400 mb-4">{poll.description}</p>
                                        <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
                                            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                                <span className="flex items-center"><ThumbsUp className="w-5 h-5 mr-2" /> {poll.likes}</span>
                                                <span className="flex items-center"><ThumbsDown className="w-5 h-5 mr-2" /> {poll.dislikes}</span>
                                                <span className="flex items-center"><Eye className="w-5 h-5 mr-2" /> {poll.views}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-2 py-1 rounded text-xs ${poll.status === 'Passed' ? 'bg-green-800 text-green-200' :
                                                    poll.status === 'Failed' ? 'bg-red-800 text-red-200' :
                                                        poll.status === 'Vetoed' ? 'bg-yellow-800 text-yellow-200' :
                                                            'bg-blue-800 text-blue-200'
                                                    }`}>
                                                    {poll.status}
                                                </span>
                                                <span className={`px-2 py-1 rounded text-xs ${poll.progress === 'In Progress' ? 'bg-blue-800 text-blue-200' :
                                                    poll.progress === 'In Queue' ? 'bg-purple-800 text-purple-200' :
                                                        poll.progress === 'Completed' ? 'bg-green-800 text-green-200' :
                                                            'bg-gray-700 text-gray-300'
                                                    }`}>
                                                    {poll.progress}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <span>by {poll.author} on {new Date(poll.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}