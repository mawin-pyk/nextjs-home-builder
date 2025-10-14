import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyToken } from "@/helpers/auth";

export async function POST(request) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const collectionName = searchParams.get("collection");

        const data = await request.json();
        const name = data.name;

        if (!name) {
            return NextResponse.json({ message: "ข้อมูลไม่ครบ" }, { status: 400 });
        }

        const snapshot = await db
            .collection(collectionName)
            .where("name", "==", name)
            .get();

        if (!snapshot.empty) {
            return NextResponse.json({ message: "มีข้อมูลนี้แล้ว" }, { status: 400 });
        }

        const docRef = await db.collection(collectionName).add({
            name,
        });

        if (!docRef.id) {
            return NextResponse.json({ message: "ไม่สามารถเพิ่มข้อมูลได้" }, { status: 500 });
        }

        return NextResponse.json({ message: "เพิ่มข้อมูลสำเร็จ" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const collectionName = searchParams.get("collection");

        const snapshot = await db.collection(collectionName).get();

        const categories = snapshot.empty
            ? []
            : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json({ data: { categories } }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}