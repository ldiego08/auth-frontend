import { AppBar, Toolbar, Typography } from "@mui/material";

export function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Auth Example
                </Typography>
            </Toolbar>
        </AppBar>
    )
}