import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import ProjectDetail from "@/components/client-page/main/ProjectDetail";

const getProject = async (id) => {
    try {
        const docSnap = await db.collection("projects").doc(id).get();
        if (!docSnap.exists) return null;
        const data = docSnap.data();
        return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
        }

    } catch (error) {
        console.error(error);
    }
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        return createMetadata({
            title: "ไม่พบผลงาน",
            description: "ไม่พบข้อมูลผลงานนี้",
            canonical: `/projects/${id}`,
            robots: "noindex, follow",
        });
    }

    return createMetadata({
        title: project.title,
        description: project.description,
        keywords: project.keywords,
        canonical: `/projects/${id}`
    });
}

const getOtherProjects = async (excludeId) => {
    try {
        const snapshot = await db.collection("projects").limit(5).get();
        const projects = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        }).filter((project) => project.id !== excludeId);
        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function ProjectDetailPage({ params }) {
    const { id } = await params;

    const project = await getProject(id);
    if (!project) notFound();

    const otherProjects = await getOtherProjects(id);

    return <ProjectDetail project={project} otherProjects={otherProjects} />;
}