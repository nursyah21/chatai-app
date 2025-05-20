import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const authSession = req.cookies.get("auth_session");

    if (!authSession && req.nextUrl.pathname.startsWith("/app")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (authSession && req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/app", req.url));
    }

    if (req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/app", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
};
