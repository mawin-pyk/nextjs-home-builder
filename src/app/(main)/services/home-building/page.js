import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import HomeBuildingService from "@/components/client-page/main/HomeBuildingService";

const getServices = async () => {
    try {
        const snapshot = await db.collection("home-building-services").get();
        const services = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        }).sort((a, b) => a.title.localeCompare(b.title, "th"));
        return services;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export const metadata = createMetadata({
    title: "รับสร้างบ้าน",
    description: "บริการรับสร้างบ้านครบวงจร ตั้งแต่งานโครงสร้าง งานระบบไฟฟ้า-ประปา จนถึงงานตกแต่ง โดยทีมงานมืออาชีพ ครอบคลุมพื้นที่ให้บริการหลายจังหวัดทั่วประเทศ",
    keywords: [
        "รับสร้างบ้าน",
        "บริษัทรับสร้างบ้าน",
        "สร้างบ้านครบวงจร",
        "รับเหมาก่อสร้าง",
        "ผู้รับเหมาบ้าน",
        "Mepatcs"
    ],
    canonical: "/services/home-building",
});

async function HomeBuildingServicePage() {
    const services = await getServices();

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": "รับสร้างบ้าน",
                "serviceType": "รับสร้างบ้าน",
                "description": "บริการรับสร้างบ้านครบวงจร ตั้งแต่งานโครงสร้าง งานระบบไฟฟ้า-ประปา จนถึงงานตกแต่ง โดยทีมงานมืออาชีพ",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/services/home-building`,
                "provider": {
                    "@type": "Organization",
                    "name": "บริษัท เมพัฒน์.ซีเอส จำกัด",
                    "alternateName": "Mepatcs",
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}`
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
                        "name": "บริการของเรา",
                        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/services`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "รับสร้างบ้าน"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "name": "พื้นที่ให้บริการรับสร้างบ้าน",
                "itemListElement": services.map((service, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": service.title,
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/services/home-building/${service.slug}`
                }))
            }
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <HomeBuildingService services={services} />
        </>
    );
}

export default HomeBuildingServicePage;
