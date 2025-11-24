'use client'
import Image from 'next/image'
import React from 'react'
import Post from '../posts/Post'
import { IoIosAddCircle } from 'react-icons/io'

const MyPosts = () => {
    return (
        <div className='flex flex-col gap-5 px-6 relative'>
            <Post />
            <Post />

            <button
                className="
        fixed bottom-6 right-6
        w-13 h-13 rounded-full
        
        flex items-center justify-center
        text-white text-2xl font-bold
        shadow-2xl hover:shadow-green-500/25
        bg-gradient-to-br from-green-400 via-green-500 to-green-600
        hover:from-green-500 hover:via-green-600 hover:to-green-700
        before:absolute before:inset-0 before:rounded-full
        before:bg-gradient-to-br before:from-white/20 before:to-transparent
        before:opacity-0 hover:before:opacity-100
        after:absolute after:inset-0 after:rounded-full
        after:bg-gradient-to-br after:from-transparent after:to-black/10
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        hover:-translate-y-1
        group
        animate-pulse hover:animate-none
        ring-4 ring-green-400/20 hover:ring-green-500/40
        backdrop-blur-sm
    "
            >
                <span className="
        relative z-10 
        transition-transform duration-200 
        group-hover:rotate-90
        drop-shadow-sm
    ">
                    +
                </span>

                {/* 发光效果 */}
                <div className="
        absolute inset-0 rounded-full
        bg-gradient-to-br from-green-400 to-green-600
        opacity-0 group-hover:opacity-20
        scale-150 blur-xl
        transition-all duration-500
        pointer-events-none
    "></div>

                {/* 涟漪效果 */}
                <div className="
        absolute inset-0 rounded-full
        border-2 border-green-400/50
        scale-100 group-active:scale-150
        opacity-100 group-active:opacity-0
        transition-all duration-300
        pointer-events-none
    "></div>
            </button>



        </div>
    )
}

export default MyPosts
