"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
    Box,
    Grid,
    TextField,
    Autocomplete,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Tiptap from "@/components/share/Tiptap";
import FileDropZone from "@/components/share/FileDropZone";
import Loading from "@/components/share/Loading";
import SnackbarAlert from "@/components/share/SnackbarAlert";
import ConfirmDialog from "@/components/share/ConfirmDialog";

function ArticleSetting() {
    const [options, setoptions] = useState({
        houseStyles: [],
        housePlans: []
    });
    const [articles, setArticles] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        content: "",
    });
    const [files, setFiles] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formDialog, setFormDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, message: "", onConfirm: null, });

    useEffect(() => {
        getArticles();

    }, [])

    const getArticles = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/article-setting`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setArticles(result.data.articles);

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const createArticle = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();

            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    const options = {
                        maxSizeMB: 0.25,
                        maxWidthOrHeight: undefined,
                        fileType: "image/webp",
                        useWebWorker: true
                    };
                    return await imageCompression(file, options);
                })
            );

            Object.entries(formData).forEach(([key, value]) => {
                fd.append(key, value);
            });

            compressedFiles.forEach((file) => {
                fd.append(`files`, file);
            });

            const res = await fetch(`/api/admin/article-setting`, {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            handleCloseFormDialog();
            getArticles();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const deleteArticle = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/article-setting/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            getArticles();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const getArticle = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/article-setting/${id}`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setFormData(result.data);

            const filesWithName = result.data.images.map((url) => {
                const parts = url.split("/");
                const name = parts[parts.length - 1];
                const type = "image/" + name.split(".").pop();
                return { name, type, preview: url };
            });
            setFiles(filesWithName);

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const updateArticle = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();

            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    if (file instanceof File) {
                        const options = {
                            maxSizeMB: 0.25,
                            maxWidthOrHeight: undefined,
                            fileType: "image/webp",
                            useWebWorker: true,
                        };
                        return await imageCompression(file, options);

                    } else {
                        return file;
                    }
                })
            );

            Object.entries(formData).forEach(([key, value]) => {
                fd.append(key, value);
            });

            compressedFiles.forEach((file) => {
                if (file instanceof Blob) {
                    fd.append("files", file);

                } else if (file.preview) {
                    fd.append("urls", file.preview);
                }
            });

            const res = await fetch(`/api/admin/article-setting/${id}`, {
                method: "PUT",
                body: fd,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            handleCloseFormDialog();
            getArticles();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    }

    const handleEdit = async (id) => {
        await getArticle(id);
        setEditId(id);
        setFormDialog(true);
    }

    const handleDelete = (id) => {
        setConfirmDialog({
            open: true,
            message: "คุณต้องการลบข้อมูลใช่หรือไม่?",
            onConfirm: () => {
                deleteArticle(id);
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
            setFormData({
                name: "",
                slug: "",
                description: "",
                content: ""
            });
            setFiles([]);
            setEditId(null);
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
                บทความ
            </Typography>
            <Button variant="contained" sx={{ m: "0px auto 0px 0px" }} onClick={() => setFormDialog(true)} >
                เพิ่มบทความ
            </Button>
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
                            <TableCell sx={cellStyle}></TableCell>
                            <TableCell sx={cellStyle}>ชื่อบทความ</TableCell>
                            <TableCell sx={cellStyle}>ชื่อ URL</TableCell>
                            <TableCell sx={cellStyle}>อัพเดท</TableCell>
                            <TableCell sx={cellStyle} align="right">จัดการ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.length > 0 && articles.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {row.images && row.images[0] ?
                                        <Image
                                            src={row.images[0]}
                                            alt={row.name}
                                            width={100}
                                            height={75}
                                            style={{ objectFit: "cover" }}
                                            priority
                                        />
                                        :
                                        "No Image"
                                    }
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.slug}</TableCell>
                                <TableCell>{row.updatedAt}</TableCell>
                                <TableCell sx={cellStyle} align="right">
                                    <IconButton size="small" onClick={() => handleEdit(row.id)}>
                                        <EditIcon />
                                    </IconButton >
                                    <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                fullWidth
                maxWidth="md"
                open={formDialog}
                onClose={handleCloseFormDialog}
                scroll="body"
            >
                <DialogTitle>{editId ? "แก้ไขบทความ" : "เพิ่มบทความ"}</DialogTitle>
                <DialogContent>
                    <Box component="form" pt={4}>
                        <Grid container spacing={4}>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="ชื่อบทความ"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="ชื่อ URL"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="รายละเอียด (Description)"
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Tiptap
                                    value={formData.content}
                                    onChange={(html) => handleChange("content", html)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <FileDropZone
                                    files={files}
                                    setFiles={setFiles}
                                    maxFiles={1}
                                    accept={{ "image/*": [] }}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ pb: 2, px: 3 }}>
                    <Button onClick={handleCloseFormDialog}>ยกเลิก</Button>
                    <Button variant="contained" onClick={editId ? (e) => updateArticle(e, editId) : createArticle}>ตกลง</Button>
                </DialogActions>
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
        </Box>
    );
}

export default ArticleSetting;