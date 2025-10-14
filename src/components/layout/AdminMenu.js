"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

function AdminMenu({ children, navLinks }) {
    const [mounted, setMounted] = useState(false);
    const [mobileNavigation, setMobileNavigation] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDrawerToggle = () => {
        setMobileNavigation((prev) => !prev);
    }

    const isActive = (href) => {
        return mounted && pathname === href;
    }

    const drawerContent = (
        <Box>
            <List>
                <ListItem sx={{ justifyContent: "center" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <SettingsIcon sx={{ color: "primary.main" }} />
                        <ListItemText primary="จัดการข้อมูล" />
                    </Stack>
                </ListItem>
                {navLinks.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            sx={{
                                color: isActive(item.href) ? "primary.main" : "text.primary",
                                backgroundColor: isActive(item.href) ? "rgba(0, 0, 0, 0.1)" : "transparent",
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box minHeight="100vh" display="flex">
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: 240,
                        height: "calc(100vh - 64px)",
                        mt: "64px",
                        boxSizing: "border-box"
                    }
                }}
            >
                {drawerContent}
            </Drawer>

            <Drawer
                anchor="left"
                open={mobileNavigation}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box
                width="100%"
                py={8}
                px={{ xs: 2, sm: 3 }}
                pl={{ md: "240px" }}
                pr={{ md: 3 }}
                boxSizing="border-box"
            >
                <IconButton edge="start" sx={{ display: { md: "none" } }} onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
                <Box
                    pt={3}
                    pl={{ md: 3 }}
                    boxSizing="border-box"
                >
                    {children}
                </Box>
            </Box>

        </Box>
    );
}

export default AdminMenu;
