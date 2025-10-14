import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export const POST = async (request) => {
    try {
        const data = await request.formData();
        const path = data.get("path");
        const files = data.getAll("files");

        const results = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: `uploads/${path}` },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result.secure_url);
                        }
                    );
                    uploadStream.end(buffer);
                });
            })
        );

        if (results.length === 0) {
            return NextResponse.json({ message: "ไม่สามารถอัปโหลดภาพได้" }, { status: 500 });
        }

        return NextResponse.json({ data: results }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}