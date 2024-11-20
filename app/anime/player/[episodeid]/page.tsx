'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Play, Star, ThumbsUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AuthProvider, RunIfLoggedIn, RunIfLoggedOut } from '@/app/api/middleware/userLoggedIn';
import { LoggedOutHeader } from '@/components/LoggedOut';
import { LoggedInHeader } from '@/components/LoggedIn';
import { EpisodeSection } from '../../../../components/episodeSection';
import { Footer } from '@/components/Footer';
import { Anime, Episodes } from '@/app/api/types/types';
import { isLoggedIn, loadAnime, loadAnimeFromEpisodeid, loadData, loadEpisode, loadEpisodes, websiteInitialLoad } from '@/components/reusableCode';
import { BookmarkButton } from '@/components/bookmarkButton';
import { VideoPlayer } from '@/components/VideoPlayer';
import { StarButton } from '@/components/starButton';

export default function AnimePlayer() {
  // Inherited Params
  const params = useParams();
  const episodeid = Number(params.episodeid);

  // Page Variables
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [animeData, setAnimeData] = useState<Anime | undefined>();
  const [userid, setUserid] = useState<number | undefined>()
  const [currentTime, setCurrentTime] = useState(0);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [episodeData, setEpisodeData] = useState<Episodes | null>(null);

  // Is User Logged In?
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userId = await isLoggedIn();
      setUserid(userId);
    };

    checkUserLoggedIn(); // Call to check if the user is logged in
  }, []); // This runs only once when the component mounts


  useEffect(() => {
    loadAnimeFromEpisodeid(episodeid).then(data => {
      if (data) {
        setAnimeData(data)
      }
    })
    loadEpisode(episodeid).then(data => {
      if (data) {
        setEpisodeData(data)
      }
    })
  }, [episodeid]);


  // Mouse Movment Logic
  useEffect(() => {
    const handleMouseMove = () => {
      setIsControlsVisible(true);
      document.body.style.cursor = 'default';
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
        document.body.style.cursor = 'none';
      }, 5000);
    };

    const handleMouseLeave = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setIsControlsVisible(false);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    playerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      playerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      document.body.style.cursor = 'default';
    };
  }, [isPlaying, isMuted]);

  // Ensure we Have the Data neede
  if (!animeData) {

    console.log('Anime Data:', animeData)

    return (
      <div>
        Loading animeData ...
      </div>
    );
  }

  if (!episodeData) {
    console.log('Episode Data:', episodeData)
    return (
      <div>
        Loading episodeData ...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">

        <header
          ref={headerRef}
          className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
          <AuthProvider>
            <RunIfLoggedOut>
              <LoggedOutHeader />
            </RunIfLoggedOut>
            <RunIfLoggedIn>
              <LoggedInHeader />
            </RunIfLoggedIn>
          </AuthProvider>
        </header>
        {/* Main Content */}
        <main>
          {/* Video Player */}
          <VideoPlayer animeData={animeData} episodeData={episodeData} isControlsVisible={isControlsVisible} />
          {/* Anime Details */}
          <section className="p-6 md:p-12">
            <h1 className="text-4xl font-bold mb-2">{animeData.native_title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span>{animeData.total_episodes} Seasons</span>
              <span>{animeData.total_episodes} Episodes</span>
            </div>
            <div className="flex space-x-4 mb-4">
              {animeData.genre.map((genre) => (
                <span key={genre} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-gray-300 max-w-3xl mb-6">{animeData.description}</p>
            <div className="flex items-center space-x-4">
              <Button className="bg-white text-black hover:bg-gray-200">
                <Play className="w-5 h-5 mr-2" />
                Play
              </Button>
              <AuthProvider>
                <RunIfLoggedIn>
                  <BookmarkButton animeid={animeData.animeid} userid={userid} animetype={animeData.type} />
                </RunIfLoggedIn>
              </AuthProvider>
              <StarButton
                animeid={animeData.animeid}
                userid={userid}
              />
            </div>
          </section>

          <EpisodeSection animeData={animeData} />
          <Footer />
        </main >
        {/* Overlay for mobile menu */}
        {
          isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
          )
        }
      </div >
    </>
  )
}