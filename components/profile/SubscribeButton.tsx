'use client'
import { switchFollow } from "@/lib/actions";
import { prisma } from "@/lib/client";
import { Follower } from "@prisma/client";
import { useState } from "react";

const SubscribeButton = async ({ isSub, followerId, followingId, className = "" }: { isSub: boolean, followerId: string | null, followingId: string | null, className?: string }) => {
    const [followState,setFollowState] = useState(isSub)
    const follow = async () => {

    }


    return (
        <form action={follow}>
            <button
                className={`
        
        ${isSub
                        ? 'bg-gradient-to-br from-gray-500 to-gray-600 hover:from-red-500 hover:to-red-600 active:from-red-600 active:to-red-700 shadow-gray-500/30 hover:shadow-red-500/40 border-gray-400/30 hover:border-red-400/30'
                        : 'bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:from-emerald-700 active:to-green-800 shadow-emerald-500/30 hover:shadow-emerald-500/40 border-emerald-400/30'
                    }
        text-white
        rounded-full
        shadow-lg
        hover:shadow-xl
        hover:scale-110
        active:scale-95
        transition-all duration-300 ease-out
        border-2 border-white/20
        backdrop-blur-sm
        flex items-center justify-center
        group
        relative
        overflow-hidden
        ${className}
      `}
            >
                {/* 背景光晕效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* 图标容器 */}
                <div className="relative z-10 transform group-hover:rotate-180 transition-transform duration-500 ease-out">
                    {isSub ? (
                        // 减号图标 (取消订阅)
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                        </svg>
                    ) : (
                        // 加号图标 (订阅)
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                    )}
                </div>

                {/* 脉冲动画环 */}
                <div className="absolute inset-0 rounded-full border-2 border-current opacity-20 animate-ping"></div>
            </button>
        </form>
    );
};

export default SubscribeButton;