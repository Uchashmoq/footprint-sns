'use client'
import React from 'react'
import { PhotoMapProvider } from '../map/PhotoMapContext';


import PhotoPreviewMobile from '../map/PhotoPreviewMobile';
import { div } from 'framer-motion/client';
import dynamic from 'next/dynamic';
import PhotoPreviewCarousel from '../map/PhotoPreviewCarousel';

const MapWithPhotos = dynamic(() => import('@/components/map/MapWithPhotos'), { ssr: false });

const MyFootPrints = () => {
    return (

        <PhotoMapProvider>
            <div className='relative'>
                <div className="flex h-[calc(100vh-64px)] py-6 relative gap-2">
                    <div className="flex-1 h-full">
                        <MapWithPhotos />
                    </div>
                    <div className="hidden md:block w-1/3 h-full overflow-y-clip bg-base-200">
                        <PhotoPreviewCarousel />
                    </div>
                </div>

                {/* 小屏弹窗 */}
                <PhotoPreviewMobile />
            </div>
        </PhotoMapProvider>

    );
}

export default MyFootPrints