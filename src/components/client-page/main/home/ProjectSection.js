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

function ProjectSection({ projects }) {
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
                    ผลงานของเรา
                </Typography>
                <Typography variant="subtitle1">
                    ผลงานการก่อสร้างบ้านจริง ที่ลูกค้าไว้วางใจให้เราดูแล
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
                    {projects.map((project, index) => (
                        <Box
                            key={index}
                            component={Link}
                            href={`/projects/${project.slug}`}
                            sx={{
                                flex: "0 0 85%",
                                scrollSnapAlign: "center",
                            }}
                        >
                            <Card sx={{ height: "100%" }}>
                                <Box width="100%" height="180px" position="relative">
                                    <Image
                                        src={project.images[0]}
                                        alt={`${project.title} โดย Mepatcs`}
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
                                        {project.title}
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
                                        {project.description}
                                    </Typography>
                                    <Box mt={4} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" gap={2}>
                                        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                            <BedIcon fontSize="small" />
                                            <Typography variant="body2">{project.bedroom} ห้องนอน</Typography>
                                        </Box>

                                        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                            <BathtubIcon fontSize="small" />
                                            <Typography variant="body2">{project.bathroom} ห้องน้ำ</Typography>
                                        </Box>

                                        <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                            <KitchenIcon fontSize="small" />
                                            <Typography variant="body2">{project.kitchen} ห้องครัว</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

                <Box display={{ xs: "none", sm: "block" }}>
                    <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                        {projects.map((project, index) => (
                            <Grid
                                component={Link}
                                href={`/projects/${project.slug}`}
                                key={index}
                                size={{ xs: 12, sm: 6, lg: 3 }}
                            >
                                <Card sx={{ height: "100%" }}>
                                    <Box width="100%" height="180px" position="relative">
                                        <Image
                                            src={project.images[0]}
                                            alt={`${project.title} โดย Mepatcs`}
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
                                            {project.title}
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
                                            {project.description}
                                        </Typography>
                                        <Box mt={4} display="flex" flexWrap="wrap" justifyContent="flex-start" alignItems="center" gap={2}>
                                            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                <BedIcon fontSize="small" />
                                                <Typography variant="body2">{project.bedroom} ห้องนอน</Typography>
                                            </Box>

                                            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                <BathtubIcon fontSize="small" />
                                                <Typography variant="body2">{project.bathroom} ห้องน้ำ</Typography>
                                            </Box>

                                            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={0.5}>
                                                <KitchenIcon fontSize="small" />
                                                <Typography variant="body2">{project.kitchen} ห้องครัว</Typography>
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
                <Button component={Link} href="/projects" variant="contained" size="large">ดูผลงานของเราทั้งหมด</Button>
            </Box>

        </Box>
    );
}

export default ProjectSection;
