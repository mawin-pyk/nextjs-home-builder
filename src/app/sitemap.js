import { db } from "@/lib/firebaseAdmin";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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

    const getProjects = async () => {
        try {
            const snapshot = await db.collection("projects").get();
            const projects = snapshot.docs.map((doc) => {
                const data = doc.data();
                return data;
            });
            return projects;

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
                return data;
            });
            return homeDesigns;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const getArticles = async () => {
        try {
            const snapshot = await db.collection("articles").get();
            const articles = snapshot.docs.map((doc) => {
                const data = doc.data();
                return data;
            });
            return articles;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const propertyTypes = await getPropertyTypes();
    const houseStyles = await getHouseStyles();
    const projects = await getProjects();
    const homeDesigns = await getHomeDesigns();
    const articles = await getArticles();

    return [
        { url: `${baseUrl}/`, lastModified: new Date() },
        { url: `${baseUrl}/services`, lastModified: new Date() },
        { url: `${baseUrl}/projects`, lastModified: new Date() },
        { url: `${baseUrl}/home-designs`, lastModified: new Date() },
        { url: `${baseUrl}/articles`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },

        ...projects.map((item) => ({
            url: `${baseUrl}/projects/${item.slug}`,
            lastModified: item.updatedAt.toDate(),
        })),

        ...propertyTypes.flatMap((category) =>
            homeDesigns
                .filter((design) => design.propertyType === category.id)
                .map((item) => ({
                    url: `${baseUrl}/home-designs/${category.slug}/${item.slug}`,
                    lastModified: item.updatedAt.toDate(),
                }))
        ),

        ...houseStyles.flatMap((category) =>
            homeDesigns
                .filter((design) => design.houseStyle === category.id)
                .map((item) => ({
                    url: `${baseUrl}/home-designs/${category.slug}/${item.slug}`,
                    lastModified: item.updatedAt.toDate(),
                }))
        ),

        ...articles.map((item) => ({
            url: `${baseUrl}/articles/${item.slug}`,
            lastModified: item.updatedAt.toDate(),
        })),
    ];
}