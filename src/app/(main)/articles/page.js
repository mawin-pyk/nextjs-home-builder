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
        const snapshot = await db.collection("articles").get();
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

    return (
        <Articles articles={articles} />
    );
}

export default ArticlesPage;