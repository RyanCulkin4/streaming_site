import React, { useEffect } from 'react'
import { Menu, X, User, Bookmark, Search, Check, Zap, Crown, ThumbsUp, ThumbsDown, Eye, Calendar } from 'lucide-react';
import Image from "next/image";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ScrollHint from './ui/ScrollHint';
import Link from 'next/link';
import { variables } from '@/config';
import { useState } from 'react';
import { Dialog, DialogTrigger, } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginPopup } from './loginPopup';
import { SiteData } from '@/app/api/types/types';

export function LoggedOutHeader() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [visible, setVisible] = useState(true);
    const [isBannerVisible, setIsBannerVisible] = useState(true)

    const [siteData, setSiteData] = useState<SiteData>()


    useEffect(() => {
        const fetchSiteData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/sitedata`);
                const data: SiteData[] = await response.json(); // Expect an array
                setSiteData(data[0]); // Use the first item in the array
            } catch (error) {
                console.error('Failed to fetch Site Data:', error);
            }
        };

        fetchSiteData();
    }, []);

    if (!siteData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (

        <>
            <div className="bg-black text-white">
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
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Website Logo"
                                    width={40}
                                    height={40}
                                    className="mr-2"
                                />

                            </Link>

                            {/* Navigation Buttons */}
                            <nav className="hidden md:flex space-x-4">
                                {siteData.nav_items.map((item) => (
                                    <Link
                                        key={item}
                                        href={`/${item.toLowerCase()}`}
                                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-150 ease-in-out"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </nav>
                            <div className="w-auto h-8">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">Sign Up / Sign In</Button>
                                    </DialogTrigger>
                                    <LoginPopup />
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </header>

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
                            {siteData.nav_items.map((item) => (
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
            </div>
        </>
    )
}

export function LoggedOutSectionOne() {

    return (
        <>
            {/* Section 1 */}
            <section className="scroll-section h-[calc(100vh-4rem)] snap-start flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Link href='/search'>
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        </Link>
                        <Input type="search" placeholder="Search for Something Across our Site" className="pl-8 rounded-full" />
                    </div>

                    {/* Sign In / Up Messy Code */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">Sign Up / Sign In</Button>
                        </DialogTrigger>
                        <LoginPopup />
                    </Dialog>
                </div>
                <ScrollHint />
            </section>
        </>
    )
}

export function LoggedOutSectionTwo() {

    const { popularPolls } = variables();

    return (
        <>
            {/* Section 2 */}
            <section className="scroll-section h-[calc(100vh-4rem)] snap-start flex items-center justify-center p-8">
                <div className="w-full max-w-6xl flex">
                    <div className="w-1/2 pr-8 flex flex-col items-center justify-center text-center">
                        <h2 className="text-3xl font-bold mb-4">With Us Every User's Voice Is Heard</h2>
                        <Separator className="w-1/2 mb-4" />
                        <p className="mb-4">
                            Create and vote on polls, where you can propose any change you want.
                            If enough people support it, we shall make it come true.
                        </p>
                        <Button variant="link" className="text-blue-400">
                            Read poll restrictions HERE
                        </Button>
                    </div>
                    <div className="w-1/2 pl-8">
                        <h3 className="text-2xl font-bold mb-4 text-center">Currently Popular Polls</h3>
                        <ScrollArea className="h-[450px] rounded-md bg-gray-800 p-4">
                            {popularPolls.map((poll) => (
                                <Card key={poll.pollid} className="mb-4 last:mb-0 bg-gray-700 text-white">
                                    <Link href={`/polls/${poll.pollid}`}>
                                        <CardHeader>
                                            <CardTitle>{poll.title}</CardTitle>
                                            <CardDescription className="text-gray-300">{poll.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm text-gray-400">
                                                <span className="flex items-center">
                                                    <ThumbsUp className="w-4 h-4 mr-1" /> {poll.likes}
                                                </span>
                                                <span className="flex items-center">
                                                    <ThumbsDown className="w-4 h-4 mr-1" /> {poll.dislikes}
                                                </span>
                                                <span className="flex items-center">
                                                    <Eye className="w-4 h-4 mr-1" /> {poll.views}
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" /> {poll.date}
                                                </span>
                                                <span>Author: {poll.author}</span>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </ScrollArea>
                    </div>
                </div>
            </section>
        </>
    )
}