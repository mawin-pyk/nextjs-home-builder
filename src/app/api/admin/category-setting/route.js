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
        const title = data.title;
        const slug = data.slug;
        const description = data.description;
        const keywords = data.keywords || [];
        const detail = data.detail

        if (!title) {
            return NextResponse.json({ message: "ข้อมูลไม่ครบ" }, { status: 400 });
        }

        const [titleSnap, slugSnap] = await Promise.all([
            db.collection(collectionName)
                .where("title", "==", title)
                .limit(1)
                .get(),

            db.collection(collectionName)
                .where("slug", "==", slug)
                .limit(1)
                .get(),
        ]);

        if (!titleSnap.empty) {
            return NextResponse.json({ message: "มีชื่อนี้แล้ว" }, { status: 400 });
        }

        if (!slugSnap.empty) {
            return NextResponse.json({ message: "มี URL นี้แล้ว" }, { status: 400 });
        }

        const docRef = await db.collection(collectionName).add({
            title,
            slug,
            description,
            keywords,
            detail
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