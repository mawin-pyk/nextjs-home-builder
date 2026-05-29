import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import Home from "@/components/client-page/main/home/Home";

const getPropertyTypes = async () => {
    try {
        const snapshot = await db.collection("property-types").get();
        const propertyTypes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return propertyTypes;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getProjects = async () => {
    try {
        const snapshot = await db.collection("projects").limit(4).get();
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

const getHomeDesigns = async () => {
    try {
        const snapshot = await db
            .collection("home-designs")
            .where("highlight", "==", true)
            .orderBy("highlightOrder", "asc")
            .limit(4)
            .get();

        const homeDesigns = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        });
        return homeDesigns;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getArticles = async () => {
    try {
        const snapshot = await db
            .collection("articles")
            .where("publish", "==", true)
            .limit(4)
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

export const metadata = createMetadata({
    title: "Mepatcs | รับสร้างบ้านครบวงจร งานโครงสร้างและตกแต่งภายใน",
    description: "Mepatcs รับสร้างบ้านครบวงจร ตั้งแต่แบบบ้าน งานโครงสร้าง จนถึงตกแต่งภายใน ทีมงานมืออาชีพ ดูแลทุกขั้นตอนอย่างใส่ใจ รับประกันคุณภาพทุกหลัง",
    keywords: [
        "รับสร้างบ้าน",
        "บริษัทรับสร้างบ้าน",
        "ออกแบบบ้าน",
        "บ้านคุณภาพ",
        "สร้างบ้านครบวงจร",
        "Mepatcs"
    ],
    canonical: "/",
});

async function HomePage() {
    const [propertyTypes, projects, articles, homeDesigns] = await Promise.all([getPropertyTypes(), getProjects(), getArticles(), getHomeDesigns()]);

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "บริษัท เมพัฒน์.ซีเอส จำกัด",
                "alternateName": "Mepatcs",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
                "logo": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
                "email": "mepatcs.co.th@gmail.com",
                "telephone": [
                    "+66-2-120-6859",
                    "+66-64-649-8717"
                ],
                "email": "mepatcs.co.th@gmail.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "58/1 หมู่5 ตำบลบางรักพัฒนา",
                    "addressLocality": "บางบัวทอง",
                    "addressRegion": "นนทบุรี",
                    "postalCode": "11110",
                    "addressCountry": "TH"
                },
                "sameAs": [
                    "https://www.facebook.com/MepatCS",
                    "https://www.instagram.com/mepat.cs",
                    "https://www.youtube.com/@mepatcs"
                ]
            },
            {
                "@type": "WebSite",
                "name": "Mepatcs",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}`
            },
            {
                "@type": "WebPage",
                "name": "Mepatcs",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
            },
            {
                "@type": "ItemList",
                "name": "แบบบ้านแนะนำ",
                "itemListElement": homeDesigns.map((homeDesign, index) => {
                    const propertyType = propertyTypes.find((type) => type.id === homeDesign.propertyType);

                    return {
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": homeDesign.title,
                        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/home-designs/${propertyType?.slug}/${homeDesign.slug}`
                    };
                })
            }
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <Home
                propertyTypes={propertyTypes}
                projects={projects}
                articles={articles}
                homeDesigns={homeDesigns}
            />
        </>
    );
}

export default HomePage;