import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Grid,
    Typography,
    Button,
    Divider,
    Chip,
} from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FoundationOutlinedIcon from '@mui/icons-material/FoundationOutlined';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import FormatPaintOutlinedIcon from '@mui/icons-material/FormatPaintOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
const PURPLE_FAINT = "rgba(132, 94, 247, 0.03)";
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "บริการของเรา", href: "/services" },
    { label: "รับสร้างบ้าน" }
];

const highlights = [
    {
        icon: <FoundationOutlinedIcon />,
        title: "งานโครงสร้างหลัก",
        description: "เสาเข็ม ฐานราก คาน-เสา พื้น และโครงสร้างทั้งหมดตามมาตรฐานวิศวกรรม",
    },
    {
        icon: <TextureOutlinedIcon />,
        title: "งานก่ออิฐ–ฉาบปูน",
        description: "โครงผนังแข็งแรง ได้ความเรียบและความแน่นตามสเปคงานก่อสร้าง",
    },
    {
        icon: <RoofingOutlinedIcon />,
        title: "งานหลังคา",
        description: "โครงหลังคา มุงกระเบื้อง/เมทัลชีท และระบบกันรั่วตามมาตรฐาน",
    },
    {
        icon: <ElectricalServicesOutlinedIcon />,
        title: "งานระบบไฟฟ้า–ประปา",
        description: "เดินระบบใหม่ทั้งหลังพร้อมอุปกรณ์ที่ได้มาตรฐานความปลอดภัย",
    },
    {
        icon: <FormatPaintOutlinedIcon />,
        title: "งานตกแต่งภายในพื้นฐาน",
        description: "ฝ้า ผนัง พื้น ประตู–หน้าต่าง และงานเก็บรายละเอียดหน้างาน",
    },
    {
        icon: <FactCheckOutlinedIcon />,
        title: "ตรวจงานทุกขั้นตอน",
        description: "ควบคุมคุณภาพตามแผนงานและตรวจจุดสำคัญก่อนส่งมอบบ้าน",
    },
    {
        icon: <HandshakeOutlinedIcon />,
        title: "ส่งงานตามสัญญา",
        description: "แผนงานชัดเจน ส่งมอบบ้านตรงเวลา ดูแลงานจนเสร็จสมบูรณ์",
    },
];

const steps = [
    {
        icon: <ForumOutlinedIcon />,
        title: "ปรึกษาและประเมินราคา",
        description: "พูดคุยความต้องการ พร้อมประเมินราคาเบื้องต้นฟรี ไม่มีค่าใช้จ่าย",
    },
    {
        icon: <DesignServicesOutlinedIcon />,
        title: "ออกแบบและทำสัญญา",
        description: "สรุปแบบบ้าน วัสดุ งบประมาณ และแผนงานที่ชัดเจนก่อนเริ่มงานก่อสร้าง",
    },
    {
        icon: <EngineeringOutlinedIcon />,
        title: "ก่อสร้างและควบคุมงาน",
        description: "ดำเนินงานตามแผน ควบคุมคุณภาพโดยทีมงานมืออาชีพ ตรวจจุดสำคัญทุกขั้นตอน",
    },
    {
        icon: <VpnKeyOutlinedIcon />,
        title: "ตรวจรับและส่งมอบบ้าน",
        description: "ตรวจความเรียบร้อยร่วมกันก่อนส่งมอบบ้านตรงตามสัญญา พร้อมดูแลหลังส่งมอบ",
    },
];

const regions = ["กลาง", "เหนือ", "ใต้", "ตะวันออก", "ตะวันตก"];

