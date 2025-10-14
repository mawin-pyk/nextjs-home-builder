"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    Box,
    Typography
} from "@mui/material";

function DesktopMenu({ navLinks }) {
    const pathname = usePathname();

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    }

    return (
        <Box
            component="nav"
            aria-label="เมนูหลัก"
            sx={{ display: { xs: "none", md: "flex" } }}
        >
            <Box
                component="ul"
                sx={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    gap: 4,
                    listStyle: "none"
                }}
            >
                {navLinks.map((item) => (
                    <Box component="li" key={item.label}>
                        <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                            <Typography component="span" sx={{ color: isActive(item.href) ? "primary.main" : "text.primary" }}>
                                {item.label}
                            </Typography>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default DesktopMenu