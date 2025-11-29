"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
    const [keyword, setKeyword] = useState("");
    const [editId, setEditId] = useState(null);

    const [formDialog, setFormDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const [confirmDialog, setConfirmDialog] = useState({ open: false, message: "", onConfirm: null, });

    const { handleSubmit, register, control, watch, setValue, formState: { errors }, setError, reset } = useForm({
        defaultValues: {
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
            files: [],
        },
    });

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

    const createProject = async (data) => {
        setLoading(true);
        try {
            const fd = new FormData();

            const compressedFiles = await Promise.all(
                data.files.map(async (file) => {
                    const options = {
                        maxSizeMB: 0.25,
                        maxWidthOrHeight: undefined,
                        fileType: "image/webp",
                        useWebWorker: true
                    };
                    return await imageCompression(file, options);
                })
            );

            Object.entries(data).forEach(([key, value]) => {
                if (key !== "keywords" && key !== "files") {
                    fd.append(key, value);
                }
            });

            data.keywords.forEach((keyword) => fd.append("keywords", keyword));

            compressedFiles.forEach((file) => fd.append("files", file));

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
            const project = result.data;

            const filesWithPreview = (project.images || []).map((url) => {
                const parts = url.split("/");
                const name = parts[parts.length - 1];
                const type = "image/" + name.split(".").pop();
                return { name, type, preview: url };
            });

            reset({
                title: project.title,
                slug: project.slug,
                description: project.description,
                keywords: project.keywords,
                houseStyle: project.houseStyle,
                housePlan: project.housePlan,
                detail: project.detail,
                area: project.area,
                space: project.space,
                bedroom: project.bedroom,
                bathroom: project.bathroom,
                livingroom: project.livingroom,
                kitchen: project.kitchen,
                parking: project.parking,
                files: filesWithPreview,
            });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const updateProject = async (data, id) => {
        setLoading(true);
        try {
            const fd = new FormData();

            const compressedFiles = await Promise.all(
                data.files.map(async (file) => {
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

            Object.entries(data).forEach(([key, value]) => {
                if (key !== "keywords" && key !== "files") {
                    fd.append(key, value);
                }
            });

            data.keywords.forEach((keyword) => fd.append("keywords", keyword));

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
            reset();
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
                    <Box
                        component="form"
                        onSubmit={handleSubmit((data) => {
                            if (editId) {
                                updateProject(data, editId);

                            } else {
                                createProject(data);
                            }
                        })}
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        mt={2}
                    >
                        <Grid container spacing={4}>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="ชื่อผลงาน"
                                    {...register("title", {
                                        required: "กรุณากรอกชื่อผลงาน",
                                        minLength: { value: 2, message: "ต้องมีความยาวอย่างน้อย 2 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="URL"
                                    {...register("slug", {
                                        required: "กรุณากรอกชื่อ URL",
                                        pattern: { value: /^[\u0E00-\u0E7Fa-z0-9-]+$/, message: "ใช้ได้เฉพาะภาษาไทย, อังกฤษ, ตัวเลข และขีดกลาง (-)" },
                                        minLength: { value: 2, message: "ต้องมีความยาวอย่างน้อย 2 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.slug}
                                    helperText={errors.slug?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="คำอธิบาย"
                                    {...register("description", {
                                        required: "กรุณากรอกคำอธิบาย",
                                        minLength: { value: 2, message: "ต้องมีความยาวอย่างน้อย 2 ตัวอักษร" },
                                        maxLength: { value: 160, message: "ต้องมีความยาวไม่เกิน 160 ตัวอักษร" },
                                    })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Controller
                                    name="keywords"
                                    control={control}
                                    defaultValue={[]}
                                    rules={{ validate: (value) => (value.length > 0 ? true : "กรุณาเพิ่มอย่างน้อย 1 Keyword") }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                                                <TextField
                                                    size="small"
                                                    label="Keyword"
                                                    value={keyword}
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        if (!keyword.trim()) return;
                                                        if (field.value.includes(keyword.trim())) return;
                                                        field.onChange([...field.value, keyword.trim()]);
                                                        setKeyword("");
                                                    }}
                                                >
                                                    เพิ่ม
                                                </Button>
                                            </Box>

                                            <Box mt={field.value.length > 0 ? 2 : 0} display="flex" flexWrap="wrap" gap={2}>
                                                {field.value.map((kw, index) => (
                                                    <Box
                                                        key={index}
                                                        py={0.5}
                                                        px={1}
                                                        position="relative"
                                                        bgcolor="divider"
                                                        borderRadius={1}
                                                    >
                                                        {kw}
                                                        <IconButton
                                                            size="small"
                                                            sx={{ position: "absolute", top: -15, right: -15 }}
                                                            onClick={() => {
                                                                const newKeywords = field.value.filter((_, i) => i !== index);
                                                                field.onChange(newKeywords);
                                                            }}
                                                        >
                                                            <CancelIcon color="error" fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                ))}
                                            </Box>

                                            {fieldState.error && (
                                                <Typography color="error" fontSize={12} mt={0.5} mx="14px">
                                                    {fieldState.error.message}
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Divider sx={{ my: 2 }} />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="houseStyle"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "กรุณาเลือกสไตล์" }}
                                    render={({ field }) => {
                                        const selectedOption = options.houseStyles.find(option => option.id === field.value) || null;
                                        return (
                                            <Autocomplete
                                                fullWidth
                                                size="small"
                                                options={options.houseStyles}
                                                getOptionLabel={(option) => option.name}
                                                value={selectedOption}
                                                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : "")}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="สไตล์"
                                                        error={!!errors.houseStyle}
                                                        helperText={errors.houseStyle?.message}
                                                    />
                                                )}
                                            />
                                        );
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Controller
                                    name="housePlan"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "กรุณาเลือกสไตล์" }}
                                    render={({ field }) => {
                                        const selectedOption = options.housePlans.find(option => option.id === field.value) || null;
                                        return (
                                            <Autocomplete
                                                fullWidth
                                                size="small"
                                                options={options.housePlans}
                                                getOptionLabel={(option) => option.name}
                                                value={selectedOption}
                                                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : "")}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="แบบบ้าน"
                                                        error={!!errors.housePlan}
                                                        helperText={errors.housePlan?.message}
                                                    />
                                                )}
                                            />
                                        );
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="รายละเอียด"
                                    multiline
                                    rows={4}
                                    {...register("detail", {
                                        required: "กรุณากรอกรายละเอียด",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 1000, message: "ต้องมีความยาวไม่เกิน 1000 ตัวอักษร" },
                                    })}
                                    error={!!errors.detail}
                                    helperText={errors.detail?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="พื้นที่ใช้สอย (ตร.ม.)"
                                    {...register("area", {
                                        required: "กรุณากรอกพื้นที่ใช้สอย (ตร.ม.)",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.area}
                                    helperText={errors.area?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="กว้าง x ลึก (ม.)"
                                    {...register("space", {
                                        required: "กรุณากรอกกว้าง x ลึก (ม.)",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.space}
                                    helperText={errors.space?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนห้องนอน"
                                    {...register("bedroom", {
                                        required: "กรุณากรอกจำนวนห้องนอน",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.bedroom}
                                    helperText={errors.bedroom?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนห้องน้ำ"
                                    {...register("bathroom", {
                                        required: "กรุณากรอกจำนวนห้องน้ำ",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.bathroom}
                                    helperText={errors.bathroom?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนห้องนั่งเล่น"
                                    {...register("livingroom", {
                                        required: "กรุณากรอกจำนวนห้องนั่งเล่น",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.livingroom}
                                    helperText={errors.livingroom?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนห้องครัว"
                                    {...register("kitchen", {
                                        required: "กรุณากรอกจำนวนห้องครัว",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.kitchen}
                                    helperText={errors.kitchen?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="จำนวนที่จอดรถ"
                                    {...register("parking", {
                                        required: "กรุณากรอกจำนวนที่จอดรถ",
                                        minLength: { value: 1, message: "ต้องมีความยาวอย่างน้อย 1 ตัวอักษร" },
                                        maxLength: { value: 60, message: "ต้องมีความยาวไม่เกิน 60 ตัวอักษร" },
                                    })}
                                    error={!!errors.parking}
                                    helperText={errors.parking?.message}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Controller
                                    name="files"
                                    control={control}
                                    defaultValue={[]}
                                    rules={{ validate: (value) => (value.length > 0 ? true : "กรุณาอัปโหลดอย่างน้อย 1 รูปภาพ") }}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <FileDropZone
                                                files={field.value}
                                                setFiles={field.onChange}
                                                maxFiles={10}
                                                accept={{ "image/*": [] }}
                                            />
                                            {fieldState.error && (
                                                <Typography color="error" fontSize={12} mt={0.5} mx="14px" >
                                                    {fieldState.error.message}
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                />
                            </Grid>

                        </Grid>

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
        </Box>
    );
}

export default ProjectSetting;