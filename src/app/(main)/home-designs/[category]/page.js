import { notFound } from "next/navigation";
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

const getHomeDesigns = async (fieldName, category) => {
    try {
        const snapshot = await db.collection("home-designs").where(fieldName, "==", category).get();
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

export async function generateMetadata({ params }) {
    const { category } = await params;

    const propertyTypes = await getPropertyTypes();
    const houseStyles = await getHouseStyles();

    let categoryData;
    const propertyType = propertyTypes.find((type) => type.slug === category);
    const houseStyle = houseStyles.find((style) => style.slug === category);

    if (propertyType) {
        categoryData = propertyType;

    } else if (houseStyle) {
        categoryData = houseStyle;
    }

    if (!categoryData) {
        return createMetadata({
            title: "ไม่พบหมวดหมู่",
            description: "ไม่พบข้อมูลหมวดหมู่นี้",
            canonical: `/home-designs/${category}`,
            robots: "noindex, follow",
        });
    }

    return createMetadata({
        title: categoryData.title,
        description: categoryData.description,
        keywords: categoryData.keywords,
        canonical: `/home-designs/${category}`
    });
}

async function HomeDesignsCategoryPage({ params }) {
    const { category } = await params;

    const propertyTypes = await getPropertyTypes();
    const houseStyles = await getHouseStyles();

    let fieldName;
    let categoryData;
    const propertyType = propertyTypes.find((type) => type.slug === category);
    const houseStyle = houseStyles.find((style) => style.slug === category);

    if (propertyType) {
        fieldName = "propertyType";
        categoryData = propertyType;

    } else if (houseStyle) {
        fieldName = "houseStyle";
        categoryData = houseStyle;

    } else {
        return notFound();
    }

    const homeDesigns = await getHomeDesigns(fieldName, categoryData.id);
    if (!homeDesigns) return notFound();

    return (
        <HomeDesigns propertyTypes={propertyTypes} houseStyles={houseStyles} homeDesigns={homeDesigns} category={category} categoryData={categoryData} />
    );
}

export default HomeDesignsCategoryPage;