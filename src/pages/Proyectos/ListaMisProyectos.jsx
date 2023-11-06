import react, { useEffect, useState } from 'react'
import Typography from "@mui/material/Typography";
import {
    CircularProgress,
    Dialog, DialogContent, DialogTitle,
    Grid,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Edit } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";


function ListaMisProyectos() {

    let [listaProyectos, setListaProyectos] = useState()
    let [hasProjects, setHasProjects] = useState(true)
    let [proyectos, setProyectos] = useState([])

    let [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    let [idProjectToBeDeleted, setIdProjectToBeDeleted] = useState()
    let navigate = useNavigate()
    const [proyColab, setProyColab] = useState()
    const headers = new Headers
    headers.set("x-token", sessionStorage.getItem("token"))
    const initGetColab = {
        headers: headers,
        method: "GET",
    }
    let id = localStorage.getItem("uid")
    //TO-DO implementar logica para borrar en la bd
    const updateProjectList = (uid) => {



        setIdProjectToBeDeleted(uid)
        setIsDeleteDialogOpen(true)


    }

    const deleteProject = () => {
        let header = new Headers

        header.set("x-token", sessionStorage.getItem("token"))

        fetch(url + `/api/proyectos/${idProjectToBeDeleted}`, {
            method: 'delete',
            headers: header
        })
            .then(raw => raw.json())
            .then(respuesta => {
                const newListProjects = listaProyectos.filter(proyecto => proyecto.uid !== idProjectToBeDeleted)
                console.log(respuesta)
                setListaProyectos(newListProjects)
                setIsDeleteDialogOpen(false)
                alert('Se elimino el proyecto!')
            })

    }

    const filtrarProyectos = (proyectos) => {
        const proyectosFiltrados = proyectos.filter((proyecto) => {
            return proyecto.colaboradores.some((colaborador) => {
                return colaborador._id === id;
            });
        });
        setProyColab(proyectosFiltrados);
        console.log(proyectosFiltrados);
    }

    useEffect(() => {
        const header = new Headers
        header.set("x-token", sessionStorage.getItem("token"))
        fetch(url + `/api/proyectos/creador/${localStorage.getItem('uid')}`, {
            method: 'get',
            headers: header
        }).then(rawResponse => rawResponse.json())
            .then(response => {
                if (response.proyectos) {
                    setListaProyectos(response.proyectos)
                    console.log(response.proyectos)
                } else {
                    setHasProjects(false)
                }
            })

        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/", initGetColab)
            .then(rawResponse => rawResponse.json()
                .then(result => {
                    setProyectos(result.proyectos)
                    filtrarProyectos(result.proyectos)
                    console.log(result.proyectos)
                }))

    }, [])

    return <>

        <div className={'container'} style={{ backgroundColor: 'white' }}>

            <Grid container alignItems={'center'} className={'mb-4'}>
                <Grid item xs={8}>
                    <Typography variant={'h3'}>Mis Proyectos</Typography>
                </Grid >
                <Grid item xs={4} >
                    <Button
                        onClick={() => navigate('/misproyectos/proyecto')}
                        variant={'contained'}
                        endIcon={<Add />}>Nuevo proyecto</Button>
                </Grid>
            </Grid>

            {listaProyectos ?

                <TableContainer className={'mb-4'} sx={{ maxHeight: 500 }}>
                    <Table stickyHeader size={'small'}>
                        <TableHead>
                            <TableRow >
                                <TableCell  align={'center'} style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Nombre del proyecto.</TableCell>
                                <TableCell  align={'center'} style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Descripción.</TableCell>
                                <TableCell align={'center'} className={'sm'}  style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Estado.</TableCell>
                                <TableCell align={'center'}  style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Acciones.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                hasProjects && listaProyectos.length >= 0 ?
                                    listaProyectos.map(proyecto => {
                                        return <TableRow key={proyecto.uid}>
                                            <TableCell>{proyecto.nombre}</TableCell>
                                            <TableCell>{proyecto.descripcion}</TableCell>
                                            <TableCell>{proyecto.estado_Proyecto}</TableCell>
                                            <TableCell align={'center'}>
                                                <Tooltip title={'Agregar tarea'}>
                                                    <IconButton color={'success'} onClick={() => {
                                                        navigate(`/mistareas/tarea`)
                                                    }}>
                                                        <Add />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Editar proyecto'}>
                                                    <IconButton color={'primary'} onClick={() => {
                                                        navigate(`/misproyectos/proyecto/${proyecto.uid}/editar`)
                                                    }}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Borrar proyecto'}>
                                                    <IconButton color={'error'} onClick={() => { updateProjectList(proyecto.uid) }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    })
                                    : <Grid container>
                                        <Grid container>
                                            <Typography>No cuenta con proyectos. Cree uno nuevo dando click en el boton 'Crear proyecto'.</Typography>
                                        </Grid>
                                    </Grid>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((valor) => {
                    return <h1 className={'mb-1'}><Skeleton /></h1>
                })
            }
            <br></br>
            <Typography variant={'h3'}>Mis Colaboraciones</Typography>
            <br></br>
            {proyColab ?
                <TableContainer className={'mb-4'} sx={{ maxHeight: 500 }}>
                    <br></br>
                    <Table stickyHeader size={'small'}>
                        <TableHead>
                        <TableRow >
                                <TableCell  align={'center'} style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Nombre del proyecto.</TableCell>
                                <TableCell  align={'center'} style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Descripción.</TableCell>
                                <TableCell align={'center'} className={'sm'}  style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Estado.</TableCell>
                                <TableCell align={'center'}  style={{background:'#214A87', color:'white', fontWeight:'bold'}}>Acciones.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                proyColab.length >= 0 ?
                                    proyColab.map(proyecto => {
                                        return <TableRow key={proyecto.uid}>
                                            <TableCell>{proyecto.nombre}</TableCell>
                                            <TableCell>{proyecto.descripcion}</TableCell>
                                            <TableCell>{proyecto.estado_Proyecto}</TableCell>
                                            <TableCell align={'center'}>
                                                <Tooltip title={'Agregar tarea'}>
                                                    <IconButton color={'success'} onClick={() => {
                                                        navigate(`/mistareas/tarea`)
                                                    }}>
                                                        <Add />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Editar proyecto'}>
                                                    <IconButton color={'primary'} onClick={() => {
                                                        navigate(`/misproyectos/proyecto/${proyecto.uid}/editar`)
                                                    }}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Borrar proyecto'}>
                                                    <IconButton color={'error'} onClick={() => { updateProjectList(proyecto.uid) }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    })
                                    : <Grid container>
                                        <Grid container>
                                            <Typography>No eres colaborador de ningún proyecto</Typography>
                                        </Grid>
                                    </Grid>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                : <CircularProgress/>
            }

            <Dialog open={isDeleteDialogOpen}>
                <DialogTitle>Eliminar proyecto.</DialogTitle>
                <DialogContent>
                    <Grid container xs={12} spacing={2}>
                        <Grid item>
                            <Typography variant={'h4'}>¿Realmente desea eliminar este proyecto?</Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={'contained'}
                                onClick={deleteProject}
                                color={'error'}>Eliminar</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={'contained'}
                                onClick={() => setIsDeleteDialogOpen(false)}
                                color={'primary'}>Cancelar</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

        </div>
    </>;
}

export default ListaMisProyectos;