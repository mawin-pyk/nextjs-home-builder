import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import Home from "@/components/client-page/main/home/Home";

export const metadata = createMetadata({
    title: "Mepatcs | รับสร้างบ้านครบวงจร งานโครงสร้างและตกแต่งภายใน",
    description: "Mepatcs รับสร้างบ้านครบวงจร ตั้งแต่แบบบ้าน งานโครงสร้าง จนถึงตกแต่งภายใน ทีมงานมืออาชีพ ดูแลทุกขั้นตอนอย่างใส่ใจ รับประกันคุณภาพทุกหลัง",
    keywords: [
        "รับสร้างบ้าน",
        "บริษัทรับสร้างบ้าน",
        "ออกแบบบ้าน",
        "บ้านคุณภาพ",
        "สร้างบ้านครบวงจร",
        "Mepatcs"
    ],
    canonical: "/",
});

const getProjects = async () => {
    try {
        const snapshot = await db.collection("projects").limit(4).get();
        const projects = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        });
        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getArticles = async () => {
    try {
        const snapshot = await db.collection("articles").limit(4).get();
        const articles = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        });
        return articles;

    } catch (error) {
        console.error(error);
        return [];
    }
}

async function HomePage() {
    const [projects, articles] = await Promise.all([getProjects(), getArticles()]);

    return (
        <Home projects={projects} articles={articles} />
    );
}

export default HomePage;