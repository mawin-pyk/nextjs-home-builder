import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const response = NextResponse.json({ message: "ออกจากระบบสำเร็จ" }, { status: 200 });

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            expires: new Date(0),
        });

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}