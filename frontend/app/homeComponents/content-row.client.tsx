"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentRowType } from "@shared-types/*";

export default function ContentRow({ content }: { content?: ContentRowType }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (!content) {
    return;
  } else {
    // Add default values for items that don't have all properties
    const enhancedItems = content.items.map((item) => ({
      ...item,
      author: item.author || "AnimeVerse Studios",
      rating: item.rating || (Math.floor(Math.random() * 20) + 80) / 10, // Random rating between 8.0-10.0
      year: item.year || `${2015 + Math.floor(Math.random() * 9)}`, // Random year between 2015-2023
      genres: item.genres || ["Anime", "Animation", "Entertainment"],
    }));

    const scroll = (direction: "left" | "right") => {
      if (rowRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
        const scrollTo =
          direction === "left"
            ? scrollLeft - clientWidth * 0.75
            : scrollLeft + clientWidth * 0.75;

        rowRef.current.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });

        // Check if we need to show/hide arrows after scrolling
        setTimeout(() => {
          if (rowRef.current) {
            setShowLeftArrow(rowRef.current.scrollLeft > 0);
            setShowRightArrow(
              rowRef.current.scrollLeft + rowRef.current.clientWidth <
                rowRef.current.scrollWidth - 10
            );
          }
        }, 300);
      }
    };

    const handleScroll = () => {
      if (rowRef.current) {
        setShowLeftArrow(rowRef.current.scrollLeft > 0);
        setShowRightArrow(
          rowRef.current.scrollLeft + rowRef.current.clientWidth <
            rowRef.current.scrollWidth - 10
        );
      }
    };

    return (
      <div className="relative group">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
          {content.displayTitle}
        </h2>

        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 z-10 h-full max-h-[150px] w-12 -translate-y-1/2 bg-purple-950/50 hover:bg-purple-900/70 rounded-none opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Content Row */}
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          onScroll={handleScroll}
        >
          {enhancedItems.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[200px] md:w-[250px] relative group/item transition-transform duration-300 hover:scale-105 hover:z-10"
            >
              <div className="overflow-hidden rounded-lg border-2 border-transparent group-hover/item:border-pink-500 transition-all duration-300">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full rounded-md aspect-video object-cover"
                />
              </div>

              {/* Basic title overlay (always visible on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 rounded-lg">
                <h3 className="text-white font-medium">{item.title}</h3>

                {/* Detailed info (visible on hover) */}
                <div className="mt-2 space-y-1 text-xs text-white/90 opacity-0 group-hover/item:opacity-100 transition-opacity delay-100 duration-200">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1 text-pink-400" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-400" />
                    <span>{item.rating}/10</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-blue-400" />
                    <span>{item.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1 text-green-400" />
                    <span className="truncate">{item.genres?.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 z-10 h-full max-h-[150px] w-12 -translate-y-1/2 bg-purple-950/50 hover:bg-purple-900/70 rounded-none opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>
    );
  }
}
