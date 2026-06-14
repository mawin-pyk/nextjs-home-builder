import { Box, Fab } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";

function FloatingContact() {
    return (
        <Box
            position="fixed"
            bottom={{ xs: 16, sm: 24 }}
            right={{ xs: 16, sm: 24 }}
            zIndex={1000}
            display="flex"
            flexDirection="column"
            gap={1.5}
        >
            <Fab
                component="a"
                href="https://www.facebook.com/MepatCS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                size="small"
                sx={{
                    bgcolor: "background.paper",
                    color: "#1877F2",
                    boxShadow: 3,
                    "&:hover": { bgcolor: "#f1f3f5" },
                }}
            >
                <FacebookIcon />
            </Fab>
            <Fab
                component="a"
                href="tel:0646498717"
                color="primary"
                aria-label="โทรหาเรา"
                size="small"
                sx={{
                    animation: "contactPulse 2.2s infinite",
                    "@keyframes contactPulse": {
                        "0%": { boxShadow: "0 0 0 0 rgba(132, 94, 247, 0.5)" },
                        "70%": { boxShadow: "0 0 0 16px rgba(132, 94, 247, 0)" },
                        "100%": { boxShadow: "0 0 0 0 rgba(132, 94, 247, 0)" },
                    },
                }}
            >
                <PhoneIcon />
            </Fab>
        </Box>
    );
}

export default FloatingContact;