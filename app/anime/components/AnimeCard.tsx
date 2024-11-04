interface Anime {
    id: number;
    title: string;
    genre: string;
    year: number;
    rating: number;
    isPopular?: boolean;
    hasNewEpisode?: boolean;
    isRecommended?: boolean;
  }

export const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
      <img
        src={`/placeholder.svg?height=225&width=150&text=${encodeURIComponent(anime.title)}`}
        alt={anime.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{anime.title}</h3>
        <p className="text-xs text-gray-400">{anime.genre}</p>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span>{anime.year}</span>
          <span>★ {anime.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )

