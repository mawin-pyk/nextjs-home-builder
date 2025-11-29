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
        canonical,
        robots,
        openGraph
    };
}
