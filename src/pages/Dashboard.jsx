import React from 'react'
import ResponsiveAppBar from "../Componentes/ResponsiveAppBar.jsx";
import {Card, CardContent, Grid, Paper, styled} from "@mui/material";
import OpcionCard from "..//Componentes/OpcionCard.jsx"
import Box from "@mui/material/Box";
import ConstructionIcon from '@mui/icons-material/Construction';

function Dashboard(){


    return (
        <>
        <ResponsiveAppBar/>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <OpcionCard titulo={"Mis proyectos"} desc={"Descripción"} />
                </Grid>
                <Grid item xs={6}>
                    <OpcionCard titulo={"Tareas"} desc={"Descripción"} />
                </Grid>
                <Grid item xs={6}>
                    <OpcionCard titulo={"Recursos"} desc={"Descripción"}/>
                </Grid>
                <Grid item xs={6}>
                    <OpcionCard titulo={"Informes"} desc={"Descripción"}/>
                </Grid>

            </Grid>

        </>
    )

}

export default Dashboard;