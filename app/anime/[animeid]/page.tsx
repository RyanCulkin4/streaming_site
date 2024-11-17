'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Star, Pause, Volume2, VolumeX, BookmarkPlus, BookmarkMinus, BookmarkCheck, BookOpen, ThumbsUp, ThumbsDown, MessageSquarePlus, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { LoggedInHeader } from '@/components/LoggedIn';
import { Anime, Episodes } from '@/app/api/types/types';
import React from 'react';
import { AuthProvider, RunIfLoggedIn, RunIfLoggedOut } from '@/app/api/middleware/userLoggedIn';
import { LoggedOutHeader } from '@/components/LoggedOut';
import { Footer } from '@/components/Footer';
import { EpisodeSection } from '../../../components/episodeSection';
import { handleCreateReview, handleRating, isLoggedIn, loadActivity, loadAnime, loadData, loadEpisode, loadRating, togglePlay, useKeyPress } from '@/components/reusableCode';
import { BookmarkButton } from '@/components/bookmarkButton';
import { useParams } from 'next/navigation';
import { StarButton } from '@/components/starButton';

export default function ShowPage() {
    const params = useParams();
    const animeid = Number(params.animeid);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [animeData, setAnimeData] = useState<Anime | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hoveredRating, setHoveredRating] = useState(0)
    const [loading, setLoading] = useState(true)
    const [userid, setUserid] = useState<number | undefined>()
    const [episodeData, setEpisodeData] = useState<Episodes>()
    const [resumeEpisodeDisplay, setResumeEpisodeDisplay] = useState<number>()
    const [watchedShow, setWatchedShow] = useState<boolean>(false)

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const userId = await isLoggedIn();
            setUserid(userId);
        };

        checkUserLoggedIn(); // Call to check if the user is logged in
    }, []); // This runs only once when the component mounts

    useEffect(() => {
        const fetchData = async () => {
            if (userid !== undefined) {
                // If logged in, fetch both anime data and user activity
                try {
                    const animeData = await loadAnime(animeid);

                    if (animeData) {
                        setAnimeData(animeData);
                        const activityData = await loadActivity(userid, animeData.type, animeData.animeid);
                        if (activityData) {
                            setEpisodeData(activityData);
                            if (activityData.seasonid && activityData.episodeid) {
                                setWatchedShow(true);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error loading data:", error);
                }
            } else {
                // If not logged in, only load anime data
                try {
                    const animeData = await loadAnime(animeid);

                    if (animeData) {
                        setAnimeData(animeData);

                        const episodeDatalocal = await loadEpisode(animeData.animeid);
                        if (episodeDatalocal) {
                            setResumeEpisodeDisplay(1);
                            setEpisodeData(episodeDatalocal);
                        }
                    }
                } catch (error) {
                    console.error("Error loading data:", error);
                }
            }

            setLoading(false);
        };

        fetchData();
    }, [userid, animeid]); // Trigger effect when `userid` or `animeid` changes


    // Space key to toggle play/pause
    useKeyPress(' ', () => {
        if (videoRef.current) {
            isPlaying ? videoRef.current.pause() : videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    });

    // 'M' key to toggle mute
    useKeyPress('m', () => {
        setIsMuted(!isMuted);
    });

    const playPressed = async (userid: number, mediatype: string, contentid: number) => {
        // Algorithm to get latest show to display

        try {
            const response = await fetch(`http://localhost:3001/user/activity/${userid}/${contentid}/${mediatype}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json(); // Parse the response as JSON
            return data; // Return the parsed array of episode objects
        } catch (error) {

        }

    }

    if (loading || !episodeData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-black text-white">
                <AuthProvider>
                    <RunIfLoggedIn>
                        <LoggedInHeader />
                    </RunIfLoggedIn>
                    <RunIfLoggedOut>
                        <LoggedOutHeader />
                    </RunIfLoggedOut>
                </AuthProvider>
                <main>
                    {animeData ? (
                        <>
                            <section className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                <div className="absolute inset-0">
                                    <video
                                        ref={videoRef}
                                        className="h-full object-cover"
                                        autoPlay
                                        loop
                                        muted={isMuted}
                                        playsInline
                                    >
                                        <source src={`/anime/anime_trailers/1.mp4`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                    <div className="absolute bottom-28 left-0 right-0 p-6 md:p-12">
                                        <h1 className="text-4xl md:text-6xl font-bold mb-2">{animeData.romaji_title}</h1>
                                        <div className="flex items-center space-x-4 mb-4">
                                            <span className="flex items-center">
                                                {animeData.native_title}
                                                {animeData.rating}
                                            </span>
                                            <span>{animeData.release_season} {animeData.release_year}</span>
                                            <span>{animeData.total_seasons} Seasons</span>
                                            <span>{animeData.total_episodes} Episodes</span>
                                        </div>
                                        <div className="flex space-x-4 mb-4">
                                            {Array.isArray(animeData.genre) && animeData.genre.map((genre) => (
                                                <span key={genre} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-gray-300 max-w-2xl mb-6">{animeData.description}</p>
                                        <div className="flex space-x-4">

                                            {userid ? ( // User Logged In
                                                <>
                                                    {watchedShow === true ? ( // User has watched the show
                                                        <Link href={`/anime/player/${episodeData.episodeid}`}>
                                                            <Button onClick={() => playPressed(userid, animeData.type, animeData.animeid)} className="bg-white text-black hover:bg-gray-200">
                                                                <Play />
                                                                Resume S{episodeData.season_number_display}E{episodeData.episode_number_display}
                                                            </Button>
                                                        </Link>
                                                    ) : ( // User has not watched the show
                                                        <Link href={`/anime/player/${episodeData.episodeid}`}>
                                                            <Button onClick={() => playPressed(userid, animeData.type, animeData.animeid)} className="bg-white text-black hover:bg-gray-200">
                                                                <Play />
                                                                Play S1E1
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </>
                                            ) : ( // User Not Logged In
                                                <Link href={`/anime/player/${episodeData.episodeid}`}>
                                                    <Button className="bg-white text-black hover:bg-gray-200">
                                                        <Play />
                                                        Play S1E1
                                                    </Button>
                                                </Link>
                                            )}
                                            <AuthProvider>
                                                <RunIfLoggedIn>
                                                    <Button onClick={handleCreateReview}>
                                                        <MessageSquarePlus />
                                                    </Button>
                                                </RunIfLoggedIn>
                                            </AuthProvider>
                                            {animeData.manga_id_reference ? (
                                                <Button>
                                                    <Link href={`/manga/${animeData.manga_id_reference}`}>
                                                        <BookOpen className="text-gray-400" />
                                                    </Link>
                                                </Button>
                                            ) : null}
                                            <AuthProvider>
                                                <RunIfLoggedIn>
                                                    <BookmarkButton animeid={animeData.animeid} userid={userid} animetype={animeData.type} />
                                                </RunIfLoggedIn>
                                            </AuthProvider>
                                            <AuthProvider>
                                                <RunIfLoggedIn>
                                                    <StarButton
                                                        animeid={animeid}
                                                        userid={userid}
                                                    />
                                                </RunIfLoggedIn>
                                            </AuthProvider>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-36 right-4 flex space-x-2">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={() => togglePlay(videoRef, setIsPlaying, isPlaying)}
                                            aria-label={isPlaying ? "Pause" : "Play"}
                                        >
                                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={() => setIsMuted(!isMuted)}
                                            aria-label={isMuted ? "Unmute" : "Mute"}
                                        >
                                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </section>
                            <EpisodeSection animeData={animeData} />
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p>Loading video...</p>
                        </div>
                    )}
                </main>
                <Footer />
            </div >
        </>
    );
}