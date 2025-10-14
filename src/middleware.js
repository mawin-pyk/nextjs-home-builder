import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const publicRoutes = ["/login", "/register"];
const superRoutes = ["/admin/user-setting"];
const authRoutes = ["/admin"];

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    let tokenValid = false;
    let payload = null;

    // ตรวจสอบ JWT
    if (token) {
        try {
            const verified = await jwtVerify(token.value, secret);
            payload = verified.payload;
            tokenValid = true;

        } catch (error) {
            tokenValid = false;
        }
    }

    // Public routes
    if (publicRoutes.includes(pathname)) {
        return tokenValid ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
    }

    // Super routes
    if (superRoutes.some((route) => pathname.startsWith(route))) {
        const userRole = payload?.role;
        if (userRole !== "super") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Auth routes
    if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (!tokenValid) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/admin/:path*"]
}