import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";


function AppBarIndex(props) {
    let navigate = useNavigate();

    return (<>
        <AppBar position="fixed" style={{ background: '#214A87' }}>
            <Container maxWidth="xl" >
                <Toolbar disableGutters sx={{ justifyContent: "center", display:"flex" }}>
                    <Box sx={{ display: "inline-list-item", alignContent: "center" }}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <a href='/' style={{ textDecoration: "none", color:'white' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                SISTEMA GESTOR DE PROYECTOS
                            </Typography>
                        </a>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </>);
}
export default AppBarIndex;