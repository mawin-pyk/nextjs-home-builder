import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import Articles from "@/components/client-page/main/Articles";

export const metadata = createMetadata({
    title: "บทความ",
    description: "ติดตามบทความดี ๆ จาก Mepatcs รวมความรู้เกี่ยวกับการสร้างบ้าน การเลือกวัสดุ เทคนิคออกแบบ และแนวทางดูแลบ้านให้สวยทนนาน",
    keywords: [
        "บทความสร้างบ้าน",
        "ความรู้ก่อสร้าง",
        "เคล็ดลับสร้างบ้าน",
        "การออกแบบบ้าน",
        "วัสดุก่อสร้าง",
        "Mepatcs"
    ],
    canonical: "/articles",
});

const getArticles = async () => {
    try {
        const snapshot = await db
            .collection("articles")
            .where("publish", "==", true)
            .get();

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

async function ArticlesPage() {
    const articles = await getArticles();

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "บทความ",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
                "description": "ติดตามบทความดี ๆ จาก Mepatcs รวมความรู้เกี่ยวกับการสร้างบ้าน การเลือกวัสดุ เทคนิคออกแบบ และแนวทางดูแลบ้านให้สวยทนนาน"
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
                        "name": "บทความ"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "name": "รายการบทความ",
                "itemListElement": articles.map((article, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": article.title,
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${article.slug}`
                }))
            }
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <Articles articles={articles} />
        </>
    );
}

export default ArticlesPage;