"use client";

import { useState } from "react";
import Link from "next/link";

import {
    Box,
    Typography,
    TextField,
    Paper,
    Button,
} from "@mui/material";

import SnackbarAlert from "@/components/share/SnackbarAlert";
import Loading from "@/components/share/Loading";

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    username,
                    password
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();

            setAlert({ open: true, severity: "success", message: result.message });
            setEmail("");
            setUsername("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.log(error);
            setAlert({ open: true, severity: "error", message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: "", message: "" });
    }

    return (
        <>
            <Box
                component="main"
                width="100%"
                height="100vh"
                px={{ xs: 2, sm: 3 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="#f1f3f5"
            >
                <Paper
                    component="form"
                    sx={{
                        width: "100%",
                        maxWidth: "400px",
                        p: 4,
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 4
                    }}
                    onSubmit={handleRegister}
                >
                    <Typography variant="h1" fontSize="36px" fontWeight="400" textAlign="center">Register</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button variant="contained" type="submit">
                        Register
                    </Button>
                    <Box display="flex" justifyContent="center">
                        <Typography variant="body2" color="textSecondary">
                            Already have an account? <Link href="/login"><Typography component="span" color="primary" fontSize="14px">Login now</Typography></Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <SnackbarAlert
                open={alert.open}
                onClose={handleCloseAlert}
                severity={alert.severity}
                message={alert.message}
            />
            <Loading open={loading} />
        </>
    );
}

export default Register;