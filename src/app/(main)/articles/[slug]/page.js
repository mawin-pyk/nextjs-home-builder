import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import ArticleDetail from "@/components/client-page/main/ArticleDetail";

const getArticle = async (slug) => {
    try {
        const querySnapshot = await db.collection("articles").where("slug", "==", slug).limit(1).get();
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
    const article = await getArticle(slug);

    if (!article) {
        return createMetadata({
            title: "ไม่พบบทความ",
            description: "ไม่พบข้อมูลบทความนี้",
            canonical: `/articles/${slug}`,
            robots: "noindex, follow",
            openGraph: {
                title: "ไม่พบบทความ",
                description: "ไม่พบข้อมูลบทความนี้",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`,
                type: "article",
            },
        });
    }

    return createMetadata({
        title: article.title,
        description: article.description,
        keywords: article.keywords,
        canonical: `/articles/${slug}`,
        openGraph: {
            title: article.title,
            description: article.description,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`,
            type: "article",
            images: [article.images[0]],
        },
    });
}

const getOtherArticles = async (excludeSlug) => {
    try {
        const snapshot = await db.collection("articles").limit(5).get();
        const articles = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        }).filter((article) => article.slug !== excludeSlug);
        return articles;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function ArticleDetailPage({ params }) {
    const { slug } = await params;

    const article = await getArticle(slug);
    if (!article) notFound();

    const otherArticles = await getOtherArticles(slug);

    return <ArticleDetail article={article} otherArticles={otherArticles} />;
}