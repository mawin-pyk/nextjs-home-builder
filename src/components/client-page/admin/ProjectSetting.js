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

import FileDropZone from "@/components/share/FileDropZone";
import Loading from "@/components/share/Loading";
import SnackbarAlert from "@/components/share/SnackbarAlert";
import ConfirmDialog from "@/components/share/ConfirmDialog";

function ProjectSetting() {
    const [options, setoptions] = useState({
        houseStyles: [],
        housePlans: []
    });
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        houseStyle: "",
        housePlan: "",
        description: "",
        detail: "",
        area: "",
        bedroom: "",
        bathroom: "",
        parking: "",
    });
    const [files, setFiles] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formDialog, setFormDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, message: "", onConfirm: null, });

    useEffect(() => {
        getProjects();

    }, [])

    const getProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/project-setting`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setProjects(result.data.projects);

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const createProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                fd.append(key, value);
            });

            files.forEach((file) => {
                fd.append(`files`, file);
            });

            const res = await fetch(`/api/admin/project-setting`, {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            handleCloseFormDialog();
            getProjects();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const deleteProject = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/project-setting/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            getProjects();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const getProject = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/project-setting/${id}`);

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

    const updateProject = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fd = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                fd.append(key, value);
            });

            files.forEach((file) => {
                if (file instanceof File) {
                    fd.append("files", file);

                } else if (file.preview) {
                    fd.append("urls", file.preview);
                }
            });

            const res = await fetch(`/api/admin/project-setting/${id}`, {
                method: "PUT",
                body: fd,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            handleCloseFormDialog();
            getProjects();
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
        await getProject(id);
        setEditId(id);
        setFormDialog(true);
    }

    const handleDelete = (id) => {
        setConfirmDialog({
            open: true,
            message: "คุณต้องการลบข้อมูลใช่หรือไม่?",
            onConfirm: () => {
                deleteProject(id);
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
                houseStyle: "",
                housePlan: "",
                description: "",
                detail: "",
                area: "",
                bedroom: "",
                bathroom: "",
                parking: "",
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
                ผลงาน
            </Typography>
            <Button variant="contained" sx={{ m: "0px auto 0px 0px" }} onClick={() => setFormDialog(true)} >
                เพิ่มผลงาน
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
                            <TableCell sx={cellStyle}>ชื่อผลงาน</TableCell>
                            <TableCell sx={cellStyle}>ชื่อ URL</TableCell>
                            <TableCell sx={cellStyle}>สไตล์</TableCell>
                            <TableCell sx={cellStyle}>แบบบ้าน</TableCell>
                            <TableCell sx={cellStyle}>พื้นที่ใช้สอย</TableCell>
                            <TableCell sx={cellStyle}>จำนวนห้องนอน</TableCell>
                            <TableCell sx={cellStyle}>จำนวนห้องน้ำน</TableCell>
                            <TableCell sx={cellStyle}>จำนวนที่จอดรถ</TableCell>
                            <TableCell sx={cellStyle} align="right">จัดการ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.length > 0 && projects.map((row, index) => (
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
                                <TableCell>{row.houseStyle}</TableCell>
                                <TableCell>{row.housePlan}</TableCell>
                                <TableCell>{row.area}</TableCell>
                                <TableCell>{row.bedroom}</TableCell>
                                <TableCell>{row.bathroom}</TableCell>
                                <TableCell>{row.parking}</TableCell>
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
                <DialogTitle>{editId ? "แก้ไขผลงาน" : "เพิ่มผลงาน"}</DialogTitle>
                <DialogContent>
                    <Box component="form" pt={4}>
                        <Grid container spacing={4}>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="ชื่อผลงาน"
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

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    value={formData.houseStyle}
                                    onChange={(event, newValue) => handleChange("houseStyle", newValue)}
                                    renderInput={(params) => <TextField {...params} label="สไตล์" />}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    options={[]}
                                    value={formData.housePlan}
                                    onChange={(event, newValue) => handleChange("housePlan", newValue)}
                                    renderInput={(params) => <TextField {...params} label="แบบบ้าน" />}
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
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="รายละเอียดเพิ่มเติม (Detail)"
                                    name="detail"
                                    multiline
                                    rows={4}
                                    value={formData.detail}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="พื้นที่ใช้สอย (ตร.ม.)"
                                    name="area"
                                    value={formData.area}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนห้องนอน"
                                    name="bedroom"
                                    value={formData.bedroom}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนห้องน้ำ"
                                    name="bathroom"
                                    value={formData.bathroom}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนที่จอดรถ"
                                    name="parking"
                                    value={formData.parking}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <FileDropZone
                                    files={files}
                                    setFiles={setFiles}
                                    maxFiles={10}
                                    accept={{ "image/*": [] }}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ pb: 2, px: 3 }}>
                    <Button onClick={handleCloseFormDialog}>ยกเลิก</Button>
                    <Button variant="contained" onClick={editId ? (e) => updateProject(e, editId) : createProject}>ตกลง</Button>
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

export default ProjectSetting;