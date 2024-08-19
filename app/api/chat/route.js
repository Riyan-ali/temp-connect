import db from "@/lib/db";
import Chat from "@/models/Chat";
import { generateRandomCode } from "@/utils/function";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { newChat } = await req.json();
  const { name, type, secret, group, grouplimit } = await newChat;

  if (!name || !type || !group) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 400 }
    );
  }

  try {
    await db.connect();

    let url;
    let isExistingUrl;

    do {
      url = await generateRandomCode(7);
      isExistingUrl = await Chat.findOne({ url });
    } while (isExistingUrl);

    const chat = await new Chat({
      name,
      type,
      secret,
      theme: group,
      grouplimit,
      url,
    });

    await chat.save();
    await db.disconnect();

    return new NextResponse(
      JSON.stringify({
        message: "Your new chat room is ready.",
        data: chat,
      }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnect();
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function PUT(req) {
  const { newChat } = await req.json();
  const { id, name, type, secret, group, grouplimit } = await newChat;

  if (!id || !name || !type || !group) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
      }),
      { status: 400 }
    );
  }

  try {
    await db.connect();

    const chat = await Chat.findOne({url : id});

    if (!chat) {
        await db.disconnect()
      return new NextResponse(
        JSON.stringify({
          message: "Chat not found, Please try again",
        }),
        { status: 400 }
      );
    }

    chat.name = name;
    chat.type = type;
    chat.secret = secret;
    chat.theme = group;
    chat.grouplimit = grouplimit;

    await chat.save()
    await db.disconnect()

    return new NextResponse(
        JSON.stringify({
          message: "Your chat room has been updated successfully",
          data: chat,
        }),
        { status: 200 }
      );

  } catch (error) {
    await db.disconnect();
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
