import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { verifyToken } from "@/helpers/auth";

export const runtime = "nodejs";

const collectionName = "projects";

export async function POST(request) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const data = await request.formData();
        const title = data.get("title");
        const slug = data.get("slug");
        const description = data.get("description");
        const houseStyle = data.get("houseStyle");
        const housePlan = data.get("housePlan");
        const detail = data.get("detail");
        const area = data.get("area");
        const space = data.get("space");
        const bedroom = data.get("bedroom");
        const bathroom = data.get("bathroom");
        const livingroom = data.get("livingroom");
        const kitchen = data.get("kitchen");
        const parking = data.get("parking");
        const files = data.getAll("files") || [];

        if (!title) {
            return NextResponse.json({ message: "ข้อมูลไม่ครบ" }, { status: 400 });
        }

        const snapshot = await db
            .collection(collectionName)
            .where("title", "==", title)
            .get();

        if (!snapshot.empty) {
            return NextResponse.json({ message: "มีข้อมูลนี้แล้ว" }, { status: 400 });
        }

        const docRef = await db.collection(collectionName).add({
            title,
            slug,
            description,
            houseStyle,
            housePlan,
            detail,
            area,
            space,
            bedroom,
            bathroom,
            livingroom,
            kitchen,
            parking,
            images: [],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        if (!docRef.id) {
            return NextResponse.json({ message: "ไม่สามารถเพิ่มข้อมูลได้" }, { status: 500 });
        }

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

            const updateResult = await docRef.update({
                images: result.data
            });

            if (!updateResult) {
                return NextResponse.json({ message: "ไม่สามารถเพิ่มข้อมูลภาพได้" }, { status: 500 });
            }
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

        const snapshot = await db.collection(collectionName).get();

        const projects = snapshot.empty
            ? []
            : snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                    updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                };
            });

        return NextResponse.json({ data: { projects } }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}