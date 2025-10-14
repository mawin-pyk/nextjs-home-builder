import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export const DELETE = async (request) => {
    try {
        const { pathname } = request.nextUrl;
        const parts = pathname.split("/");
        const collection = parts[parts.length - 2];
        const id = parts[parts.length - 1];

        const folderPath = `uploads/${collection}/${id}`;
        const res = await cloudinary.api.resources({
            type: "upload",
            prefix: folderPath,
        });

        if (res.resources.length > 0) {
            const deletePromises = res.resources.map((img) =>
                cloudinary.uploader.destroy(img.public_id)
            );
            const results = await Promise.all(deletePromises);
            const hasError = results.some((result) => result.result !== "ok" && result.result !== "not found");
            if (hasError) {
                return NextResponse.json({ message: "ไม่สามารถลบภาพได้" }, { status: 500 });
            }
            await cloudinary.api.delete_folder(folderPath);
        }

        return NextResponse.json({ status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export const PUT = async (request) => {
    try {
        const { pathname } = request.nextUrl;
        const parts = pathname.split("/");
        const collection = parts[parts.length - 2];
        const id = parts[parts.length - 1];

        const data = await request.json();
        const images = data.images;

        const deletePromises = images.map((imageUrl) => {
            const regex = /uploads\/(.*?)\./;
            const match = imageUrl.match(regex);
            if (match && match[1]) {
                const publicId = `uploads/${match[1]}`;
                return cloudinary.uploader.destroy(publicId);
            }
        });

        const results = await Promise.all(deletePromises);
        const hasError = results.some((result) => result.result !== "ok" && result.result !== "not found");
        if (hasError) {
            return NextResponse.json({ message: "ไม่สามารถลบภาพได้" }, { status: 500 });
        }

        const folderPath = `uploads/${collection}/${id}`;
        if (folderPath) {
            const res = await cloudinary.api.resources({
                type: "upload",
                prefix: folderPath,
            });

            if (res.resources.length === 0) {
                await cloudinary.api.delete_folder(folderPath);
            }
        }

        return NextResponse.json({ status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}