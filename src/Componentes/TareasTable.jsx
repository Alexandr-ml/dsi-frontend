import react from 'react'
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {Edit} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete.js";
import {useNavigate} from "react-router-dom";



function TareasTable({listaTareas,setTareas}){


let cabeceras = ['Nombre.','Descripción.','Proyectos.','Acciones.']


    return <>
        <Table>
            <TableHead>
                <TableRow>
                    {
                        cabeceras.map(value => <TableCell align={'center'}>{value}</TableCell>)
                    }
                </TableRow>
            </TableHead>
                <TableBody>


                    {
                        listaTareas.map((value,index) => <RowTarea tarea={value} />)
                    }

                </TableBody>

        </Table>

    </>

}


function RowTarea({tarea,setTareas}){

    let navigate = useNavigate()

    return <TableRow key={tarea.uid}>
        <TableCell align={'center'}>{tarea.nombre}</TableCell>
        <TableCell align={'center'}>{tarea.descripcion}</TableCell>
        <TableCell align={'center'}>{tarea?.proyecto.nombre}</TableCell>

        <TableCell align={'center'}>
            <Tooltip title={'Editar tarea'}>
                <IconButton color={'primary'} onClick={() => {
                    navigate(`/mistareas/tarea/${tarea.uid}/editar`)
                }}>
                    <Edit/>

                </IconButton>
            </Tooltip>
            <Tooltip title={'Borrar tarea'}>
                <IconButton color={'error'} >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>

        </TableCell>

    </TableRow>

}

export default TareasTable;