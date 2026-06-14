import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import HomeBuildingServiceDetail from "@/components/client-page/main/HomeBuildingServiceDetail";

const getService = async (slug) => {
    try {
        const querySnapshot = await db.collection("home-building-services").where("slug", "==", slug).limit(1).get();
        if (querySnapshot.empty) return null;
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
        }

    } catch (error) {
        console.error(error);
    }
}

const getOtherServices = async (excludeSlug) => {
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
        }).filter((service) => service.slug !== excludeSlug).slice(0, 4);
        return services;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const service = await getService(decodedSlug);

    if (!service) {
        return createMetadata({
            title: "ไม่พบบริการ",
            description: "ไม่พบข้อมูลบริการนี้",
            canonical: `/services/home-building/${decodedSlug}`,
            robots: "noindex, follow",
        });
    }

    return createMetadata({
        title: service.title,
        description: service.description,
        keywords: service.keywords,
        canonical: `/services/home-building/${decodedSlug}`
    });
}

export default async function HomeBuildingServiceDetailPage({ params }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const service = await getService(decodedSlug);
    if (!service) notFound();

    const otherServices = await getOtherServices(decodedSlug);

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "name": service.title,
                "serviceType": "รับสร้างบ้าน",
                "description": service.description,
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/services/home-building/${decodedSlug}`,
                ...(service.images?.[0] && { "image": service.images[0] }),
                "areaServed": `ภาค${service.region}`,
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
                        "name": "รับสร้างบ้าน",
                        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/services/home-building`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": service.title
                    }
                ]
            }
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <HomeBuildingServiceDetail service={service} otherServices={otherServices} />
        </>
    );
}
