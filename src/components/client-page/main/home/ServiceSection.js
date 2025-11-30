import Image from "next/image";
import Link from "next/link";
import { gridToSizes } from "@/helpers/helpers";

import {
    Box,
    Grid,
    Typography,
} from "@mui/material";

import FadeInSection from "@/components/share/FadeInSection";

const services = [
    {
        title: "งานก่อสร้าง",
        description: "บริการสร้างบ้านครบวงจร ตั้งแต่วางแผนจนส่งมอบบ้าน",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "ออกแบบ/เขียนแบบ",
        description: "ออกแบบบ้านให้ตรงกับความต้องการของคุณ พร้อมคำแนะนำ",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "งานรีโนเวท/ต่อเติม",
        description: "ปรับปรุงบ้านเก่าให้เหมือนใหม่ พร้อมโครงสร้างปลอดภัย",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
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
        >
            <Box width="100%" maxWidth="1400px" m="0px auto" textAlign="center">
                <FadeInSection direction="right">
                    <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                        บริการของเรา
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        เราพร้อมดูแลทุกขั้นตอนในการสร้างบ้านในฝันของคุณ
                    </Typography>
                </FadeInSection>
            </Box>
            <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                {services.map((service, index) => (
                    <Grid
                        component={Link}
                        href={`/services`}
                        key={index}
                        size={{ xs: 12, sm: 6, lg: 4 }}
                    >
                        <Box
                            height="300px"
                            mt={{ xs: 0, sm: 0, lg: index % 2 === 0 ? 0 : 10 }}
                            position="relative"
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes={gridToSizes({ xs: 12, sm: 6, lg: 4 }, 1400)}
                                style={{ objectFit: "cover" }}
                            />
                            <Box
                                width="100%"
                                p={2}
                                position="absolute"
                                bottom="0px"
                                color="#ffffff"
                                sx={{ background: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))" }}
                            >
                                <Typography variant="h4" fontSize="18px" fontWeight="600" gutterBottom>
                                    {service.title}
                                </Typography>
                                <Typography variant="body2">
                                    {service.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
}

export default ServiceSection;
