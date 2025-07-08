"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight, Play, Info, ChevronLeft } from "lucide-react";
import type { carouselShowsType } from "@shared-types/*";
import { Button } from "@/components/ui/button";

interface HomeTrailerProps {
  showsPromise: Promise<carouselShowsType[] | null>;
}

export default function HomeTrailer({ showsPromise }: HomeTrailerProps) {
  const shows = use(showsPromise);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);
  const autoTimeout = useRef<NodeJS.Timeout | null>(null);

  const ROTATION_TIME = 8000; // 8s
  const PROGRESS_STEP = 100 / (ROTATION_TIME / 50);
  const TRANSITION_DURATION = 500; // 0.5s

  if (!shows) {
    return <p className="p-4 text-red-400">Error loading site data.</p>;
  }


  // Clear both timers and pause
    const handlePause = useCallback(() => {
      setIsPaused(true);
      if (autoTimeout.current) clearTimeout(autoTimeout.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    }, []);
  
    // Resume rotation & progress
    const handleResume = useCallback(() => {
      setIsPaused(false);
    }, []);
  
    // Indicator-specific hover: pause + fill
    const handleIndicatorEnter = useCallback(() => {
      handlePause();
      setProgress(100);
    }, [handlePause]);
  
    // Start/reset progress bar
    const startProgressTimer = useCallback(() => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      setProgress(0);
  
      progressInterval.current = setInterval(() => {
        setProgress((p) => {
          if (p + PROGRESS_STEP >= 100) {
            clearInterval(progressInterval.current!);
            return 100;
          }
          return p + PROGRESS_STEP;
        });
      }, 50);
    }, [PROGRESS_STEP]);
  
    // Fade → change → fade back → restart progress
    const changeShow = useCallback(
      (newIndex: number) => {
        if (isTransitioning) return;
  
        setIsTransitioning(true);
        if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
  
        transitionTimeout.current = setTimeout(() => {
          setCurrentIndex(newIndex);
          setDisplayIndex(newIndex);
  
          setTimeout(() => {
            setIsTransitioning(false);
            if (!isPaused) startProgressTimer();
          }, 50);
        }, TRANSITION_DURATION);
      },
      [isTransitioning, isPaused, startProgressTimer]
    );
  
    // Manual nav
    const nextShow = useCallback(
      () => changeShow((currentIndex + 1) % shows.length),
      [changeShow, currentIndex, shows.length]
    );
    const prevShow = useCallback(
      () => changeShow((currentIndex - 1 + shows.length) % shows.length),
      [changeShow, currentIndex, shows.length]
    );
  
    // Single‐timeout auto-rotate effect
    useEffect(() => {
      if (autoTimeout.current) clearTimeout(autoTimeout.current);
  
      if (!isTransitioning && !isPaused) {
        startProgressTimer();
        autoTimeout.current = setTimeout(() => {
          changeShow((currentIndex + 1) % shows.length);
        }, ROTATION_TIME);
      }
  
      return () => {
        if (autoTimeout.current) clearTimeout(autoTimeout.current);
      };
    }, [
      currentIndex,
      isTransitioning,
      isPaused,
      changeShow,
      startProgressTimer,
      shows.length,
    ]);
  
    // Sync displayIndex
    useEffect(() => {
      setDisplayIndex(currentIndex);
    }, [currentIndex]);
  
    // Keyboard nav
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") nextShow();
        if (e.key === "ArrowLeft") prevShow();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [nextShow, prevShow]);
  
    const currentShow = shows[displayIndex];

  return (
    <>
      <div className="relative h-full w-full overflow-hidden">
        {/* Background & fade */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${currentShow.image}')`,
              backgroundPosition: "center 20%",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/80 via-indigo-900/60 to-transparent" />
          </div>
        </div>

        {/* Content — shifted left, only wraps data */}
        <div
          className="absolute top-1/2 left-12 transform -translate-y-1/2 w-full max-w-3xl space-y-4 px-6 md:px-12 lg:px-24"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
        >
          <div
            className={`flex items-center transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentShow.badge && (
              <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                {currentShow.badge}
              </span>
            )}
            <span className="text-yellow-400 text-sm">
              ★ {currentShow.rating}/10
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentShow.title}
          </h1>

          <div
            className={`flex items-center space-x-2 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="text-white/80 text-sm">{currentShow.year}</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80 text-sm">
              {currentShow.genres.join(", ")}
            </span>
          </div>

          <p
            className={`text-lg md:text-xl text-gray-200 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentShow.description}
          </p>

          <div
            className={`flex flex-wrap gap-4 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <Button className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-6">
              <Play className="mr-2 h-5 w-5" /> Watch Trailer
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 font-medium px-6 py-6"
            >
              <Info className="mr-2 h-5 w-5" /> More Info
            </Button>
          </div>
        </div>

        {/* Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full h-12 w-12 z-10"
          onClick={prevShow}
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full h-12 w-12 z-10"
          onClick={nextShow}
          disabled={isTransitioning}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Indicators — pause on hover, fill to 100% */}
        <div
          className="absolute bottom-24 left-0 right-0 flex justify-center space-x-2"
          onMouseEnter={handleIndicatorEnter}
          onMouseLeave={handleResume}
        >
          {shows.map((_, idx) => (
            <button
              key={idx}
              className="h-2 rounded-full overflow-hidden relative transition-all"
              style={{ width: idx === displayIndex ? "4rem" : "0.5rem" }}
              onClick={() => changeShow(idx)}
              disabled={isTransitioning}
            >
              <div className="absolute inset-0 bg-white/50" />
              {idx === displayIndex && (
                <div
                  className="absolute inset-0 origin-left bg-pink-500"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
