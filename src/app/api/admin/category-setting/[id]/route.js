import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyToken } from "@/helpers/auth";

export async function DELETE(request, { params }) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const collectionName = searchParams.get("collection");

        const { id } = await params;
        const docRef = db.collection(collectionName).doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

        const deleteResult = await docRef.delete();

        if (!deleteResult) {
            return NextResponse.json({ message: "ไม่สามารถลบข้อมูลได้" }, { status: 500 });
        }

        return NextResponse.json({ message: "ลบข้อมูลสำเร็จ" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const collectionName = searchParams.get("collection");

        const { id } = await params;
        const docRef = db.collection(collectionName).doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

        return NextResponse.json({ data: { id: docSnap.id, ...docSnap.data() } }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function PUT(request, { params }) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const collectionName = searchParams.get("collection");

        const { id } = await params;
        const docRef = db.collection(collectionName).doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

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
            const isDuplicate = snapshot.docs.some((doc) => doc.id !== id);
            if (isDuplicate) return NextResponse.json({ message: "มีข้อมูลนี้แล้ว" }, { status: 400 });
        }

        const updateResult = await docRef.update({
            ...data,
        });

        if (!updateResult) {
            return NextResponse.json({ message: "ไม่สามารถแก้ไขข้อมูลได้" }, { status: 500 });
        }

        return NextResponse.json({ message: "แก้ไขข้อมูลสำเร็จ" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}