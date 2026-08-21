import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KitchenIcon from "@mui/icons-material/Kitchen";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";
import CtaBanner from "@/components/share/CtaBanner";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
const PURPLE_FAINT = "rgba(132, 94, 247, 0.03)";
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const clampSx = (lines) => ({
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
});

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "แบบบ้าน" }
];

function FilterButton({ href, active, children }) {
    return (
        <Button
            component={Link}
            href={href}
            size="small"
            disableElevation
            sx={{
                px: 2.5,
                py: 1,
                borderRadius: 0,
                border: "1px solid",
                borderColor: active ? "primary.main" : "divider",
                bgcolor: active ? "primary.main" : "background.paper",
                color: active ? "primary.contrastText" : "text.primary",
                fontWeight: 600,
                textTransform: "none",
                transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                    borderColor: active ? "primary.dark" : PURPLE_BORDER,
                    bgcolor: active ? "primary.dark" : PURPLE_SOFT,
                    color: active ? "primary.contrastText" : "primary.main",
                },
            }}
        >
            {children}
        </Button>
    );
}

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

function HomeDesigns({ propertyTypes, houseStyles, homeDesigns, category, categoryData }) {

    return (
        <>
            <Box
                component="main"
                width="100%"
                py={14}
                px={{ xs: 2, sm: 3 }}
                boxSizing="border-box"
            >
                <Box
                    width="100%"
                    maxWidth="1400px"
                    m="0px auto"
                    display="flex"
                    flexDirection="column"
                    gap={8}
                >
                    <CustomBreadcrumbs items={breadcrumbs} />

                    <FadeInSection>
                        <Box textAlign="center">
                            <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                                MEPATCS HOME DESIGN
                            </Typography>
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                {categoryData ? categoryData.title : "แบบบ้าน"}
                            </Typography>
                            <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                            <Typography variant="subtitle1" color="textSecondary" maxWidth="760px" mx="auto">
                                {categoryData ? categoryData.detail : "แบบบ้านที่ออกแบบจากการใช้งานจริง ตอบโจทย์ฟังก์ชันและงบประมาณ"}
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box width="100%" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
                            <FilterButton href="/home-designs" active={!category}>
                                ทั้งหมด
                            </FilterButton>
                            {propertyTypes.map((propertyType) => (
                                <FilterButton
                                    key={propertyType.id}
                                    href={`/home-designs/${propertyType.slug}`}
                                    active={category === propertyType.slug}
                                >
                                    {propertyType.title}
                                </FilterButton>
                            ))}
                        </Box>
                        {/* <Box width="100%" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
                            {houseStyles.map((houseStyle) => (
                                <FilterButton key={houseStyle.id} href={`/home-designs/${houseStyle.slug}`} active={category === houseStyle.slug}>
                                    {houseStyle.title}
                                </FilterButton>
                            ))}
                        </Box> */}
                    </Box>

                    {homeDesigns.length === 0 ? (
                        <Box
                            py={8}
                            px={3}
                            textAlign="center"
                            border="1px solid"
                            borderColor="divider"
                            bgcolor={PURPLE_FAINT}
                        >
                            <HolidayVillageOutlinedIcon sx={{ fontSize: "48px", color: "primary.main", mb: 1 }} />
                            <Typography variant="h3" fontSize="20px" fontWeight="600" gutterBottom>
                                ยังไม่มีแบบบ้านในหมวดนี้
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ลองเลือกดูแบบบ้านหมวดอื่น หรือดูแบบบ้านทั้งหมดของเรา
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={4}>
                            {homeDesigns.map((homeDesign, index) => {
                                const categorySlug = category ? category : propertyTypes.find((propertyType) => propertyType.id === homeDesign.propertyType).slug;

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
                    )}

                    <CtaBanner
                        title="ไม่เจอแบบบ้านที่ใช่?"
                        description="เราออกแบบบ้านใหม่ให้ตรงกับที่ดิน ฟังก์ชัน และงบประมาณของคุณได้ ปรึกษาฟรีไม่มีค่าใช้จ่าย"
                        secondaryLabel="ดูบริการออกแบบ"
                        secondaryHref="/services"
                    />
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default HomeDesigns;
