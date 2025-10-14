import Image from "next/image";

import {
    Box,
    Card,
    CardContent,
    Button,
    IconButton,
    List,
    ListItem,
    Typography
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";

import { useDropzone } from "react-dropzone";

const FileDropZone = ({
    files = [],
    setFiles,
    maxFiles = Infinity,
    maxSize = Infinity,
    accept = {}
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        maxSize,
        multiple: maxFiles !== 1,
        accept,
        onDrop: (acceptedFiles) => {
            let updatedFiles = [];

            if (maxFiles === 1) {
                updatedFiles = acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                );

            } else {
                const remainingSlots = maxFiles - files.length;
                const filesToAdd = acceptedFiles.slice(0, remainingSlots);
                const withPreview = filesToAdd.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                );
                updatedFiles = [...files, ...withPreview];
            }

            setFiles(updatedFiles);
        }
    })

    const renderFilePreview = (file) => {
        if (file.type?.startsWith("image")) {
            return (
                <Image
                    src={file.preview}
                    alt={file.name}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                />
            )
        } else {
            return <InsertDriveFileIcon fontSize="large" />
        }
    }

    const handleRemoveFile = (file) => {
        const filtered = files.filter((f) => f.name !== file.name);
        setFiles(filtered);
    }

    const handleRemoveAllFiles = () => {
        setFiles([]);
    }

    return (
        <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
            <CardContent>
                <Box
                    {...getRootProps()}
                    p={4}
                    border="1px dashed"
                    borderColor="divider"
                    textAlign="center"
                    sx={{ cursor: "pointer" }}
                >
                    <input {...getInputProps()} />
                    <Typography variant="subtitle1" color="textSecondary" fontWeight="400">ลากแล้ววางไฟล์ที่นี่</Typography>
                </Box>
                {files.length > 0 && (
                    <>
                        <List>
                            {files.map((file) => (
                                <ListItem
                                    key={file.name}
                                    sx={{
                                        mb: 1,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                                        {renderFilePreview(file)}
                                        <Typography variant="body2" color="textSecondary">{file.name}</Typography>
                                    </Box>
                                    <IconButton onClick={() => handleRemoveFile(file)}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                        <Box mt={1} display="flex" justifyContent="flex-end" alignItems="center">
                            <Button variant="outlined" color="error" size="small" onClick={handleRemoveAllFiles}>
                                ลบทั้งหมด
                            </Button>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default FileDropZone;