import Image from "next/image";

import {
    Box,
    Typography,
    Grid,
    Stack
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { gridToSizes } from "@/helpers/helpers";

function AboutSection() {
    return (
        <Box
            component="section"
            width="100%"
            minHeight="60vh"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
        >
            <Grid container spacing={6} maxWidth="1400px" m="0px auto" alignItems="center">
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Box
                        width="100%"
                        height={{ xs: 250, sm: 350, md: 450 }}
                        position="relative"
                        overflow="hidden"
                    >
                        <Image
                            src="/about.webp"
                            alt="ทีมงานออกแบบบ้านและรีโนเวทบ้าน โดย Mepatcs"
                            fill
                            sizes={gridToSizes({ xs: 12, lg: 6 }, 1400)}
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                        เราคือใคร?
                    </Typography>
                    <Typography variant="subtitle1" mb={4}>
                        เราคือทีมสถาปนิกและวิศวกรมืออาชีพที่เชี่ยวชาญด้านออกแบบบ้าน สร้างบ้านใหม่ และรีโนเวทบ้านอย่างครบวงจร
                        มุ่งเน้นคุณภาพ ความปลอดภัย และการออกแบบที่ตอบโจทย์ชีวิตของคุณ
                    </Typography>
                    <Stack spacing={1} mb={4}>
                        <Typography variant="body1">
                            <CheckCircleIcon fontSize="small" color="success" />
                            ประสบการณ์กว่า 10 ปี ในการออกแบบบ้านมืออาชีพ
                        </Typography>
                        <Typography variant="body1">
                            <CheckCircleIcon fontSize="small" color="success" />
                            ทีมงานมืออาชีพดูแลทุกขั้นตอนสร้างบ้าน
                        </Typography>
                        <Typography variant="body1">
                            <CheckCircleIcon fontSize="small" color="success" />
                            บริการครบวงจร ตั้งแต่การออกแบบบ้านจนรีโนเวทบ้าน
                        </Typography>
                        <Typography variant="body1">
                            <CheckCircleIcon fontSize="small" color="success" />
                            รับประกันคุณภาพทุกโปรเจกต์ออกแบบและสร้างบ้าน
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AboutSection;
