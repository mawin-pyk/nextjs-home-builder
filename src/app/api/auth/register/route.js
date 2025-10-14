import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const collectionName = "users";

export async function POST(request) {
    try {
        const data = await request.json();
        const email = data.email;
        const username = data.username;
        const password = data.password;

        if (!email || !username || !password) {
            return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
        }

        const snapshot = await db
            .collection(collectionName)
            .where("email", "==", email)
            .get();

        if (!snapshot.empty) {
            return NextResponse.json({ message: "ไม่สามารถลงทะเบียนได้" }, { status: 400 });
        }

        const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

        const docRef = await db.collection(collectionName).add({
            email,
            username,
            password: hash,
            role: "admin",
            enable: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!docRef.id) {
            return NextResponse.json({ message: "ลงทะเบียนไม่สำเร็จ" }, { status: 500 });
        }

        // const payload = { sub: docRef.id, role: userData.role };
        // const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "12h" });

        const response = NextResponse.json({ message: "ลงทะเบียนสำเร็จ รอการอนุมัติจากผู้ดูแลระบบ" }, { status: 200 });
        // response.cookies.set("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "Strict",
        //     path: "/",
        //     maxAge: 60 * 60 * 12
        // });

        return response;

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}