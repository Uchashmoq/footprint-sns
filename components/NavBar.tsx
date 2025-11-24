
import { prisma } from '@/lib/client';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaRegBell } from 'react-icons/fa';
import { IoMapOutline, IoTelescopeOutline } from 'react-icons/io5';
import { MdLogin, MdOutlinePhotoAlbum } from 'react-icons/md';



export default async function NavBar() {
    const { userId } = await auth()
    let avatar = '/noAvatar'
    let profileUrl = '/'
    if (userId != null) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },

        })
        avatar = user?.avatar || '/noAvatar.png'
        profileUrl = '/profile/' + userId
    }
    return (
        <nav className="sticky top-0 z-50 w-fulls  backdrop-blur border-b border-base-300">
            <div className="">
                <div className="flex h-16 items-center justify-between ">
                    {/* LEFT - Logo */}
                    <div className="hidden md:flex items-center shrink-0">
                        {/* 也可以放 svg 图标 */}
                        <Link href="/" className="font-bold text-xl text-primary">
                            FOOTPRINT
                        </Link>
                    </div>

                    {/* CENTER - 搜索 / Tabs（移动端隐藏） */}
                    <div className="overflow-scroll scrollbar-hide">
                        {/* SCROLL */}
                        <div className="flex gap-6 w-max text-base-content md:px-8">
                            {/* 搜索框 */}
                            <div className="w-full max-w-2xl pl-2 text-neutral-content">
                                <label className="input input-bordered bg-base-200 flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 opacity-70"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        className="w-20 grow bg-transparent md:w-80"
                                        placeholder="Search"
                                    />
                                </label>
                            </div>


                            {/* Tabs */}
                            <div className="flex items-center gap-4">
                                {/* Explore */}
                                <Link href='/' className="btn btn-ghost gap-2">
                                    <IoTelescopeOutline />
                                    Explore
                                </Link>

                                {/* Map */}
                                <Link href='/map' className="btn btn-ghost gap-2">
                                    <IoMapOutline />
                                    Map
                                </Link>

                                {/* Albums */}
                                <Link href='/albums' className="btn btn-ghost gap-2">
                                    <MdOutlinePhotoAlbum />
                                    Albums
                                </Link>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT - 图标 / 按钮 / 头像 */}
                    <div className="flex items-center gap-3 text-base-content ">

                        <ClerkLoading>
                            <span className="loading loading-dots loading-md"></span>
                        </ClerkLoading>

                        <ClerkLoaded>
                            <SignedIn>
                                <div className='flex items-center gap-1'>
                                    {/* 通知 */}
                                    <button className="btn btn-ghost btn-circle text-base-content">
                                        <div className="indicator">
                                            <FaRegBell />
                                        </div>
                                    </button>
                                    <Link href={profileUrl}>
                                        <Image
                                            src={avatar}
                                            width={40}
                                            height={40}
                                            alt="avatar"
                                            className="w-8 h-8 rounded-full object-cover border border-base-content/70"
                                        />
                                    </Link>
                                </div>
                            </SignedIn>

                            <SignedOut>
                                <div className='flex items-center gap-2 text-sm text-base-content'>
                                    <MdLogin />
                                    <Link href="/sign-in">Login/Register</Link>
                                </div>
                            </SignedOut>
                        </ClerkLoaded>


                    </div>
                </div>
            </div>
        </nav>
    );
}


