"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Autocomplete,
    TextField,
    Divider,
} from "@mui/material";

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";

const categories = ["บ้านเดี่ยว", "คอนโด", "รีสอร์ท"];
const floors = ["1 ชั้น", "2 ชั้น", "3 ชั้นขึ้นไป", "สูง"];
const styles = ["โมเดิร์น", "ลอฟท์", "คลาสสิค"];

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "ผลงานของเรา" }
];

function Projects({ projects }) {
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

                    <Box textAlign="center">
                        <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                            ผลงานของเรา
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            รวมผลงานที่เราออกแบบและสร้างด้วยความใส่ใจทุกรายละเอียด ทั้งบ้านเดี่ยว คอนโด และรีสอร์ท
                        </Typography>
                    </Box>

                    <Box
                        p={2}
                        border="1px solid"
                        borderColor="divider"
                    >
                        <Typography variant="h2" fontSize="20px" fontWeight="400" gutterBottom>
                            ค้นหา
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>

                            {/* ประเภท */}
                            <Grid size={{ xs: 12, md: 3.5 }}>
                                <Typography variant="h3" width="80px" fontSize="16px" fontWeight="400" gutterBottom>
                                    ประเภท
                                </Typography>
                                <Autocomplete
                                    multiple
                                    options={categories}
                                    renderInput={(params) => <TextField {...params} size="small" />}
                                />
                            </Grid>

                            {/* จำนวนชั้น */}
                            <Grid size={{ xs: 12, md: 3.5 }}>
                                <Typography variant="h3" width="80px" fontSize="16px" fontWeight="400" gutterBottom>
                                    จำนวนชั้น
                                </Typography>
                                <Autocomplete
                                    multiple
                                    options={floors}
                                    renderInput={(params) => <TextField {...params} size="small" />}
                                />
                            </Grid>

                            {/* สไตล์ */}
                            <Grid size={{ xs: 12, md: 3.5 }}>
                                <Typography variant="h3" width="80px" fontSize="16px" fontWeight="400" gutterBottom>
                                    สไตล์
                                </Typography>
                                <Autocomplete
                                    multiple
                                    options={styles}
                                    renderInput={(params) => <TextField {...params} size="small" />}
                                />
                            </Grid>

                            <Grid
                                size={{ xs: 12, md: 1.5 }}
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-start"
                                alignItems="flex-end"
                            >
                                <Box width="80px" height="25px"></Box>
                                <Button variant="contained" size="large">ค้นหา</Button>
                            </Grid>

                        </Grid>

                    </Box>

                    <Grid container spacing={4}>
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
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default Projects;
