import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { verifyToken } from "@/helpers/auth";

const collectionName = "users";

export async function GET(request) {
    try {
        const userToken = await verifyToken(["super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const snapshot = await db.collection(collectionName).get();

        const users = snapshot.empty
            ? []
            : snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                    updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                };
            })
                .filter((user) => user.role !== "super");

        return NextResponse.json({ data: { users } }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}