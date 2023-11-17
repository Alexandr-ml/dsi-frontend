import react, { useState } from 'react'
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import serverUrl from "../serverUrl.js";



function TareasTable({ listaTareas, actualizarTareas }) {


    let cabeceras = ['Nombre', 'Descripción', 'Proyectos', 'Acciones']

    let [seModificaronTareas, setSeModificaronTareas] = useState(false)
    return <>

        {
            seModificaronTareas ?
                <div align={'center'}><CircularProgress /></div>
                :
                <TableContainer sx={{ height: 450, maxHeight: 450 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    cabeceras.map(value => <TableCell style={{ background: '#214A87', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{value}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(listaTareas.length > 0) ?
                                listaTareas.map((value, index) => <RowTarea key={index} tarea={value} actualizarTareas={actualizarTareas} setSeModificaronTareas={setSeModificaronTareas} />)
                                : <TableRow>
                                    <TableCell colSpan={4}>
                                        <Typography align='center' variant='h5' >No hay tareas</Typography>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>

                    </Table>
                </TableContainer>
        }



    </>

}


function RowTarea({ tarea, actualizarTareas, setSeModificaronTareas }) {

    let navigate = useNavigate()
    let descripcion = tarea.descripcion
    console.log(descripcion)

    if(tarea.descripcion.length > 100){
        descripcion = tarea.descripcion.substring(0, 100) + '...'
        console.log('si')
    }
    const cerrarDialog = () => setSeBorraraTarea(false)
    const borrarTarea = () => {

        const headers = new Headers();
        headers.set("x-token", sessionStorage.getItem("token"))

        const initBorrarTarea = {
            method: 'DELETE',
            headers: headers,
        }

        const initGetTareas = {
            method: 'GET',
            headers: headers,
        }

        

        cerrarDialog()
        console.log(tarea)

        setSeModificaronTareas(true)

        fetch(serverUrl + `/api/tareas/${tarea.uid}`, initBorrarTarea)
            .then(raw => {

                if (raw.ok) {
                    return fetch(serverUrl + `/api/tareas`, initGetTareas)
                }
            })
            .then(rawGetTareas => rawGetTareas.json())
            .then(response => {
                actualizarTareas(response.tareas)
                setSeModificaronTareas(false)
            })
    }


    return <>



        <TableRow key={tarea.uid}>
            <TableCell align={'center'}>{tarea.nombre}</TableCell>
            <TableCell align={'center'}>{descripcion}</TableCell>
            <TableCell align={'center'}>{tarea?.proyecto.nombre}</TableCell>

            <TableCell align={'center'}>
                <Tooltip title={'Editar tarea'}>
                    <IconButton color={'primary'} onClick={() => {
                        navigate(`/mistareas/tarea/${tarea.uid}/editar`)
                    }}>
                        <Edit />

                    </IconButton>
                </Tooltip>
            </TableCell>

        </TableRow>

    </>

}

export default TareasTable;