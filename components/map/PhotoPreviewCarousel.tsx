'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePhotoMap } from './PhotoMapContext';
import { useEffect, useState } from 'react';

import { span } from 'framer-motion/client';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import PhotoDetail from '../PhotoDetail';

export default function PhotoPreviewCarousel() {
    const { visiblePhotos, selectedPhotoIdx, selectedPhoto, setSelectedPhotoIdx, setSelectedPhoto } = usePhotoMap();
    console.log('PhotoPreviewCarousel rendered ,visiblePhotos length: ', visiblePhotos.length)


    //console.log(visiblePhotos)
    //console.log('idx: ', selectedPhotoIdx)


    const nextPhoto = () => {
        setSelectedPhotoIdx((prevIdx) => {
            const newIdx = (prevIdx + 1) % visiblePhotos.length;
            setSelectedPhoto(visiblePhotos[newIdx]);
            return newIdx;
        });
    };
    const lastPhoto = () => {
        setSelectedPhotoIdx((prevIdx) => {
            const newIdx = prevIdx > 0
                ? (prevIdx - 1) % visiblePhotos.length
                : visiblePhotos.length - 1;
            setSelectedPhoto(visiblePhotos[newIdx]);
            return newIdx;
        });
    };



    return (
        <div className="flex flex-col w-full h-full rounded-lg border-3 border-neutral">
            {visiblePhotos && visiblePhotos.length > 0 ? (
                <>
                    <div className="relative h-96 overflow-scroll flex-1 rounded-lg shadow-lg">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedPhoto.id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <PhotoDetail photo={selectedPhoto} className='p-7 text-base-content' />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 控制按钮 */}
                    <div className="flex justify-center gap-5 my-3">
                        <button
                            onClick={lastPhoto}
                            className="w-20  px-4 py-2 btn hover:bg-gray-700 transition-colors"
                        >
                            <GrLinkPrevious />
                        </button>
                        <button
                            onClick={nextPhoto}
                            className="w-20 px-4 py-2 btn hover:bg-gray-700 transition-colors"
                        >
                            <GrLinkNext />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <span className="font-bold text-lg text-base-content">No photo in this area</span>
                </div>
            )}
        </div>
    );

}
