"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Typography,
    Grid,
    IconButton,
    Divider,
    Card,
    CardContent,
    Stack,
    Button
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

// lightbox
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "บทความ", href: "/articles" },
    { label: "อ่านบทความ" }
];

function ArticleDetail({ article, otherArticles }) {
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

                    <Box
                        width="100%"
                        maxWidth="lg"
                        m="0px auto"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box width="calc(100% - 66px)" height="400px" position="relative">
                            <Image
                                src={article.images[0]}
                                alt="service"
                                fill
                                sizes={gridToSizes({ xs: 12, md: 5 }, 1200)}
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                        <Box px={2} boxSizing="border-box">
                            <Stack direction="column" spacing={1}>
                                <IconButton component="a" href="#" target="_blank" rel="me noopener noreferrer" size="small">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton component="a" href="#" target="_blank" rel="me noopener noreferrer" size="small">
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton component="a" href="#" target="_blank" rel="me noopener noreferrer" size="small">
                                    <YouTubeIcon />
                                </IconButton>
                                <IconButton component="a" href="#" target="_blank" rel="me noopener noreferrer" size="small">
                                    <XIcon />
                                </IconButton>
                            </Stack>
                        </Box>
                    </Box>

                    <Box
                        width="100%"
                        maxWidth="lg"
                        m="0px auto"
                    >
                        <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400">
                            {article.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {article.description}
                        </Typography>
                    </Box>

                    <Box
                        width="100%"
                        maxWidth="lg"
                        m="0px auto"
                    >
                        <Typography variant="body1">
                            {article.content}
                        </Typography>
                    </Box>

                    <Divider />

                    <Box display="flex" flexDirection="column" gap={4}>
                        <Typography variant="h3" fontSize="24px" fontWeight="600">
                            บทความอื่น ๆ
                        </Typography>
                        <Grid container spacing={4}>
                            {otherArticles.map((article, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
                                    <Card sx={{ height: "100%" }}>
                                        <Box width="100%" height="180px" position="relative">
                                            <Image
                                                src={article.images[0]}
                                                alt={`${article.name} โดย Mepatcs`}
                                                fill
                                                sizes={gridToSizes({ xs: 12, sm: 6, md: 3, lg: 2.4 }, 1400)}
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
                                                {article.name}
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
                                        </CardContent>
                                        <Box px={2} pb={2}>
                                            <Button component={Link} href={`/articles/${article.id}`} size="small" variant="outlined">
                                                อ่านต่อ
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default ArticleDetail;
