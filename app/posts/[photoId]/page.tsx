'use client'
import { Photo, photos } from '@/components/PhotoFeed'
import PhotoDetail from '@/components/PhotoDetail'
import exifr from 'exifr'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa'


const samplePhotos: Photo[] = [
  { id: 1, src: '/test1.jpg', title: 'photo1', author: '', description: 'desc1 ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.ChatGPT Images is capable of following precise instructions to add text, add details within the image, or make the background of an image transparent.', width: 1200, height: 800, lat: 0, lng: 0 },
  { id: 2, src: '/test2.jpg', title: 'photo2', author: '', description: 'desc2 ', width: 1200, height: 800, lat: 0, lng: 0 },
  { id: 3, src: '/test3.jpg', title: 'photo3', author: '', description: 'desc3', width: 1200, height: 800, lat: 0, lng: 0 },
  { id: 4, src: '/test4.jpg', title: 'photo4', author: '', description: 'desc4', width: 1200, height: 800, lat: 0, lng: 0 },
  { id: 5, src: '/test5.jpg', title: 'photo5', author: '', description: 'desc5', width: 1200, height: 800, lat: 0, lng: 0 },
  { id: 6, src: '/test6.jpg', title: 'photo6', author: '', description: 'desc6', width: 3712, height: 5568, lat: 0, lng: 0 },
]

const page = () => {
  const [like, setLike] = useState(false)
  return (
    <div className='flex flex-col gap-3'>
      {/* AVATAR AND USERNAME */}
      <div className="sticky top-0 z-10 bg-base-100 flex justify-between items-center gap-3 pt-2 px-1 pb-2">
        <div className='flex items-center justify-between gap-7 '>
          <Image
            src='/test3.jpg'
            width={40}
            height={40}
            alt="avatar"
            className="w-11 h-11 rounded-full object-cover border border-base-content/70"
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


      </div>

      {/* PHOTO DETALS */}
      <PhotoDetail photo={samplePhotos[5]} className='p-8 md:p-15 lg:p-23 text-base-content bg-base-200 rounded-lg' />
      <PhotoDetail photo={samplePhotos[0]} className='p-8 md:p-15 lg:p-23 text-base-content bg-base-200 rounded-lg' />
      <PhotoDetail photo={samplePhotos[2]} className='p-8 md:p-15 lg:p-23 text-base-content bg-base-200 rounded-lg' />
      <PhotoDetail photo={samplePhotos[3]} className='p-8 md:p-15 lg:p-23 text-base-content bg-base-200 rounded-lg' />



    </div>
  )
}

export default page