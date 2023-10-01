import react from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function AppBarIndex(props) {
    let navigate = useNavigate();

    return (<>
        <AppBar position="static" style={{ background: '#214A87' }}>
            <Container maxWidth="xl" >
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "inline-list-item", alignContent: "center" }}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                            SGDP
                        </Typography>
                    </Box>
                    <Box sx={{ display: "inline-list-item", alignContent: "center" }}>
                        <Box marginRight={2}>
                            <Button href="/login" style={{ background: "#FFFFFF" }}>Iniciar Sesión</Button>
                        </Box>
                        <Box marginRight={2}>
                            <Button href="/registro" variant="outlined" style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}>Crear Cuenta</Button>
                        </Box>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    </>);
}
export default AppBarIndex;