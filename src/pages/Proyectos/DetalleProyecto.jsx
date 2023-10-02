import React from 'react'
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


function DetalleProyecto(){

    let navigate = useNavigate()

    return (
        <>
            <Grid container spacing={1} justifyContent="center" sx={{ bgcolor: blue[500], borderRadius: 1}} maxWidth="xl">
            <Typography variant="h3" gutterBottom color="white">Titulo del proyecto </Typography>
            </Grid>
        
            <Grid container spacing={1} sx={{ mt: 0.5 }}>

                <Grid item md={4}>
                    <OpcionCardDetalle  titulo={"Detalle"} desc={"En esta interfaz se realiza la creación, modificación y eliminación de proyectos, así como también la asignación de las tareas correspondientes a cada proyecto."}/>
                </Grid>

                <Grid item md={4} >
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item md={4}>
                                <OpcionCardTareas fechaInicio={"12-15-2023"} fechaFinal={"12-23-2023"}/>
                            </Grid>
                            <Grid item md={8}>
                                <OpcionCardAvance porcentaje={50}/>
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
                    <OpcionCardRecursos titulo={"Recursos"} desc={"En esta interfaz se realiza la creación, modificación y eliminación de un recurso de tipo material, además de asignar los recursos a una tarea en específico."}/>
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