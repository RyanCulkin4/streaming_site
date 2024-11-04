'use client'
import React, { useState } from 'react'
import { variables } from '@/config';
import { Button } from '@/app/components/ui/button'
import { Menu } from 'lucide-react';

export default function MobileMenu({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const { navItems } = variables();
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            < Button variant="ghost" size="default" className="lg:hidden mr-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
            </Button >

            {isMenuOpen && (
                <div className="lg:hidden bg-blue-600 p-4 fixed top-16 left-0 right-0 z-50">
                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <a key={item} href="#" className="hover:text-gray-300">{item}</a>
                        ))}
                    </nav>
                </div>
            )}

            {children}

        </>
    )
}
