import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyToken } from "@/helpers/auth";

const collectionName = "home-designs";

export async function PATCH(request, { params }) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const { id } = await params;
        const docRef = db.collection(collectionName).doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

        const data = await request.json();
        const highlight = data.highlight;

        const updateResult = await docRef.update({
            highlight: highlight,
            updatedAt: new Date()
        });

        if (!updateResult) {
            return NextResponse.json({ message: "อัปเดตสถานะผู้ใช้งานไม่สำเร็จ" }, { status: 500 });
        }

        return NextResponse.json({ message: highlight ? "เปิดการใช้งานสำเร็จ" : "ปิดการใช้งานสำเร็จ" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}