import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const collectionName = "users";

export async function POST(request) {
    try {
        const data = await request.json();
        const email = data.email;
        const password = data.password;

        if (!email || !password) {
            return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
        }

        const snapshot = await db
            .collection(collectionName)
            .where("email", "==", email)
            .get();

        if (snapshot.empty) { return NextResponse.json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 }) }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) { return NextResponse.json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 }) }

        if (!userData.enable) { return NextResponse.json({ message: "รอการอนุมัติจากผู้ดูแลระบบ" }, { status: 403 }) }

        const payload = { sub: userDoc.id, role: userData.role };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "12h" });

        const response = NextResponse.json({ message: "เข้าสู่ระบบสำเร็จ" }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
            maxAge: 60 * 60 * 12
        });

        return response;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}