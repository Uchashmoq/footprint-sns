'use client';

import React, { createContext, useContext, useState } from 'react';
import type { LatLngBounds } from 'leaflet';
import { Photo } from '../PhotoFeed';



interface PhotoMapContextType {
    selectedPhoto: Photo;
    setSelectedPhoto: (photo: Photo) => void;

    selectedPhotoIdx: number;
    setSelectedPhotoIdx: (v: number | ((prev: number) => number)) => void;

    visiblePhotos: Photo[];
    setVisiblePhotos: (v: Photo[] | ((prev: Photo[]) => Photo[])) => void;

    bounds: LatLngBounds | null;
    setBounds: (b: LatLngBounds) => void;

    showMobilePreview: boolean;
    setShowMobilePreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotoMapContext = createContext<PhotoMapContextType | undefined>(undefined);


const allPhotos: Photo[] = [
    {
        id: 1,
        src: '/test1.jpg',
        title: '北京天安门',
        author: '张三',
        description: '北京的地标建筑',
        width: 5568,
        height: 3712,
        lat: 39.9042,
        lng: 116.4074,
    },
    {
        id: 2,
        src: '/test2.jpg',
        title: '上海外滩1',
        author: '李四',
        description: '上海的繁华夜景',
        width: 5568,
        height: 3712,
        lat: 31.2304,
        lng: 121.4737,
    },
    {
        id: 3,
        src: '/test3.jpg',
        title: '广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔广州塔',
        author: '王五',
        description: '广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标广州著名的地标',
        width: 5568,
        height: 3712,
        lat: 23.1291,
        lng: 113.2644,
    },
    {
        id: 4,
        src: '/test4.jpg',
        title: '香港维多利亚港',
        author: '赵六',
        description: '香港著名夜景',
        width: 5568,
        height: 3712,
        lat: 22.3193,
        lng: 114.1694,
    },
];
export const PhotoMapProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0);
    const [visiblePhotos, setVisiblePhotos] = useState<Photo[]>(allPhotos);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo>(visiblePhotos[0])
    const [bounds, setBounds] = useState<LatLngBounds | null>(null);
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    return (
        <PhotoMapContext.Provider
            value={{
                selectedPhoto,
                setSelectedPhoto,
                selectedPhotoIdx,
                setSelectedPhotoIdx,
                visiblePhotos,
                setVisiblePhotos,
                bounds,
                setBounds,
                showMobilePreview,
                setShowMobilePreview,
            }}
        >
            {children}
        </PhotoMapContext.Provider>
    );
};

export const usePhotoMap = () => {
    const ctx = useContext(PhotoMapContext);
    if (!ctx) throw new Error('usePhotoMap must be used inside PhotoMapProvider');
    return ctx;
};
