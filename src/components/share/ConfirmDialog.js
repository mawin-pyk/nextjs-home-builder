// const [confirmDialog, setConfirmDialog] = useState({ open: false, message: "", onConfirm: null, });

// const handleDelete = (id) => {
//     setConfirmDialog({
//         open: true,
//         message: "คุณต้องการลบข้อมูลใช่หรือไม่?",
//         onConfirm: () => {
//             deleteCategory(id);
//             handleCloseConfirmDialog();
//         },
//     });
// }

// const handleCloseConfirmDialog = () => {
//     setConfirmDialog({ open: false, message: "", onConfirm: null });
// }

{/* <ConfirmDialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
/> */}

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    message,
}) {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={(e, reason) => {
                if (reason !== "backdropClick" && reason !== "escapeKeyDown") onClose();
            }}
        >
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pb: 2, px: 3 }}>
                <Button onClick={onClose}>ยกเลิก</Button>
                <Button variant="contained" onClick={onConfirm}>ยืนยัน</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;