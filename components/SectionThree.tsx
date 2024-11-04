import React from 'react'
import { ThumbsUp, ThumbsDown, Eye, Calendar } from 'lucide-react';
import { variables } from '@/config';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from '@/components/Footer';

export function SectionThree() {

    const { announcements } = variables();

    return (
        <>
            {/* Section 3 */}
            <section className="scroll-section h-[calc(100vh-4rem)] snap-start flex flex-col items-center pt-4">
                <div className="flex-grow p-8 w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4 text-center">Website Announcements</h2>
                    <ScrollArea className="h-[calc(100vh-16rem)]">
                        {announcements.map((announcement) => (
                            <Card key={announcement.announcementid} className="mb-4 last:mb-0 bg-gray-800 text-white">
                                <CardHeader>
                                    <CardTitle>{announcement.title}</CardTitle>
                                    <CardDescription className="text-gray-300">{announcement.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <span className="flex items-center">
                                            <ThumbsUp className="w-4 h-4 mr-1" /> {announcement.likes}
                                        </span>
                                        <span className="flex items-center">
                                            <ThumbsDown className="w-4 h-4 mr-1" /> {announcement.dislikes}
                                        </span>
                                        <span className="flex items-center">
                                            <Eye className="w-4 h-4 mr-1" /> {announcement.views}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" /> {announcement.date}
                                        </span>
                                        <span>Author: {announcement.author}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </ScrollArea>

                </div>
                <Footer />
            </section>
        </>
    )
}
