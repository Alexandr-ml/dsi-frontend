import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from "../../Componentes/ResponsiveAppBar.jsx";
import {Grid} from "@mui/material";
import {OpcionCardTareas, OpcionCardAvance, OpcionCardDetalle, OpcionCardRecursos, OpcionCardProgreso, BasicCard,} from "../../Componentes/DetalleProyecto.jsx"
import Box from "@mui/material/Box";
import ConstructionIcon from '@mui/icons-material/Construction';
import {Navigate} from "react-router";
import {useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import { blue} from '@mui/material/colors';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {ConsultaApi} from "../../../hooks/ConsultaApi.jsx";
import { ConsultaTareasApi } from '../../../hooks/TareasPorProyecto.jsx';



function DetalleProyecto(){


    let navigate = useNavigate();
    const {con, consultar} = ConsultaApi();
    const {conTareas, consultarTareas} = useState();
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [descripcionProyecto, setDescripcionProyecto] = useState("");
    const [fechaInicioProyecto, setFechaInicioProyecto] = useState("");
    const [fechaFinalProyecto, setFechaFinalProyecto] = useState("");
    const [colaboradoresProyecto, setColaboradoresProyecto] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const porcentajeAv = '60';
    //se ejecuta al crearse el componente
    useEffect(() => {
        consultar("647e730003483186ad7078ae");
    }, []);


    var myHeaders = new Headers();
myHeaders.append("x-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDRmZmE2YzI3ZDQ3NGNhNWFhNzY0ZDUiLCJpYXQiOjE2ODY0NTY5MzQsImV4cCI6MTY4NjQ3MTMzNH0.6A65qxBGpXsXWSgrAFdgNhWOsF2ABR3ArkvWOerjc0U");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:8080/api/tareas/listadoTareas/6456efca5838aeca09f347f8", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


    useEffect(() => {
        if(conTareas){
            console.log(conTareas);
        }
    }
    , [conTareas]);



    useEffect(() => {
        if(con){
            setNombreProyecto(con.nombre);
            setDescripcionProyecto(con.descripcion);
            //convertir fechaInicio a formato dd/mm/aaaa
            const fechaInicio = new Date(con.fecha_creacion);
            const fechaFinal = new Date(con.fecha_final);
            setFechaInicioProyecto(fechaInicio.toLocaleDateString());
            setFechaFinalProyecto(fechaFinal.toLocaleDateString());
            
            if (con.colaboradores)setColaboradoresProyecto(con.colaboradores);
            setIsLoading(false);
        }

    }, [con]);


    return (
        <>
            <Grid container spacing={1} justifyContent="center" sx={{ bgcolor: blue[500], borderRadius: 1}} maxWidth="xl">
            <Typography variant="h3" gutterBottom color="white">{nombreProyecto}</Typography>
            </Grid>
        
            <Grid container spacing={1} sx={{ mt: 0.5 }}>

                <Grid item md={4}>
                    <OpcionCardDetalle  titulo={"Detalle"} desc={descripcionProyecto}/>
                </Grid>

                <Grid item md={4} >
                    <Box>
                        <Grid container spacing={1} >
                            <Grid item md={12} sx={{ml:10}}>
                                <OpcionCardAvance porcentaje={porcentajeAv}
                                rango ={porcentajeAv+'%'}/>
                            </Grid>
                            <Grid item md={12}>
                                <OpcionCardTareas fechaInicio={fechaInicioProyecto} fechaFinal={fechaFinalProyecto}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container spacing={1} >
                        <Grid item md={4}>
                            <OpcionCardProgreso  desc={"Pendientes"} icono={
                                <AlarmIcon />
                            }/>
                        </Grid>
                        <Grid item md={4}>
                            <OpcionCardProgreso  desc={"En proceso"} icono={<ConstructionIcon/>}/>
                        </Grid>
                        <Grid item md={4}>
                            <OpcionCardProgreso  desc={"Finalizados"} icono={<CheckBoxIcon/>}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item md={4}>
                    <OpcionCardRecursos colaboradores={colaboradoresProyecto}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 0.5 }}>
                <Grid item md={3} >
                    {

                    }
                    <BasicCard />
                </Grid>
            </Grid>
        </>
    )
}

export default DetalleProyecto;