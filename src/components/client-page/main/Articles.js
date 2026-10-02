import Link from "next/link";

import {
    Box,
    Grid,
    Typography
} from "@mui/material";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";
import ArticleCard from "@/components/share/ArticleCard";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "บทความ" }
];

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
