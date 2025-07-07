import {
  AnimeDataType,
  carouselShowsType,
  ContentItem,
  ContentRowType,
  MaintenanceType,
  SiteNewsType,
  SiteVariablesType,
  UserDataType,
  UserPollsType,
} from "@shared-types/*";
import Fastify from "fastify";
import fetch from "node-fetch";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

 fastify.register(cors, {
  origin: "http://localhost:3000",
});

const PORT = 3001;

fastify.get("/api/home/carouselShows", async (request, reply) => {
  const shows: carouselShowsType[] = [
    {
      contnetid: "1",
      contenttype: "ANIME",
      title: "Demon Slayer",
      description:
        "Tanjiro Kamado sets out to become a demon slayer after his family is slaughtered and his sister is turned into a demon.",
      image: "/placeholder.svg?height=1080&width=1920",
      rating: 9.8,
      badge: "NEW SEASON",
      year: 2019,
      genres: ["Action", "Fantasy", "Adventure"],
    },
    {
      contnetid: "2",
      contenttype: "ANIME",
      title: "Attack on Titan",
      description:
        "In a world where humanity lives within cities surrounded by enormous walls due to the Titans, giant humanoid beings who devour humans seemingly without reason.",
      image: "/placeholder.svg?height=1080&width=1920",
      rating: 9.7,
      badge: "FINAL SEASON",
      year: 2019,
      genres: ["Action", "Drama", "Fantasy"],
    },
    {
      contnetid: "3",
      contenttype: "ANIME",
      title: "Jujutsu Kaisen",
      description:
        "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
      image: "/placeholder.svg?height=1080&width=1920",
      rating: 9.5,
      year: 2019,
      genres: ["Action", "Supernatural", "Horror"],
    },
    {
      contnetid: "4",
      contenttype: "ANIME",
      title: "My Hero Academia",
      description:
        "A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.",
      image: "/placeholder.svg?height=1080&width=1920",
      rating: 9.3,
      badge: "POPULAR",
      year: 2019,
      genres: ["Action", "Comedy", "Superhero"],
    },
    {
      contnetid: "5",
      contenttype: "ANIME",
      title: "Chainsaw Man",
      description:
        "Following a betrayal, a young man left for dead is reborn as a powerful devil-human hybrid after merging with his pet devil and is soon enlisted into an organization dedicated to hunting devils.",
      image: "/placeholder.svg?height=1080&width=1920",
      rating: 9.6,
      year: 2019,
      genres: ["Action", "Horror", "Supernatural"],
    },
  ];

  return shows;
});

fastify.get("/api/content/popularAnime", async (request, reply) => {
  const items: ContentItem[] = [
    {
      id: 1,
      title: "Attack on Titan",
      image: "/placeholder.svg?height=400&width=600",
      author: "Hajime Isayama",
      rating: 9.1,
      year: "2013",
      genres: ["Action", "Drama", "Fantasy"],
    },
    {
      id: 2,
      title: "My Hero Academia",
      image: "/placeholder.svg?height=400&width=600",
      author: "Kohei Horikoshi",
      rating: 8.0,
      year: "2016",
      genres: ["Action", "Superhero"],
    },
    {
      id: 3,
      title: "Jujutsu Kaisen",
      image: "/placeholder.svg?height=400&width=600",
      author: "Gege Akutami",
      rating: 8.6,
      year: "2020",
      genres: ["Action", "Horror", "Supernatural"],
    },
    {
      id: 4,
      title: "One Piece",
      image: "/placeholder.svg?height=400&width=600",
      author: "Eiichiro Oda",
      rating: 9.0,
      year: "1999",
      genres: ["Adventure", "Comedy", "Fantasy"],
    },
    {
      id: 5,
      title: "Chainsaw Man",
      image: "/placeholder.svg?height=400&width=600",
      author: "Tatsuki Fujimoto",
      rating: 8.5,
      year: "2022",
      genres: ["Action", "Horror", "Dark Fantasy"],
    },
    {
      id: 6,
      title: "Spy x Family",
      image: "/placeholder.svg?height=400&width=600",
      author: "Tatsuya Endo",
      rating: 8.4,
      year: "2022",
      genres: ["Comedy", "Action", "Slice of Life"],
    },
  ];

  return { displayTitle: "Popular Anime", items } as ContentRowType;
});

