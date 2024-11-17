import { Star } from 'lucide-react';
import React, { useState } from 'react';
import { handleRating, loadData, loadRating } from './reusableCode';

interface StarRatingProps {
    animeid: number;
    userid: number | undefined;
}



export const StarButton: React.FC<StarRatingProps> = ({ animeid, userid }) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [userRating, setUserRating] = useState<number>(0)

    loadData([
        () => loadRating(animeid, userid).then((rating: number) => setUserRating(rating))
    ])

    const handleClick = (star: number) => {
        if (userid) {
            setUserRating(star);
            handleRating(animeid, userid, star);
        }
    };

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition-colors duration-200 ease-in-out"
                    aria-label={`Rate ${star} stars`}
                >
                    <Star
                        className={`w-6 h-6 ${star <= (hoveredRating || userRating) ? 'text-yellow-400' : 'text-gray-400'}`}
                        fill={star <= userRating ? 'currentColor' : 'none'}
                    />
                </button>
            ))}
        </div>
    );
};
