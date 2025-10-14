import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Autocomplete,
    TextField,
    Divider,
} from "@mui/material";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";

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

                    <Box>
                        <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                            บทความ
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            รวมผลงานที่เราออกแบบและสร้างด้วยความใส่ใจทุกรายละเอียด ทั้งบ้านเดี่ยว คอนโด และรีสอร์ท
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <TextField
                            variant="outlined"
                            size="medium"
                            label="ค้นหาบทความ"
                        />
                    </Box>

                    <Grid container spacing={4}>
                        {articles.map((article, index) => (
                            <Grid
                                component={Link}
                                href={`/articles/${article.id}`}
                                key={index}
                                size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}
                            >
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
                                </Card>
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
