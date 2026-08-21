import Link from "next/link";

import {
    Box,
    Typography,
    Button,
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_GRADIENT = "linear-gradient(135deg, #845ef7 0%, #6741d9 100%)";

function CtaBanner({
    title,
    description,
    primaryLabel = "ติดต่อเรา",
    primaryHref = "/contact",
    secondaryLabel,
    secondaryHref,
}) {
    return (
        <FadeInSection>
            <Box
                position="relative"
                overflow="hidden"
                py={{ xs: 6, md: 8 }}
                px={{ xs: 3, md: 8 }}
                textAlign="center"
                color="primary.contrastText"
                sx={{ background: PURPLE_GRADIENT }}
            >
                <Box position="relative" zIndex={1}>
                    <Typography variant="h2" fontSize={{ xs: "24px", md: "32px" }} fontWeight="600" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" mb={4} sx={{ opacity: 0.9 }}>
                        {description}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                        <Button
                            component={Link}
                            href={primaryHref}
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "background.paper",
                                color: "primary.main",
                                "&:hover": { bgcolor: "background.default" },
                            }}
                        >
                            {primaryLabel}
                        </Button>
                        {secondaryLabel && secondaryHref && (
                            <Button
                                component={Link}
                                href={secondaryHref}
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
                                {secondaryLabel}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </FadeInSection>
    );
}

export default CtaBanner;
