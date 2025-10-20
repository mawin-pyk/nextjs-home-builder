import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { verifyToken } from "@/helpers/auth";

export const runtime = "nodejs";

const collectionName = "articles";

export async function DELETE(request, { params }) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            console.log(userToken);
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const { id } = await params;
        const docRef = db.collection(collectionName).doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

        const images = docSnap.data().images;

        if (images.length > 0) {
            const res = await fetch(`${request.nextUrl.origin}/api/admin/image-upload/${collectionName}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json();
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
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

        const { id } = await params;
        const docRef = db.collection(collectionName).doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

        const data = docSnap.data();
        return NextResponse.json({
            data: {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            },
        }, { status: 200 });

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

        const { id } = await params;
        const docRef = db.collection(collectionName).doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

        const data = await request.formData();
        const name = data.get("name");
        const slug = data.get("slug");
        const description = data.get("description");
        const content = data.get("content");
        const files = data.getAll("files") || [];
        const urls = data.getAll("urls") || [];

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

        const originalFiles = docSnap.data().images;
        const filesToDelete = originalFiles.filter((originalFile) => !urls.includes(originalFile));
        if (filesToDelete.length > 0) {
            const res = await fetch(`${request.nextUrl.origin}/api/admin/image-upload/${collectionName}/${id}`, {
                method: "PUT",
                body: JSON.stringify({ images: filesToDelete }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                const error = await res.json();
                return NextResponse.json({ message: error.message }, { status: 500 });
            }
        }

        let images = [];
        if (files.length > 0) {
            const fd = new FormData();
            fd.append("path", `${collectionName}/${docRef.id}`);
            files.forEach((file) => fd.append("files", file));

            const res = await fetch(`${request.nextUrl.origin}/api/admin/image-upload`, {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const error = await res.json();
                return NextResponse.json({ message: error.message }, { status: 500 });
            }

            const result = await res.json();
            images = result.data;
        }

        const updateResult = await docRef.update({
            name,
            slug,
            description,
            content,
            images: [...urls, ...images],
            updatedAt: new Date()
        });

        if (!updateResult) {
            return NextResponse.json({ message: "ไม่สามารถแก้ไขข้อมูลได้" }, { status: 500 });
        }

        return NextResponse.json({ message: "แก้ไขข้อมูลสำเร็จ" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}