fastify.get("/api/content/popularMovies", async (request, reply) => {
  const items: ContentItem[] = [
    {
      id: 19,
      title: "Your Name",
      image: "/placeholder.svg?height=400&width=600",
      author: "Makoto Shinkai",
      rating: 8.9,
      year: "2016",
      genres: ["Romance", "Fantasy", "Drama"],
    },
    {
      id: 20,
      title: "Spirited Away",
      image: "/placeholder.svg?height=400&width=600",
      author: "Hayao Miyazaki",
      rating: 9.2,
      year: "2001",
      genres: ["Fantasy", "Adventure", "Family"],
    },
    {
      id: 21,
      title: "Demon Slayer: Mugen Train",
      image: "/placeholder.svg?height=400&width=600",
      author: "Koyoharu Gotouge",
      rating: 8.7,
      year: "2020",
      genres: ["Action", "Adventure", "Supernatural"],
    },
    {
      id: 22,
      title: "Princess Mononoke",
      image: "/placeholder.svg?height=400&width=600",
      author: "Hayao Miyazaki",
      rating: 8.4,
      year: "1997",
      genres: ["Fantasy", "Adventure", "War"],
    },
    {
      id: 23,
      title: "Akira",
      image: "/placeholder.svg?height=400&width=600",
      author: "Katsuhiro Otomo",
      rating: 8.0,
      year: "1988",
      genres: ["Sci-Fi", "Action", "Cyberpunk"],
    },
    {
      id: 24,
      title: "Howl's Moving Castle",
      image: "/placeholder.svg?height=400&width=600",
      author: "Diana Wynne Jones",
      rating: 8.2,
      year: "2004",
      genres: ["Fantasy", "Romance", "Adventure"],
    },
  ];

  return { displayTitle: "Popular Movies", items } as ContentRowType;;
});

fastify.get("/api/content/trendingManga", async (request, reply) => {
  const items: ContentItem[] = [
    {
      id: 7,
      title: "Berserk",
      image: "/placeholder.svg?height=400&width=600",
      author: "Kentaro Miura",
      rating: 9.3,
      year: "1989",
      genres: ["Dark Fantasy", "Action", "Horror"],
    },
    {
      id: 8,
      title: "Vagabond",
      image: "/placeholder.svg?height=400&width=600",
      author: "Takehiko Inoue",
      rating: 9.1,
      year: "1998",
      genres: ["Historical", "Samurai", "Seinen"],
    },
    {
      id: 9,
      title: "Vinland Saga",
      image: "/placeholder.svg?height=400&width=600",
      author: "Makoto Yukimura",
      rating: 8.8,
      year: "2005",
      genres: ["Action", "Adventure", "Historical"],
    },
    {
      id: 10,
      title: "Tokyo Ghoul",
      image: "/placeholder.svg?height=400&width=600",
      author: "Sui Ishida",
      rating: 8.0,
      year: "2011",
      genres: ["Horror", "Action", "Supernatural"],
    },
    {
      id: 11,
      title: "One Punch Man",
      image: "/placeholder.svg?height=400&width=600",
      author: "ONE",
      rating: 8.5,
      year: "2012",
      genres: ["Action", "Comedy", "Superhero"],
    },
    {
      id: 12,
      title: "Demon Slayer",
      image: "/placeholder.svg?height=400&width=600",
      author: "Koyoharu Gotouge",
      rating: 8.4,
      year: "2016",
      genres: ["Action", "Supernatural", "Adventure"],
    },
  ];

  return { displayTitle: "Trending Manga", items } as ContentRowType;;
});

fastify.get("/api/content/continueWatching", async (request, reply) => {
  const items: ContentItem[] = [
    {
      id: 13,
      title: "Naruto Shippuden",
      image: "/placeholder.svg?height=400&width=600",
      author: "Masashi Kishimoto",
      rating: 8.3,
      year: "2007",
      genres: ["Action", "Adventure", "Ninja"],
    },
    {
      id: 14,
      title: "Hunter x Hunter",
      image: "/placeholder.svg?height=400&width=600",
      author: "Yoshihiro Togashi",
      rating: 9.0,
      year: "2011",
      genres: ["Adventure", "Fantasy", "Action"],
    },
    {
      id: 15,
      title: "Fullmetal Alchemist",
      image: "/placeholder.svg?height=400&width=600",
      author: "Hiromu Arakawa",
      rating: 9.2,
      year: "2009",
      genres: ["Action", "Fantasy", "Adventure"],
    },
    {
      id: 16,
      title: "Death Note",
      image: "/placeholder.svg?height=400&width=600",
      author: "Tsugumi Ohba",
      rating: 8.7,
      year: "2006",
      genres: ["Mystery", "Psychological", "Thriller"],
    },
    {
      id: 17,
      title: "Cowboy Bebop",
      image: "/placeholder.svg?height=400&width=600",
      author: "Shinichirō Watanabe",
      rating: 8.9,
      year: "1998",
      genres: ["Sci-Fi", "Action", "Space"],
    },
    {
      id: 18,
      title: "Neon Genesis Evangelion",
      image: "/placeholder.svg?height=400&width=600",
      author: "Hideaki Anno",
      rating: 8.1,
      year: "1995",
      genres: ["Mecha", "Psychological", "Drama"],
    },
  ];

  return { displayTitle: "Continue Watching", items } as ContentRowType;;
});

