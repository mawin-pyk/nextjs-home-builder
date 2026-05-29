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
        const snapshot = await db
            .collection("articles")
            .where("publish", "==", true)
            .limit(5)
            .get();

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

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                "headline": article.title,
                "description": article.description,
                "image": article.images || [],
                "datePublished": article.createdAt,
                "dateModified": article.updatedAt,
                "author": {
                    "@type": "Organization",
                    "name": "Mepatcs"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Mepatcs"
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "หน้าแรก",
                        "item": `${process.env.NEXT_PUBLIC_BASE_URL}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "บทความ",
                        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/articles`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": article.title
                    }
                ]
            }
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            
            <ArticleDetail article={article} otherArticles={otherArticles} />
        </>
    );
}