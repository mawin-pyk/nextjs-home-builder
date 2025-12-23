import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { verifyToken } from "@/helpers/auth";

const collectionName = "home-designs";

export async function POST(request) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const body = await request.json();
        const { homeDesigns } = body;

        if (!Array.isArray(homeDesigns)) {
            return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
        }

        const batch = db.batch();

        homeDesigns.forEach((item) => {
            const ref = db.collection(collectionName).doc(item.id);
            batch.update(ref, {
                highlightOrder: item.order,
                updatedAt: new Date(),
            });
        });

        await batch.commit();

        return NextResponse.json({ message: "บันทึกข้อมูลสำเร็จ" }, { status: 200 });

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

        const snapshot = await db
            .collection(collectionName)
            .where("highlight", "==", true)
            .orderBy("highlightOrder", "asc")
            .get();

        const homeDesigns = snapshot.empty
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

        return NextResponse.json({ data: { homeDesigns } }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}