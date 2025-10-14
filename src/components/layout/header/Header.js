import { db } from "@/lib/firebaseAdmin";
import { verifyToken } from "@/helpers/auth";
import Link from "next/link";
import Image from "next/image";

import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import DesktopMenu from "@/components/layout/header/DesktopMenu";
import MobileMenu from "@/components/layout/header/MobileMenu";
import AccountMenu from "@/components/layout/header/AccountMenu";

const navLinks = [
    { label: "หน้าแรก", href: "/" },
    { label: "บริการของเรา", href: "/services" },
    { label: "ผลงานของเรา", href: "/projects" },
    { label: "บทความ", href: "/articles" },
    { label: "ติดต่อเรา", href: "/contact" },
];

const getUserData = async (id) => {
    try {
        const docSnap = await db.collection("users").doc(id).get();
        if (!docSnap.exists) return null
        const data = docSnap.data();
        return {
            username: data.username,
            role: data.role
        }

    } catch (error) {
        console.error(error);
    }
}

async function Header() {
    let userData = null;

    const userToken = await verifyToken();
    if (userToken) {
        userData = await getUserData(userToken.sub);
    }

    return (
        <AppBar
            component="header"
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "inset 0px -1px 0px 0px #eaeaea",
                backdropFilter: "saturate(180%) blur(5px)"
            }}
        >
            <Toolbar
                sx={{
                    width: "100%",
                    maxWidth: "calc(1400px + 48px)",
                    m: "0px auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                {/* Logo */}
                <Link href="/" aria-label="ไปยังหน้าแรก">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                            color: "text.primary"
                        }}
                    >
                        <Image
                            src="/logo.webp"
                            width={46}
                            height={46}
                            style={{ borderRadius: "50%" }}
                            alt="Mepatcs logo"
                        />
                        <Typography
                            component="span"
                            sx={{ fontSize: "20px", fontWeight: 600 }}
                        >
                            Mepatcs
                        </Typography>
                    </Box>
                </Link>

                <Box display="flex" alignItems="center" gap={4}>

                    {/* Desktop Menu */}
                    <DesktopMenu navLinks={navLinks} />

                    {/* Social Links */}
                    {/* <Box
                        component="aside"
                        aria-label="ลิงก์โซเชียลมีเดีย"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <IconButton
                            component="a"
                            href="https://www.facebook.com/yourpage"
                            aria-label="facebook"
                            target="_blank"
                            rel="me noopener noreferrer"
                            sx={{ color: "#1877F2" }}
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://www.instagram.com/yourpage"
                            aria-label="instagram"
                            target="_blank"
                            rel="me noopener noreferrer"
                            sx={{ color: "#E1306C" }}
                        >
                            <InstagramIcon />
                        </IconButton>
                    </Box> */}

                    <Box display="flex" alignItems="center" gap={1}>
                        {userData && <AccountMenu userData={userData} />}

                        {/* Mobile Menu */}
                        <MobileMenu navLinks={navLinks} />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
