"use server";

import Navbar from "@/globalComponents/navbar";
import { getData } from "@/lib/helper/getData";
import {
  carouselShowsType,
  ContentRowType,
  MaintenanceType,
  SiteNewsType,
  SiteVariablesType,
  UserDataType,
  UserPollsType,
} from "@shared-types/*";
import { Suspense } from "react";
import HomeTrailer from "./homeComponents/heroTrailerContent.client";
import UserPollsContent from "./homeComponents/userPollsContent.client";
import Footer from "@/globalComponents/footer";
import SiteNewsContent from "./homeComponents/siteNewsContnet.client";
import BrowseContent from "./homeComponents/browseContent.client";
import { SessionProvider } from "next-auth/react";

// All the Data beeing Queried from the API for the Home Page
export default async function HomePage() {
  const carouselShows = getData<carouselShowsType[] | null>(
    "http://api_gateway:3001/api/home/carouselShows"
  );
  const popularAnime = getData<ContentRowType | null>(
    "http://api_gateway:3001/api/content/popularAnime"
  );
  const popularMovies = getData<ContentRowType | null>(
    "http://api_gateway:3001/api/content/popularMovies"
  );
  const trendingManga = getData<ContentRowType | null>(
    "http://api_gateway:3001/api/content/trendingManga"
  );
  const continueWatching = getData<ContentRowType | undefined>(
    "http://api_gateway:3001/api/content/continueWatching"
  );
  const userPolls = getData<UserPollsType[] | null>(
    "http://api_gateway:3001/api/user/userPolls"
  );
  const site_news = getData<SiteNewsType[] | null>(
    "http://api_gateway:3001/api/site/news"
  );
  const maintenance = getData<MaintenanceType[] | null>(
    "http://api_gateway:3001/api/site/maintenance"
  );
  const site_variables = getData<SiteVariablesType | null>(
    "http://api_gateway:3001/api/site/variables"
  );

  const isLoggedIn = getData<boolean>(
    "http://api_gateway:3001/api/user/isloggedin"
  );
  const user_data = getData<UserDataType>(
    "http://api_gateway:3001/api/user/userdata"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-indigo-950 text-white snap-y snap-mandatory h-screen overflow-y-auto">
          <Navbar />
          <Suspense fallback={<p>Loading . . .</p>}>
            <HomeTrailer showsPromise={carouselShows} />
          </Suspense>
          <Suspense fallback={<p>Loading . . .</p>}>
            <BrowseContent
              popularAnimePromise={popularAnime}
              popularMoviesPromise={popularMovies}
              trendingMangaPromise={trendingManga}
              continueWatchingPromise={continueWatching}
            />
          </Suspense>
          <Suspense fallback={<p>Loading . . .</p>}>
            <UserPollsContent userPollsPromise={userPolls} />
          </Suspense>
          <Suspense fallback={<p>Loading . . .</p>}>
            <SiteNewsContent
              showsPromise={site_news}
              maintenancePromise={maintenance}
            />
          </Suspense>
          <Footer />
    </div>
  );
}
