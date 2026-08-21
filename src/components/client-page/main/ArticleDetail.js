"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Typography,
    Grid,
    IconButton,
    Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// lightbox
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";
import CtaBanner from "@/components/share/CtaBanner";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
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
    { label: "บทความ", href: "/articles" },
    { label: "อ่านบทความ" }
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

function ArticleDetail({ article, otherArticles }) {
    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${article.slug}`;

    const parseImageAlignment = (html) => {
        return html.replace(
            /<img([^>]*?)containerstyle="([^"]*)"([^>]*?)>/g,
            (match, before, containerStyle, after) => {
                const marginMatch = containerStyle.match(/margin:\s*([^;]+)/);
                const margin = marginMatch ? marginMatch[1] : "0px";
                return `<img${before}containerstyle="${containerStyle}"${after} style="display:block;margin:${margin}">`;
            }
        );
    }

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
                    gap={4}
                >
                    <CustomBreadcrumbs items={breadcrumbs} />

                    <FadeInSection>
                        <Box
                            width="100%"
                            maxWidth="lg"
                            m="0px auto"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-end"
                            gap={2}
                        >
                            <Box
                                width="100%"
                                height={{ xs: "260px", md: "500px" }}
                                position="relative"
                                overflow="hidden"
                                border="1px solid"
                                borderColor="divider"
                                boxSizing="border-box"
                            >
                                <Image
                                    src={article.images[0]}
                                    alt={`${article.title}`}
                                    fill
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                    priority
                                    style={{ objectFit: "cover" }}
                                />
                            </Box>
                            <Box
                                py={0.5}
                                px={1.5}
                                display="flex"
                                alignItems="center"
                                gap={1}
                                border="1px solid"
                                borderColor="divider"
                                bgcolor="background.paper"
                            >
                                <Typography variant="body2" color="textSecondary">
                                    แชร์บทความ:
                                </Typography>
                                <IconButton
                                    component="a"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    size="small"
                                    sx={{
                                        color: "primary.main",
                                        borderRadius: 0,
                                        "&:hover": { bgcolor: PURPLE_SOFT },
                                    }}
                                >
                                    <FacebookIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </FadeInSection>

                    <Box width="100%" maxWidth="lg" m="0px auto">
                        <Box display="flex" alignItems="center" gap={0.5} color="primary.main">
                            <AccessTimeIcon fontSize="small" />
                            <Typography variant="overline" fontWeight="600" letterSpacing="0.2em" lineHeight={1.6}>
                                {article.createdAt.split(" ")[0]}
                            </Typography>
                        </Box>
                        <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                            {article.title}
                        </Typography>
                        <Box width="56px" height="4px" bgcolor="primary.main" mb={2} />
                        <Typography variant="subtitle1" color="textSecondary">
                            {article.description}
                        </Typography>
                    </Box>

                    <Box width="100%" maxWidth="lg" m="0px auto">
                        <div
                            className="tiptap-content"
                            dangerouslySetInnerHTML={{ __html: parseImageAlignment(article.content) }}
                        />
                    </Box>

                    <Box display="flex" flexDirection="column" gap={4} mt={4}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h3" fontSize="24px" fontWeight="600">
                                บทความอื่น ๆ
                            </Typography>
                            <Divider sx={{ flexGrow: 1, ml: 2 }} />
                        </Box>
                        <Grid container spacing={4}>
                            {otherArticles.map((article, index) => (
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

                    <CtaBanner
                        title="อยากปรึกษาเรื่องสร้างบ้านเพิ่มเติม?"
                        description="ทีมงานของเราพร้อมให้คำปรึกษาฟรี ประเมินราคาเบื้องต้นไม่มีค่าใช้จ่าย"
                        secondaryLabel="ดูแบบบ้านของเรา"
                        secondaryHref="/home-designs"
                    />
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default ArticleDetail;
