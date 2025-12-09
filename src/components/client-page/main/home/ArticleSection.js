import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { gridToSizes } from "@/helpers/helpers";

import FadeInSection from "@/components/share/FadeInSection";

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
            bgcolor="#e9ecef"
        >
            <Box width="100%" maxWidth="1400px" m="0px auto" textAlign="start">
                <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                    บทความล่าสุด
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    บทความเกี่ยวกับบ้าน เคล็ดลับและความรู้
                </Typography>
            </Box>

            <FadeInSection>
                <Box
                    display={{ xs: "flex", sm: "none" }}
                    overflow="auto"
                    gap={2}
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
                            }}
                        >
                            <Card sx={{ height: "100%" }}>
                                <Box width="100%" height="180px" position="relative">
                                    <Image
                                        src={article.images[0]}
                                        alt={`${article.title} โดย Mepatcs`}
                                        fill
                                        sizes={gridToSizes({ xs: 12, sm: 6, lg: 3, }, 1400)}
                                        style={{ objectFit: "cover" }}
                                    />
                                </Box>
                                <CardContent>
                                    <Typography
                                        variant="h4"
                                        fontSize="18px"
                                        fontWeight="600"
                                        gutterBottom
                                        sx={{
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1,
                                        }}
                                    >
                                        {article.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                        }}
                                    >
                                        {article.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" mt={4} textAlign="right" display="flex" alignItems="center" justifyContent="flex-end" gap={0.5}>
                                        <AccessTimeIcon fontSize="small" /> {article.createdAt.split(" ")[0]}
                                    </Typography>
                                </CardContent>
                            </Card>
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
                                size={{ xs: 12, sm: 6, lg: 3, }}
                            >
                                <Card sx={{ height: "100%" }}>
                                    <Box width="100%" height="180px" position="relative">
                                        <Image
                                            src={article.images[0]}
                                            alt={`${article.title} โดย Mepatcs`}
                                            fill
                                            sizes={gridToSizes({ xs: 12, sm: 6, lg: 3, }, 1400)}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Box>
                                    <CardContent>
                                        <Typography
                                            variant="h4"
                                            fontSize="18px"
                                            fontWeight="600"
                                            gutterBottom
                                            sx={{
                                                display: "-webkit-box",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 1,
                                            }}
                                        >
                                            {article.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{
                                                display: "-webkit-box",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 2,
                                            }}
                                        >
                                            {article.description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" mt={4} textAlign="right" display="flex" alignItems="center" justifyContent="flex-end" gap={0.5}>
                                            <AccessTimeIcon fontSize="small" /> {article.createdAt.split(" ")[0]}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </FadeInSection>

            <Box width="100%" maxWidth="1400px" m="40px auto 0px auto" display="flex" justifyContent="center" alignItems="center">
                <Button component={Link} href="/articles" variant="contained" size="large">ดูบทความทั้งหมด</Button>
            </Box>
        </Box >
    );
}

export default ArticleSection;
