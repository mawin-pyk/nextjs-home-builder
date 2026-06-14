import Link from "next/link";

import {
    Box,
    Grid,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
const PURPLE_FAINT = "rgba(132, 94, 247, 0.03)";
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

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

function HomeBuildingServiceDetail({ service, otherServices }) {
    const breadcrumbs = [
        { label: "หน้าแรก", href: "/" },
        { label: "บริการของเรา", href: "/services" },
        { label: "รับสร้างบ้าน", href: "/services/home-building" },
        { label: service.title }
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
                                MEPATCS SERVICE
                            </Typography>
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                รับสร้างบ้าน{service.title}
                            </Typography>
                            <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                            <Typography variant="subtitle1" color="textSecondary" maxWidth="760px" mx="auto">
                                {service.description}
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <FadeInSection>
                        <Grid container spacing={{ xs: 4, md: 6 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box
                                    pl={3}
                                    borderLeft="4px solid"
                                    borderColor="primary.main"
                                >
                                    <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.15em">
                                        พื้นที่ภาค{service.region}
                                    </Typography>
                                    <Typography variant="h2" fontSize={{ xs: "24px", md: "28px" }} fontWeight="600" gutterBottom>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {service.detail}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box maxWidth="760px" width="100%" mx="auto">
                                    {steps.map((step, index) => {
                                        const isLast = index === steps.length - 1;
                                        return (
                                            <FadeInSection key={index}>
                                                <Box display="flex" gap={{ xs: 2, md: 3 }}>
                                                    <Box display="flex" flexDirection="column" alignItems="center">
                                                        <Box
                                                            width="52px"
                                                            height="52px"
                                                            flexShrink={0}
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            bgcolor={PURPLE_SOFT}
                                                            borderRadius="50%"
                                                            color="primary.main"
                                                        >
                                                            {step.icon}
                                                        </Box>
                                                        {!isLast && (
                                                            <Box
                                                                width="2px"
                                                                flexGrow={1}
                                                                my={1}
                                                                bgcolor={PURPLE_BORDER}
                                                            />
                                                        )}
                                                    </Box>
                                                    <Box flex={1} pb={isLast ? 0 : 5}>
                                                        <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.15em">
                                                            ขั้นตอนที่ {String(index + 1).padStart(2, "0")}
                                                        </Typography>
                                                        <Typography variant="h3" fontSize="20px" fontWeight="600" gutterBottom>
                                                            {step.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {step.description}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </FadeInSection>
                                        );
                                    })}
                                </Box>
                            </Grid>
                        </Grid>
                    </FadeInSection>

                    {otherServices.length > 0 && (
                        <Box display="flex" flexDirection="column" gap={4}>
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
                                    <HomeWorkOutlinedIcon />
                                </Box>
                                <Typography variant="h2" fontSize="24px" fontWeight="600" whiteSpace="nowrap">
                                    พื้นที่ให้บริการอื่น ๆ
                                </Typography>
                                <Divider sx={{ flexGrow: 1, ml: 2 }} />
                            </Box>
                            <Box display="flex" flexWrap="wrap" gap={1.5}>
                                {otherServices.map((other, index) => (
                                    <Button
                                        key={index}
                                        component={Link}
                                        href={`/services/home-building/${other.slug}`}
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
                                        {other.title}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    )}

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
                                    พร้อมเริ่มสร้างบ้านในพื้นที่ของคุณหรือยัง?
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
                                        href="/services/home-building"
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
                                        ดูพื้นที่ให้บริการทั้งหมด
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

export default HomeBuildingServiceDetail;
