import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Grid,
    Typography
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
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

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "บทความ" }
];

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
                "&:hover .article-arrow": { transform: "translateX(4px)" },
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
                <Box display="flex" alignItems="center" gap={0.5} color="primary.main">
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="overline" fontWeight="600" letterSpacing="0.1em" lineHeight={1.6}>
                        {article.createdAt.split(" ")[0]}
                    </Typography>
                </Box>
                <Typography
                    variant="h4"
                    fontSize="18px"
                    fontWeight="600"
                    sx={clampSx(2)}
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
                <Box mt="auto" pt={2} display="flex" alignItems="center" gap={0.5} color="primary.main">
                    <Typography variant="body2" fontWeight="600">อ่านบทความ</Typography>
                    <ArrowForwardIcon
                        fontSize="small"
                        className="article-arrow"
                        sx={{ transition: "transform 0.3s ease" }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

function Articles({ articles }) {

    return (
        <>
            <Box
                component="main"
                width="100%"
                py={14}
                px={{ xs: 2, sm: 3 }}
                boxSizing="border-box"
            >
                <Box
                    width="100%"
                    maxWidth="1400px"
                    m="0px auto"
                    display="flex"
                    flexDirection="column"
                    gap={8}
                >
                    <CustomBreadcrumbs items={breadcrumbs} />

                    <FadeInSection>
                        <Box textAlign="center">
                            <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                                MEPATCS ARTICLE
                            </Typography>
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                บทความ
                            </Typography>
                            <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                            <Typography variant="subtitle1" color="textSecondary">
                                บทความเกี่ยวกับบ้าน เคล็ดลับและความรู้
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <Grid container spacing={4}>
                        {articles.map((article, index) => (
                            <Grid
                                component={Link}
                                href={`/articles/${article.slug}`}
                                key={index}
                                size={{ xs: 12, sm: 6, lg: 3, }}
                                sx={{ textDecoration: "none" }}
                            >
                                <ArticleCard article={article} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default Articles;
