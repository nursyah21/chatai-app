import { NextResponse } from "next/server";

export const runtime = "edge"

export async function GET() {
    const response = NextResponse.json({ message: "User logged out" });

    response.cookies.set("auth_session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        path: "/",
    });

    return response;
}
