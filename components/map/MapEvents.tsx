'use client';

import { useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
import { usePhotoMap } from './PhotoMapContext';
import { Photo } from '../PhotoFeed';




export default function MapEvents({ onVisiblePhotos }: { onVisiblePhotos: (photos: any[]) => void }) {
    const { visiblePhotos, selectedPhoto, setSelectedPhoto, setSelectedPhotoIdx } = usePhotoMap();

    const updateVisible = () => {
        const b = map.getBounds();
        //setBounds(b);
        let changed = false
        const changedPhotos = new Array()
        for (const photo of visiblePhotos) {
            if (b.contains([photo.lat, photo.lng])) {
                changedPhotos.push(photo)
            } else {
                changed = true
            }
        }

        if (changed) {
            onVisiblePhotos(changedPhotos);
            if (!changedPhotos.find((photo => photo.id === selectedPhoto.id))) {
                //选中的图已经不在列表内
                setSelectedPhoto(changedPhotos[0])
                setSelectedPhotoIdx(0)
                console.log('selected photo out')
            }
        }
    };

    //缩放时更改可见地图数组
    const map = useMapEvents({
        moveend: () => updateVisible(),
        zoomend: () => updateVisible(),
    });



    useEffect(() => {
        updateVisible();
    }, [map]);

    return null;
}
