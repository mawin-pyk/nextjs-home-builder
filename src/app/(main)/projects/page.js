import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import Projects from "@/components/client-page/main/Projects";

export const metadata = {
    title: "ผลงานของเรา",
    description: "ชมผลงานการก่อสร้างจริงจาก Mepatcs บ้านทุกหลังสร้างด้วยวัสดุคุณภาพ ทีมงานมากประสบการณ์ และมาตรฐานงานก่อสร้างที่ลูกค้ามั่นใจ",
    keywords: [
        "ผลงานรับสร้างบ้าน",
        "บ้านสร้างเสร็จ",
        "ตัวอย่างบ้านจริง",
        "ผลงานก่อสร้าง",
        "บ้านลูกค้า",
        "Mepatcs"
    ],
    canonical: "/products",
    robots: "index, follow",
}

const getProjects = async () => {
    try {
        const snapshot = await db.collection("projects").get();
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

async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <Projects projects={projects} />
    );
}

export default ProjectsPage;