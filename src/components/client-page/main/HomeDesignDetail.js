"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Typography,
    Grid,
    Button,
    Divider,
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
import CtaBanner from "@/components/share/CtaBanner";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
const PURPLE_FAINT = "rgba(132, 94, 247, 0.03)";
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
    { label: "แบบบ้าน", href: "/home-designs" },
    { label: "รายละเอียดแบบ้าน" }
];

function SpecItem({ icon, label, value }) {
    return (
        <Box
            p={2}
            height="100%"
            boxSizing="border-box"
            display="flex"
            alignItems="center"
            gap={2}
            border="1px solid"
            borderColor="divider"
            bgcolor={PURPLE_FAINT}
            sx={{
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                "&:hover": {
                    borderColor: PURPLE_BORDER,
                    boxShadow: PURPLE_SHADOW,
                    transform: "translateY(-2px)",
                },
            }}
        >
            <Box
                width="44px"
                height="44px"
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor={PURPLE_SOFT}
                borderRadius="50%"
                color="primary.main"
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" color="textSecondary">
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight="600">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

function HomeDesignCard({ homeDesign }) {
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
                "&:hover .design-img": { transform: "scale(1.08)" },
            }}
        >
            <Box width="100%" height="200px" position="relative" overflow="hidden">
                <Image
                    src={homeDesign.images[0]}
                    alt={`${homeDesign.title}`}
                    fill
                    sizes={gridToSizes({ xs: 12, sm: 6, lg: 3 }, 1400)}
                    className="design-img"
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
                    {homeDesign.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={clampSx(2)}
                >
                    {homeDesign.description}
                </Typography>
                <Box mt="auto" pt={2} display="flex" flexWrap="wrap" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <BedIcon fontSize="small" sx={{ color: "primary.main" }} />
                        <Typography variant="body2">{homeDesign.bedroom} ห้องนอน</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <BathtubIcon fontSize="small" sx={{ color: "primary.main" }} />
                        <Typography variant="body2">{homeDesign.bathroom} ห้องน้ำ</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <KitchenIcon fontSize="small" sx={{ color: "primary.main" }} />
                        <Typography variant="body2">{homeDesign.kitchen} ห้องครัว</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function HomeDesignDetail({ homeDesign, otherHomeDesigns, propertyTypes }) {
    const categoryTitle = propertyTypes.find((propertyType) => propertyType.id === homeDesign.propertyType)?.title;

    const specs = [
        { icon: <HomeIcon />, label: "พื้นที่ใช้สอย", value: `${homeDesign.area} ตร.ม.` },
        { icon: <StraightenIcon />, label: "กว้าง x ลึก", value: `${homeDesign.space} ม.` },
        { icon: <BedIcon />, label: "ห้องนอน", value: `${homeDesign.bedroom} ห้อง` },
        { icon: <BathtubIcon />, label: "ห้องน้ำ", value: `${homeDesign.bathroom} ห้อง` },
        { icon: <WeekendIcon />, label: "ห้องนั่งเล่น", value: `${homeDesign.livingroom} ห้อง` },
        { icon: <KitchenIcon />, label: "ห้องครัว", value: `${homeDesign.kitchen} ห้อง` },
        { icon: <DirectionsCarIcon />, label: "ที่จอดรถ", value: `${homeDesign.parking} คัน` },
    ];

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
                                {categoryTitle ? categoryTitle : "MEPATCS HOME DESIGN"}
                            </Typography>
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                {homeDesign.title}
                            </Typography>
                            <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                            <Typography variant="subtitle1" color="textSecondary" maxWidth="760px" mx="auto">
                                {homeDesign.description}
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>

                            <PhotoProvider>
                                <PhotoView src={homeDesign.images[0]}>
                                    <Box
                                        position="relative"
                                        width="100%"
                                        height="400px"
                                        overflow="hidden"
                                        border="1px solid"
                                        borderColor="divider"
                                        boxSizing="border-box"
                                        sx={{
                                            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                                            "&:hover": {
                                                borderColor: PURPLE_BORDER,
                                                boxShadow: PURPLE_SHADOW,
                                            },
                                            "&:hover .cover-img": { transform: "scale(1.05)" },
                                        }}
                                    >
                                        <Image
                                            src={homeDesign.images[0]}
                                            alt={`${homeDesign.title}`}
                                            fill
                                            sizes={gridToSizes({ xs: 12, sm: 6 }, 1400)}
                                            className="cover-img"
                                            style={{ objectFit: "cover", cursor: "pointer", transition: "transform 0.5s ease" }}
                                        />
                                    </Box>
                                </PhotoView>
                                <Box
                                    sx={{
                                        pt: 2,
                                        pb: 1,
                                        display: "flex",
                                        gap: 2,
                                        overflowX: "auto",
                                        scrollSnapType: "x mandatory",
                                        "&::-webkit-scrollbar": { display: "none" },
                                    }}
                                >
                                    {homeDesign.images.slice(1).map((src, i) => (
                                        <PhotoView key={i + 1} src={src}>
                                            <Box
                                                flexShrink={0}
                                                width="160px"
                                                height="120px"
                                                position="relative"
                                                overflow="hidden"
                                                border="1px solid"
                                                borderColor="divider"
                                                boxSizing="border-box"
                                                sx={{
                                                    scrollSnapAlign: "start",
                                                    cursor: "pointer",
                                                    transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                                                    "&:hover": {
                                                        borderColor: PURPLE_BORDER,
                                                        boxShadow: PURPLE_SHADOW,
                                                        transform: "translateY(-2px)",
                                                    },
                                                }}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`${homeDesign.title}`}
                                                    fill
                                                    sizes="160px"
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </Box>
                                        </PhotoView>
                                    ))}
                                </Box>
                            </PhotoProvider>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box display="flex" flexDirection="column" gap={4}>
                                <Box pl={3} borderLeft="4px solid" borderColor="primary.main">
                                    <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.15em">
                                        HOME DESIGN DETAIL
                                    </Typography>
                                    <Typography variant="h2" fontSize={{ xs: "24px", md: "28px" }} fontWeight="600" gutterBottom>
                                        รายละเอียดโครงการ
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {homeDesign.detail}
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    {specs.map((spec, index) => (
                                        <Grid key={index} size={{ xs: 12, sm: 6 }}>
                                            <SpecItem icon={spec.icon} label={spec.label} value={spec.value} />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box>
                                    <Button component={Link} href="/contact" variant="contained">
                                        ติดต่อเรา
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box display="flex" flexDirection="column" gap={4}>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h3" fontSize="24px" fontWeight="600">
                                แบบบ้านอื่น ๆ
                            </Typography>
                            <Divider sx={{ flexGrow: 1, ml: 2 }} />
                        </Box>
                        <Grid container spacing={4}>
                            {otherHomeDesigns.map((homeDesign, index) => {
                                const categorySlug = propertyTypes.find((propertyType) => propertyType.id === homeDesign.propertyType).slug;

                                return (
                                    <Grid
                                        component={Link}
                                        href={`/home-designs/${categorySlug}/${homeDesign.slug}`}
                                        key={index}
                                        size={{ xs: 12, sm: 6, lg: 3 }}
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <HomeDesignCard homeDesign={homeDesign} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>

                    <CtaBanner
                        title="สนใจสร้างแบบบ้านหลังนี้?"
                        description="ปรึกษาทีมงานมืออาชีพของเราได้ฟรี ประเมินราคาเบื้องต้นไม่มีค่าใช้จ่าย"
                        secondaryLabel="ดูพื้นที่ให้บริการ"
                        secondaryHref="/services/home-building"
                    />
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default HomeDesignDetail;
