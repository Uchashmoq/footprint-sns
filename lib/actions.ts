"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./client";

export async function switchFollow(followingId: string) {
  "use server";
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    redirect("/sign-in");
  }
  const existingFollow = await prisma.follower.findFirst({
    where: {
      followerId: currentUserId!,
      followingId: followingId,
    },
  });

  if (existingFollow) {
    await prisma.follower.delete({
      where: {
        id: existingFollow.id,
      },
    });
    console.log(`${currentUserId} unfollowed ${existingFollow.id}`);
  } else {
    await prisma.follower.create({
      data: {
        followerId: currentUserId!,
        followingId: followingId,
      },
    });
    console.log(`${currentUserId} followed ${followingId}`);
  }
}
