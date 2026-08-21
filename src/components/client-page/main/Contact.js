import {
    Box,
    Typography,
    Grid,
    Stack,
    IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
const PURPLE_FAINT = "rgba(132, 94, 247, 0.03)";
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "ติดต่อเรา" }
];

const linkSx = {
    color: "inherit",
    textDecoration: "none",
    transition: "color 0.3s ease",
    "&:hover": { color: "primary.main" },
};

function ContactCard({ icon, title, children }) {
    return (
        <Box
            height="100%"
            minHeight="200px"
            p={3}
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
            border="1px solid"
            borderColor="divider"
            bgcolor={PURPLE_FAINT}
            textAlign="center"
            sx={{
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                "&:hover": {
                    borderColor: PURPLE_BORDER,
                    boxShadow: PURPLE_SHADOW,
                    transform: "translateY(-4px)",
                },
            }}
        >
            {icon && (
                <Box
                    width="56px"
                    height="56px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor={PURPLE_SOFT}
                    borderRadius="50%"
                    color="primary.main"
                >
                    {icon}
                </Box>
            )}
            <Typography variant="h2" fontSize="20px" fontWeight="600">
                {title}
            </Typography>
            {children}
        </Box>
    );
}

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

                    <FadeInSection>
                        <Box textAlign="center">
                            <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                                CONTACT MEPATCS
                            </Typography>
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                ติดต่อเรา
                            </Typography>
                            <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                            <Typography variant="subtitle1" color="textSecondary" maxWidth="760px" mx="auto">
                                ทีมงานของเราพร้อมให้คำปรึกษา และตอบคำถามทุกเรื่องเกี่ยวกับบริการ
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <ContactCard icon={<LocationOnIcon fontSize="large" />} title="ที่อยู่">
                                        <Typography variant="body2" color="textSecondary">
                                            58/1 หมู่5 ตำบลบางรักพัฒนา <br /> อำเภอบางบัวทอง จังหวัดนนทบุรี 11110
                                        </Typography>
                                    </ContactCard>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <ContactCard icon={<PhoneIcon fontSize="large" />} title="โทรหาเรา">
                                        <Box display="flex" flexDirection="column" gap={0.25}>
                                            <Typography variant="body2" color="textSecondary">
                                                สำนักงานใหญ่:{" "}
                                                <Box component="a" href="tel:021206859" sx={linkSx}>02-120-6859</Box>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                ลูกค้าสัมพันธ์:{" "}
                                                <Box component="a" href="tel:0646498717" sx={linkSx}>064-649-8717</Box>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                ฝ่ายจัดซื้อ:{" "}
                                                <Box component="a" href="tel:0646498717" sx={linkSx}>064-649-8717</Box>
                                            </Typography>
                                        </Box>
                                    </ContactCard>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <ContactCard icon={<EmailIcon fontSize="large" />} title="อีเมล">
                                        <Typography variant="body2" color="textSecondary">
                                            <Box component="a" href="mailto:mepatcs.co.th@gmail.com" sx={linkSx}>
                                                mepatcs.co.th@gmail.com
                                            </Box>
                                        </Typography>
                                    </ContactCard>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <ContactCard title="ติดตามเรา">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            <IconButton
                                                component="a"
                                                href="https://www.facebook.com/MepatCS"
                                                target="_blank"
                                                rel="me noopener noreferrer"
                                                aria-label="Facebook"
                                                sx={{
                                                    color: "primary.main",
                                                    bgcolor: PURPLE_SOFT,
                                                    transition: "transform 0.3s ease, background-color 0.3s ease",
                                                    "&:hover": { bgcolor: PURPLE_BORDER, transform: "translateY(-2px)" },
                                                }}
                                            >
                                                <FacebookIcon />
                                            </IconButton>
                                            <IconButton
                                                component="a"
                                                href="https://www.instagram.com/mepat.cs"
                                                target="_blank"
                                                rel="me noopener noreferrer"
                                                aria-label="Instagram"
                                                sx={{
                                                    color: "primary.main",
                                                    bgcolor: PURPLE_SOFT,
                                                    transition: "transform 0.3s ease, background-color 0.3s ease",
                                                    "&:hover": { bgcolor: PURPLE_BORDER, transform: "translateY(-2px)" },
                                                }}
                                            >
                                                <InstagramIcon />
                                            </IconButton>
                                            <IconButton
                                                component="a"
                                                href="https://www.youtube.com/@mepatcs"
                                                target="_blank"
                                                rel="me noopener noreferrer"
                                                aria-label="YouTube"
                                                sx={{
                                                    color: "primary.main",
                                                    bgcolor: PURPLE_SOFT,
                                                    transition: "transform 0.3s ease, background-color 0.3s ease",
                                                    "&:hover": { bgcolor: PURPLE_BORDER, transform: "translateY(-2px)" },
                                                }}
                                            >
                                                <YouTubeIcon />
                                            </IconButton>
                                        </Stack>
                                    </ContactCard>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                height="100%"
                                boxSizing="border-box"
                                display="flex"
                                flexDirection="column"
                                border="1px solid"
                                borderColor="divider"
                                bgcolor="background.paper"
                                sx={{
                                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        borderColor: PURPLE_BORDER,
                                        boxShadow: PURPLE_SHADOW,
                                    },
                                }}
                            >
                                <Box
                                    px={3}
                                    py={2}
                                    display="flex"
                                    alignItems="center"
                                    gap={1.5}
                                    bgcolor={PURPLE_SOFT}
                                    borderBottom="1px solid"
                                    borderColor={PURPLE_BORDER}
                                    color="primary.main"
                                >
                                    <MapOutlinedIcon />
                                    <Typography variant="h2" fontSize="20px" fontWeight="600" color="text.primary">
                                        แผนที่บริษัท
                                    </Typography>
                                </Box>
                                <Box width="100%" flexGrow={1} minHeight="360px">
                                    <iframe
                                        title="google-map"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, display: "block" }}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.875824992237!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDDCsDMwJzA2LjUiRQ!5e0!3m2!1sth!2sth!4v1634567890123"
                                    ></iframe>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
            <Footer />
        </>
    );
}

export default Contact;
