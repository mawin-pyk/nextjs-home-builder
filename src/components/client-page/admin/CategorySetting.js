"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    Box,
    Paper,
    TextField,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "@/components/share/Loading";
import SnackbarAlert from "@/components/share/SnackbarAlert";
import ConfirmDialog from "@/components/share/ConfirmDialog";

import { DataGrid } from "@mui/x-data-grid";

function CategorySetting({ heading, collectionName }) {
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formDialog, setFormDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, message: "", onConfirm: null, });

    const { handleSubmit, register, control, watch, setValue, formState: { errors }, setError, reset } = useForm({
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        getCategories();

        // eslint-disable-next-line
    }, [])

    const getCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/category-setting?collection=${collectionName}`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setCategories(result.data.categories);

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const createCategory = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/category-setting?collection=${collectionName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();

            handleCloseFormDialog();
            getCategories();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/category-setting/${id}?collection=${collectionName}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();

            getCategories();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const getCategory = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/category-setting/${id}?collection=${collectionName}`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setValue("name", result.data.name);

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const updateCategory = async (data, id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/category-setting/${id}?collection=${collectionName}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();

            handleCloseFormDialog();
            getCategories();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const handleEdit = async (id) => {
        await getCategory(id);
        setEditId(id);
        setFormDialog(true);
    }

    const handleDelete = (id) => {
        setConfirmDialog({
            open: true,
            message: "คุณต้องการลบข้อมูลใช่หรือไม่?",
            onConfirm: () => {
                deleteCategory(id);
                handleCloseConfirmDialog();
            },
        });
    }

    const handleCloseConfirmDialog = () => {
        setConfirmDialog({ open: false, message: "", onConfirm: null });
    }

    const handleCloseFormDialog = (e, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setFormDialog(false);
            reset();
            setEditId(null);
        }
    }

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: "", message: "" });
    }

    const columns = [
        {
            field: "name",
            headerName: heading,
            flex: 1
        },
        {
            field: "actions",
            headerName: "จัดการ",
            sortable: false,
            renderCell: ({ row }) => (
                <>
                    <IconButton onClick={() => handleEdit(row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    return (
        <Paper
            sx={{
                maxWidth: "sm",
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 4
            }}
        >
            <Button variant="contained" sx={{ m: "0px auto 0px 0px" }} onClick={() => setFormDialog(true)} >
                เพิ่ม{heading}
            </Button>
            <DataGrid
                columns={columns}
                rows={categories}
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
                    '& .MuiDataGrid-columnHeader': {
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
            <Dialog
                fullWidth
                maxWidth="xs"
                open={formDialog}
                onClose={handleCloseFormDialog}
                scroll="body"
            >
                <DialogTitle>{editId ? `แก้ไข${heading}` : `เพิ่ม${heading}`}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit((data) => {
                            if (editId) {
                                updateCategory(data, editId);

                            } else {
                                createCategory(data);
                            }
                        })}
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        mt={2}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            label={`ชื่อ${heading}`}
                            {...register("name", {
                                required: `กรุณากรอกชื่อ${heading}`,
                                minLength: { value: 2, message: "ต้องมีความยาวอย่างน้อย 2 ตัวอักษร" },
                                maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                            <Button onClick={handleCloseFormDialog}>ยกเลิก</Button>
                            <Button variant="contained" type="submit">{editId ? "บันทึก" : "เพิ่ม"}</Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
            <ConfirmDialog
                open={confirmDialog.open}
                onClose={handleCloseConfirmDialog}
                onConfirm={confirmDialog.onConfirm}
                message={confirmDialog.message}
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

export default CategorySetting;