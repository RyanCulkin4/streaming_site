'use client'
import React, { useState, useEffect } from 'react'

export function PageIndicator() {

    const [currentPage, setCurrentPage] = useState(0)

    const ScrollDirectionComponent = () => {
        const [scrollPosition, setScrollPosition] = useState(0);
        const [scrollDirection, setScrollDirection] = useState('down');

        useEffect(() => {
            // Function to handle scroll events
            const handleScroll = () => {
                const currentScrollPosition = window.scrollY;

                // Determine scroll direction
                if (currentScrollPosition > scrollPosition) {
                    setCurrentPage(prevCount => prevCount + 1);
                } else if (currentScrollPosition < scrollPosition) {
                    setCurrentPage(prevCount => prevCount - 1);
                }

                // Update scroll position
                setScrollPosition(currentScrollPosition);
            };

            // Add event listener
            window.addEventListener('scroll', handleScroll);

            // Clean up the event listener
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [scrollPosition]);

        return (
            <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
                {[0, 1, 2].map((pageIndex) => (
                    <div
                        key={pageIndex}
                        className={`w-4 h-4 rounded-full ${currentPage === pageIndex ? 'bg-blue-500' : 'bg-gray-500'
                            } transition-colors duration-300`}
                        aria-label={`Page ${pageIndex + 1}`}
                        role="button"
                        tabIndex={0}
                    />
                ))}
            </div>
        )
    }
}
