import {createTheme} from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: "#ffffff #959595",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        width: "5px",
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#ffffff",
                        minHeight: 24,
                        border: "none",
                    },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                        backgroundColor: "#6b6b6b",
                    },
                    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                        backgroundColor: "#6b6b6b",
                    },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#6b6b6b",
                    },
                    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                        backgroundColor: "#959595",
                    },
                },
            },
        },
    },
})