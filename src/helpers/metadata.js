const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function createMetadata({
    title,
    description,
    keywords,
    canonical,
    robots = "index, follow",
    openGraph,
}) {
    return {
        title,
        description,
        keywords,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: canonical,
        },
        robots,
        openGraph
    };
}
