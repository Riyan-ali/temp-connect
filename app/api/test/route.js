import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await db.connect()
        await db.disconnect()
        return new NextResponse(JSON.stringify({
            message: "API test successful",
        }), {status: 200})
    } catch (error) {
        return new NextResponse(JSON.stringify({message: error.message}), {status: 500})
    }
}

