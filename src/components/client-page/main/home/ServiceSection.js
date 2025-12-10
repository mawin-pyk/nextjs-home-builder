import Image from "next/image";
import Link from "next/link";
import { gridToSizes } from "@/helpers/helpers";

import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';

import FadeInSection from "@/components/share/FadeInSection";

const services = [
    {
        title: "งานก่อสร้าง",
        description: "บริการสร้างบ้านครบวงจร ตั้งแต่วางแผนจนส่งมอบบ้าน",
        image: "/construct.webp",
        icon: <RoofingOutlinedIcon fontSize="large" />
    },
    {
        title: "ออกแบบ/เขียนแบบ",
        description: "ออกแบบบ้านให้ตรงกับความต้องการของคุณ พร้อมคำแนะนำ",
        image: "/plan.webp",
        icon: <SquareFootOutlinedIcon fontSize="large" />
    },
    {
        title: "งานรีโนเวท/ต่อเติม",
        description: "ปรับปรุงบ้านเก่าให้เหมือนใหม่ พร้อมโครงสร้างปลอดภัย",
        image: "/renovate.webp",
        icon: <CarpenterOutlinedIcon fontSize="large" />
    }
];

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
            bgcolor="#f1f3f5"
        >
            <Box width="100%" maxWidth="1400px" m="0px auto" textAlign="center">
                <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                    บริการของเรา
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    เราพร้อมดูแลทุกขั้นตอนในการสร้างบ้านในฝันของคุณ
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
                    {services.map((service, index) => (
                        <Box
                            key={index}
                            component={Link}
                            href={`/services/${service.slug}`}
                            sx={{
                                flex: "0 0 85%",
                                scrollSnapAlign: "center",
                            }}
                        >
                            <Box>
                                <Box position="relative" width="100%" height="360px">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes={gridToSizes({ xs: 12, sm: 6, lg: 4 }, 1400)}
                                        style={{ objectFit: "cover" }}
                                    />
                                </Box>
                                <Box p={4} border="1px solid" borderColor="divider" sx={{ color: "text.primary" }}>
                                    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                                        <Box
                                            width="50px"
                                            height="50px"
                                            mb={2}
                                            p={1}
                                            boxSizing="border-box"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bgcolor="divider"
                                            borderRadius="50%"
                                        >
                                            {service.icon}
                                        </Box>
                                        <Typography variant="h4" fontSize="22px" fontWeight="600" gutterBottom>
                                            {service.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">
                                        {service.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box display={{ xs: "none", sm: "block" }}>
                    <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                        {services.map((service, index) => (
                            <Grid
                                component={Link}
                                href={`/services`}
                                key={index}
                                size={{ xs: 12, sm: 6, lg: 4 }}
                                sx={{
                                    overflow: "hidden",
                                    "& img": {
                                        transition: "transform 0.6s ease"
                                    },
                                    "&:hover img": {
                                        transform: "scale(1.1)"
                                    }
                                }}
                            >
                                <Box>
                                    <Box position="relative" width="100%" height="360px">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            sizes={gridToSizes({ xs: 12, sm: 6, lg: 4 }, 1400)}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Box>
                                    <Box p={4} border="1px solid" borderColor="divider" sx={{ color: "text.primary" }}>
                                        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                                            <Box
                                                width="50px"
                                                height="50px"
                                                mb={2}
                                                p={1}
                                                boxSizing="border-box"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                bgcolor="divider"
                                                borderRadius="50%"
                                            >
                                                {service.icon}
                                            </Box>
                                            <Typography variant="h4" fontSize="22px" fontWeight="600" gutterBottom>
                                                {service.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2">
                                            {service.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </FadeInSection>
        </Box>
    );
}

export default ServiceSection;
