import Image from "next/image";
import Link from "next/link";
import { gridToSizes } from "@/helpers/helpers";

import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Button
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KitchenIcon from "@mui/icons-material/Kitchen";

import FadeInSection from "@/components/share/FadeInSection";

function HomeDesignSection({ homeDesigns }) {
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
            bgcolor="#e9ecef"
        >
            <Box width="100%" maxWidth="1400px" m="0px auto">
                <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                    แบบบ้าน
                </Typography>
                <Typography variant="subtitle1">
                    แบบบ้านที่ออกแบบจากการใช้งานจริง ตอบโจทย์ฟังก์ชันและงบประมาณ
                </Typography>
            </Box>

            <FadeInSection>
                <Box
                    display={{ xs: "flex", sm: "none" }}
                    overflow="auto"
                    gap={2}
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
                            }}
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
                        </Box>
                    ))}
                </Box>

                <Box display={{ xs: "none", sm: "block" }}>
                    <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                        {homeDesigns.map((homeDesign, index) => (
                            <Grid
                                component={Link}
                                href={`/home-designs/${homeDesign.slug}`}
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
                        ))}
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
