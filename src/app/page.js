import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import Home from "@/components/client-page/main/home/Home";

const getProjects = async () => {
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
        });
        return projects;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getArticles = async () => {
    try {
        const snapshot = await db.collection("articles").limit(5).get();
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