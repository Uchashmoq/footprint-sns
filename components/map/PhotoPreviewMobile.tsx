import React, { useEffect } from 'react'
import { usePhotoMap } from './PhotoMapContext';
import { useIsMdUp } from '@/hooks/useMediaQuery';


import PhotoDetail from '../PhotoDetail';

const PhotoPreviewMobile = () => {
    const { showMobilePreview, setShowMobilePreview, selectedPhoto } = usePhotoMap();
    const isMdUp = useIsMdUp();
    console.log("photo mobile preview, open: ", showMobilePreview)
    useEffect(() => {
        if (isMdUp && showMobilePreview) setShowMobilePreview(false);
    }, [isMdUp, showMobilePreview, setShowMobilePreview]);

    return (
        <>
            {showMobilePreview && <div className='pb-3 w-[80%] md:hidden flex flex-col z-[500] h-[70%] bg-base-300/90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border-1 border-neutral'>
                <button
                    className="btn btn-sm  btn-circle bg-neutral  bg-base my-2 ml-2"
                    onClick={() => setShowMobilePreview(false)}
                >
                    ✕
                </button>
                <PhotoDetail photo={selectedPhoto} className='text-base-content p-4' />
            </div>}

        </>
    )
}

export default PhotoPreviewMobile