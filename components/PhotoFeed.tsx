"use client";

import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";

export type Photo = {
    id: number;
    src: string;
    title: string;
    author: string;
    description: string;
    width: number
    height: number
    lat: number
    lng: number
};

export const photos: Photo[] = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    src: "/test1.jpg",
    title: `Photo ${i + 1}`,
    author: `Author ${i + 1}`,
    description: `This is a description for photo ${i + 1}.`,
    width: 5568,
    height: 3712,
    lat: 1,
    lng: 2
}));

type Props = {
    onSelect: (p: Photo) => void;
    /** 最大列数（可配置，默认 4） */
    maxCols?: number;
    /** 每个卡片的最小宽度，用它和容器宽度算列数，默认 180 */
    minItemWidth?: number;
    /** grid gap（可选，自行用 class 写也行，这里只给个默认） */
    gapClassName?: string;
};

export default function PhotoFeed({
    onSelect,
    maxCols = 3,
    minItemWidth = 180,
    gapClassName = "gap-1 md:gap-2",
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols, setCols] = useState(1);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const calc = () => {
            const w = el.clientWidth;
            const possible = Math.floor(w / minItemWidth);
            const next = Math.max(1, Math.min(maxCols, possible));
            setCols(next);
        };

        // 初始计算
        calc();

        // 监听尺寸变化（更可靠）
        const ro = new ResizeObserver(calc);
        ro.observe(el);

        // 兜底：窗口 resize 时也算一次
        window.addEventListener("resize", calc);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", calc);
        };
    }, [maxCols, minItemWidth]);

    return (
        <div ref={containerRef} className="h-full overflow-y-auto">
            <div
                className={`grid ${gapClassName}`}
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
                {photos.map((photo, idx) => (

                    <div
                        key={photo.id}
                        className="group relative aspect-[3/2] overflow-hidden rounded-md shadow-sm border-1 border-neutral"

                        onClick={() => onSelect?.(photo)}
                    >
                        <Suspense fallback={<span className="loading loading-dots loading-xl"></span>}>
                            <Image
                                src={photo.src}
                                alt={photo.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                                sizes="100vw"
                                priority={idx < 6}
                            />

                            <div className="absolute inset-0 flex flex-col justify-between bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 p-3">
                                <div className="text-white text-base font-semibold drop-shadow">
                                    {photo.title}
                                </div>
                                <div className="text-white text-sm space-y-1 drop-shadow">
                                    <div className="font-medium">By {photo.author}</div>
                                    <div className="text-xs leading-snug">{photo.description}</div>
                                </div>
                            </div>
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
}
