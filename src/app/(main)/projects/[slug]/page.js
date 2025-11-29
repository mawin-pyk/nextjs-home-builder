import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import ProjectDetail from "@/components/client-page/main/ProjectDetail";

const getProject = async (slug) => {
    try {
        const querySnapshot = await db.collection("projects").where("slug", "==", slug).limit(1).get();
        if (querySnapshot.empty) return null;
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
            ...data,
            createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
        }

    } catch (error) {
        console.error(error);
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        return createMetadata({
            title: "ไม่พบผลงาน",
            description: "ไม่พบข้อมูลผลงานนี้",
            canonical: `/projects/${slug}`,
            robots: "noindex, follow",
        });
    }

    return createMetadata({
        title: project.title,
        description: project.description,
        keywords: project.keywords,
        canonical: `/projects/${slug}`
    });
}

const getOtherProjects = async (excludeSlug) => {
    try {
        const snapshot = await db.collection("projects").limit(5).get();
        const projects = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        }).filter((project) => project.slug !== excludeSlug);
        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function ProjectDetailPage({ params }) {
    const { slug } = await params;

    const project = await getProject(slug);
    if (!project) notFound();

    const otherProjects = await getOtherProjects(slug);

    return <ProjectDetail project={project} otherProjects={otherProjects} />;
}