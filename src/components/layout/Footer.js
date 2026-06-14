import Link from "next/link";
import Image from "next/image";

import {
    Box,
    Grid,
    Typography,
    Divider,
    IconButton
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const FOOTER_BG = "#1a1822";
const PURPLE_LIGHT = "#b197fc";

const menuLinks = [
    { label: "หน้าแรก", href: "/" },
    { label: "บริการของเรา", href: "/services" },
    // { label: "ผลงานของเรา", href: "/projects" },
    { label: "แบบบ้าน", href: "/home-designs" },
    { label: "บทความ", href: "/articles" },
    { label: "ติดต่อเรา", href: "/contact" },
];

const socials = [
    { icon: <FacebookIcon />, href: "https://www.facebook.com/MepatCS", label: "Facebook" },
    { icon: <InstagramIcon />, href: "https://www.instagram.com/mepat.cs", label: "Instagram" },
    { icon: <YouTubeIcon />, href: "https://www.youtube.com/@mepatcs", label: "YouTube" },
];

const linkSx = {
    color: "rgba(255, 255, 255, 0.72)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": { color: PURPLE_LIGHT },
};

function Footer() {
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            width="100%"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
            bgcolor={FOOTER_BG}
            color="rgba(255, 255, 255, 0.6)"
        >
            <Box width="100%" maxWidth="1400px" m="0px auto">
                <Grid container spacing={{ xs: 5, md: 4 }}>
                    {/* แบรนด์ */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                            <Image
                                src="/logo.webp"
                                width={44}
                                height={44}
                                style={{ borderRadius: "50%" }}
                                alt="Mepatcs logo"
                            />
                            <Typography variant="h5" fontSize="20px" fontWeight="600" sx={{ color: PURPLE_LIGHT }}>
                                บริษัท เมพัฒน์.ซีเอส จำกัด
                            </Typography>
                        </Box>
                        <Box width="48px" height="3px" bgcolor="primary.main" mb={2.5} />
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", maxWidth: "420px", lineHeight: 1.8 }}>
                            บ้านคือความฝัน และทุกความฝัน เราอยากช่วยสร้างให้เป็นจริง ด้วยความอบอุ่น เหมือนคนในบ้านเดียวกัน
                        </Typography>

                        <Box display="flex" alignItems="center" gap={1} mt={3}>
                            {socials.map((social, index) => (
                                <IconButton
                                    key={index}
                                    component="a"
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="me noopener noreferrer"
                                    size="small"
                                    sx={{
                                        color: "rgba(255, 255, 255, 0.75)",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                                        "&:hover": {
                                            bgcolor: "primary.main",
                                            color: "#ffffff",
                                            borderColor: "primary.main",
                                        },
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* เมนู */}
                    <Grid size={{ xs: 6, md: 3 }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ color: "#ffffff" }}>
                            เมนู
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1.25}>
                            {menuLinks.map((item, index) => (
                                <Typography
                                    key={index}
                                    component={Link}
                                    href={item.href}
                                    variant="body2"
                                    sx={linkSx}
                                >
                                    {item.label}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>

                    {/* ติดต่อ */}
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ color: "#ffffff" }}>
                            ติดต่อ
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1.5}>
                            <Box display="flex" alignItems="flex-start" gap={1.25}>
                                <LocationOnOutlinedIcon fontSize="small" sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }} />
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                                    58/1 หมู่5 ตำบลบางรักพัฒนา อำเภอบางบัวทอง จังหวัดนนทบุรี 11110
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="flex-start" gap={1.25}>
                                <CallOutlinedIcon fontSize="small" sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }} />
                                <Box display="flex" flexWrap="wrap" columnGap={1}>
                                    <Typography component="a" href="tel:021206859" variant="body2" sx={linkSx}>
                                        02-120-6859
                                    </Typography>
                                    <Typography component="span" variant="body2" sx={{ color: "rgba(255, 255, 255, 0.3)" }}>
                                        |
                                    </Typography>
                                    <Typography component="a" href="tel:0646498717" variant="body2" sx={linkSx}>
                                        064-649-8717
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="flex-start" gap={1.25}>
                                <EmailOutlinedIcon fontSize="small" sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }} />
                                <Typography component="a" href="mailto:mepatcs.co.th@gmail.com" variant="body2" sx={linkSx}>
                                    mepatcs.co.th@gmail.com
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.12)" }} />

                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.45)", textAlign: { xs: "center", sm: "end" } }}>
                    Copyright © {year} Mawin
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;