"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhotoFeed from "@/components/PhotoFeed";

import { Photo } from "@/components/PhotoFeed";
import { div } from "framer-motion/client";
import PhotoDialogPreview from "@/components/PhotoDialogPreview";
import PhotoDetail from "@/components/PhotoDetail";

export default function Home() {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(420);
  const isResizingRef = useRef(false);
  const minW = 320;
  const maxW = 800;

  const photoOnSelected = (p: Photo) => {
    setSelected(p);
    // 初始预览宽度为一半屏幕
    setSidebarWidth(Math.min(Math.max(window.innerWidth / 2, minW), maxW));
    if (window.innerWidth < 1024) {
      (document.getElementById("photo-modal") as HTMLDialogElement)?.showModal?.();
    }
  };

  // 处理从小屏切到大屏时自动关闭 modal
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        const modal = document.getElementById("photo-modal") as HTMLDialogElement;
        if (modal?.open) modal.close();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 拖拽调整宽度
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      const newW = Math.min(Math.max(window.innerWidth - e.clientX, minW), maxW);
      setSidebarWidth(newW);
    };

    const onUp = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false;
        document.body.style.userSelect = ""; // 恢复文本选择
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.body.style.userSelect = "none"; // 防止选中文字
  };

  return (
    <div className="flex h-[calc(100vh-64px)] gap-2">
      {/* LEFT: feed */}
      <div className="flex-1 overflow-hidden">
        <PhotoFeed onSelect={photoOnSelected} />
      </div>

      {/* RIGHT: 仅桌面端显示 */}
      <AnimatePresence initial={false}>
        {selected && (
          <motion.aside
            key="preview"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: sidebarWidth, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="hidden lg:flex flex-col border-l  sticky top-[64px] h-[calc(100vh-64px)] bg-base-100 relative"
            style={{ width: sidebarWidth }}
          >
            {/* 分割线（拖拽手柄） */}
            <div
              className="absolute left-0 top-0 h-full w-1 -translate-x-full cursor-col-resize hover:bg-base-300"
              onMouseDown={startResize}
            />

            {/* 关闭按钮 */}
            <div className="flex justify-end p-2 ">
              <button className="btn btn-sm btn-circle" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            {/* 内容 */}
            <div className="flex-1 overflow-y-auto px-1 ">
              <PhotoDetail photo={selected} className="p-8 text-base-content" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Modal */}
      <div className="lg:hidden">
        <PhotoDialogPreview photo={selected!} />
      </div>

    </div>
  );
}
