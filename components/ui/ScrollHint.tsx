'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import { ChevronDown } from 'lucide-react'
import { variables } from '@/config'

export default function ScrollHint() {

    return (
        <div>
            {/* Scroll Hint Arrow */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className='w-8 h-8 text-white opacity-50'/>
                    {/* <ChevronDown className={`w-${scrollHintSize} h-${scrollHintSize} text-white opacity-50`} />*/}
                </div>
        </div>
    )
}