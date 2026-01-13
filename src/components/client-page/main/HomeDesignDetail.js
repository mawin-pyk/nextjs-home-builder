"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Typography,
    Grid,
    Button,
    Divider,
    Card,
    CardContent,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StraightenIcon from "@mui/icons-material/Straighten";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import WeekendIcon from "@mui/icons-material/Weekend";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// lightbox
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "แบบบ้าน", href: "/home-designs" },
    { label: "รายละเอียดแบบ้าน" }
];

function HomeDesignDetail({ homeDesign, otherHomeDesigns, propertyTypes }) {
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
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                {homeDesign.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {homeDesign.description}
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>

                            <PhotoProvider>
                                <PhotoView src={homeDesign.images[0]}>
                                    <Box position="relative" width="100%" height="400px">
                                        <Image
                                            src={homeDesign.images[0]}
                                            alt="บ้านสไตล์โมเดิร์น 2 ชั้น"
                                            fill
                                            sizes={gridToSizes({ xs: 12, sm: 6 }, 1400)}
                                            style={{ objectFit: "cover", cursor: "pointer" }}
                                        />
                                    </Box>
                                </PhotoView>
                                <Box
                                    sx={{
                                        py: 1,
                                        display: "flex",
                                        gap: 2,
                                        overflowX: "auto"
                                    }}
                                >
                                    {homeDesign.images.slice(1).map((src, i) => (
                                        <PhotoView key={i + 1} src={src}>
                                            <Image
                                                src={src}
                                                alt={`ภาพตัวอย่าง ${i + 2}`}
                                                width={160}
                                                height={120}
                                                style={{
                                                    flexShrink: 0,
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </PhotoView>
                                    ))}
                                </Box>
                            </PhotoProvider>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box display="flex" flexDirection="column" gap={4}>
                                <Box>
                                    <Typography variant="h2" fontSize="24px" fontWeight="400" gutterBottom>
                                        รายละเอียดโครงการ
                                    </Typography>
                                    <Typography variant="body1">
                                        {homeDesign.detail}
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            border="1px solid"
                                            borderColor="divider"
                                            bgcolor="background.paper"
                                        >
                                            <HomeIcon />
                                            <Typography variant="body1">พื้นที่ใช้สอย {homeDesign.area} ตร.ม.</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            border="1px solid"
                                            borderColor="divider"
                                            bgcolor="background.paper"
                                        >
                                            <StraightenIcon />
                                            <Typography variant="body1">กว้างลึก {homeDesign.space} ม.</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            border="1px solid"
                                            borderColor="divider"
                                            bgcolor="background.paper"
                                        >
                                            <BedIcon />
                                            <Typography variant="body1">{homeDesign.bedroom} ห้องนอน</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            border="1px solid"
                                            borderColor="divider"
                                            bgcolor="background.paper"
                                        >
                                            <BathtubIcon />
                                            <Typography variant="body1">{homeDesign.bathroom} ห้องน้ำ</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            border="1px solid"
                                            borderColor="divider"
                                            bgcolor="background.paper"
                                        >
                                            <WeekendIcon />
                                            <Typography variant="body1">{homeDesign.livingroom} ห้องนั่งเล่น</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            border="1px solid"
                                            borderColor="divider"
                                            bgcolor="background.paper"
                                        >
                                            <KitchenIcon />
                                            <Typography variant="body1">{homeDesign.kitchen} ห้องครัว</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            border="1px solid"
                                            borderColor="divider"
                                            bgcolor="background.paper"
                                        >
                                            <DirectionsCarIcon />
                                            <Typography variant="body1">ที่จอดรถ {homeDesign.parking} คัน</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box>
                                    <Button component={Link} href="/contact" variant="contained">
                                        ติดต่อเรา
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider />

                    <Box display="flex" flexDirection="column" gap={4}>
                        <Typography variant="h3" fontSize="24px" fontWeight="600">
                            แบบบ้านอื่น ๆ
                        </Typography>
                        <Grid container spacing={4}>
                            {otherHomeDesigns.map((homeDesign, index) => {
                                const categorySlug = propertyTypes.find((type) => type.id === homeDesign.propertyType).slug;

                                return (
                                    <Grid
                                        component={Link}
                                        href={`/home-designs/${categorySlug}/${homeDesign.slug}`}
                                        key={index}
                                        size={{ xs: 12, sm: 6, lg: 3 }}
                                    >
                                        <Card sx={{ height: "100%" }}>
                                            <Box width="100%" height="180px" position="relative">
                                                <Image
                                                    src={homeDesign.images[0]}
                                                    alt={`${homeDesign.title} โดย Mepatcs`}
                                                    fill
                                                    sizes={gridToSizes({ xs: 12, sm: 6, lg: 3 }, 1400)}
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
                                                    {homeDesign.title}
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
                                                    {homeDesign.description}
                                                </Typography>
                                                <Box mt={4} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" gap={2}>
                                                    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                        <BedIcon fontSize="small" />
                                                        <Typography variant="body2">{homeDesign.bedroom} ห้องนอน</Typography>
                                                    </Box>

                                                    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                        <BathtubIcon fontSize="small" />
                                                        <Typography variant="body2">{homeDesign.bathroom} ห้องน้ำ</Typography>
                                                    </Box>

                                                    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                        <KitchenIcon fontSize="small" />
                                                        <Typography variant="body2">{homeDesign.kitchen} ห้องครัว</Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default HomeDesignDetail;
