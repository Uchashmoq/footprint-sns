'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface AlbumCoverProps {
    cover: string
    albumTitle: string
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ cover, albumTitle }) => {
    return (
        <div className="flex flex-col rounded-xl bg-base-200 shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* 顶部用户信息 */}
            <Link href="/" className="flex items-center gap-3 p-4">
                <Image
                    src="/test3.jpg"
                    width={40}
                    height={40}
                    alt="avatar"
                    className="w-11 h-11 rounded-full object-cover border border-base-content/40"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-base-content">Machima Koichiro</span>
                    <span className="text-sm text-base-content/70">2025/12/31</span>
                </div>
            </Link>

            {/* 封面区域 */}
            <div className="relative group w-full aspect-[3/2] overflow-hidden">
                <Image
                    src={cover}
                    alt="album cover"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-white font-semibold text-lg drop-shadow-md">
                    {albumTitle}
                </div>
            </div>

            {/* 底部描述或操作按钮 */}
            <div className="flex justify-between items-center p-4">
                <button className="btn btn-sm bg-green-600 hover:bg-green-500 text-white rounded-md px-3">
                    View Album
                </button>
                <span className="text-xs text-base-content/50">12 photos</span>
            </div>
        </div>
    )
}

export default AlbumCover
