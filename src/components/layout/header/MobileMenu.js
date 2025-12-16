"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    Box,
    Toolbar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function MobileMenu({ navLinks }) {
    const [mobileNavigation, setMobileNavigation] = useState(false);

    const pathname = usePathname();

    const handleDrawerToggle = () => {
        setMobileNavigation((prev) => !prev);
    }

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    }

    return (
        <>
            <IconButton
                aria-label="เปิดเมนูมือถือ"
                edge="end"
                sx={{ display: { md: "none" } }}
                onClick={handleDrawerToggle}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="right"
                open={mobileNavigation}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
                }}
            >
                <Box
                    component="nav"
                    aria-label="เมนูมือถือ"
                // onClick={handleDrawerToggle}
                >
                    <List sx={{ p: "unset" }}>
                        <ListItem sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <IconButton onClick={handleDrawerToggle}>
                                <CloseIcon />
                            </IconButton>
                        </ListItem>
                        {navLinks.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={item.href}
                                    aria-current={isActive(item.href) ? "page" : undefined}
                                    sx={{
                                        color: isActive(item.href) ? "#ffffff" : "text.primary",
                                        backgroundColor: isActive(item.href) ? "primary.main" : "transparent",
                                        "&:hover": { backgroundColor: isActive(item.href) ? "primary.main" : "action.hover" }
                                    }}
                                >
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Toolbar />
            </Drawer >
        </>
    );
}

export default MobileMenu;