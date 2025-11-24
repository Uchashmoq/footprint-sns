'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { usePhotoMap } from './PhotoMapContext';
import MapEvents from './MapEvents';
import { useEffect } from 'react';
import { useIsMdUp } from '@/hooks/useMediaQuery';

const defaultIcon = L.icon({
    iconUrl: '/marker.svg',
    shadowUrl: '/marker-shadow.svg',
    iconSize: [32, 32],
    shadowSize: [32, 10],
    iconAnchor: [16, 32],   // 底部中心
    shadowAnchor: [16, 5],  // y 从 10 调到 2，阴影会再往下
    popupAnchor: [0, -40],
});

export default function MapWithPhotos() {
    const { visiblePhotos, selectedPhoto, setSelectedPhotoIdx, setVisiblePhotos, setSelectedPhoto, setShowMobilePreview } = usePhotoMap();
    useEffect(() => {
        const idx = visiblePhotos.findIndex(photo => photo.id === selectedPhoto.id)
        setSelectedPhotoIdx(idx === -1 ? 0 : idx)
    }, [selectedPhoto]);
    const isMdUp = useIsMdUp();

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={[35.8617, 104.1954]}
                zoom={4}
                scrollWheelZoom={true}
                className="w-full h-full rounded-lg border-3 border-neutral"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents onVisiblePhotos={setVisiblePhotos} />

                {visiblePhotos.map((p) => (
                    <Marker
                        key={p.id}
                        position={[p.lat, p.lng]}
                        icon={defaultIcon}
                        eventHandlers={{
                            click: () => {
                                setSelectedPhoto(p)
                                if (!isMdUp) setShowMobilePreview(true)
                            },
                        }}
                    >

                    </Marker>
                ))}
            </MapContainer>



            {/* 美化的绝对定位计数器 */}
            <div

                className="
  absolute right-4 bottom-4
  z-[1000]
  w-14 h-14 rounded-full
  bg-gradient-to-br from-emerald-800 via-green-800 to-teal-800
  text-white
  flex items-center justify-center
  font-semibold text-lg
  shadow-2xl shadow-emerald-500/30
  hover:shadow-3xl hover:shadow-emerald-500/50
  hover:scale-110
  active:scale-95
  transition-all duration-300 ease-out
  cursor-pointer
  border-2 border-white/20
  backdrop-blur-sm
  
  overflow-hidden
  group
">
                {/* 背景光晕效果 */}
                <div className="
    absolute inset-0 
    bg-gradient-to-br from-white/20 to-transparent 
    rounded-full 
    opacity-0 group-hover:opacity-100 
    transition-opacity duration-300
  "></div>

                {/* 数字内容 - 带数字变化动画 */}
                <span className="
    relative z-10 
    transform group-hover:scale-110 
    transition-all duration-300 ease-out
    animate-pulse
    key={visiblePhotos.length}
  ">
                    {visiblePhotos.length}
                </span>

                {/* 脉冲动画环 */}
                <div className="
    absolute inset-0 
    rounded-full 
    border-2 border-emerald-400/50 
    animate-ping 
    opacity-30
  "></div>
            </div>

        </div>


    );
}
