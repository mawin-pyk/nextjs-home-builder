import Link from "next/link";

import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const services = [
    {
        title: "งานก่อสร้าง",
        description: "บริการสร้างบ้านครบวงจร ตั้งแต่วางแผนจนส่งมอบบ้าน",
        icon: <RoofingOutlinedIcon fontSize="large" />,
        link: "/services/home-building"
    },
    {
        title: "ออกแบบ/เขียนแบบ",
        description: "ออกแบบบ้านให้ตรงกับความต้องการของคุณ พร้อมคำแนะนำ",
        icon: <SquareFootOutlinedIcon fontSize="large" />,
        link: "/services"
    },
    {
        title: "งานรีโนเวท/ต่อเติม",
        description: "ปรับปรุงบ้านเก่าให้เหมือนใหม่ พร้อมโครงสร้างปลอดภัย",
        icon: <CarpenterOutlinedIcon fontSize="large" />,
        link: "/services"
    }
];

function ServiceCard({ service, index }) {
    return (
        <Box
            height="100%"
            boxSizing="border-box"
            position="relative"
            overflow="hidden"
            p={4}
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
                "&:hover .service-arrow": { transform: "translateX(4px)" },
            }}
        >
            <Typography
                aria-hidden
                sx={{
                    position: "absolute",
                    top: "12px",
                    right: "16px",
                    fontSize: "88px",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "rgba(132, 94, 247, 0.08)",
                    pointerEvents: "none",
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </Typography>

            <Box
                width="64px"
                height="64px"
                mb={2.5}
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor={PURPLE_SOFT}
                borderRadius="50%"
                color="primary.main"
            >
                {service.icon}
            </Box>
            <Typography variant="h4" fontSize="22px" fontWeight="600" gutterBottom>
                {service.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {service.description}
            </Typography>
            <Box mt="auto" pt={3} display="flex" alignItems="center" gap={0.5} color="primary.main">
                <Typography variant="body2" fontWeight="600">
                    ดูเพิ่มเติม
                </Typography>
                <ArrowForwardIcon className="service-arrow" fontSize="small" sx={{ transition: "transform 0.3s ease" }} />
            </Box>
        </Box>
    );
}

function ServiceSection() {
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
            <FadeInSection>
                <Box width="100%" maxWidth="1400px" m="0px auto" textAlign="center">
                    <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                        MEPATCS SERVICE
                    </Typography>
                    <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                        บริการของเรา
                    </Typography>
                    <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                    <Typography variant="subtitle1" color="textSecondary">
                        เราพร้อมดูแลทุกขั้นตอนในการสร้างบ้านในฝันของคุณ
                    </Typography>
                </Box>
            </FadeInSection>

            <FadeInSection>
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
                    {services.map((service, index) => (
                        <Box
                            key={index}
                            component={Link}
                            href={service.link}
                            sx={{
                                flex: "0 0 85%",
                                scrollSnapAlign: "center",
                                textDecoration: "none",
                            }}
                        >
                            <ServiceCard service={service} index={index} />
                        </Box>
                    ))}
                </Box>

                <Box display={{ xs: "none", sm: "block" }}>
                    <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                        {services.map((service, index) => (
                            <Grid
                                component={Link}
                                href={service.link}
                                key={index}
                                size={{ xs: 12, sm: 6, lg: 4 }}
                                sx={{ textDecoration: "none" }}
                            >
                                <ServiceCard service={service} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </FadeInSection>
        </Box>
    );
}

export default ServiceSection;
