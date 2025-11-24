import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md'


const Comment = () => {
    const comment = 'This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. This is a comment. '
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="flex flex-col  rounded-lg  shadow ">
            {/* 顶部用户信息 */}
            <Link href="/" className="flex items-center gap-3 p-4">
                <Image
                    src="/test3.jpg"
                    width={40}
                    height={40}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-base-content/40"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm text-base-content">Machima Koichiro</span>
                    <span className="text-sm text-base-content/70">2025/12/31</span>
                </div>
            </Link>

            {/* 可展开的文本描述 */}
            <div className="px-4">
                <p className={`text-sm ${isExpanded ? '' : 'line-clamp-3'} md:text-md`}>
                    {comment}
                </p>
                {comment.length > 100 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm md:text-md mt-1 hover:underline text-accent"
                    >
                        {isExpanded ? 'less' : 'more'}
                    </button>
                )}
            </div>

        </div>
    )

}

const Comments = ({ onClose }: { onClose: () => void }) => {

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="fixed bottom-0 left-0 w-full h-2/3 bg-base-200 z-50 rounded-t-2xl shadow-lg overflow-y-auto z-2000"
        >
            {/* 关闭按钮 */}
            <div className="flex justify-end p-3">
                <button
                    onClick={onClose}
                    className="fixed rounded-full text-base-content/30 hover:text-base-content/20"
                >
                    <MdCancel />
                </button>
            </div>

            <div className="p-2 flex flex-col gap-4 px-4">
                <Comment />
                <Comment />
                <Comment />
                {/* ... */}
            </div>
        </motion.div>
    )
}

export default Comments