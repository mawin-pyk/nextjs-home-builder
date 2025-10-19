import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyToken } from "@/helpers/auth";

export async function GET(request) {
    try {
        const userToken = await verifyToken(["admin", "super"]);

        if (!userToken) {
            return NextResponse.json({ message: "ไม่ได้รับอนุญาต" }, { status: 401 });
        }

        const options = {};

        const houseStyles = await db.collection("house-styles").get();
        const houseStylesOptions = houseStyles.empty ? [] : houseStyles.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        options.houseStyles = houseStylesOptions;

        const housePlans = await db.collection("house-plans").get();
        const housePlansOptions = housePlans.empty ? [] : housePlans.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        options.housePlans = housePlansOptions;


        return NextResponse.json({ data: { options } }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}