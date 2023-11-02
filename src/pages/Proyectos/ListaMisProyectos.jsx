import react, {useEffect, useState} from 'react'
import Typography from "@mui/material/Typography";
import {
    Dialog, DialogContent, DialogTitle,
    Grid, ListItemIcon,
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
import {Add, Edit} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {Link, useNavigate} from "react-router-dom";
import url from "../../serverUrl.js";
import ListIcon from '@mui/icons-material/List';

function ListaMisProyectos(){

    let [listaProyectos,setListaProyectos] = useState()
    let [hasProjects,setHasProjects] = useState(true)

    let [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState(false)
    let [idProjectToBeDeleted,setIdProjectToBeDeleted] = useState()
    let navigate = useNavigate()
    //TO-DO implementar logica para borrar en la bd
    const updateProjectList = (uid)=>{



        setIdProjectToBeDeleted(uid)
        setIsDeleteDialogOpen(true)


    }

    const deleteProject = () =>{
        let header = new Headers

        header.set("x-token", sessionStorage.getItem("token"))

        fetch(url+`/api/proyectos/${idProjectToBeDeleted}`,{
            method:'delete',
            headers:header
        })
            .then(raw => raw.json())
            .then(respuesta =>
            {
                const newListProjects = listaProyectos.filter(proyecto => proyecto.uid !== idProjectToBeDeleted)
                console.log(respuesta)
                setListaProyectos(newListProjects)
                setIsDeleteDialogOpen(false)
                alert('Se elimino el proyecto!')
            })


    }

    useEffect(() =>{
        const header = new Headers
        header.set("x-token", sessionStorage.getItem("token"))
        fetch(url+`/api/proyectos/listadoProyectos/${localStorage.getItem('uid')}`,{
            method:'get',
            headers:header
        }).then(rawResponse => rawResponse.json())
            .then(response => {
                if(response.proyectos){

                    setListaProyectos(response.proyectos)
                }else{
                    setHasProjects(false)
                }


            })

    },[])

    return <>

        <div className={'container'}>

            <Grid container alignItems={'center'}  className={'mb-4'}>
                <Grid item xs={8}>
                    <Typography variant={'h3'}>Mis Proyectos.</Typography>
                </Grid >
                <Grid item xs={4} >
                    <Button
                        onClick={()=> navigate('/misproyectos/proyecto')}
                        variant={'contained'}
                        endIcon={<Add/>}>Nuevo proyecto</Button>
                </Grid>
            </Grid>



            {listaProyectos ?

                    <TableContainer className={'mb-4'} sx={{maxHeight:500}}>
                        <Table stickyHeader size={'small'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre del proyecto.</TableCell>
                                    <TableCell>Descripción.</TableCell>
                                    <TableCell className={'sm'}>Estado.</TableCell>
                                    <TableCell align={'center'}>Acciones.</TableCell>
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
                                                       <Add/>
                                                   </IconButton>
                                               </Tooltip>
                                                <Tooltip title={'Editar proyecto'}>
                                                    <IconButton color={'primary'} onClick={() => {
                                                        navigate(`/misproyectos/proyecto/${proyecto.uid}/editar`)
                                                    }}>
                                                        <Edit/>

                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Borrar proyecto'}>
                                                    <IconButton color={'error'} onClick={() => {updateProjectList(proyecto.uid)}}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Ver'}>
                                                    <IconButton onClick={() => {navigate(`/misproyectos/proyecto/consultar/${proyecto.uid}`)}}>
                                                        <ListIcon/>
                                                    </IconButton>
                                                </Tooltip>

                                            </TableCell>
                                        </TableRow>
                                    })
                                    :   <Grid container>
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

                    return <h1 className={'mb-1'}><Skeleton/></h1>
                })


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