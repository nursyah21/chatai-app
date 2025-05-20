import { adminAuth } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        const decodedToken = await adminAuth.verifyIdToken(idToken);

        const res = NextResponse.json({
            message: "User authenticated",
            user: { uid: decodedToken.uid, email: decodedToken.email },
        })

        res.cookies.set("auth_session", idToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        })

        return res

    } catch (err) {
        let message = '"An unknown error occurred'
        if (err instanceof Error) {
            message = err.message
        }
        return NextResponse.json({ message })
    }
}