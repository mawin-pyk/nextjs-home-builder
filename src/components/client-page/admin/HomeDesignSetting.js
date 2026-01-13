"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";

import imageCompression from "browser-image-compression";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import {
    Box,
    Paper,
    Grid,
    TextField,
    Autocomplete,
    Button,
    Typography,
    IconButton,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

import { DataGrid } from "@mui/x-data-grid";

import FileDropZone from "@/components/share/FileDropZone";
import Loading from "@/components/share/Loading";
import SnackbarAlert from "@/components/share/SnackbarAlert";
import ConfirmDialog from "@/components/share/ConfirmDialog";
import SortableTableBody from "@/components/share/dnd/SortableTableBody";
import SortableTableRow from "@/components/share/dnd/SortableTableRow";

function HomeDesignSetting() {
    const [options, setoptions] = useState({
        houseStyles: [],
        propertyTypes: []
    });
    const [homeDesigns, setHomeDesigns] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [editId, setEditId] = useState(null);

    const [homeDesignsHighlight, setHomeDesignsHighlight] = useState([]);

    const [formDialog, setFormDialog] = useState(false);
    const [highlightDialog, setHighlightDialog] = useState(false);

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
            propertyType: "",
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
        getHomeDesigns();

    }, []);

    const optionMaps = useMemo(() => {
        return {
            houseStyle: Object.fromEntries(
                options.houseStyles.map((item) => [item.id, item.title])
            ),
            propertyType: Object.fromEntries(
                options.propertyTypes.map((item) => [item.id, item.title])
            ),
        };

    }, [options.houseStyles, options.propertyTypes]);

    const rows = useMemo(() => {
        if (!homeDesigns?.length) return [];

        return homeDesigns.map((row) => ({
            ...row,
            houseStyleName: optionMaps.houseStyle[row.houseStyle] ?? "",
            propertyTypeName: optionMaps.propertyType[row.propertyType] ?? "",
        }));

    }, [homeDesigns, optionMaps]);

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

    const getHomeDesigns = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/home-design-setting`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setHomeDesigns(result.data.homeDesigns);

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const createHomeDesign = async (data) => {
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

            const res = await fetch(`/api/admin/home-design-setting`, {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            handleCloseFormDialog();
            getHomeDesigns();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const deleteHomeDesign = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/home-design-setting/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            getHomeDesigns();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const getHomeDesign = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/home-design-setting/${id}`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            const homeDesign = result.data;

            const filesWithPreview = (homeDesign.images || []).map((url) => {
                const parts = url.split("/");
                const name = parts[parts.length - 1];
                const type = "image/" + name.split(".").pop();
                return { name, type, preview: url };
            });

            reset({
                title: homeDesign.title,
                slug: homeDesign.slug,
                description: homeDesign.description,
                keywords: homeDesign.keywords,
                houseStyle: homeDesign.houseStyle,
                propertyType: homeDesign.propertyType,
                detail: homeDesign.detail,
                area: homeDesign.area,
                space: homeDesign.space,
                bedroom: homeDesign.bedroom,
                bathroom: homeDesign.bathroom,
                livingroom: homeDesign.livingroom,
                kitchen: homeDesign.kitchen,
                parking: homeDesign.parking,
                files: filesWithPreview,
            });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const updateHomeDesign = async (data, id) => {
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

            const res = await fetch(`/api/admin/home-design-setting/${id}`, {
                method: "PUT",
                body: fd,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            handleCloseFormDialog();
            getHomeDesigns();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const updateHomeDesignHighLight = async (checked, id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/home-design-setting/highlight/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ highlight: checked }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            getHomeDesigns();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.error(error);

        } finally {

            setLoading(false);
        }
    }

    const getHomeDesignsHighlight = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/home-design-setting/highlight`);

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            setHomeDesignsHighlight(result.data.homeDesigns);
            setHighlightDialog(true);

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const saveHighlightOrder = async () => {
        setLoading(true);

        const payload = homeDesignsHighlight.map((item, index) => ({
            id: item.id,
            order: index + 1,
        }));

        try {
            const res = await fetch(`/api/admin/home-design-setting/highlight`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ homeDesigns: payload }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            handleCloseHighlightDialog();
            setAlert({ open: true, severity: "success", message: result.message });

        } catch (error) {
            console.error(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const handleEdit = async (id) => {
        await getHomeDesign(id);
        setEditId(id);
        setFormDialog(true);
    }

    const handleDelete = (id) => {
        setConfirmDialog({
            open: true,
            message: "คุณต้องการลบข้อมูลใช่หรือไม่?",
            onConfirm: () => {
                deleteHomeDesign(id);
                handleCloseConfirmDialog();
            },
        });
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setHomeDesignsHighlight((prev) => {
            const oldIndex = prev.findIndex(
                (i) => i.id === active.id
            );
            const newIndex = prev.findIndex(
                (i) => i.id === over.id
            );
            return arrayMove(prev, oldIndex, newIndex);
        });
    }

    const handleCloseConfirmDialog = () => {
        setConfirmDialog({ open: false, message: "", onConfirm: null });
    }

    const handleCloseFormDialog = (e, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setFormDialog(false);
            reset({
                title: "",
                slug: "",
                description: "",
                keywords: [],
                houseStyle: "",
                propertyType: "",
                detail: "",
                area: "",
                space: "",
                bedroom: "",
                bathroom: "",
                livingroom: "",
                kitchen: "",
                parking: "",
                files: [],
            });
            setEditId(null);
        }
    }

    const handleCloseHighlightDialog = (e, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setHighlightDialog(false);
        }
    }

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: "", message: "" });
    }

    const highlightCount = homeDesigns.filter((item) => item.highlight).length;

    const columns = [
        {
            field: "images",
            headerName: "",
            minWidth: 166,
            sortable: false,
            renderCell: ({ row }) => (
                row.images[0] ? (
                    <Box
                        sx={{
                            width: 150,
                            height: 112.25,
                            position: "relative",
                        }}
                    >
                        <Image
                            src={row.images[0]}
                            alt={row.title}
                            fill
                            sizes="150px"
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </Box>
                ) : "No Image"
            ),
        },
        {
            field: "title",
            headerName: "ชื่อแบบบ้าน",
            flex: 1
        },
        {
            field: "slug",
            headerName: "ชื่อ URL",
            flex: 1
        },
        {
            field: "houseStyleName",
            headerName: "สไตล์",
            flex: 1,
        },
        {
            field: "highlight",
            headerName: "ไฮไลท์",
            sortable: false,
            renderCell: ({ row }) => (
                <Switch
                    checked={row.highlight}
                    onChange={(e) => updateHomeDesignHighLight(e.target.checked, row.id)}
                    disabled={loading || (!row.highlight && highlightCount >= 4)}
                    slotProps={{
                        input: { "aria-label": "toggle switch" },
                    }}
                />
            )
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
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 4
            }}
        >
            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                <Button variant="contained" onClick={() => setFormDialog(true)} >
                    เพิ่มแบบบ้าน
                </Button>
                <Button variant="outlined" onClick={getHomeDesignsHighlight}>
                    จัดลำดับไฮไลท์
                </Button>
            </Box>
            <DataGrid
                columns={columns}
                rows={rows}
                sortingOrder={["asc", "desc"]}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                autoHeight
                rowHeight={128}
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
            <Dialog
                fullWidth
                maxWidth="md"
                open={formDialog}
                onClose={handleCloseFormDialog}
                scroll="body"
            >
                <DialogTitle>{editId ? "แก้ไขแบบบ้าน" : "เพิ่มแบบบ้าน"}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit((data) => {
                            if (editId) {
                                updateHomeDesign(data, editId);

                            } else {
                                createHomeDesign(data);
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
                                    label="ชื่อแบบบ้าน"
                                    {...register("title", {
                                        required: "กรุณากรอกชื่อแบบบ้าน",
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
                                                getOptionLabel={(option) => option.title}
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
                                    name="propertyType"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "กรุณาเลือกสไตล์" }}
                                    render={({ field }) => {
                                        const selectedOption = options.propertyTypes.find(option => option.id === field.value) || null;
                                        return (
                                            <Autocomplete
                                                fullWidth
                                                size="small"
                                                options={options.propertyTypes}
                                                getOptionLabel={(option) => option.title}
                                                value={selectedOption}
                                                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : "")}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="ประเภทที่พักอาศัย"
                                                        error={!!errors.propertyType}
                                                        helperText={errors.propertyType?.message}
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
            <Dialog
                fullWidth
                maxWidth="md"
                open={highlightDialog}
                onClose={handleCloseHighlightDialog}
                scroll="body"
            >
                <DialogTitle>จัดลำดับไฮไลท์</DialogTitle>
                <DialogContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        mt={2}
                    >
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <TableContainer sx={{ overflowX: "hidden" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>ลำดับ</TableCell>
                                            <TableCell>ชื่อแบบบ้าน</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <SortableTableBody items={homeDesignsHighlight} getId={(row) => row.id}>
                                        {(row, index) => (
                                            <SortableTableRow key={row.id} id={row.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.title}</TableCell>
                                            </SortableTableRow>
                                        )}
                                    </SortableTableBody>
                                </Table>
                            </TableContainer>
                        </DndContext>
                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                            <Button onClick={handleCloseHighlightDialog}>ยกเลิก</Button>
                            <Button variant="contained" onClick={saveHighlightOrder}>บันทึก</Button>
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

export default HomeDesignSetting;