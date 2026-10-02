import Link from "next/link";

import {
    Box,
    Grid,
    Typography,
    Button
} from "@mui/material";

import FadeInSection from "@/components/share/FadeInSection";
import ArticleCard from "@/components/share/ArticleCard";

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

            <FadeInSection direction="right">
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
