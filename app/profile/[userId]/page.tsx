
import ContentSelector from "@/components/profile/ContentSelector"
import SubscribeButton from "@/components/profile/SubscribeButton"
import UserInfoCard from "@/components/profile/UserInfoCard"
import Image from "next/image"
import { useState } from "react"

// app/profile/[userId]/page.tsx
export default async function ProfilePage({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const userId = (await params).userId

    return (
        <div className="flex flex-col gap-4 items-center px-7 py-4  border-neutral">

            <UserInfoCard userId={userId} />
            <ContentSelector userId={userId} />
        </div >
    )
}

