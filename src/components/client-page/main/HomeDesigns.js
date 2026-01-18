import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KitchenIcon from "@mui/icons-material/Kitchen";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "แบบบ้าน" }
];

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
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                {categoryData ? categoryData.title : "แบบบ้าน"}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {categoryData ? categoryData.description : "แบบบ้านที่ออกแบบจากการใช้งานจริง ตอบโจทย์ฟังก์ชันและงบประมาณ"}
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box width="100%" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
                            <Button component={Link} href="/home-designs" variant={!category ? "contained" : "outlined"} size="small">
                                ทั้งหมด
                            </Button>
                            {propertyTypes.map((propertyType) => (
                                <Button key={propertyType.id} component={Link} href={`/home-designs/${propertyType.slug}`} variant={category === propertyType.slug ? "contained" : "outlined"} size="small">
                                    {propertyType.title}
                                </Button>
                            ))}
                        </Box>
                        {/* <Box width="100%" display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" gap={2}>
                            {houseStyles.map((houseStyle) => (
                                <Button key={houseStyle.id} component={Link} href={`/home-designs/${houseStyle.slug}`} variant={category === houseStyle.slug ? "contained" : "outlined"} size="small">
                                    {houseStyle.title}
                                </Button>
                            ))}
                        </Box> */}
                    </Box>

                    <Grid container spacing={4}>
                        {homeDesigns.map((homeDesign, index) => {
                            const categorySlug = category ? category : propertyTypes.find((propertyType) => propertyType.id === homeDesign.propertyType).slug;

                            return (
                                <Grid
                                    component={Link}
                                    href={`/home-designs/${categorySlug}/${homeDesign.slug}`}
                                    key={index}
                                    size={{ xs: 12, sm: 6, lg: 3 }}
                                >
                                    <Card sx={{ height: "100%" }}>
                                        <Box width="100%" height="180px" position="relative">
                                            <Image
                                                src={homeDesign.images[0]}
                                                alt={`${homeDesign.title} โดย Mepatcs`}
                                                fill
                                                sizes={gridToSizes({ xs: 12, sm: 6, lg: 3 }, 1400)}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Box>
                                        <CardContent>
                                            <Typography
                                                variant="h4"
                                                fontSize="18px"
                                                fontWeight="600"
                                                gutterBottom
                                                sx={{
                                                    display: "-webkit-box",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 1,
                                                }}
                                            >
                                                {homeDesign.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{
                                                    display: "-webkit-box",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 2,
                                                }}
                                            >
                                                {homeDesign.description}
                                            </Typography>
                                            <Box mt={4} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" gap={2}>
                                                <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                    <BedIcon fontSize="small" />
                                                    <Typography variant="body2">{homeDesign.bedroom} ห้องนอน</Typography>
                                                </Box>

                                                <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                    <BathtubIcon fontSize="small" />
                                                    <Typography variant="body2">{homeDesign.bathroom} ห้องน้ำ</Typography>
                                                </Box>

                                                <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                    <KitchenIcon fontSize="small" />
                                                    <Typography variant="body2">{homeDesign.kitchen} ห้องครัว</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default HomeDesigns;
