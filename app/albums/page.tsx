import AlbumCover from '@/components/albums/AlbumCover'
import { Photo } from '@/components/PhotoFeed'
import React from 'react'

const photos: Photo[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `/test${(i % 6) + 1}.jpg`,
    title: `Photo ${i + 1}`,
    author: 'Machima Koichiro',
    description: 'Placeholder description',
    width: 1920,
    height: 1080,
    lat: 0,
    lng: 0
}))

const page = () => {
    return (
        <div className="min-h-screen w-full bg-base-100 py-10 px-6">


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AlbumCover cover="/test2.jpg" albumTitle="Summer Trip" />
                <AlbumCover cover="/test3.jpg" albumTitle="Winter Snow" />
                <AlbumCover cover="/test4.jpg" albumTitle="Family Moments" />
                <AlbumCover cover="/test5.jpg" albumTitle="Street Photography" />
                <AlbumCover cover="/test6.jpg" albumTitle="Nature Adventure" />
                <AlbumCover cover="/test1.jpg" albumTitle="City Lights" />
            </div>
        </div>
    )
}

export default page