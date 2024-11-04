'use client'

import React, { useEffect, useState } from 'react'
import { variables } from '@/config';
import Link from 'next/link';
import { SiteData } from '@/app/api/types/types';

export function Footer() {

    const footerHeight = 1;
    const [siteData, setSiteData] = useState<SiteData | null>(null)

    useEffect(() => {
        const fetchSiteData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/sitedata`);
                const data: SiteData[] = await response.json(); // Expect an array of SiteData
                setSiteData(data[0]); 
            } catch (error) {
                console.error('Failed to fetch Site Data:', error);
            }
        };

        fetchSiteData();
    }, []);

    if (!siteData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <footer className='bg-gray-900 w-full h-10'>
            <nav className='flex justify-center items-center space-x-4 h-10'>
                {siteData.footer_items.map((item, index) => {

                    const transformedItem = item
                        .toLowerCase()
                        .replace(/ /g, '_');

                    return (
                        <React.Fragment key={index}>
                            <div>
                                <Link href={`/${transformedItem}`}>{item}</Link>
                            </div>
                            {index !== siteData.footer_items.length - 1 && (
                                <div>
                                    {siteData.footer_separator}
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
        </footer>
    )
}