fastify.get("/api/user/userPolls", async (request, reply) => {
  const userPolls: UserPollsType[] = [
    {
      polldata: {
        id: "1",
        createdAt: "2 days ago",
        views: 8542,
        question:
          "Should we add offline viewing/download support to AnimeVerse?",
        totalVotes: 4124,
        options: [
          { id: 1, text: "Yes, it's essential", votes: 3245 },
          { id: 2, text: "No, streaming is enough", votes: 879 },
        ],
        comments: [
          {
            commentdata: {
              id: 1,
              text: "This would be a game-changer for commuters!",
              likes: 42,
              dislikes: 3,
              replies: [
                {
                  commentdata: {
                    id: 3,
                    text: "I'd love to watch on my train ride.",
                    likes: 15,
                    dislikes: 0,
                    replies: [],
                  },
                  OP: {
                    authorId: "u456",
                    authorUser: "MangaLover",
                    authorpfp: "/placeholder.svg?height=40&width=40",
                  },
                },
              ],
            },
            OP: {
              authorId: "u123",
              authorUser: "AnimeFan42",
              authorpfp: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            commentdata: {
              id: 2,
              text: "I'd love to watch on flights without paying for wifi",
              likes: 28,
              dislikes: 1,
              replies: [],
            },
            OP: {
              authorId: "u456",
              authorUser: "MangaLover",
              authorpfp: "/placeholder.svg?height=40&width=40",
            },
          },
        ],
      },
      OP: {
        authorId: "admin1",
        authorUser: "AnimeVerse Team",
        authorpfp: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      polldata: {
        id: "2",
        createdAt: "3 days ago",
        views: 6210,
        question: "What feature would you like to see added to AnimeVerse?",
        totalVotes: 4310,
        options: [
          { id: 1, text: "Better recommendation system", votes: 879 },
          { id: 2, text: "More manga content", votes: 1532 },
          { id: 3, text: "Community forums", votes: 654 },
          { id: 4, text: "Watch parties with friends", votes: 1245 },
        ],
        comments: [
          {
            commentdata: {
              id: 4,
              text: "Watch parties would be amazing for premieres!",
              likes: 36,
              dislikes: 2,
              replies: [],
            },
            OP: {
              authorId: "u789",
              authorUser: "OtakuGirl",
              authorpfp: "/placeholder.svg?height=40&width=40",
            },
          },
        ],
      },
      OP: {
        authorId: "user2",
        authorUser: "OtakuMaster",
        authorpfp: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      polldata: {
        id: "3",
        createdAt: "1 week ago",
        views: 9845,
        question: "Which anime genre should we expand next?",
        totalVotes: 6253,
        options: [
          { id: 1, text: "Shonen", votes: 2134 },
          { id: 2, text: "Slice of Life", votes: 1256 },
          { id: 3, text: "Isekai", votes: 1876 },
          { id: 4, text: "Horror", votes: 987 },
        ],
        comments: [
          {
            commentdata: {
              id: 5,
              text: "More horror anime please!",
              likes: 19,
              dislikes: 7,
              replies: [],
            },
            OP: {
              authorId: "u101",
              authorUser: "DarkAnimeWatcher",
              authorpfp: "/placeholder.svg?height=40&width=40",
            },
          },
        ],
      },
      OP: {
        authorId: "user3",
        authorUser: "AnimeExplorer",
        authorpfp: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      polldata: {
        id: "4",
        createdAt: "2 weeks ago",
        views: 7632,
        question: "How often do you use AnimeVerse?",
        totalVotes: 6512,
        options: [
          { id: 1, text: "Daily", votes: 3245 },
          { id: 2, text: "Few times a week", votes: 1879 },
          { id: 3, text: "Weekly", votes: 932 },
          { id: 4, text: "Monthly", votes: 456 },
        ],
        comments: [],
      },
      OP: {
        authorId: "admin1",
        authorUser: "AnimeVerse Team",
        authorpfp: "/placeholder.svg?height=40&width=40",
      },
    },
  ];
  return userPolls;
});

fastify.get("/api/site/news", async (request, reply) => {
  const news: SiteNewsType[] = [
    {
      id: "1",
      title: "Spring Anime Season Update",
      description:
        "Check out our complete guide to the Spring 2023 anime season with 50+ new and returning shows!",
      date: "April 2, 2023",
      type: "announcement",
      link: "#",
    },
    {
      id: "2",
      title: "Scheduled Maintenance",
      description:
        "AnimeVerse will be undergoing scheduled maintenance on April 15th from 2:00 AM to 5:00 AM UTC.",
      date: "April 10, 2023",
      type: "maintenance",
      link: "#",
    },
    {
      id: "3",
      title: "New Manga Reader Released",
      description:
        "We've completely redesigned our manga reader with improved page loading, bookmarking, and more!",
      date: "March 28, 2023",
      type: "feature",
      link: "#",
    },
    {
      id: "4",
      title: "Anime Convention Coverage",
      description:
        "Our team will be covering AnimeExpo 2023! Stay tuned for exclusive interviews and announcements.",
      date: "March 15, 2023",
      type: "event",
      link: "#",
    },
  ];
  return news;
});

fastify.get("/api/site/maintenance", async (request, reply) => {
  const maintenance: MaintenanceType[] = [
    {
      date: "April 15, 2023",
      time: "2:00 AM - 5:00 AM UTC",
      description: "Server upgrades and database optimization",
    },
    {
      date: "April 29, 2023",
      time: "3:00 AM - 4:00 AM UTC",
      description: "Content delivery network updates",
    },
  ];
  return maintenance;
});

fastify.get("/api/user/userdata", async (request, reply) => {
  const maintenance: UserDataType[] = [
    {
      date: "April 15, 2023",
      time: "2:00 AM - 5:00 AM UTC",
      description: "Server upgrades and database optimization",
    },
    {
      date: "April 29, 2023",
      time: "3:00 AM - 4:00 AM UTC",
      description: "Content delivery network updates",
    },
  ];
  return maintenance;
});

fastify.get("/api/site/variables", async (request, reply) => {
  const maintenance: SiteVariablesType[] = [
    {
      date: "April 15, 2023",
      time: "2:00 AM - 5:00 AM UTC",
      description: "Server upgrades and database optimization",
    },
    {
      date: "April 29, 2023",
      time: "3:00 AM - 4:00 AM UTC",
      description: "Content delivery network updates",
    },
  ];
  return maintenance;
});

fastify.get("/api/user/isloggedin", async (request, reply) => {
  return true;
});

fastify.get("/api/content/animedata/:animeid", async (request, reply) => {
  const { animeid } = request.params as { animeid: string };

  const animeData: AnimeDataType = {
    id: "oshi-no-ko",
    engTtle: "OSHI NO KO",
    japaneseTitle: "【推しの子】",
    description:
      "Dr. Gorou Amemiya, an obstetrician, is a huge fan of the talented teen idol Ai Hoshino. When Ai gives birth to twins, Gorou discovers the dark side of the entertainment industry. After a tragic incident, he is reborn as one of Ai's children with his memories intact, and vows to find the truth behind what happened and protect his new family.",
    videoUrl: "/placeholder.svg", // This would be the actual video URL
    thumbnailUrl: "/placeholder.svg?height=1080&width=1920",
    averageRating: 9.2,
    userRating: 0,
    isBookmarked: false,
    releaseYear: "2023",
    studio: "Doga Kobo",
    episodes: 11,
    status: "Completed",
    nextSeason: "Season 2 Coming Soon",
    genres: ["Drama", "Supernatural", "Psychological", "Mystery"],
    averageDuration: 24,
  };
  return animeData;
});

/*try {
    const response = await fetch('http://sql-service:3104/carousel_shows');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Gateway error:', err);
    reply.status(500).send({ error: 'Internal server error' });
  }*/

fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ error: "Not Found", path: request.url });
});

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
