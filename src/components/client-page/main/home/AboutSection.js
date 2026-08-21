import Image from "next/image";

import {
    Box,
    Typography,
    Grid,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import { gridToSizes } from "@/helpers/helpers";

import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_FAINT = "rgba(132, 94, 247, 0.05)";
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";

const workItems = [
    { title: "งานบ้านในฝัน", description: "บ้านเดี่ยว, ทาวน์โฮม, อาคารที่พักอาศัย" },
    { title: "งานอาคารธุรกิจ", description: "ออฟฟิศ, ร้านอาหาร, โรงแรม" },
    { title: "งานโครงสร้างโรงงาน/คลังสินค้า", description: "งานใหญ่ที่ต้องการความเชี่ยวชาญเฉพาะทาง" },
];

function AboutSection() {
    return (
        <Box
            component="section"
            width="100%"
            minHeight="60vh"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
            bgcolor="#e9ecef"
        >
            <Grid container spacing={6} maxWidth="1400px" m="0px auto" alignItems="center">
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Box
                        position="relative"
                        width="100%"
                        height={{ xs: 250, sm: 350, md: 450 }}
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
                                src="/about.webp"
                                alt="ทีมงานออกแบบบ้านและรีโนเวทบ้าน โดย Mepatcs"
                                fill
                                sizes={gridToSizes({ xs: 12, lg: 6 }, 1400)}
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>
                    <FadeInSection>
                        <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                            ABOUT MEPATCS
                        </Typography>
                        <Typography variant="h3" fontSize="32px" fontWeight="600">
                            เราคือใคร?
                        </Typography>
                        <Box width="56px" height="4px" bgcolor="primary.main" mt={1.5} mb={3} />
                        <Typography variant="subtitle1" color="textSecondary" sx={{ lineHeight: 1.8 }}>
                            {'เราคือทีมงาน เมพัฒน์.ซีเอส ที่ไม่ได้มองตัวเองเป็นแค่ "ผู้รับเหมา" แต่เป็นเหมือนคนในครอบครัวที่คุณไว้ใจ ดูแลงานก่อสร้างทุกอย่างเหมือนเป็นของของเราเอง ตั้งแต่วันแรกที่คุยกันจนถึงวันส่งมอบกุญแจ'}
                        </Typography>

                        <Box mt={3.5} display="flex" flexDirection="column" gap={2.5}>
                            <Box>
                                <Typography fontSize="18px" fontWeight="600" gutterBottom>
                                    งานที่เราพร้อมดูแลให้คุณ
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={1.25}>
                                    {workItems.map((item, index) => (
                                        <Box key={index} display="flex" alignItems="flex-start" gap={1.25}>
                                            <CheckCircleOutlineRoundedIcon fontSize="small" sx={{ color: "primary.main", mt: "3px", flexShrink: 0 }} />
                                            <Typography variant="body2" color="textSecondary">
                                                <Box component="span" fontWeight="600" color="text.primary">{item.title}</Box>
                                                {" — "}{item.description}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Box
                                borderLeft="4px solid"
                                borderColor="primary.main"
                                bgcolor={PURPLE_FAINT}
                                pl={2.5}
                                py={1.75}
                            >
                                <Typography variant="body1" fontWeight="600">
                                    สิ่งที่เราให้ความสำคัญเหนือสิ่งอื่นใด คือความรับผิดชอบจนจบงาน
                                </Typography>
                            </Box>
                        </Box>
                    </FadeInSection>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AboutSection;
