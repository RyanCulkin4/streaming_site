"use server";

import Navbar from "@/components/globalComponents/navbar"
import { Suspense } from "react"
import HomeTrailer from "@/components/homeComponents/home-trailer"
import UserPollsContent from "@/components/homeComponents/user-polls-content"
import Footer from "@/components/globalComponents/footer"
import SiteNewsContent from "@/components/homeComponents/site-news-content"
import BrowseContent from "@/components/homeComponents/browse-content"
import {
	carouselShowsType,
	ContentRowType,
	MaintenanceType,
	SiteNewsType,
	SiteVariablesType,
	UserDataType,
	UserPollsType,
} from "../../shared/types";
import { getData } from "@/lib/helper/getData";

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

export default async function HomePage() {

	return (
		<>
			<Navbar />
			<main className="pt-20">
				{/* Hero Carousel Section */}
				<section className="h-[calc(100vh-5rem)]">
					<Suspense
						fallback={
							<div className="h-full flex items-center justify-center">
								<div className="text-center space-y-4">
									<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
									<p className="text-xl text-muted-foreground">Loading...</p>
								</div>
							</div>
						}
					>
						<HomeTrailer showsPromise={carouselShows} />
					</Suspense>
				</section>

				{/* Content Rows Section */}
				<section className="py-16">
					<Suspense
						fallback={
							<div className="py-12 flex items-center justify-center">
								<p className="text-xl text-muted-foreground">Loading content...</p>
							</div>
						}
					>
						<BrowseContent
							popularAnimePromise={popularAnime}
							popularMoviesPromise={popularMovies}
							trendingMangaPromise={trendingManga}
						/>
					</Suspense>
				</section>

				{/* User Polls Section */}
				<section className="py-16">
					<Suspense
						fallback={
							<div className="py-12 flex items-center justify-center">
								<p className="text-xl text-muted-foreground">Loading polls...</p>
							</div>
						}
					>
						<UserPollsContent userPollsPromise={userPolls} />
					</Suspense>
				</section>

				{/* Site News Section */}
				<section className="py-16">
					<Suspense
						fallback={
							<div className="py-12 flex items-center justify-center">
								<p className="text-xl text-muted-foreground">Loading news...</p>
							</div>
						}>
						<SiteNewsContent showsPromise={site_news} maintenancePromise={maintenance} />
					</Suspense>
				</section>
				<Footer />
			</main>
		</>
	)
}