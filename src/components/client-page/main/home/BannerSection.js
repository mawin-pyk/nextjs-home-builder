import Image from "next/image";
import Link from "next/link";
import {
    Box,
    Typography,
    Button
} from "@mui/material";

import FadeInSection from "@/components/share/FadeInSection";

function BannerSection() {
    return (
        <Box
            component="section"
            width="100%"
            height="100vh"
            position="relative"
        >
            <Image
                src="/banner.webp"
                alt="banner"
                fill
                sizes="100vw"
                style={{ objectFit: "cover", filter: "brightness(40%)" }}
                priority
            />
            <Box
                width="100%"
                pt={{ xs: 6, sm: 20 }}
                pb={{ xs: 6, sm: 8 }}
                px={{ xs: 2, sm: 3 }}
                boxSizing="border-box"
                position="absolute"
                top="50%"
                left="50%"
                sx={{ transform: "translate(-50%, -50%)" }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
            >

                <FadeInSection>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "56px", md: "64px", lg: "72px" },
                            fontWeight: { xs: "400", md: "600" },
                            color: "#ffffff",
                            textAlign: "center"
                        }}>
                        MEPATCS รับสร้างบ้าน
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "32px", md: "40px", lg: "48px" },
                            fontWeight: { xs: "400", md: "600" },
                            color: "#ffffff",
                            textAlign: "center"
                        }}
                    >
                        รับสร้างบ้านครบวงจร งานโครงสร้างและตกแต่งภายใน
                    </Typography>
                </FadeInSection>

                <Box mt={8} display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <Button
                        component={Link}
                        href="/"
                        variant="outlined"
                        size="large"
                        sx={{
                            border: "2px solid"
                        }}
                    >
                        แบบบ้าน
                    </Button>
                    <Button
                        component={Link}
                        href="/contact"
                        variant="contained"
                        size="large"
                    >
                        ติดต่อเรา
                    </Button>
                </Box>

            </Box>
        </Box>
    );
}

export default BannerSection;