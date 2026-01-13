"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

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

    const columns = [
        {
            field: "username",
            headerName: "ชื่อผู้ใช้",
            flex: 1
        },
        {
            field: "email",
            headerName: "อีเมล",
            flex: 1
        },
        {
            field: "role",
            headerName: "บทบาท",
            flex: 1
        },
        {
            field: "actions",
            headerName: "เปิดการใช้งาน",
            sortable: false,
            renderCell: ({ row }) => (
                <Switch
                    checked={row.enable}
                    onChange={(e) => handleToggle(e.target.checked, row.id)}
                    disabled={loading}
                    slotProps={{
                        input: { "aria-label": "toggle switch" },
                    }}
                />
            )
        },
    ];

    return (
        <Paper
            sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 4
            }}
        >
            <Typography
                variant="h1"
                fontSize="20px"
                fontWeight="400"
            >
                ผู้ใช้งาน
            </Typography>
            <DataGrid
                columns={columns}
                rows={users}
                sortingOrder={["asc", "desc"]}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                autoHeight
                // rowHeight={128}
                disableRowSelectionOnClick
                // checkboxSelection
                // onRowClick={(params) => console.log("Row clicked:", params.row)}
                sx={{
                    "& .MuiDataGrid-columnHeader": {
                        p: 1,
                        display: "flex",
                        alignItems: "center"
                    },
                    "& .MuiDataGrid-cell": {
                        p: 1,
                        display: "flex",
                        alignItems: "center"
                    }
                }}
            />
            <SnackbarAlert
                open={alert.open}
                onClose={handleCloseAlert}
                severity={alert.severity}
                message={alert.message}
            />
            <Loading open={loading} />
        </Paper>
    );
}

export default UserSetting;