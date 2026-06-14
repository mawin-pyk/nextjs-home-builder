import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Grid,
    Typography,
    Button
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { gridToSizes } from "@/helpers/helpers";

import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const clampSx = (lines) => ({
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
});

function ArticleCard({ article }) {
    return (
        <Box
            height="100%"
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            border="1px solid"
            borderColor="divider"
            bgcolor="background.paper"
            sx={{
                color: "text.primary",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: PURPLE_SHADOW,
                    borderColor: PURPLE_BORDER,
                },
                "&:hover .article-img": { transform: "scale(1.08)" },
            }}
        >
            <Box width="100%" height="200px" position="relative" overflow="hidden">
                <Image
                    src={article.images[0]}
                    alt={`${article.title}`}
                    fill
                    sizes={gridToSizes({ xs: 12, sm: 6, lg: 3 }, 1400)}
                    className="article-img"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                />
            </Box>
            <Box p={3} flexGrow={1} display="flex" flexDirection="column" gap={1}>
                <Typography
                    variant="h4"
                    fontSize="18px"
                    fontWeight="600"
                    sx={clampSx(1)}
                >
                    {article.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={clampSx(2)}
                >
                    {article.description}
                </Typography>
                <Box mt="auto" pt={2} display="flex" alignItems="center" justifyContent="flex-end" gap={0.5}>
                    <AccessTimeIcon fontSize="small" sx={{ color: "primary.main" }} />
                    <Typography variant="body2" color="textSecondary">
                        {article.createdAt.split(" ")[0]}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

function ArticleSection({ articles }) {
    return (
        <Box
            component="section"
            width="100%"
            minHeight="60vh"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            gap={4}
            bgcolor="#f1f3f5"
        >
            <FadeInSection>
                <Box width="100%" maxWidth="1400px" m="0px auto" textAlign="start">
                    <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                        MEPATCS ARTICLE
                    </Typography>
                    <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                        บทความล่าสุด
                    </Typography>
                    <Box width="56px" height="4px" bgcolor="primary.main" mb={2} />
                    <Typography variant="subtitle1" color="textSecondary">
                        บทความเกี่ยวกับบ้าน เคล็ดลับและความรู้
                    </Typography>
                </Box>
            </FadeInSection>

            <FadeInSection>
                <Box
                    display={{ xs: "flex", sm: "none" }}
                    overflow="auto"
                    gap={2}
                    pb={1}
                    sx={{
                        scrollSnapType: "x mandatory",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {articles.map((article, index) => (
                        <Box
                            key={index}
                            component={Link}
                            href={`/articles/${article.slug}`}
                            sx={{
                                flex: "0 0 85%",
                                scrollSnapAlign: "center",
                                textDecoration: "none",
                            }}
                        >
                            <ArticleCard article={article} />
                        </Box>
                    ))}
                </Box>

                <Box display={{ xs: "none", sm: "block" }}>
                    <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                        {articles.map((article, index) => (
                            <Grid
                                component={Link}
                                href={`/articles/${article.slug}`}
                                key={index}
                                size={{ xs: 12, sm: 6, lg: 3 }}
                                sx={{ textDecoration: "none" }}
                            >
                                <ArticleCard article={article} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </FadeInSection>

            <Box width="100%" maxWidth="1400px" m="40px auto 0px auto" display="flex" justifyContent="center" alignItems="center">
                <Button component={Link} href="/articles" variant="contained" size="large">ดูบทความทั้งหมด</Button>
            </Box>
        </Box>
    );
}

export default ArticleSection;
