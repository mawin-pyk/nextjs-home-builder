import Image from "next/image";

import {
    Box,
    Typography,
    Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { gridToSizes } from "@/helpers/helpers";

import FadeInSection from "@/components/share/FadeInSection";

function AboutSection() {
    return (
        <Box
            component="section"
            width="100%"
            minHeight="60vh"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
            bgcolor="#f1f3f5"
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
                    <FadeInSection>
                        <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                            เราคือใคร?
                        </Typography>
                        <Typography variant="subtitle1">
                            สวัสดีค่ะ! เราคือทีมงาน เมพัฒน์.ซีเอส ที่นี่เราไม่ได้มองว่าตัวเองเป็นแค่ "ผู้รับเหมา" แต่เราอยากเป็นเหมือน "พี่ชาย/น้องสาว" หรือ "เพื่อนสนิท" ที่คุณไว้ใจให้ช่วยดูแลงานก่อสร้างทุกอย่าง
                            เราเข้าใจดีว่าการจะสร้างอะไรสักอย่าง ทั้งบ้านพักอาศัย หรืออาคารธุรกิจ มันคือการลงทุนครั้งใหญ่ในชีวิต ดังนั้น... เราจะดูแลให้ดีที่สุดเหมือนเป็นของของเราเองค่ะ!
                        </Typography>
                        <Box mt={4} display="flex" flexDirection="column" gap={1}>

                            <Typography variant="body1" fontWeight="600">
                                ทำไมถึงวางใจให้ เมพัฒน์.ซีเอส ดูแลได้?
                            </Typography>
                            <Typography variant="body1">
                                เราอยากให้คุณสบายใจที่สุด ตั้งแต่วันแรกที่คุยกันจนกระทั่งวันส่งมอบกุญแจ
                            </Typography>

                            <Typography variant="body1" fontWeight="600" mt={2}>
                                งานที่เราพร้อมดูแลให้คุณ
                            </Typography>
                            <Box display="flex" justifyContent="flex-start" alignItems="flex-start" gap={1}>
                                <CheckCircleIcon fontSize="small" color="success" />
                                <Typography variant="body1">ไม่ว่าโปรเจกต์จะเล็กจะใหญ่ แค่ไหน เราก็พร้อมลุย!</Typography>
                            </Box>
                            <Box display="flex" justifyContent="flex-start" alignItems="flex-start" gap={1}>
                                <CheckCircleIcon fontSize="small" color="success" />
                                <Typography variant="body1">งานบ้านในฝัน: บ้านเดี่ยว, ทาวน์โฮม, อาคารที่พักอาศัย</Typography>
                            </Box>
                            <Box display="flex" justifyContent="flex-start" alignItems="flex-start" gap={1}>
                                <CheckCircleIcon fontSize="small" color="success" />
                                <Typography variant="body1">งานอาคารธุรกิจ: ออฟฟิศ, ร้านอาหาร, โรงแรม</Typography>
                            </Box>
                            <Box display="flex" justifyContent="flex-start" alignItems="flex-start" gap={1}>
                                <CheckCircleIcon fontSize="small" color="success" />
                                <Typography variant="body1">งานโครงสร้างโรงงาน/คลังสินค้า: งานใหญ่ที่ต้องการความเชี่ยวชาญเฉพาะทาง</Typography>
                            </Box>
                            <Typography variant="body1" fontWeight="600" mt={2}>
                                ❤️ สิ่งที่เราให้ความสำคัญเหนือสิ่งอื่นใด ความรับผิดชอบจนจบงาน
                            </Typography>

                        </Box>
                    </FadeInSection>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AboutSection;
