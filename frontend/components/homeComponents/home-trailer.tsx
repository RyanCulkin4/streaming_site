"use client"

import { use, useCallback, useEffect, useRef, useState } from "react"
import { ChevronRight, Play, ChevronLeft } from "lucide-react"
import type { carouselShowsType } from "../../../shared/types"
import { Button } from "@/components/ui/button"

interface HomeTrailerProps {
  showsPromise: Promise<carouselShowsType[] | null>
}

export default function HomeTrailer({ showsPromise }: HomeTrailerProps) {
  const shows = use(showsPromise)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null)
  const autoTimeout = useRef<NodeJS.Timeout | null>(null)

  const ROTATION_TIME = 8000 // 8s
  const PROGRESS_STEP = 100 / (ROTATION_TIME / 50)
  const TRANSITION_DURATION = 500 // 0.5s

  // Clear both timers and pause
  const handlePause = useCallback(() => {
    setIsPaused(true)
    if (autoTimeout.current) clearTimeout(autoTimeout.current)
    if (progressInterval.current) clearInterval(progressInterval.current)
  }, [])

  // Resume rotation & progress
  const handleResume = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Indicator-specific hover: pause + fill
  const handleIndicatorEnter = useCallback(() => {
    handlePause()
    setProgress(100)
  }, [handlePause])

  // Start/reset progress bar
  const startProgressTimer = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current)
    setProgress(0)

    progressInterval.current = setInterval(() => {
      setProgress((p) => {
        if (p + PROGRESS_STEP >= 100) {
          clearInterval(progressInterval.current!)
          return 100
        }
        return p + PROGRESS_STEP
      })
    }, 50)
  }, [PROGRESS_STEP])

  // Fade → change → fade back → restart progress
  const changeShow = useCallback(
    (newIndex: number) => {
      if (isTransitioning || !shows) return

      setIsTransitioning(true)
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current)

      transitionTimeout.current = setTimeout(() => {
        setCurrentIndex(newIndex)
        setDisplayIndex(newIndex)

        setTimeout(() => {
          setIsTransitioning(false)
          if (!isPaused) startProgressTimer()
        }, 50)
      }, TRANSITION_DURATION)
    },
    [isTransitioning, isPaused, startProgressTimer, shows],
  )

  // Manual nav
  const nextShow = useCallback(
    () => shows && changeShow((currentIndex + 1) % shows.length),
    [changeShow, currentIndex, shows],
  )
  const prevShow = useCallback(
    () => shows && changeShow((currentIndex - 1 + shows.length) % shows.length),
    [changeShow, currentIndex, shows],
  )

  // Single‐timeout auto-rotate effect
  useEffect(() => {
    if (!shows) return

    if (autoTimeout.current) clearTimeout(autoTimeout.current)

    if (!isTransitioning && !isPaused) {
      startProgressTimer()
      autoTimeout.current = setTimeout(() => {
        changeShow((currentIndex + 1) % shows.length)
      }, ROTATION_TIME)
    }

    return () => {
      if (autoTimeout.current) clearTimeout(autoTimeout.current)
    }
  }, [currentIndex, isTransitioning, isPaused, changeShow, startProgressTimer, shows])

  // Sync displayIndex
  useEffect(() => {
    setDisplayIndex(currentIndex)
  }, [currentIndex])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextShow()
      if (e.key === "ArrowLeft") prevShow()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [nextShow, prevShow])

  if (!shows || shows.length === 0) {
    return <p className="p-4 text-destructive">Error loading site data.</p>
  }

  const currentShow = shows[displayIndex]

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${currentShow.image}')`,
            backgroundPosition: "center center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
          <div className="max-w-2xl space-y-6">
            <div
              className={`flex items-center gap-3 transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentShow.badge && (
                <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {currentShow.badge}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-foreground font-semibold">{currentShow.rating.toFixed(1)}</span>
              </div>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              onMouseEnter={handlePause}
              onMouseLeave={handleResume}
            >
              {currentShow.title}
            </h1>

            <div
              className={`flex items-center gap-3 text-muted-foreground transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="text-foreground font-medium">{currentShow.year}</span>
              <span>•</span>
              <span>{currentShow.genres.join(" • ")}</span>
            </div>

            <p
              className={`text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentShow.description}
            </p>

            <div
              className={`flex flex-wrap gap-4 pt-4 transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base"
              >
                <Play className="mr-2 h-5 w-5 fill-current" /> Watch Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-full h-14 w-14 z-10 opacity-0 hover:opacity-100 transition-opacity"
                onClick={nextShow}
                disabled={isTransitioning}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50 rounded-full h-14 w-14 z-10 opacity-0 hover:opacity-100 transition-opacity"
        onClick={prevShow}
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-border/50 rounded-full h-14 w-14 z-10 opacity-0 hover:opacity-100 transition-opacity"
        onClick={nextShow}
        disabled={isTransitioning}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div
        className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10"
        onMouseEnter={handleIndicatorEnter}
        onMouseLeave={handleResume}
      >
        {shows.map((_, idx) => (
          <button
            key={idx}
            className="h-1 rounded-full overflow-hidden relative transition-all duration-300"
            style={{ width: idx === displayIndex ? "3rem" : "1rem" }}
            onClick={() => changeShow(idx)}
            disabled={isTransitioning}
          >
            <div className="absolute inset-0 bg-muted-foreground/30" />
            {idx === displayIndex && (
              <div className="absolute inset-0 origin-left bg-primary" style={{ width: `${progress}%` }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
