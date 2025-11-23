"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import imageCompression from "browser-image-compression";

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
    Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

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
        title: "",
        slug: "",
        description: "",
        keywords: [],
        houseStyle: "",
        housePlan: "",
        detail: "",
        area: "",
        space: "",
        bedroom: "",
        bathroom: "",
        livingroom: "",
        kitchen: "",
        parking: "",
    });
    const [keyword, setKeyword] = useState("");
    const [files, setFiles] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formDialog, setFormDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, message: "", onConfirm: null, });

    useEffect(() => {
        getContext();
        getProjects();

    }, []);

    const getContext = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/context`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setoptions(result.data.options);

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

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
                if (key === "keywords") {
                    value.forEach((keyword) => fd.append("keywords", keyword));

                } else {
                    fd.append(key, value);
                }
            });

            compressedFiles.forEach((file) => {
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
                if (key === "keywords") {
                    value.forEach((keyword) => fd.append("keywords", keyword));

                } else {
                    fd.append(key, value);
                }
            });

            compressedFiles.forEach((file) => {
                if (file instanceof Blob) {
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

    const handleAddKeyword = () => {
        if (keyword.trim() !== "" && !formData.keywords.includes(keyword.trim())) {
            setFormData({
                ...formData,
                keywords: [...formData.keywords, keyword.trim()]
            });
            setKeyword("");
        }
    }

    const handleRemoveKeyword = (index) => {
        setFormData({
            ...formData,
            keywords: formData.keywords.filter((_, i) => i !== index)
        });
    }

    const handleCloseConfirmDialog = () => {
        setConfirmDialog({ open: false, message: "", onConfirm: null });
    }

    const handleCloseFormDialog = (e, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setFormDialog(false);
            setFormData({
                title: "",
                slug: "",
                description: "",
                keywords: [],
                houseStyle: "",
                housePlan: "",
                detail: "",
                area: "",
                space: "",
                bedroom: "",
                bathroom: "",
                livingroom: "",
                kitchen: "",
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
                                            alt={row.title}
                                            width={100}
                                            height={75}
                                            style={{ objectFit: "cover" }}
                                            priority
                                        />
                                        :
                                        "No Image"
                                    }
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.slug}</TableCell>
                                <TableCell>{options.houseStyles.find((option) => option.id === row.houseStyle)?.name}</TableCell>
                                <TableCell>{options.housePlans.find((option) => option.id === row.housePlan)?.name}</TableCell>
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
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="URL"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="คำอธิบาย"
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                                    <TextField
                                        size="small"
                                        label="Keyword"
                                        name="keyword"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <Button variant="contained" onClick={handleAddKeyword}>เพิ่ม</Button>
                                </Box>
                                <Box mt={formData.keywords.length > 0 ? 2 : 0} display="flex" flexWrap="wrap" gap={2}>
                                    {formData.keywords.map((keyword, index) => (
                                        <Box
                                            key={index}
                                            py={0.5}
                                            px={1}
                                            position="relative"
                                            bgcolor="divider"
                                            borderRadius={1}
                                        >
                                            {keyword}
                                            <IconButton
                                                size="small"
                                                sx={{ position: "absolute", top: -15, right: -15 }}
                                                onClick={() => handleRemoveKeyword(index)}
                                            >
                                                <CancelIcon color="error" fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Divider sx={{ my: 2 }} />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    options={options.houseStyles}
                                    getOptionLabel={(option) => option.name}
                                    value={options.houseStyles.find((option) => option.id === formData.houseStyle) || null}
                                    onChange={(event, newValue) => handleChange("houseStyle", newValue ? newValue.id : null)}
                                    renderInput={(params) => <TextField {...params} label="สไตล์" />}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Autocomplete
                                    fullWidth
                                    size="small"
                                    options={options.housePlans}
                                    getOptionLabel={(option) => option.name}
                                    value={options.housePlans.find((option) => option.id === formData.housePlan) || null}
                                    onChange={(event, newValue) => handleChange("housePlan", newValue ? newValue.id : null)}
                                    renderInput={(params) => <TextField {...params} label="แบบบ้าน" />}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="รายละเอียด"
                                    name="detail"
                                    multiline
                                    rows={4}
                                    value={formData.detail}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="พื้นที่ใช้สอย (ตร.ม.)"
                                    name="area"
                                    value={formData.area}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="กว้าง x ลึก (ม.)"
                                    name="space"
                                    value={formData.space}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                                    label="จำนวนห้องนั่งเล่น"
                                    name="livingroom"
                                    value={formData.livingroom}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนห้องครัว"
                                    name="kitchen"
                                    value={formData.kitchen}
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