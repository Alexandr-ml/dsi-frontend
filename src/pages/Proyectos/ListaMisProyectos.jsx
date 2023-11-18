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
import ListIcon from "@mui/icons-material/List"
import { Add, Edit } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";
import Loading from '../../Componentes/Loading.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function ListaMisProyectos() {

    let [listaProyectos, setListaProyectos] = useState([])
    let [hasProjects, setHasProjects] = useState(true)
    let [proyectos, setProyectos] = useState([])

    let [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    let [idProjectToBeDeleted, setIdProjectToBeDeleted] = useState()
    let navigate = useNavigate()
    const [proyColab, setProyColab] = useState()
    const [eliminado, setEliminado] = useState(false)
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
                setEliminado(true)
            })

    }

    const handleProjectEliminated = () => {
        setEliminado(false)
    }

    const filtrarProyectos = (proyectos) => {
        const proyectosFiltrados = proyectos.filter((proyecto) => {
            return proyecto.colaboradores.some((colaborador) => {
                return colaborador._id === id;
            });
        });
        setProyColab(proyectosFiltrados);
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
                } else {
                    setHasProjects(false)
                }
            })

        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/", initGetColab)
            .then(rawResponse => rawResponse.json()
                .then(result => {
                    setProyectos(result.proyectos)
                    filtrarProyectos(result.proyectos)
                }))

    }, [])

    return <>
        {listaProyectos ?
            <div>

                <Grid container alignItems={'center'} className={'mb-4'}>
                    <Grid item xs={8}>
                        <Typography variant={'h3'}>Proyectos</Typography>
                    </Grid >
                    <Grid item xs={4} justifyContent={'right'} display={'flex'}>
                        <Button
                            onClick={() => navigate('/misproyectos/proyecto')}
                            variant={'contained'}
                            endIcon={<Add />}>Nuevo proyecto</Button>
                    </Grid>
                </Grid>

                {listaProyectos ?

                    <TableContainer className={'mb-4'}>
                        <Table stickyHeader size={'small'}>
                            <TableHead>
                                <TableRow >
                                    <TableCell align={'center'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold', width: '15%' }}>Nombre del proyecto</TableCell>
                                    <TableCell align={'center'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold', width: '50%' }}>Descripción</TableCell>
                                    <TableCell align={'center'} className={'sm'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                                    <TableCell align={'center'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold', width: '22%' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    listaProyectos.length >= 0 ?
                                        listaProyectos.map(proyecto => {
                                            let descripcion
                                            if (proyecto.descripcion.length > 100) {
                                                descripcion = proyecto.descripcion.substring(0, 125) + '...'
                                            } else {
                                                descripcion = proyecto.descripcion
                                            }
                                            return <TableRow key={proyecto.uid}>
                                                <TableCell>{proyecto.nombre}</TableCell>
                                                <TableCell>{descripcion}</TableCell>
                                                <TableCell>{proyecto.estado_Proyecto}</TableCell>
                                                <TableCell align={'center'}>
                                                    <Tooltip title={'Agregar tarea'}>
                                                        <IconButton color={'success'} onClick={() => {
                                                            navigate(`/mistareas/creartarea/${proyecto.uid}`)
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
                                                    <Tooltip title={'Ver'}>
                                                        <IconButton onClick={() => { navigate(`/misproyectos/proyecto/consultar/${proyecto.uid}`) }}>
                                                            <ListIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        })
                                        : <TableRow>
                                            <TableCell colSpan={4}>
                                                <Typography align='center' variant='h5' >No hay tareas</Typography>
                                            </TableCell>
                                        </TableRow>
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
                <Typography variant={'h3'}>Colaboraciones</Typography>
                <br></br>
                {proyColab ?
                    <TableContainer className={'mb-4'}>
                        <br></br>
                        <Table stickyHeader size={'small'}>
                            <TableHead>
                                <TableRow >
                                    <TableCell align={'center'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold', width: '15%' }}>Nombre del proyecto</TableCell>
                                    <TableCell align={'center'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold', width: '50%' }}>Descripción</TableCell>
                                    <TableCell align={'center'} className={'sm'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                                    <TableCell align={'center'} style={{ background: '#214A87', color: 'white', fontWeight: 'bold', width: '22%' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    proyColab.length >= 0 ?
                                        proyColab.map(proyecto => {
                                            let descripcion
                                            if (proyecto.descripcion.length > 100) {
                                                descripcion = proyecto.descripcion.substring(0, 105) + '...'
                                            } else {
                                                descripcion = proyecto.descripcion
                                            }
                                            return <TableRow key={proyecto.uid}>
                                                <TableCell>{proyecto.nombre}</TableCell>
                                                <TableCell>{descripcion}</TableCell>
                                                <TableCell>{proyecto.estado_Proyecto}</TableCell>
                                                <TableCell align={'center'}>
                                                    <Tooltip title={'Ver'}>
                                                        <IconButton onClick={() => { navigate(`/misproyectos/proyecto/consultar/${proyecto.uid}`) }}>
                                                            <ListIcon />
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
                    : <CircularProgress />
                }

                <Dialog open={isDeleteDialogOpen}>
                    <DialogContent style={{ backgroundColor: '#214A87', color: 'white' }}>
                        <Typography variant='h4' align='center'>Eliminar proyecto</Typography>
                        <Grid container spacing={2} display='flex' justifyContent='center'>
                            <Grid item md={12} align={'center'}>
                                <Typography variant={'body'} align='center'>¿Realmente desea eliminar este proyecto?</Typography>
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
                                    style={{ backgroundColor: 'white', color: '#214A87' }}>Cancelar</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>

                <Snackbar open={eliminado} autoHideDuration={6000} onClose={handleProjectEliminated} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleProjectEliminated} severity="success" variant="filled">
                        <AlertTitle>Eliminado</AlertTitle>
                        Proyecto eliminado correctamente
                    </Alert>
                </Snackbar>

            </div> : <Loading />}
    </>;
}

export default ListaMisProyectos;