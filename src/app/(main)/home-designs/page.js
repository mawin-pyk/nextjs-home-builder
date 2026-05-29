import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import HomeDesigns from "@/components/client-page/main/HomeDesigns";

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

const getHouseStyles = async () => {
    try {
        const snapshot = await db.collection("house-styles").get();
        const houseStyles = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return houseStyles;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getHomeDesigns = async () => {
    try {
        const snapshot = await db.collection("home-designs").get();
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

export const metadata = createMetadata({
    title: "แบบบ้าน",
    description: "รวมแบบบ้านหลากหลายสไตล์ ออกแบบใช้งานจริง ปรับแบบได้ตามงบประมาณและความต้องการ",
    keywords: [
        "แบบบ้าน",
        "แบบบ้านสวย",
        "แบบบ้านชั้นเดียว",
        "แบบบ้านสองชั้น",
        "แบบบ้านพร้อมก่อสร้าง",
        "แบบบ้านตามงบประมาณ",
        "Mepatcs"
    ],
    canonical: "/home-designs",
});

async function HomeDesignsPage() {
    const [propertyTypes, houseStyles, homeDesigns] = await Promise.all([
        getPropertyTypes(),
        getHouseStyles(),
        getHomeDesigns()
    ]);

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "แบบบ้าน",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/home-designs`,
                "description": "รวมแบบบ้านหลากหลายสไตล์ ออกแบบใช้งานจริง ปรับแบบได้ตามงบประมาณและความต้องการ"
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
                        "name": "แบบบ้าน"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "name": "รายการแบบบ้าน",
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

            <HomeDesigns propertyTypes={propertyTypes} houseStyles={houseStyles} homeDesigns={homeDesigns} />
        </>
    );
}

export default HomeDesignsPage;