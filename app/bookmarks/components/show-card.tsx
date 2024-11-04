import { ThumbsUp, ThumbsDown, Calendar, User as UserIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bookmark } from 'lucide-react'

interface ShowCardProps {
    media: {
        id: number;
        title: string;
        type: string;
        date: string;
        image: string;
        description: string;
        likes: number;
        dislikes: number;
        author: string;
        genre: string;
    }
}

export default function ShowCard({ media }: ShowCardProps) {
    return (
        <Card className="bg-gray-800 text-white flex flex-col group relative w-full h-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span className="truncate">{media.title}</span>
                    <Bookmark className="h-50 w-5 text-yellow-400" />
                </CardTitle>
                <CardDescription className="text-gray-400">{media.type} | {media.genre}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="relative pb-[150%]">
                    <img
                        src={media.image}
                        alt={media.title}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                    />
                </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-400">
                Bookmarked on: {new Date(media.date).toLocaleDateString()}
            </CardFooter>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto">
                <h3 className="text-lg font-bold mb-2">{media.title}</h3>
                <p className="text-sm mb-4">{media.description}</p>
                <div className="flex items-center space-x-4 mb-2">
                    <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {media.likes}
                    </span>
                    <span className="flex items-center">
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {media.dislikes}
                    </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                    <UserIcon className="w-4 h-4" />
                    <span>{media.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(media.date).toLocaleDateString()}</span>
                </div>
            </div>
        </Card>
    )
}