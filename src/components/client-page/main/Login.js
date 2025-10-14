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

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            window.location.href = "/admin";

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
                    onSubmit={handleLogin}
                >
                    <Typography variant="h1" fontSize="36px" fontWeight="400" textAlign="center">Login</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Box>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Link href="#">
                                <Typography component="span" color="primary" fontSize="14px">Forget password?</Typography>
                            </Link>
                        </Box>
                    </Box>
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                    <Box display="flex" justifyContent="center">
                        <Typography variant="body2" color="textSecondary">
                            Don&apos;t have an account? <Link href="/register"><Typography component="span" color="primary" fontSize="14px">Register now</Typography></Link>
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

export default Login;