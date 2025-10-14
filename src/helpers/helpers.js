export function gridToSizes(breakpoints, containerMaxWidth = null) {
    const bp = { xs: 600, sm: 900, md: 1200, lg: 1536, xl: 1920 };

    return Object.entries(breakpoints)
        .map(([key, value], i, arr) => {
            const vw = (value / 12) * 100;
            const width = containerMaxWidth
                ? `min(${vw.toFixed(2)}vw, ${Math.round((containerMaxWidth * value) / 12)}px)`
                : `${vw.toFixed(2)}vw`;

            return i < arr.length - 1
                ? `(max-width: ${bp[key]}px) ${width}`
                : width;
        })
        .join(", ");
}