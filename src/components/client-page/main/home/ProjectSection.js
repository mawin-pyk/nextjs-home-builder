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

function ProjectSection({ projects }) {
    return (
        <Box
            component="section"
            width="100%"
            minHeight="60vh"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            bgcolor="#f1f3f5"
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            gap={4}
        >
            <Box width="100%" maxWidth="1400px" m="0px auto">
                <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                    ผลงานของเรา
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    รวมผลงานการออกแบบและก่อสร้างบ้านจากลูกค้าจริง
                </Typography>
            </Box>
            <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                {projects.map((project, index) => (
                    <Grid
                        component={Link}
                        href={`/projects/${project.id}`}
                        key={index}
                        size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}
                    >
                        <Card sx={{ height: "100%" }}>
                            <Box width="100%" height="180px" position="relative">
                                <Image
                                    src={project.images[0]}
                                    alt={`${project.title} โดย Mepatcs`}
                                    fill
                                    sizes={gridToSizes({ xs: 12, sm: 6, md: 3, lg: 2.4 }, 1400)}
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box width="100%" maxWidth="1400px" m="0px auto" display="flex" justifyContent="flex-end" alignItems="center">
                <Button component={Link} href="/projects" variant="contained" size="large">ดูผลงานของเราทั้งหมด</Button>
            </Box>
        </Box>
    );
}

export default ProjectSection;
