import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Anime, Episodes, Reviews } from '@/app/api/types/types';
import React from 'react';
import { AuthProvider, RunIfLoggedIn, RunIfLoggedOut } from '@/app/api/middleware/userLoggedIn';
import { commentLikeEvent, loadAnime, loadData, loadReviews, websiteInitialLoad, formatTime, formatDate, loadEpisodes } from '@/components/reusableCode';


export const EpisodeSection: React.FC<{ animeData: Anime }> = ({ animeData }) => {

    const [episodesData, setEpisodesData] = useState<Episodes[]>([]);
    const [reviewsData, setReviewsData] = useState<Reviews[] | null>([]);
    const allSeasons = Array.from(new Set(episodesData.map((ep) => ep.seasonid)));
    const [selectedSeason, setSelectedSeason] = useState<number>(1); // Default to the first season
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData([
            () => loadEpisodes(animeData.animeid).then(data => {
                if (data) {
                    setEpisodesData(data)
                }
            }),
            () => loadReviews(animeData.animeid).then(data => {
                if (data) {
                    setReviewsData(data)
                }
            })
        ]).then(() => setLoading(false));
    }, []);

    const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSeason(Number(event.target.value));
    };

    const cast = [
        { name: "Aria Starlight", role: "Captain Zara Vega", avatar: "/placeholder.svg?height=96&width=96", memberid: 1 },
    ];

    console.log(reviewsData)
    return (
        <section className="p-6 md:p-12">
            <Tabs defaultValue="episodes" className="w-full">
                <TabsList>
                    <TabsTrigger value="episodes">Episodes</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="cast">Cast</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="episodes">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allSeasons.length > 1 ? (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                                <h2 className="text-xl font-bold text-white mb-4">
                                    <select
                                        value={selectedSeason}
                                        onChange={handleSeasonChange}
                                        className="ml-2 bg-gray-800 text-white rounded p-1"
                                    >
                                        {allSeasons
                                            .sort((a, b) => a - b) // Sort the array in ascending order
                                            .map((seasonId) => (
                                                <option key={seasonId} value={seasonId}>
                                                    Season {seasonId}
                                                </option>
                                            ))}
                                    </select>
                                </h2>
                            </div>
                        ) : (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                                <h2 className="text-xl font-bold text-white mb-4">
                                    Season 1
                                </h2>
                            </div>
                        )}

                        {/* Render Seasons and their episodes based on selectedSeason */}
                        {episodesData
                            .filter(episode => episode.seasonid === selectedSeason)
                            .sort((a, b) => a.episode_number - b.episode_number)
                            .map((episode) => (
                                <Link key={episode.episodeid} href={`/anime/player/${episode.episodeid}`}>
                                    <div className="relative group">
                                        <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
                                            <Image
                                                src={`/anime/anime_shows/${animeData.animeid}/${episode.seasonid}/${episode.episode_number}thm.jpg`}
                                                alt="Didnt Load"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg transition-all duration-300 group-hover:blur-sm" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-90 transition-opacity duration-300"></div>
                                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                                            <div className="text-white">
                                                <h3 className="font-semibold text-lg drop-shadow-md">{episode.title}</h3>
                                                <p className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{episode.description}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {formatTime(episode.duration)}
                                                </span>
                                                <span className="text-white text-lg font-bold drop-shadow-md">
                                                    Episode  {episode.episode_number_display}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </TabsContent>
                <TabsContent value="details">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Show Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400">Production Company</p>
                                <p>{animeData.studio}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Author</p>
                                <p><div>{Array.isArray(animeData.author_names) && animeData.author_names.join(', ')}</div>
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="cast">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {cast.map((member) => (
                            <Link key={member.memberid} href={`/user/about/${member.memberid}`}>
                                <div className="flex items-center space-x-4">
                                    <Avatar className="w-16 h-16">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{member.name}</p>
                                        <p className="text-sm text-gray-400">{member.role}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="reviews">
                    {reviewsData ?(
                        <div className="space-y-6">
                            {reviewsData.map((review) => (
                                <div key={review.reviewid} className="bg-gray-800 p-6 rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="w-10 h-10">
                                                <AvatarFallback>U{review.userid}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">User {review.userid}</p>
                                                <p className="text-sm text-gray-400">{formatDate(review.review_date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    className={`w-5 h-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                                    fill={index < review.rating ? 'currentColor' : 'none'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-4">{review.review_text}</p>
                                    <div className="flex items-center space-x-4">

                                        <AuthProvider>
                                            <RunIfLoggedIn>
                                                <Button variant="outline" size="sm" onClick={() => commentLikeEvent()}>
                                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                                    {review.likes}
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => commentLikeEvent()}>
                                                    <ThumbsDown className="w-4 h-4 mr-2" />
                                                    {review.dislikes}
                                                </Button>
                                            </RunIfLoggedIn>
                                            <RunIfLoggedOut>
                                                <Button>
                                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                                    {review.likes}
                                                </Button>
                                                <Button>
                                                    <ThumbsDown className="w-4 h-4 mr-2" />
                                                    {review.dislikes}
                                                </Button>
                                            </RunIfLoggedOut>
                                        </AuthProvider>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-white">No Reviews Found</div>
                    )}
                </TabsContent>
            </Tabs>
        </section>

    )
}