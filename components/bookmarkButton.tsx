import { BookmarkCheck, BookmarkMinus, BookmarkPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { loadBookmarked, loadData, toggleBookmark, websiteInitialLoad } from "./reusableCode";

interface BookmarkButtonProps {
    animeid: number;
    userid: number | undefined;
    animetype: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ animeid, userid, animetype }) => {
    const [isBookmarked, setIsBookmarked] = useState<Boolean>(false);
    const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);

    websiteInitialLoad([
        () => {if (userid !== undefined) {
            // Logged In
            loadData([
                    () => loadBookmarked(animeid, userid, animetype).then((bookmarked: Boolean) => setIsBookmarked(bookmarked))
            ])
            } else {
                // Needs userid (Logged In) for bookmarks
                return;
            }}
            
    ], userid)

    return (
        <button
            onMouseEnter={() => setIsBookmarkHovered(true)}
            onMouseLeave={() => setIsBookmarkHovered(false)}
            onClick={() => (setIsBookmarked(!isBookmarked), toggleBookmark(animeid, userid, animetype))}
            aria-label="Bookmark"
        >
            {isBookmarkHovered && isBookmarked ? (
                <BookmarkMinus className="text-red-400" />
            ) : isBookmarked ? (
                <BookmarkCheck className="text-yellow-400" />
            ) : (
                <BookmarkPlus className="text-green-400" />
            )}
        </button>
    );
};
