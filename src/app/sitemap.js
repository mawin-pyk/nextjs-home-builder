import { db } from "@/lib/firebaseAdmin";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const getProjects = async () => {
        try {
            const snapshot = await db.collection("projects").get();
            const projects = snapshot.docs.map((doc) => {
                const data = doc.data();
                return data;
            });
            return projects;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const getArticles = async () => {
        try {
            const snapshot = await db.collection("articles").get();
            const articles = snapshot.docs.map((doc) => {
                const data = doc.data();
                return data;
            });
            return articles;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const projects = await getProjects();
    const articles = await getArticles();

    return [
        { url: `${baseUrl}/`, lastModified: new Date() },
        { url: `${baseUrl}/services`, lastModified: new Date() },
        { url: `${baseUrl}/projects`, lastModified: new Date() },
        { url: `${baseUrl}/articles`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },

        ...projects.map((item) => ({
            url: `${baseUrl}/projects/${item.slug}`,
            lastModified: item.updatedAt.toDate(),
        })),

        ...articles.map((item) => ({
            url: `${baseUrl}/articles/${item.slug}`,
            lastModified: item.updatedAt.toDate(),
        })),
    ];
}