"use client";

import { ChevronRight } from "lucide-react";
import { use } from "react";
import type { ContentRowType } from "@shared-types/*";
import ContentRow from "./content-row.client";

interface BrowseContentProps {
  popularAnimePromise: Promise<ContentRowType | null>;
  popularMoviesPromise: Promise<ContentRowType| null>;
  trendingMangaPromise: Promise<ContentRowType| null>;
  continueWatchingPromise?: Promise<ContentRowType | null | undefined>;
}

export default function BrowseContent({
  popularAnimePromise,
  popularMoviesPromise,
  trendingMangaPromise,
  continueWatchingPromise,
}: BrowseContentProps) {
  const popularAnime = use(popularAnimePromise);
  const popularMovies = use(popularMoviesPromise);
  const trendingManga = use(trendingMangaPromise);
  const continueWatching = continueWatchingPromise
    ? use(continueWatchingPromise)
    : undefined;
  
  if (!popularAnime || !popularMovies || !trendingManga) {
    return <p className="p-4 text-red-400">Error loading site data.</p>;
  }

  return (
    <section
      id="browse"
      className="px-6 md:px-12 lg:px-24 py-16 space-y-10 bg-gradient-to-b from-indigo-950 to-purple-950 min-h-screen snap-start snap-always flex flex-col justify-center"
    >
      <h2 className="text-3xl font-bold text-center mb-12 mt-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Discover Your Interests
      </h2>

      {[popularAnime, popularMovies, trendingManga]
        .concat(continueWatching ? [continueWatching] : [])
        .map((content, index) => (
          <ContentRow key={index} content={content} />
        ))}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a href="#polls" className="animate-bounce">
          <ChevronRight className="h-8 w-8 rotate-90 text-white/70 hover:text-white" />
        </a>
      </div>
    </section>
  );
}
