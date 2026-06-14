import Image from "next/image";
import Link from "next/link";
import {
    Box,
    Typography,
    Button
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import FadeInSection from "@/components/share/FadeInSection";

function BannerSection() {
    return (
        <Box
            component="section"
            width="100%"
            height="100vh"
            position="relative"
            overflow="hidden"
        >
            <Image
                src="/banner.webp"
                alt="banner"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
            />

            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                sx={{
                    background: "linear-gradient(135deg, rgba(26, 12, 58, 0.82) 0%, rgba(10, 10, 15, 0.62) 55%, rgba(103, 65, 217, 0.45) 100%)",
                }}
            />

            <Box
                width="100%"
                maxWidth="1000px"
                pt={{ xs: 6, sm: 20 }}
                pb={{ xs: 6, sm: 8 }}
                px={{ xs: 2, sm: 3 }}
                boxSizing="border-box"
                position="absolute"
                top="50%"
                left="50%"
                zIndex={1}
                sx={{ transform: "translate(-50%, -50%)" }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
            >
                <FadeInSection>
                    <Box textAlign="center">
                        <Typography
                            variant="overline"
                            sx={{
                                color: "#d0bfff",
                                fontWeight: 600,
                                letterSpacing: "0.3em",
                            }}
                        >
                            MEPATCS HOME BUILDER
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: "56px", md: "64px", lg: "72px" },
                                fontWeight: { xs: "400", md: "600" },
                                color: "#ffffff",
                                lineHeight: 1.1,
                            }}
                        >
                            MEPATCS รับสร้างบ้าน
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: "26px", md: "36px", lg: "40px" },
                                fontWeight: { xs: "400", md: "500" },
                                color: "rgba(255, 255, 255, 0.92)",
                            }}
                        >
                            รับสร้างบ้านครบวงจร งานโครงสร้างและตกแต่งภายใน
                        </Typography>
                    </Box>
                </FadeInSection>

                <Box mt={8} display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
                    <Button
                        component={Link}
                        href="/contact"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon className="hero-arrow" />}
                        sx={{
                            "& .hero-arrow": { transition: "transform 0.3s ease" },
                            "&:hover .hero-arrow": { transform: "translateX(4px)" },
                        }}
                    >
                        ติดต่อเรา
                    </Button>
                    <Button
                        component={Link}
                        href="/home-designs"
                        variant="outlined"
                        size="large"
                        sx={{
                            border: "2px solid",
                            color: "#ffffff",
                            borderColor: "rgba(255, 255, 255, 0.7)",
                            "&:hover": {
                                borderColor: "#ffffff",
                                bgcolor: "rgba(255, 255, 255, 0.08)",
                            },
                        }}
                    >
                        แบบบ้าน
                    </Button>
                </Box>
            </Box>

            <Box
                position="absolute"
                bottom={24}
                left="50%"
                zIndex={1}
                color="rgba(255, 255, 255, 0.75)"
                sx={{
                    transform: "translateX(-50%)",
                    animation: "heroBounce 2.2s ease-in-out infinite",
                    "@keyframes heroBounce": {
                        "0%, 100%": { transform: "translate(-50%, 0)" },
                        "50%": { transform: "translate(-50%, 8px)" },
                    },
                }}
            >
                <KeyboardArrowDownIcon fontSize="large" />
            </Box>
        </Box>
    );
}

export default BannerSection;