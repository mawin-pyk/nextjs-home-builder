import {
    Box,
    Typography,
    Grid,
    Stack,
    IconButton,
    Paper
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "ติดต่อเรา" }
];

function Contact() {
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
                            ติดต่อเรา
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            หากต้องการข้อมูลเพิ่มเติม หรือต้องการติดต่อเรา กรุณากรอกแบบฟอร์ม
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        height="160px"
                                        p={2}
                                        boxSizing="border-box"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        border="1px solid"
                                        borderColor="divider"
                                        textAlign="center"
                                    >
                                        <LocationOnIcon color="primary" fontSize="large" sx={{ mb: 2 }} />
                                        <Typography variant="h2" fontSize="20px" fontWeight="400" gutterBottom>ที่อยู่</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            123 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        height="160px"
                                        p={2}
                                        boxSizing="border-box"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        border="1px solid"
                                        borderColor="divider"
                                        textAlign="center"
                                    >
                                        <PhoneIcon color="primary" fontSize="large" sx={{ mb: 2 }} />
                                        <Typography variant="h2" fontSize="20px" fontWeight="400" gutterBottom>โทรหาเรา</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            02-123-4567
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        height="160px"
                                        p={2}
                                        boxSizing="border-box"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        border="1px solid"
                                        borderColor="divider"
                                        textAlign="center"
                                    >
                                        <EmailIcon color="primary" fontSize="large" sx={{ mb: 2 }} />
                                        <Typography variant="h2" fontSize="20px" fontWeight="400" gutterBottom>อีเมล</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            hello@example.com
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                        height="160px"
                                        p={2}
                                        boxSizing="border-box"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        border="1px solid"
                                        borderColor="divider"
                                        textAlign="center"
                                    >
                                        <Typography variant="h2" fontSize="20px" fontWeight="400" gutterBottom>ติดตามเรา</Typography>
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            <IconButton href="#" size="small">
                                                <FacebookIcon color="primary" />
                                            </IconButton>
                                            <IconButton href="#" size="small">
                                                <InstagramIcon color="primary" />
                                            </IconButton>
                                            <IconButton href="#" size="small">
                                                <YouTubeIcon color="primary" />
                                            </IconButton>
                                            <IconButton href="#" size="small">
                                                <XIcon color="primary" />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Typography variant="h2" fontSize="20px" fontWeight="400" gutterBottom>
                                    แผนที่บริษัท
                                </Typography>
                                <Box
                                    width="100%"
                                    height="272px"
                                >
                                    <iframe
                                        title="google-map"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.875824992237!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDDCsDMwJzA2LjUiRQ!5e0!3m2!1sth!2sth!4v1634567890123"
                                    ></iframe>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
            <Footer />
        </>
    );
}

export default Contact;