import Link from "next/link";

import {
    Box,
    Container,
    Grid,
    Typography,
    Stack,
    Divider,
    IconButton
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            width="100%"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            bgcolor="#f1f3f5"
            boxSizing="border-box"
        >
            <Box
                width="100%"
                maxWidth="1400px"
                m="0px auto"
            >
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h5" color="primary" fontSize="20px" fontWeight="600" gutterBottom>
                            บริษัท เมพัฒน์.ซีเอส จำกัด
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            บ้านคือความฝัน และทุกความฝัน เราอยากช่วยสร้างให้เป็นจริง <br /> ด้วยความอบอุ่น เหมือนคนในบ้านเดียวกัน
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                            เมนู
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="/" color="textPrimary"><Typography variant="span" color="textPrimary">หน้าแรก</Typography></Link>
                            <Link href="/services" color="textPrimary"><Typography variant="span" color="textPrimary">บริการของเรา</Typography></Link>
                            <Link href="/projects" color="textPrimary"><Typography variant="span" color="textPrimary">ผลงานของเรา</Typography></Link>
                            <Link href="/articles" color="textPrimary"><Typography variant="span" color="textPrimary">บทความ</Typography></Link>
                            <Link href="/contact" color="textPrimary"><Typography variant="span" color="textPrimary">ติดต่อเรา</Typography></Link>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                            ติดต่อ
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2">58/1 หมู่5 ตำบลบางรักพัฒนา <br /> อำเภอบางบัวทอง จังหวัดนนทบุรี 11110</Typography>
                            <Typography variant="body2">ติดต่อ: 02-120-6859, 064-649-8717</Typography>
                            <Typography variant="body2">mepatcs.co.th@gmail.com</Typography>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                            ติดตามเรา
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton component="a" href="https://www.facebook.com/MepatCS" target="_blank" rel="me noopener noreferrer" size="small">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton component="a" href="https://www.instagram.com/mepat.cs" target="_blank" rel="me noopener noreferrer" size="small">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton component="a" href="https://www.youtube.com/@mepatcs" target="_blank" rel="me noopener noreferrer" size="small">
                                <YouTubeIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Typography variant="body2" color="textSecondary" textAlign="end">
                    Copyright © {year} Mawin
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;