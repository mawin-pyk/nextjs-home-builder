import Image from "next/image";
import Link from "next/link";
import {
    Box,
    Typography,
    Button
} from "@mui/material";

function BannerSection() {
    return (
        <Box
            component="section"
            width="100%"
            height="100vh"
            position="relative"
        >
            <Image src="/banner.webp" alt="ออกแบบบ้าน" fill sizes="100vw" style={{ objectFit: "cover" }} priority />
            <Box
                width="85%"
                maxWidth="360px"
                p={2}
                position="absolute"
                top="50%"
                left="50%"
                textAlign={{ xs: "center", lg: "left" }}
                color="#ffffff"
                bgcolor="rgba(0, 0, 0, 0.7)"
                sx={{
                    transform: {
                        xs: "translate(-50%, -50%)",
                        lg: "translate(-120%, -50%)",
                        xl: "translate(-160%, -50%)",
                    }
                }}
            >
                <Typography variant="h1" fontSize="48px" fontWeight="400">
                    รับสร้างบ้าน
                </Typography>
                <Typography variant="h2" fontSize="40px" fontWeight="400">
                    Mepatcs
                </Typography>
                <Typography variant="subtitle1" fontSize="24px" gutterBottom>
                    Build Your Dream Home
                </Typography>
                <Button
                    component={Link}
                    href="/contact"
                    variant="contained"
                >
                    ติดต่อเรา
                </Button>
            </Box>
        </Box>
    );
}

export default BannerSection;