function HomeBuildingService({ services }) {
    const regionGroups = regions
        .map((region) => ({
            region,
            services: services.filter((service) => service.region === region),
        }))
        .filter((group) => group.services.length > 0);

    const stats = [
        services.length > 0 && { value: `${services.length}`, label: "จังหวัดที่ให้บริการ" },
        regionGroups.length > 0 && { value: `${regionGroups.length}`, label: "ภูมิภาคทั่วประเทศ" },
        { value: `${highlights.length}`, label: "งานหลักครบวงจร" },
        { value: "ฟรี", label: "ประเมินราคาเบื้องต้น" },
    ].filter(Boolean);

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
                    gap={14}
                >
                    <CustomBreadcrumbs items={breadcrumbs} />

                    <FadeInSection>
                        <Box textAlign="center">
                            <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                                MEPATCS SERVICE
                            </Typography>
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                รับสร้างบ้าน
                            </Typography>
                            <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                            <Typography variant="subtitle1" color="textSecondary">
                                บริการรับสร้างบ้านครบวงจร ตั้งแต่วางแผนจนส่งมอบบ้าน ครอบคลุมพื้นที่ให้บริการทั่วประเทศ
                            </Typography>

                            <Box
                                mt={5}
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="center"
                                gap={{ xs: 3, md: 6 }}
                            >
                                {stats.map((stat, index) => (
                                    <Box key={index} minWidth="120px" textAlign="center">
                                        <Typography fontSize={{ xs: "28px", md: "36px" }} fontWeight="700" color="primary.main" lineHeight={1.2}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </FadeInSection>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                position="relative"
                                width="100%"
                                height={{ xs: "300px", md: "100%" }}
                                minHeight={{ md: "480px" }}
                                sx={{
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        top: 16,
                                        left: 16,
                                        width: "100%",
                                        height: "100%",
                                        border: "2px solid",
                                        borderColor: PURPLE_BORDER,
                                        display: { xs: "none", md: "block" },
                                    },
                                }}
                            >
                                <Box
                                    position="relative"
                                    width="100%"
                                    height="100%"
                                    overflow="hidden"
                                    zIndex={1}
                                >
                                    <Image
                                        src="/construct.webp"
                                        alt="รับสร้างบ้าน"
                                        fill
                                        sizes={gridToSizes({ xs: 12, md: 6 }, 1400)}
                                        style={{ objectFit: "cover" }}
                                    />
                                    <Box
                                        position="absolute"
                                        bottom={16}
                                        left={16}
                                        px={2}
                                        py={1.5}
                                        display="flex"
                                        alignItems="center"
                                        gap={1.5}
                                        bgcolor="background.paper"
                                        boxShadow={3}
                                    >
                                        <Box
                                            width="40px"
                                            height="40px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bgcolor={PURPLE_SOFT}
                                            borderRadius="50%"
                                            color="primary.main"
                                        >
                                            <VerifiedOutlinedIcon fontSize="small" />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="700" lineHeight={1.3}>
                                                มาตรฐาน
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                ควบคุมงานโดยทีมงานมืออาชีพ
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                p={{ xs: 3, md: 4 }}
                                height="100%"
                                boxSizing="border-box"
                                border="1px solid"
                                borderColor="divider"
                                bgcolor={PURPLE_FAINT}
                                display="flex"
                                flexDirection="column"
                                gap={2.5}
                            >
                                <Box>
                                    <Typography variant="h2" fontSize="24px" fontWeight="600" gutterBottom>
                                        บริการของเราครอบคลุม
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ดูแลครบทุกงานก่อสร้าง ด้วยทีมงานเดียวตั้งแต่ต้นจนจบ
                                    </Typography>
                                </Box>
                                {highlights.map((item, index) => (
                                    <Box key={index} display="flex" alignItems="flex-start" gap={2}>
                                        <Box
                                            width="40px"
                                            height="40px"
                                            flexShrink={0}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bgcolor={PURPLE_SOFT}
                                            borderRadius="50%"
                                            color="primary.main"
                                        >
                                            {item.icon}
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="600" lineHeight={1.4}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {item.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>

                    <Box display="flex" flexDirection="column" gap={6}>
                        <FadeInSection>
                            <Box textAlign="center">
                                <Typography variant="h2" fontSize={{ xs: "26px", md: "32px" }} fontWeight="400" gutterBottom>
                                    ขั้นตอนการให้บริการ
                                </Typography>
                                <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                                <Typography variant="subtitle1" color="textSecondary">
                                    กระบวนการทำงานชัดเจน โปร่งใส ติดตามได้ทุกขั้นตอน
                                </Typography>
                            </Box>
                        </FadeInSection>

                        <Grid container spacing={4}>
                            {steps.map((step, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box
                                        p={3}
                                        height="100%"
                                        boxSizing="border-box"
                                        border="1px solid"
                                        borderColor="divider"
                                        display="flex"
                                        flexDirection="column"
                                        gap={1.5}
                                        sx={{
                                            transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                                            "&:hover": {
                                                borderColor: PURPLE_BORDER,
                                                boxShadow: PURPLE_SHADOW,
                                                transform: "translateY(-4px)",
                                            },
                                        }}
                                    >
                                        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                                            <Box
                                                width="48px"
                                                height="48px"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                bgcolor={PURPLE_SOFT}
                                                borderRadius="50%"
                                                color="primary.main"
                                            >
                                                {step.icon}
                                            </Box>
                                            <Typography fontSize="40px" fontWeight="700" lineHeight={1} sx={{ color: "rgba(132, 94, 247, 0.18)" }}>
                                                {String(index + 1).padStart(2, "0")}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h3" fontSize="18px" fontWeight="600">
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {step.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={6}>
                        <FadeInSection>
                            <Box textAlign="center">
                                <Typography variant="h2" fontSize={{ xs: "26px", md: "32px" }} fontWeight="400" gutterBottom>
                                    พื้นที่ให้บริการ
                                </Typography>
                                <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                                <Typography variant="subtitle1" color="textSecondary">
                                    เลือกจังหวัดของคุณ เพื่อดูรายละเอียดบริการรับสร้างบ้านในพื้นที่
                                </Typography>
                            </Box>
                        </FadeInSection>

                        {regionGroups.length === 0 && (
                            <Box
                                py={6}
                                px={3}
                                textAlign="center"
                                border="1px dashed"
                                borderColor="divider"
                            >
                                <MapOutlinedIcon sx={{ fontSize: "48px", color: "text.disabled", mb: 1 }} />
                                <Typography color="textSecondary">
                                    กำลังเตรียมข้อมูลพื้นที่ให้บริการ สามารถติดต่อสอบถามพื้นที่ของคุณได้โดยตรง
                                </Typography>
                            </Box>
                        )}

                        {regionGroups.map((group) => (
                            <Box
                                key={group.region}
                                id={`region-${group.region}`}
                                display="flex"
                                flexDirection="column"
                                gap={3}
                                sx={{ scrollMarginTop: "120px" }}
                            >
                                <Box display="flex" alignItems="center" gap={1.5}>
                                    <Box
                                        width="40px"
                                        height="40px"
                                        flexShrink={0}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bgcolor={PURPLE_SOFT}
                                        borderRadius="50%"
                                        color="primary.main"
                                    >
                                        <LocationOnOutlinedIcon />
                                    </Box>
                                    <Typography variant="h3" fontSize="22px" fontWeight="600" whiteSpace="nowrap">
                                        ภาค{group.region}
                                    </Typography>
                                    <Chip label={`${group.services.length} จังหวัด`} size="small" sx={{ bgcolor: PURPLE_SOFT, color: "primary.main", fontWeight: 600 }} />
                                    <Divider sx={{ flexGrow: 1, ml: 2 }} />
                                </Box>
                                <Box display="flex" flexWrap="wrap" gap={1.5}>
                                    {group.services.map((service) => (
                                        <Button
                                            key={service.id}
                                            component={Link}
                                            href={`/services/home-building/${service.slug}`}
                                            sx={{
                                                px: 2.5,
                                                py: 1.25,
                                                borderRadius: 0,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                bgcolor: "background.paper",
                                                color: "text.primary",
                                                fontSize: "16px",
                                                fontWeight: 600,
                                                textTransform: "none",
                                                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
                                                "& .prov-arrow": { color: "primary.main" },
                                                "&:hover": {
                                                    transform: "translateY(-2px)",
                                                    boxShadow: PURPLE_SHADOW,
                                                    borderColor: PURPLE_BORDER,
                                                    bgcolor: PURPLE_SOFT,
                                                },
                                                "&:hover .prov-arrow": {
                                                    transform: "translateX(4px)",
                                                },
                                            }}
                                        >
                                            {service.title}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <FadeInSection>
                        <Box
                            position="relative"
                            overflow="hidden"
                            py={{ xs: 6, md: 8 }}
                            px={{ xs: 3, md: 8 }}
                            textAlign="center"
                            color="primary.contrastText"
                            sx={{ background: "linear-gradient(135deg, #845ef7 0%, #6741d9 100%)" }}
                        >
                            <Box position="relative" zIndex={1}>
                                <Typography variant="h2" fontSize={{ xs: "24px", md: "32px" }} fontWeight="600" gutterBottom>
                                    พร้อมเริ่มสร้างบ้านในฝันของคุณหรือยัง?
                                </Typography>
                                <Typography variant="subtitle1" mb={4} sx={{ opacity: 0.9 }}>
                                    ปรึกษาทีมงานมืออาชีพของเราได้ฟรี ประเมินราคาเบื้องต้นไม่มีค่าใช้จ่าย
                                </Typography>
                                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                                    <Button
                                        component={Link}
                                        href="/contact"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            bgcolor: "background.paper",
                                            color: "primary.main",
                                            "&:hover": { bgcolor: "background.default" },
                                        }}
                                    >
                                        ติดต่อเรา
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/home-designs"
                                        variant="outlined"
                                        size="large"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            color: "primary.contrastText",
                                            borderColor: "rgba(255, 255, 255, 0.6)",
                                            "&:hover": {
                                                borderColor: "primary.contrastText",
                                                bgcolor: "rgba(255, 255, 255, 0.08)",
                                            },
                                        }}
                                    >
                                        ดูแบบบ้านของเรา
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </FadeInSection>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default HomeBuildingService;
