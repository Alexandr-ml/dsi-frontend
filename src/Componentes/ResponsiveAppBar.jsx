import react, { useEffect } from 'react'
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
import serverUrl from "../serverUrl.js";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const pages = ['Proyectos', 'Mis tareas'];
const settings = ['Perfil', 'Cerrar sesión'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ResponsiveAppBar(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [notificaciones, setNotificaciones] = useState([]);

    const [avatar, setAvatar] = useState()

    let id = localStorage.getItem("uid")

    useEffect(() => {

        let header = new Headers
        header.set("x-token", sessionStorage.getItem("token"))

        fetch(serverUrl + '/api/usuarios/' + localStorage.getItem('uid'), {
            method: 'get',
            headers: header
        }).then(raw => raw.json())
            .then(response => setAvatar(response.usuario.img))

        fetch(serverUrl + '/api/notificaciones/usuario/' + id, {
            method: 'get',
            headers: header
        }).then(raw => raw.json())
            .then(response => setNotificaciones(response.notificaciones))
    }, []);


    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("x-token", sessionStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(serverUrl + "/api/notificaciones/usuario/" + id, requestOptions)
            .then(response => response.json())
            .then(result => setNotificaciones(result))
            .catch(error => console.log('error', error));

    }, []);

    const navigate = useNavigate()


    function cerrarSesion() {
        localStorage.clear()
        window.location.href = "/login"
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (index) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };




    //TO-DO cargar la imagen del usuario
    const configAvatar = () => {

        const headers = new Headers

        headers.append("x-token", sessionStorage.getItem("token"))

        fetch(url + `/api/usuarios/${localStorage.getItem('uid')}`, {
            headers: headers,
            method: 'get'
        })

    }



    notificaciones ? notificaciones.map((element, index) => {
        const titulo = element.titulo;
        const descripcion = element.descripcion;
        const fecha = element.fecha;
        const proyecto = element.proyecto.nombre; // Accede a la propiedad "nombre" del objeto proyecto
        const tarea = element.tarea.nombre;


    }) : console.log("no hay notificaciones");




    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let hayNotificaciones




    return (<>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} textAlign={"center"}>
                <Typography variant="h4">Notificaciones</Typography>
                <br></br>
                <TableContainer component={'div'}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ background: '#214A87' }}>
                            <TableRow>
                                <TableCell align="center" style={{ color: "white", fontWeight: 'bolder' }}>Titulo</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: 'bolder' }}>Descripcion</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: 'bolder' }}>Fecha</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: 'bolder' }}>Proyecto</TableCell>
                                <TableCell align="center" style={{ color: "white", fontWeight: 'bolder' }}>Tarea</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificaciones ? notificaciones.map((element, index) => {
                                const titulo = element.titulo;
                                const descripcion = element.descripcion;
                                const fecha = element.fecha;
                                const proyecto = element.proyecto.nombre; // Accede a la propiedad "nombre" del objeto proyecto
                                const tarea = element.tarea.nombre;
                                const fechaFormat = fecha.slice(0, 10)
                                return <>
                                    <TableRow key={index}>
                                        <TableCell align="center">{titulo}</TableCell>
                                        <TableCell align="center">{descripcion}</TableCell>
                                        <TableCell align="center">{fechaFormat}</TableCell>
                                        <TableCell align="center">{proyecto}</TableCell>
                                        <TableCell align="center">{tarea}</TableCell>
                                    </TableRow>
                                </>
                            }) : console.log("no hay notificaciones")}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br></br>
                <Button variant={'contained'} color={'error'}
                    onClick={() => {
                        const headers = new Headers();
                        headers.set("x-token", sessionStorage.getItem("token"))
                        const initBorrarTarea = {
                            method: 'DELETE',
                            headers: headers,
                        }
                        let id = localStorage.getItem("uid")
                        fetch(serverUrl + "/api/notificaciones/" + id, initBorrarTarea)
                    }}>Eliminar</Button>
            </Box>
        </Modal>

        <AppBar position="static" style={{ background: '#214A87' }}>
            <Container maxWidth="xl" >
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/dashboard"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SGDP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => {

                                    if (page === 'Proyectos') navigate('/misproyectos')

                                    if (page === 'Mis tareas') navigate('/mistareas')

                                    handleCloseNavMenu()
                                }}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SGDP
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => {

                                    if (page === 'Proyectos') navigate('/misproyectos')

                                    if (page === 'Mis tareas') navigate('/mistareas')

                                    handleCloseNavMenu()
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }} style={{marginRight:'3%'}}>
                        <Tooltip title="Notificaciones">
                            <NotificationsIcon onClick={handleOpen} sx={{ p: 0 }}>
                            </NotificationsIcon>
                        </Tooltip>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Opciones">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={avatar} alt={localStorage.getItem('nombreUsuario')} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => {
                                    handleCloseUserMenu()

                                    switch (setting) {
                                        case "Cerrar sesión": cerrarSesion();
                                            break;
                                        case "Perfil": navigate("/perfil");
                                            break;
                                        default: navigate('/')
                                    }
                                }}>
                                    <Typography textAlign={"center"}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </>);
}
export default ResponsiveAppBar;