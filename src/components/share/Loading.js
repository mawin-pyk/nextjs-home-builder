import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Loading({ open }) {
    return (
        <Backdrop sx={{ color: "#ffffff", zIndex: (theme) => theme.zIndex.modal + 1 }} open={open}>
            <CircularProgress sx={{ color: "inherit" }} />
        </Backdrop>
    );
}

export default Loading;
