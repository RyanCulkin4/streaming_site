"use client";

import { use } from "react";
import type { ContentRowType } from "@shared-types/*";
import ContentRow from "./content-row.client";

interface BrowseContentProps {
  popularAnimePromise: Promise<ContentRowType | null>;
  popularMoviesPromise: Promise<ContentRowType | null>;
  trendingMangaPromise: Promise<ContentRowType | null>;
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
    <>
      <h2 className="text-3xl font-bold text-center mb-6 mt-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Discover Your Interests
      </h2>

      {[popularAnime, popularMovies, trendingManga]
        .concat(continueWatching ? [continueWatching] : [])
        .map((content, index) => (
          <ContentRow key={index} content={content} />
        ))}
    </>
  );
}
