import React from 'react'

import { Photo } from './PhotoFeed'
import PhotoDetail from './PhotoDetail'

const PhotoDialogPreview = ({ photo }: { photo: Photo }) => {
    return (
        <dialog id="photo-modal" className="modal">
            <div className="modal-box p-0 max-w-none w-[95vw] h-[90vh] relative bg-base-200 border-1 border-neutral">
                <button
                    className="btn btn-sm btn-circle bg-neutral absolute z-10 right-3 top-3 bg-base"
                    onClick={() =>
                        (document.getElementById("photo-modal") as HTMLDialogElement)?.close()
                    }
                >
                    ✕
                </button>

                <PhotoDetail photo={photo} className='p-4 text-base-content' />

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default PhotoDialogPreview