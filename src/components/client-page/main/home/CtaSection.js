import Link from "next/link";

import {
    Box,
    Typography,
    Button,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import FadeInSection from "@/components/share/FadeInSection";

function CtaSection() {
    return (
        <Box
            component="section"
            width="100%"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
            bgcolor="background.paper"
        >
            <Box width="100%" maxWidth="1400px" m="0px auto">
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
                                    ดูแบบบ้าน
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </FadeInSection>
            </Box>
        </Box>
    );
}

export default CtaSection;