import React from "react";
import { Grid, Typography} from "@mui/material";
import { CardReport } from "../../Componentes/OpcionCard";
import { useNavigate } from "react-router-dom";




function MisReportes() {
    let navigate = useNavigate()
    return <>
        <div style={{padding:0, margin:0, display:'block', justifySelf:'center'}}>
            <Typography variant="h3" align='center' style={{marginBottom:'3%'}}>Mis Reportes</Typography>
            <Grid container spacing={2} style={{padding:'2%'}}>
                <Grid item md={4}>
                    <CardReport titulo={"Proyectos"} desc={"Informe de tus proyectos"} handler={()=>{navigate('/reportproy')}} img={"https://res.cloudinary.com/dykkzngwd/image/upload/v1695942222/ImagenesGestor/index/moncai3hrzeoxdurtovt.png"} />
                </Grid>
                <Grid item md={4}>
                    <CardReport titulo={"Tareas"} desc={"Informe de tus tareas"} handler={()=>{navigate('/reporttareas')}}  img={"https://res.cloudinary.com/dykkzngwd/image/upload/v1695942222/ImagenesGestor/index/pf84wmlmdkcndvbczpqf.png"} />
                </Grid>
                <Grid item md={4}>
                    <CardReport titulo={"Colaboradores"} desc={"Informe de tus colaboradores"} handler={()=>{navigate('/reportcolab')}}  img={"https://res.cloudinary.com/dykkzngwd/image/upload/v1695942222/ImagenesGestor/index/syg5xlzku33n3pcmdvix.png"} />
                </Grid>
            </Grid>

        </div>
    </>
}

export default MisReportes;