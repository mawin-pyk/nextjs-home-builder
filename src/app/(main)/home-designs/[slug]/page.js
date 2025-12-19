import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import { format } from "date-fns";
import { createMetadata } from "@/helpers/metadata";
import HomeDesignDetail from "@/components/client-page/main/HomeDesignDetail";

const getHomeDesign = async (slug) => {
    try {
        const querySnapshot = await db.collection("home-designs").where("slug", "==", slug).limit(1).get();
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
    const homeDesign = await getHomeDesign(slug);

    if (!homeDesign) {
        return createMetadata({
            title: "ไม่พบแบบบ้าน",
            description: "ไม่พบข้อมูลแบบบ้านนี้",
            canonical: `/home-designs/${slug}`,
            robots: "noindex, follow",
        });
    }

    return createMetadata({
        title: homeDesign.title,
        description: homeDesign.description,
        keywords: homeDesign.keywords,
        canonical: `/home-designs/${slug}`
    });
}

const getOtherHomeDesigns = async (excludeSlug) => {
    try {
        const snapshot = await db.collection("home-designs").limit(5).get();
        const homeDesigns = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt ? format(data.createdAt.toDate(), "dd/MM/yyyy HH:mm") : null,
                updatedAt: data.updatedAt ? format(data.updatedAt.toDate(), "dd/MM/yyyy HH:mm") : null,
            };
        }).filter((homeDesign) => homeDesign.slug !== excludeSlug);
        return homeDesigns;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function HomeDesignDetailPage({ params }) {
    const { slug } = await params;

    const homeDesign = await getHomeDesign(slug);
    if (!homeDesign) notFound();

    const otherHomeDesigns = await getOtherHomeDesigns(slug);

    return <HomeDesignDetail homeDesign={homeDesign} otherHomeDesigns={otherHomeDesigns} />;
}