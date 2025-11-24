'use client';

import dynamic from 'next/dynamic';
import { PhotoMapProvider } from '@/components/map/PhotoMapContext';
import PhotoPreviewCarousel from '@/components/map/PhotoPreviewCarousel';
import { Photo } from '@/components/PhotoFeed';
import PhotoDialogPreview from '@/components/PhotoDialogPreview';
import PhotoPreviewMobile from '@/components/map/PhotoPreviewMobile';

const MapWithPhotos = dynamic(() => import('@/components/map/MapWithPhotos'), { ssr: false });



export default function Page() {
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
