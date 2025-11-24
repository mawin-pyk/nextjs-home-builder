export function createMetadata({
    title,
    description,
    keywords,
    canonical,
    robots = "index, follow",
}) {
    return {
        title,
        description,
        keywords,
        canonical,
        robots
    };
}
