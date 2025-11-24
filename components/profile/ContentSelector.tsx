'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Photos from './MyPosts'
import MyPosts from './MyPosts'
import MyAlbums from './MyAlbums'
import MyFootPrints from './MyFootPrints'

const tabs = [
    { key: 'myposts', label: 'Posts' },
    { key: 'albums', label: 'Albums' },
    { key: 'footprints', label: 'Footprints' },
    { key: 'likes', label: 'Likes' },
]

const ContentSelector = ({ userId }: { userId: string }) => {
    const [tab, setTab] = useState("myposts")

    return (
        <div className='flex flex-col w-full gap-4'>
            {/* Tab Selector */}
            <div className='relative flex gap-6 md:gap-13 lg:gap-17 font-semibold text-base text-base-content/80'>
                {tabs.map(({ key, label }) => (
                    <div
                        key={key}
                        className='relative flex flex-col items-center cursor-pointer group'
                        onClick={() => setTab(key)}
                    >
                        <span
                            className={`transition-colors duration-200 ${tab === key
                                ? 'text-primary'
                                : 'group-hover:text-primary/80'
                                }`}
                        >
                            {label}
                        </span>

                        {/* Active underline indicator */}
                        {tab === key && (
                            <motion.div
                                layoutId='underline'
                                className='w-8 h-[3px] rounded bg-primary mt-1'
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}

                        {/* Hover underline preview */}
                        {tab !== key && (
                            <div className='w-0 h-[3px] bg-primary/30 rounded mt-1 group-hover:w-6 transition-all duration-300'></div>
                        )}
                    </div>
                ))}
            </div>

            <hr className='border-t border-base-300' />

            {/* Content area */}
            <div className='text-base-content  rounded-md px-4 overflow-y-scroll'>
                {tab === "myposts" && <MyPosts />}
                {tab === "albums" && <MyAlbums />}
                {tab === "footprints" && <MyFootPrints />}
                {tab === "likes" && <h1>❤️ Likes</h1>}
            </div>
        </div>
    )
}

export default ContentSelector
