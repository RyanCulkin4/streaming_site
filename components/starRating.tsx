import { Star } from "lucide-react";
import React from "react";

interface RatingProps {
  average_rating: number;
}

const getClipClass = (rating: number) => {
  if (rating >= 0.9) return "text-yellow-500 fill-current";
  if (rating >= 0.8) return "text-yellow-500 fill-current clip-80";
  if (rating >= 0.7) return "text-yellow-500 fill-current clip-70";
  if (rating >= 0.6) return "text-yellow-500 fill-current clip-60";
  if (rating >= 0.5) return "text-yellow-500 fill-current clip-50";
  if (rating >= 0.4) return "text-yellow-500 fill-current clip-40";
  if (rating >= 0.3) return "text-yellow-500 fill-current clip-30";
  if (rating >= 0.2) return "text-yellow-500 fill-current clip-20";
  if (rating >= 0.1) return "text-yellow-500 fill-current clip-10";
  return "text-gray-300";
};

const Rating: React.FC<RatingProps> = ({ average_rating }) => {
  const maxStars = 5;
  const stars = Array.from({ length: maxStars }, (_, i) => {
    const ratingDiff = average_rating - i;
    return <Star key={i} className={getClipClass(ratingDiff)} />;
  });

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2">{(average_rating)}</span>
    </div>
  );
};

export default Rating;