import Image from "next/image";
import Link from "next/link";
import { gridToSizes } from "@/helpers/helpers";

import {
    Box,
    Grid,
    Typography,
    Button
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KitchenIcon from "@mui/icons-material/Kitchen";

import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const clampSx = (lines) => ({
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
});

function HomeDesignCard({ homeDesign }) {
    return (
        <Box
            height="100%"
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            border="1px solid"
            borderColor="divider"
            bgcolor="background.paper"
            sx={{
                color: "text.primary",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: PURPLE_SHADOW,
                    borderColor: PURPLE_BORDER,
                },
                "&:hover .design-img": { transform: "scale(1.08)" },
            }}
        >
            <Box width="100%" height="200px" position="relative" overflow="hidden">
                <Image
                    src={homeDesign.images[0]}
                    alt={`${homeDesign.title}`}
                    fill
                    sizes={gridToSizes({ xs: 12, sm: 6, lg: 3 }, 1400)}
                    className="design-img"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                />
            </Box>
            <Box p={3} flexGrow={1} display="flex" flexDirection="column" gap={1}>
                <Typography
                    variant="h4"
                    fontSize="18px"
                    fontWeight="600"
                    sx={clampSx(1)}
                >
                    {homeDesign.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={clampSx(2)}
                >
                    {homeDesign.description}
                </Typography>
                <Box mt="auto" pt={2} display="flex" flexWrap="wrap" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <BedIcon fontSize="small" sx={{ color: "primary.main" }} />
                        <Typography variant="body2">{homeDesign.bedroom} ห้องนอน</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <BathtubIcon fontSize="small" sx={{ color: "primary.main" }} />
                        <Typography variant="body2">{homeDesign.bathroom} ห้องน้ำ</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <KitchenIcon fontSize="small" sx={{ color: "primary.main" }} />
                        <Typography variant="body2">{homeDesign.kitchen} ห้องครัว</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function HomeDesignSection({ propertyTypes, homeDesigns }) {
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
            <FadeInSection>
                <Box width="100%" maxWidth="1400px" m="0px auto" textAlign="start">
                    <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                        MEPATCS HOME DESIGN
                    </Typography>
                    <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                        แบบบ้าน
                    </Typography>
                    <Box width="56px" height="4px" bgcolor="primary.main" mb={2} />
                    <Typography variant="subtitle1" color="textSecondary">
                        แบบบ้านที่ออกแบบจากการใช้งานจริง ตอบโจทย์ฟังก์ชันและงบประมาณ
                    </Typography>
                </Box>
            </FadeInSection>

            <FadeInSection>
                <Box
                    display={{ xs: "flex", sm: "none" }}
                    overflow="auto"
                    gap={2}
                    pb={1}
                    sx={{
                        scrollSnapType: "x mandatory",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {homeDesigns.map((homeDesign, index) => (
                        <Box
                            key={index}
                            component={Link}
                            href={`/home-designs/${homeDesign.slug}`}
                            sx={{
                                flex: "0 0 85%",
                                scrollSnapAlign: "center",
                                textDecoration: "none",
                            }}
                        >
                            <HomeDesignCard homeDesign={homeDesign} />
                        </Box>
                    ))}
                </Box>

                <Box display={{ xs: "none", sm: "block" }}>
                    <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                        {homeDesigns.map((homeDesign, index) => {
                            const categorySlug = propertyTypes.find((propertyType) => propertyType.id === homeDesign.propertyType).slug;

                            return (
                                <Grid
                                    component={Link}
                                    href={`/home-designs/${categorySlug}/${homeDesign.slug}`}
                                    key={index}
                                    size={{ xs: 12, sm: 6, lg: 3 }}
                                    sx={{ textDecoration: "none" }}
                                >
                                    <HomeDesignCard homeDesign={homeDesign} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </FadeInSection>

            <Box width="100%" maxWidth="1400px" m="40px auto 0px auto" display="flex" justifyContent="center" alignItems="center">
                <Button component={Link} href="/home-designs" variant="contained" size="large">ดูแบบบ้านทั้งหมด</Button>
            </Box>

        </Box>
    );
}

export default HomeDesignSection;