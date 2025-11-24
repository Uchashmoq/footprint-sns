'use client'
import React, { Suspense, useState } from 'react'
import { Photo } from './PhotoFeed'
import Image from 'next/image'
import Link from 'next/link';
import { IoApertureOutline, IoLocationOutline } from 'react-icons/io5';
import { FaCamera, FaDownload, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { GiMicroscopeLens } from 'react-icons/gi';
import { FcRuler } from 'react-icons/fc';
import { TbRuler2 } from 'react-icons/tb';
import { MdDownloading, MdIso, MdOutlineRawOn, MdOutlineTimer } from 'react-icons/md';
import { BsExposure } from 'react-icons/bs';
import { RiFileDownloadLine } from 'react-icons/ri';
import { AnimatePresence, motion } from "framer-motion";
import Comments from './Comments';

const PhotoDetail = ({ photo, className }: { photo: Photo, className?: string }) => {
    if (!photo) return null;
    const [isExpanded, setIsExpanded] = useState(false);
    className == null ? '' : className;

    // 计算真实宽高比，用于 aspect-ratio
    const aspect = photo.width && photo.height ? `${photo.width} / ${photo.height}` : "3 / 2";
    //const aspect = "2/3"
    const description = photo.description

    const [like, setLike] = useState(false)
    const [showComments, setShowComments] = useState(false)

    return (
        <div className={" overflow-y-scroll  " + className}>
            <div className="flex flex-col gap-3  ">
                {/* 图片区域：宽度占满，比例自动 */}
                <div className={`flex-1 relative`} style={{ aspectRatio: aspect }}>
                    <Suspense fallback={<span className="loading loading-dots loading-xl"></span>}>
                        <Image
                            src={photo.src}
                            alt={photo.title}
                            fill
                            className="object-contain rounded-lg"
                            priority
                        />
                    </Suspense>

                </div>

                <div className="flex gap-6 px-4 text-base-content/90 select-none 
                overflow-x-auto flex-nowrap scrollbar-hide">

                    <motion.div
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.2, color: "#f43f5e" }} // Tailwind red-500
                        className='flex gap-2 items-center text-sm cursor-pointer transition-colors'
                        onClick={() => setLike((b) => !b)}
                    >
                        {like ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                        <span>99999</span>
                    </motion.div>

                    {/* Comment */}
                    <motion.div
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.2, color: "#0ea5e9" }} // Tailwind sky-500
                        className='flex gap-2 items-center text-sm cursor-pointer transition-colors'
                        onClick={() => { setShowComments(true) }}
                    >
                        <FaRegComment />
                        <span>99999</span>
                    </motion.div>


                    <AnimatePresence>
                        {showComments && (
                            <Comments onClose={() => setShowComments(false)} />
                        )}
                    </AnimatePresence>

                    {/* Download */}
                    <motion.div
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.2, color: "#22c55e" }} // Tailwind green-500
                        className='flex gap-2 items-center text-sm cursor-pointer transition-colors'
                        onClick={() => {
                            // TODO: 触发文件下载
                        }}
                    >
                        <RiFileDownloadLine />
                        <span>RAW</span>
                    </motion.div>


                    <motion.div
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.2, color: "#22c55e" }}
                        className="flex gap-2 items-center text-sm cursor-pointer flex-shrink-0 whitespace-nowrap"
                    >
                        <IoLocationOutline />
                        <span className="whitespace-nowrap">China Fujian</span>
                    </motion.div>
                </div>



                {/* 信息区域 */}
                <div className="flex flex-col w-full ">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-sm font-bold truncate pr-2 md:text-lg">
                            {photo.title}
                        </h2>

                    </div>

                    {/* 可展开的文本描述 */}
                    <div className="mt-2 md:mt-3">
                        <p className={`text-sm ${isExpanded ? '' : 'line-clamp-9'} md:text-md`}>
                            {description}
                        </p>
                        {description.length > 400 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-sm md:text-md mt-1 hover:underline text-accent"
                            >
                                {isExpanded ? 'less' : 'more'}
                            </button>
                        )}
                    </div>

                    {/* EXIF */}
                    <div className='text-sm text-base-content/70 flex flex-col gap-2 md:text-md mt-6 '>
                        <div className='flex items-center gap-7'>
                            <FaCamera />
                            <span>Nikon z50</span>
                        </div>

                        <div className='flex items-center gap-7'>
                            <GiMicroscopeLens />
                            <span>Nikor Z DX 18-140mm f/2.5-63 VR</span>
                        </div>

                        <div className='flex items-center gap-7'>
                            <TbRuler2 />
                            {"30.5 mm (35 mm equivalent: 45.0 mm)"}
                        </div>


                        <div className='flex items-center gap-7'>
                            <IoApertureOutline />
                            20.0
                        </div>

                        <div className='flex items-center gap-7'>
                            <MdOutlineTimer />
                            <span>1/1250</span>
                        </div>

                        <div className='flex items-center gap-7'>
                            <MdIso />
                            <span>1600</span>
                        </div>


                        <div className='flex items-center gap-7'>
                            <BsExposure />
                            <span>-1/3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PhotoDetail
