import { useEffect, useState } from 'react'
import Typography from "@mui/material/Typography";
import { Grid, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Edit } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import url from "../../serverUrl.js";
import Loading from "../../Componentes/Loading.jsx"

function Tareas() {

    let [listaTareas, setListaTareas] = useState()
    let [hasTareas, setHasTareas] = useState(true)
    let navigate = useNavigate()



    const deleteTarea = (uid) => {

        const newListTareas = listaTareas.filter(tarea => tarea.uid !== uid)

        setListaTareas(newListTareas)

    }

    useEffect(() => {
        const header = new Headers
        header.set("x-token", sessionStorage.getItem("token"))
        fetch(url + '/api/tareas', {
            method: 'get',
            headers: header
        }).then(rawResponse => rawResponse.json())
            .then(response => {
                if (response.tareas) {
                    setListaTareas(response.tareas)
                } else {
                    setHasTareas(false)
                }

                console.log(response.tareas)
            })
    }, [])

    return <>
        <div>
            <Grid container alignItems={'center'} className={'mb-4'}>
                <Grid item xs={8}>
                    <Typography variant={'h3'}>Tareas</Typography>
                </Grid >
                <Grid item xs={4} justifyContent={'right'} display={'flex'}>
                    <Button
                        onClick={() => navigate('/mistareas/creartarea')}
                        variant={'contained'}
                        endIcon={<Add />}>Nueva tarea</Button>
                </Grid>
            </Grid>


            <Typography variant={'h5'}>No iniciado</Typography>
            {listaTareas ?

                <TableContainer className={'mb-4'} sx={{ maxHeight: 200 }}>
                    <Table stickyHeader size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell >Proyecto.</TableCell>
                                <TableCell align={'center'}>Acciones.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listaTareas.filter(item => item.estado_Tarea === 'No iniciado').map(tarea => {
                                    return <TableRow key={tarea.uid}>
                                        <TableCell>{tarea.nombre}</TableCell>
                                        <TableCell>{tarea.descripcion}</TableCell>
                                        <TableCell>{tarea?.proyecto.nombre}</TableCell>

                                        <TableCell align={'center'}>
                                            <Tooltip title={'Editar tarea'}>
                                                <IconButton color={'primary'} onClick={() => {
                                                    navigate(`/mistareas/tarea/${tarea.uid}/editar`)
                                                }}>
                                                    <Edit />

                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Borrar tarea'}>
                                                <IconButton color={'error'} onClick={() => { deleteTarea(tarea.uid) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>

                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


                :<Loading></Loading>
            }

            <Typography variant={'h5'}>En proceso</Typography>
            {listaTareas ?

                <TableContainer className={'mb-4'} sx={{ maxHeight: 200 }}>
                    <Table stickyHeader size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Proyecto.</TableCell>

                                <TableCell align={'center'}>Acciones.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listaTareas.filter(item => item.estado_Tarea === 'En proceso').map(tarea => {

                                    return <TableRow key={tarea.uid}>
                                        <TableCell>{tarea.nombre}</TableCell>
                                        <TableCell>{tarea.descripcion}</TableCell>
                                        <TableCell>{tarea?.proyecto.nombre}</TableCell>

                                        <TableCell align={'center'}>
                                            <Tooltip title={'Editar tarea'}>
                                                <IconButton color={'primary'} onClick={() => {
                                                    navigate(`/mistareas/tarea/${tarea.uid}/editar`)
                                                }}>
                                                    <Edit />

                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Borrar tarea'}>
                                                <IconButton color={'error'} onClick={() => { deleteTarea(tarea.uid) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>

                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


                :
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((valor) => {

                    return <h1 className={'mb-1'}><Skeleton /></h1>
                })
            }

            <Typography variant={'h5'}>Finalizado</Typography>
            {listaTareas ?

                <TableContainer className={'mb-4'} sx={{ maxHeight: 200 }}>
                    <Table stickyHeader size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Proyecto.</TableCell>

                                <TableCell align={'center'}>Acciones.</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listaTareas.filter(item => item.estado_Tarea === 'Finalizado').map(tarea => {

                                    return <TableRow key={tarea.uid}>
                                        <TableCell>{tarea.nombre}</TableCell>
                                        <TableCell>{tarea.descripcion}</TableCell>
                                        <TableCell>{tarea?.proyecto.nombre}</TableCell>

                                        <TableCell align={'center'}>
                                            <Tooltip title={'Editar tarea'}>
                                                <IconButton color={'primary'} onClick={() => {
                                                    navigate(`/mistareas/tarea/${tarea.uid}/editar`)
                                                }}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Borrar tarea'}>
                                                <IconButton color={'error'} onClick={() => { deleteTarea(tarea.uid) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                })

                            }
                        </TableBody>
                    </Table>
                </TableContainer>


                :
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((valor) => {

                    return <h1 className={'mb-1'}><Skeleton /></h1>
                })
            }
        </div>
    </>;
}

export default Tareas;