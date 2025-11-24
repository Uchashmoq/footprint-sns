'use client'
import React, { useState } from 'react'

import Link from 'next/link'

import { motion } from "framer-motion";
import { IoApertureOutline, IoLocationOutline } from 'react-icons/io5';
import { FaCamera, FaDownload, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { GiMicroscopeLens } from 'react-icons/gi';
import { FcRuler } from 'react-icons/fc';
import { TbRuler2 } from 'react-icons/tb';
import { MdDownloading, MdIso, MdOutlineRawOn, MdOutlineTimer } from 'react-icons/md';
import { BsExposure } from 'react-icons/bs';
import { RiFileDownloadLine } from 'react-icons/ri';
import Image from 'next/image';
import { Photo } from '../PhotoFeed';

const samplePhotos: Photo[] = [
    { id: 1, src: '/test1.jpg', title: 'photo1', author: '', description: 'desc1', width: 1200, height: 800, lat: 0, lng: 0 },
    { id: 2, src: '/test2.jpg', title: 'photo2', author: '', description: 'desc2', width: 1200, height: 800, lat: 0, lng: 0 },
    { id: 3, src: '/test3.jpg', title: 'photo3', author: '', description: 'desc3', width: 1200, height: 800, lat: 0, lng: 0 },
    { id: 4, src: '/test4.jpg', title: 'photo4', author: '', description: 'desc4', width: 1200, height: 800, lat: 0, lng: 0 },
    { id: 5, src: '/test5.jpg', title: 'photo5', author: '', description: 'desc5', width: 1200, height: 800, lat: 0, lng: 0 },
    { id: 6, src: '/test6.jpg', title: 'photo6', author: '', description: 'desc6', width: 3712, height: 5568, lat: 0, lng: 0 },
]

const Post = () => {
    const MAX_LEN = 100
    const maxToShow = 4
    const visiblePhotos = samplePhotos.slice(0, maxToShow)
    const moreCount = samplePhotos.length - maxToShow
    const [isExpanded, setIsExpanded] = useState(false)
    const [desc, setDesc] = useState(samplePhotos[0].description)

    const [like, setLike] = useState(false)
    return (
        <div className='py-4 px-8 flex flex-col gap-4 bg-base-200 rounded-lg'>
            {/* USER INFO */}
            <div className="flex items-center gap-3 pt-2">
                <Image
                    src='/test3.jpg'
                    width={40}
                    height={40}
                    alt="avatar"
                    className="w-11 h-11 rounded-full object-cover border-1 border-base-content/70"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-base-content">
                        Machima Koichiro
                    </span>
                    <span className="text-sm text-base-content/80">
                        2025/12/31 uploaded 4 photos
                    </span>
                </div>

            </div>
            <hr className='text-base-content/10' />
            {/* 可展开的desx */}
            <div className="mt-2 md:mt-3">
                <p className={`text-sm ${isExpanded ? '' : 'line-clamp-2'} md:text-md`}>
                    {desc}
                </p>
                {desc.length > MAX_LEN && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm md:text-md mt-1 hover:underline text-accent"
                    >
                        {isExpanded ? 'less' : 'more'}
                    </button>
                )}
            </div>
            {/* 图片区域 */}
            <PhotoGrid photos={samplePhotos} setDesc={setDesc} />



            <Link
                href="/posts/test-post-id"
                className="text-xs underline pt-3"
            >
                View details
            </Link>
        </div>
    )
}

const PhotoGrid = ({ photos, setDesc }: { photos: Photo[], setDesc: (desc: string) => void }) => {
    const maxToShow = 4;
    const visiblePhotos = photos.slice(0, maxToShow);
    const moreCount = photos.length - maxToShow;


    const renderGrid = () => {
        if (visiblePhotos.length === 1) {
            return (
                <div onClick={() => setDesc(visiblePhotos[0].src)} className="cursor-pointer w-full aspect-[3/2] rounded-md overflow-hidden relative transform transition duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg">
                    <Image
                        src={visiblePhotos[0].src}
                        alt="photo-1"
                        fill
                        className="object-cover"
                    />
                </div>
            );
        }

        if (visiblePhotos.length === 2) {
            return (
                <div className="grid grid-cols-2 gap-2">
                    {visiblePhotos.map((photo, index) => (
                        <div
                            key={photo.id}
                            onClick={() => setDesc(photo.description)}
                            className="cursor-pointer relative w-full aspect-[3/2] overflow-hidden rounded-md transform transition duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg"
                        >
                            <Image
                                src={photo.src}
                                alt={`photo-${index}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        }

        if (visiblePhotos.length === 3) {
            return (
                <div className="grid grid-cols-2 gap-2">
                    {visiblePhotos.map((photo, index) => (
                        <div
                            key={photo.id}
                            onClick={() => setDesc(photo.description)}
                            className={`cursor-pointer transform transition duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg relative overflow-hidden rounded-md ${index < 2
                                ? 'w-full aspect-[3/2]'
                                : 'col-span-1 w-full aspect-[3/2]'
                                }`}
                        >
                            <Image
                                src={photo.src}
                                alt={`photo-${index}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        }

        // 4 张及以上
        return (
            <div className="grid grid-cols-2 gap-2">
                {visiblePhotos.map((photo, index) => (
                    <div
                        key={photo.id}
                        onClick={() => setDesc(photo.description)}
                        className="cursor-pointer relative w-full aspect-[3/2] overflow-hidden rounded-md transform transition duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg"
                    >
                        <Image
                            src={photo.src}
                            alt={`photo-${index}`}
                            fill
                            className="object-cover"
                        />
                        {index === maxToShow - 1 && moreCount > 0 && (
                            <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-lg font-semibold rounded-md">
                                +{moreCount} more
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return <div>{renderGrid()}</div>;
};

export default Post