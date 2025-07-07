import { MediaType } from "../prisma_client";

export interface VideoJob {
  id: string;
  filename: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  submittedAt: string;
  finishedAt?: string;
}

export interface carouselShowsType {
  contnetid: string;
  contenttype: MediaType;
  title: string;
  description: string;
  image: string;
  rating: number;
  badge?: string; // optional feild to show the user if its a new season or last episdoe (aditional info)
  year: number;
  genres: string[];
}

export interface ContentRowType {
  displayTitle: string;
  items: ContentItem[];
}

export interface ContentItem {
  id: number
  title: string
  image: string
  author: string
  rating: number
  year: string
  genres: string[]
}

export interface UserPollsType {
  polldata: {
    id: string;
    createdAt: string;
    views: number;
    question: string;
    totalVotes: number;
    options: {
      id: number;
      text: string;
      votes: number;
    }[];
    comments?: CommentsType[];
  };
  OP: {
    authorId: string;
    authorUser: string;
    authorpfp: string;
  };
}

export interface CommentsType {
  commentdata: {
    id: number;
    text: string;
    likes: number;
    dislikes: number;
    replies: CommentsType[];
  };
  OP: {
    authorId: string;
    authorUser: string;
    authorpfp: string;
  };
}

export interface UserDataType {}

export interface SiteNewsType {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "announcement" | "maintenance" | "feature" | "event";
  link: string;
}

export interface MaintenanceType {
  date: string;
  time: string;
  description: string;
}

export interface SiteVariablesType {}

// Loading Anime/[animeid] Page
export interface AnimeDataType { 
    id: string;
    engTtle: string;
    japaneseTitle: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    averageRating: number;
    userRating: number;
    isBookmarked: boolean;
    releaseYear: string;
    studio: string;
    episodes: number;
    status: string;
    nextSeason: string;
    genres: string[];
    averageDuration: number; // Mionutes
  };