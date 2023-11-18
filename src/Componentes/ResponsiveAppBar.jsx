import react, { useEffect } from 'react'
import React from 'react';
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
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';



const pages = ['Inicio', 'Proyectos', 'Tareas', 'Informes'];
const settings = ['Perfil', 'Cerrar sesión'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,

    borderRadius: 5,
    p: 4,
};

function ResponsiveAppBar(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNot, setAnchorElNot] = useState(null);
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

    const handleOpenNot = (event) => {
        setAnchorElNot(event.currentTarget);
    }

    const handleCloseNavMenu = (index) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseNot = () => {
        setAnchorElNot(null);
    }

    const handleOpenTarea = (tarea, proyecto, fecha) => {
        setAnchorElNot(null);
        Notificacion(tarea, proyecto, fecha);
    }




    //TO-DO cargar la imagen del usuario
    const configAvatar = () => {

        const headers = new Headers

        headers.append("x-token", sessionStorage.getItem("token"))

        fetch(url + `/api/usuarios/${localStorage.getItem('uid')}`, {
            headers: headers,
            method: 'get'
        })

    }



    const [open, setOpen] = useState(false);
    const [openNotificacion, setOpenNotificacion] = useState(false)
    const handleOpenNotificacion = () => setOpenNotificacion(true);
    const handleCloseNotificacion = () => setOpenNotificacion(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let hayNotificaciones

    console.log(notificaciones)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        bgcolor: 'transparent',
        p: 4,
        transition: '0.3s',
        textAlign: 'center',
        maxWidth: 500,
        maxHeight: 600,
        padding: 0,
        margin: 0
    };

    const styleModal = {
        maxWidth: 500,
        maxHeight: 600,
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: 'auto',
    }


    function Notificacion(props) {
        const [openNoti, setOpenNoti] = React.useState(false);
        const handleOpenNoti = () => {

            setOpenNoti(true);
        };
        const handleCloseNoti = () => {
            setOpenNoti(false);
            handleCloseNot();
        }
        const handleCloseIcon = () => {
            setOpenNoti(false);
        }
        const nombre = localStorage.getItem('nombreUsuario');
        const editarTarea = '/mistareas/tarea/' + props.tarea._id + '/editar';
        const verProyecto = '/misproyectos/proyecto/consultar/' + props.proyecto._id;
        return (
            <div>
                <Grid container onClick={handleOpenNoti}>
                    <Grid item md={12} style={{ alignSelf: 'center' }}>
                        <Typography style={{ fontSize: '0.9em', fontWeight: 'bold', textAlign: 'left' }}>Se te ha asignado {props.tarea.nombre} en {props.proyecto.nombre}</Typography>
                    </Grid>
                    <Grid item md={12} style={{ alignSelf: 'center', justifySelf: 'right', textAlign: 'right' }}>
                        <Typography style={{ fontSize: '0.85em' }}>{props.fecha}</Typography>
                    </Grid>
                </Grid>


                <Modal
                    open={openNoti}
                    onClose={handleCloseIcon}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={styleModal}
                >
                    <Box sx={style}>
                        <Card sx={{ bgcolor: '#214A87' }}>
                            <CardContent>
                                <Grid container>
                                    <Grid item md={12} margin='2%'>
                                        <Typography id="modal-modal-title" variant="h5" component="h2" color='white' align='center' fontWeight='bolder'>
                                            {props.tarea.nombre}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} style={{ alignSelf: 'center' }}>
                                        <Typography id="modal-modal-description" color='white' style={{ fontSize: '0.85em' }}>
                                            {props.proyecto.nombre}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} style={{ alignSelf: 'center', padding: '2%' }}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} color='white' style={{ margin: '5%' }}>
                                            {props.descripcion}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography color='white' variant='subtitle1' style={{ marginTop: '3%' }}>Asignado</Typography>
                                        <div style={{ display: 'flex', alignContent: 'center', margin: '2%', justifyContent: 'center' }}>
                                            <Tooltip title={"Nombre"} style={{ marginRight: '3%' }}>
                                                <Avatar src={avatar} />
                                            </Tooltip>
                                            <Typography variant='subtitle2' color={'white'} style={{ alignSelf: 'center' }}>{nombre}</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item md={6} style={{ alignSelf: 'center', padding: '2%' }}>
                                        <Typography color='white'>Termina: {props.fecha}</Typography>
                                    </Grid>
                                    <Grid item md={6} padding='2%' align='center' cursor='default'>
                                        <Link to={editarTarea} onClick={handleCloseNoti}>
                                            <Button variant='outlined' style={{ color: '#214A87', borderColor: 'white', fontWeight: 'lighter', background: 'white' }}>Editar Tarea</Button>
                                        </Link>
                                    </Grid>
                                    <Grid item md={6} padding='2%' align='center' cursor='default'>
                                        <Link to={verProyecto} onClick={handleCloseNoti}>
                                            <Button variant='outlined' style={{ color: '#214A87', borderColor: 'white', fontWeight: 'lighter', background: 'white' }}>Ver Proyecto</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <CloseIcon
                            edge="end"
                            color='action'
                            onClick={handleCloseIcon}
                            aria-label="close"
                            sx={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}
                        >
                        </CloseIcon>
                    </Box>
                </Modal>
            </div>
        );
    }

    return (<>

        <AppBar position="static" style={{ background: '#214A87' }}>
            <Container maxWidth="xl" >
                <Toolbar disableGutters>
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
                                    if (page === 'Inicio') navigate('/dashboard')
                                    if (page === 'Proyectos') navigate('/misproyectos')

                                    if (page === 'Tareas') navigate('/mistareas')

                                    if (page === 'Informes') navigate('/misinformes')

                                    handleCloseNavMenu()
                                }}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
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
                                    if (page === 'Inicio') navigate('/dashboard')
                                    if (page === 'Proyectos') navigate('/misproyectos')
                                    if (page === 'Tareas') navigate('/mistareas')
                                    if (page === 'Informes') navigate('/misinformes')

                                    handleCloseNavMenu()
                                }}
                                sx={{
                                    my: 2, color: 'white', display: 'block', textDecoration: 'none', '&:hover': {
                                        textDecoration: 'underline 2px'
                                    }
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>


                    <Box sx={{ flexGrow: 0 }} style={{ marginRight: '2%', cursor: 'pointer' }}>
                        <Tooltip title="Notificaciones">
                            <NotificationsIcon onClick={handleOpenNot} sx={{ p: 0, m: 0 }}>
                            </NotificationsIcon>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            PopoverClasses={{ paper: 'popover' }}
                            anchorEl={anchorElNot}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElNot)}
                            onClose={handleCloseNot}
                            padding='0'
                            style={{ position: 'absolute' }}
                        >
                            <Box width='30vw' padding='0'>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant='h6' paddingLeft='4%'>Notificaciones</Typography>
                                    <DeleteIcon style={{ alignSelf: 'center', marginRight: '4%' }} color='error' onClick={() => {
                                        const headers = new Headers();
                                        headers.set("x-token", sessionStorage.getItem("token"))
                                        const initBorrarTarea = {
                                            method: 'DELETE',
                                            headers: headers,
                                        }
                                        let id = localStorage.getItem("uid")
                                        fetch(serverUrl + "/api/notificaciones/" + id, initBorrarTarea)
                                    }}></DeleteIcon>
                                </div>
                                <Table style={{ border: 'none' }}>
                                    <TableBody style={{ border: 'none' }}>
                                        {notificaciones ? notificaciones.map((element, index) => {
                                            const titulo = element.titulo;
                                            const descripcion = element.descripcion;
                                            const fecha = element.fecha;
                                            const proyecto = element.proyecto; // Accede a la propiedad "nombre" del objeto proyecto
                                            const tarea = element.tarea;
                                            const fechaFormat = fecha.slice(0, 10)
                                            return (
                                                <TableRow key={index} style={{ border: 'none' }}>
                                                    <TableCell align="center" style={{ border: 'none', cursor: 'pointer' }}>
                                                        <Notificacion
                                                            tarea={tarea}
                                                            proyecto={proyecto}
                                                            fecha={fechaFormat}
                                                            descripcion={descripcion}
                                                        ></Notificacion>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }) : <div style={{ margin: '10%' }}>
                                            <Typography style={{ fontSize: '0.85em', textAlign: 'center' }}>No tienes ninguna notificación</Typography>
                                        </div>}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Opciones" >
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
                            style={{ position: 'absolute' }}
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