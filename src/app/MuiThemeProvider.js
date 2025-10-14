"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const customTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#845ef7",
        },
    },
    typography: {
        fontFamily: "var(--font-noto-sans-thai), sans-serif",
    },
});

function MuiThemeProvider({ children }) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={customTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}

export default MuiThemeProvider;
