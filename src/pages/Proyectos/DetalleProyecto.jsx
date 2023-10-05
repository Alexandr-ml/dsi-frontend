import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from "../../Componentes/ResponsiveAppBar.jsx";
import {Card, CardContent, Grid, Paper, styled, CardMedia} from "@mui/material";
import {OpcionCardTareas, OpcionCardAvance, OpcionCardDetalle, OpcionCardRecursos, OpcionCardProgreso, BasicCard,} from "../../Componentes/DetalleProyecto.jsx"
import Box from "@mui/material/Box";
import ConstructionIcon from '@mui/icons-material/Construction';
import {Navigate} from "react-router";
import {useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import { blue, green, red} from '@mui/material/colors';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {ConsultaApi} from "../../../hooks/ConsultaApi.jsx";



function DetalleProyecto(){


    let navigate = useNavigate();
    const {con, consultar} = ConsultaApi();
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [descripcionProyecto, setDescripcionProyecto] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [fechaInicioProyecto, setFechaInicioProyecto] = useState("");
    const [fechaFinalProyecto, setFechaFinalProyecto] = useState("");
    const [avanceProyecto, setAvanceProyecto] = useState("");
    const [colaboradoresProyecto, setColaboradoresProyecto] = useState("");


    const porcentajeAv = '60';
    //se ejecuta al crearse el componente
    useEffect(() => {
        consultar("647e730003483186ad7078ae");
        setIsLoading(false);
    }, []);

    //se ejecuta cuando se actualiza el estado de con


    useEffect(() => {
        if(con){
            setNombreProyecto(con.nombre);
            setDescripcionProyecto(con.descripcion);
            //convertir fechaInicio a formato dd/mm/aaaa
            const fechaInicio = new Date(con.fecha_creacion);
            const fechaFinal = new Date(con.fecha_final);
            setFechaInicioProyecto(fechaInicio.toLocaleDateString());
            setFechaFinalProyecto(fechaFinal.toLocaleDateString());
            setAvanceProyecto(con.estado);
            console.log(con);
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
                    <BasicCard />
                </Grid>
                <Grid item md={3} >
                    <BasicCard  />
                </Grid>
                <Grid item md={3} >
                    <BasicCard  />
                </Grid>
                <Grid item md={3} >
                    <BasicCard  />
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ mt: 0.5 }}>
                <Grid item md={3} >
                    <BasicCard />
                </Grid>
                <Grid item md={3} >
                    <BasicCard  />
                </Grid>
                <Grid item md={3} >
                    <BasicCard  />
                </Grid>
                <Grid item md={3} >
                    <BasicCard />
                </Grid>
            </Grid>
        </>
    )

}

export default DetalleProyecto;