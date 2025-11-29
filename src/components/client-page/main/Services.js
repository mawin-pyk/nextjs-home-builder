import Image from "next/image";

import {
    Box,
    Grid,
    Typography,
} from "@mui/material";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "บริการของเรา" }
];

function Services() {
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

                    <FadeInSection direction="right">
                        <Box textAlign="center">
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                บริการของเรา
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, error!
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <Box flexGrow={1}>
                        <Grid container spacing={8}>

                            <FadeInSection direction="left">
                                <Grid size={{ xs: 12 }}>
                                    <Box
                                        height="100%"
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        justifyContent="center"
                                        alignItems="center"
                                        gap={4}
                                    >
                                        <Box width={{ xs: "100%", md: "40%" }} height="380px" position="relative">
                                            <Image
                                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                                                alt="service"
                                                fill
                                                sizes={gridToSizes({ xs: 12, md: 5 }, 1400)}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Box>
                                        <Typography variant="body1" sx={{ width: { xs: "100%", md: "60%" } }}>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore rem voluptate quis magni minus! Fuga atque obcaecati, vel neque voluptatibus debitis eveniet id fugit quos eius ea sit numquam et minus accusamus at vero explicabo sunt cupiditate voluptates saepe impedit molestias unde dicta. Sed voluptates vel excepturi, beatae debitis qui impedit nostrum dolores assumenda et maxime amet iusto! Natus provident dolorem a maiores perspiciatis, nisi asperiores aliquid voluptates possimus rem.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </FadeInSection>

                            <FadeInSection direction="right">
                                <Grid size={{ xs: 12 }}>
                                    <Box
                                        height="100%"
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row-reverse" }}
                                        justifyContent="center"
                                        alignItems="center"
                                        gap={4}
                                    >
                                        <Box width={{ xs: "100%", md: "40%" }} height="380px" position="relative">
                                            <Image
                                                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
                                                alt="service"
                                                fill
                                                sizes={gridToSizes({ xs: 12, md: 5 }, 1400)}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Box>
                                        <Typography variant="body1" sx={{ width: { xs: "100%", md: "60%" } }}>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore rem voluptate quis magni minus! Fuga atque obcaecati, vel neque voluptatibus debitis eveniet id fugit quos eius ea sit numquam et minus accusamus at vero explicabo sunt cupiditate voluptates saepe impedit molestias unde dicta. Sed voluptates vel excepturi, beatae debitis qui impedit nostrum dolores assumenda et maxime amet iusto! Natus provident dolorem a maiores perspiciatis, nisi asperiores aliquid voluptates possimus rem.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </FadeInSection>

                            <FadeInSection direction="left">
                                <Grid size={{ xs: 12 }}>
                                    <Box
                                        height="100%"
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        justifyContent="center"
                                        alignItems="center"
                                        gap={4}
                                    >
                                        <Box width={{ xs: "100%", md: "40%" }} height="380px" position="relative">
                                            <Image
                                                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
                                                alt="service"
                                                fill
                                                sizes={gridToSizes({ xs: 12, md: 5 }, 1400)}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Box>
                                        <Typography variant="body1" sx={{ width: { xs: "100%", md: "60%" } }}>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore rem voluptate quis magni minus! Fuga atque obcaecati, vel neque voluptatibus debitis eveniet id fugit quos eius ea sit numquam et minus accusamus at vero explicabo sunt cupiditate voluptates saepe impedit molestias unde dicta. Sed voluptates vel excepturi, beatae debitis qui impedit nostrum dolores assumenda et maxime amet iusto! Natus provident dolorem a maiores perspiciatis, nisi asperiores aliquid voluptates possimus rem.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </FadeInSection>

                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default Services;