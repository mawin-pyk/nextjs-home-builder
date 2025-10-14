import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import ArticleDetail from "@/components/client-page/main/ArticleDetail";

const getArticle = async (id) => {
    try {
        const docSnap = await db.collection("articles").doc(id).get();
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

const getOtherArticles = async (excludeId) => {
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
        }).filter((article) => article.id !== excludeId);
        return articles;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function ArticleDetailPage({ params }) {
    const { id } = await params;

    const article = await getArticle(id);
    if (!article) notFound();

    const otherArticles = await getOtherArticles(id);

    return <ArticleDetail article={article} otherArticles={otherArticles} />;
}