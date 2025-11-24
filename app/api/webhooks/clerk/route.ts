import { prisma } from "@/lib/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;
    console.log("receive webhook, type: " + eventType);
    const { id } = evt.data;
    const { username } = evt.data;
    const avatar = evt.data.image_url || "/noAvatar.png";

    if (eventType === "user.created") {
      await prisma.user.create({
        data: {
          id: id,
          username: username,
          avatar: avatar,
          cover: "/noCover.jpeg",
        },
      });
      console.log(
        `User created: ID: ${id}, Username: ${username}, Avatar: ${avatar}`
      );
    }

    if (eventType == "user.updated") {
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
