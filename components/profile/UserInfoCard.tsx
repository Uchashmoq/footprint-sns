import Image from 'next/image'
import React, { useState } from 'react'
import SubscribeButton from './SubscribeButton'
import { div } from 'framer-motion/client'
import { IoCameraSharp, IoLocationOutline } from 'react-icons/io5'
import { FaLocationDot } from 'react-icons/fa6'
import { FaLink } from 'react-icons/fa'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/client'
import { notFound } from 'next/navigation'
import { Follower } from '@prisma/client'

const UserInfoCard = async ({ userId }: { userId: string }) => {
    const { userId: currentUserId } = await auth()
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    followings: true,
                    photos: true,
                    albums: true,
                }
            }
        }
    })
    if (!user) notFound()

    let isSub = false
    if (!currentUserId && !userId) {
        const follower = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId!,
                followingId: userId!,
            }
        })
        if (follower) isSub = true
    }


    return (
        <div className='flex w-full flex-col gap-4'>
            <div className='w-full  h-80 relative'>
                {/* 背景图 */}
                <Image src={user.cover || '/noCover.jpeg'} alt='' fill className='object-cover rounded-md' />

                {/* 头像 */}
                <div className="absolute left-5 -bottom-9">
                    <Image
                        src={user.avatar || "noAvatar.png"}
                        alt=''
                        width={64}
                        height={64}
                        className='w-16 h-16 rounded-full object-cover ring-4 ring-white'
                    />

                    {/* 订阅按钮：放在头像正下方 */}
                    {currentUserId !== userId && (
                        <div className="absolute left-1/2 translate-x-[-50%] top-full ">
                            <SubscribeButton isSub={isSub} followerId={currentUserId} followingId={userId} className="w-4 h-4" />
                        </div>
                    )}
                </div>

                {/* 用户名 */}
                <h1 className="absolute left-24 top-81 text-lg font-bold text-base-content z-[100]">
                    {user?.username || '???'}
                </h1>
            </div>

            {user.description && (
                <p className="text-base-content mt-15 text-left pr-9">
                    {user.description}
                </p>
            )}
            <div className='w-full flex flex-wrap gap-4 items-center text-gray-500 '>
                {user.location && (
                    <div className='flex gap-1 items-center'>
                        <FaLocationDot />
                        <span>{user.location}</span>
                    </div>
                )}

                {user.camera && (
                    <div className='flex gap-1 items-center'>
                        <IoCameraSharp />
                        <span>{user.camera}</span>
                    </div>
                )}

                {user.website && (
                    <div className='flex gap-1 items-center'>
                        <FaLink />
                        <Link href='baidu.com' className='text-blue-400 underline font-medium'>
                            {user.website}
                        </Link>
                    </div>
                )}
            </div>
            <div className='flex gap-8 text-sm text-muted-foreground '>
                <div className='flex flex-col items-center'>
                    <span className='font-bold text-base-content text-md'>{user._count.followings}</span>
                    <span className='text-xs text-gray-500'>Following</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-bold text-base-content text-md'>{user._count.followers}</span>
                    <span className='text-xs text-gray-500'>Followers</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-bold text-base-content text-md'>{user._count.photos}</span>
                    <span className='text-xs text-gray-500'>Photos</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-bold text-base-content text-md'>{user._count.photos}</span>
                    <span className='text-xs text-gray-500'>Albums</span>
                </div>
            </div>

        </div>
    )
}

export default UserInfoCard