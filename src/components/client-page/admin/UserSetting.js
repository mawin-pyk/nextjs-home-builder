"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch
} from "@mui/material";

import Loading from "@/components/share/Loading";
import SnackbarAlert from "@/components/share/SnackbarAlert";

function UserSetting() {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

    useEffect(() => {
        getUsers();

    }, [])

    const getUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/user-setting`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setUsers(result.data.users);

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const handleToggle = async (checked, id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/user-setting/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ enable: checked }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            getUsers();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.error(error);

        } finally {

            setLoading(false);
        }
    }

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: "", message: "" });
    }

    const cellStyle = { whiteSpace: "nowrap" }

    return (
        <Box
            p={4}
            display="flex"
            flexDirection="column"
            gap={4}
            border="1px solid"
            borderColor="divider"
        >
            <Typography
                variant="h1"
                fontSize="20px"
                fontWeight="400"
            >
                ผู้ใช้งาน
            </Typography>
            <TableContainer
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderBottom: "unset"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={cellStyle}>ชื่อผู้ใช้</TableCell>
                            <TableCell sx={cellStyle}>อีเมล</TableCell>
                            <TableCell sx={cellStyle}>บทบาท</TableCell>
                            <TableCell sx={cellStyle} align="right">เปิดการใช้งาน</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 && users.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell sx={cellStyle} align="right">
                                    <Switch
                                        checked={row.enable}
                                        onChange={(e) => handleToggle(e.target.checked, row.id)}
                                        disabled={loading}
                                        slotProps={{
                                            input: { "aria-label": "toggle switch" },
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <SnackbarAlert
                open={alert.open}
                onClose={handleCloseAlert}
                severity={alert.severity}
                message={alert.message}
            />
            <Loading open={loading} />
        </Box>
    );
}

export default UserSetting;