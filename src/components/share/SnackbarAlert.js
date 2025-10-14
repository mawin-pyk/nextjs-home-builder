// const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

// setAlert({ open: true, severity: "success", message: "เพิ่มข้อมูลสำเร็จ" });
// setAlert({ open: true, severity: "error", message: error.message });

// const handleCloseAlert = () => {
//     setAlert({ open: false, severity: "", message: "" });
// }

{/* <SnackbarAlert
        open={alert.open}
        onClose={handleCloseAlert}
        severity={alert.severity}
        message={alert.message}
/> */}

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function SnackbarAlert({
    open,
    onClose,
    severity,
    message
}) {
    return (
        <Snackbar open={open} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} autoHideDuration={4000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarAlert;