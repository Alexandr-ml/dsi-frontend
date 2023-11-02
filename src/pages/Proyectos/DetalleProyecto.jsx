import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from "../../Componentes/ResponsiveAppBar.jsx";
import {Grid} from "@mui/material";
import {OpcionCardTareas, OpcionCardAvance, OpcionCardDetalle, OpcionCardRecursos, OpcionCardProgreso, BasicCard,} from "../../Componentes/DetalleProyecto.jsx"
import Box from "@mui/material/Box";
import ConstructionIcon from '@mui/icons-material/Construction';
import {useNavigate, useParams} from "react-router-dom";
import Typography from '@mui/material/Typography';
import { blue} from '@mui/material/colors';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {ConsultaApi} from "../../../hooks/ConsultaApi.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Style } from '@mui/icons-material';


function DetalleProyecto(){

    const {id} = useParams();
    let navigate = useNavigate();
    const {con, consultar} = ConsultaApi();
    const [proyectoTarea, setproyectoTarea] = useState("");
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [descripcionProyecto, setDescripcionProyecto] = useState("");
    const [fechaInicioProyecto, setFechaInicioProyecto] = useState("");
    const [fechaFinalProyecto, setFechaFinalProyecto] = useState("");
    const [colaboradoresProyecto, setColaboradoresProyecto] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    //obtener id del proyecto de la url
    const idPro=window.location.href.split('/');



    const proy='650bc7935d3687ea8f542d09';
    const linkEditPro='/misproyectos/proyecto/'+id+'/editar';


    const porcentajeAv = '60';
    //se ejecuta al crearse el componente
    useEffect(() => {
        consultar(id);
    }, []);


    var myHeaders = new Headers();
    myHeaders.append("x-token", sessionStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/listadoTareas/"+id, requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));

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
            console.log(con.colaboradores);
            setIsLoading(false);


            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/listadoTareas/"+id, requestOptions)
                .then(response => response.json())
                .then(result => setproyectoTarea(result.tareas))
                .catch(error => console.log('error', error));
        }

    }, [con]);



    return (
        <>

            <Grid container spacing={1} justifyContent="center" sx={{ bgcolor: blue[500], borderRadius: 1}} maxWidth="xl">
                <Typography variant="h3" gutterBottom color="white">{nombreProyecto}</Typography>
                <Link to={linkEditPro}>
                    <BottomNavigationAction label="Recents" icon={<EditIcon/>}/>
                </Link>
            </Grid>

            <Grid container spacing={1} sx={{ mt: 0.5, background: blue[400], paddingRight:1, paddingBottom:3, paddingTop:2 }}>

                <Grid item md={4}>
                    <OpcionCardDetalle  titulo={"Detalle"} desc={descripcionProyecto}/>
                </Grid>

                <Grid item md={4} >
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item md={12} sx={{ml:9, mr:10}}>
                                <OpcionCardAvance porcentaje={porcentajeAv}
                                                  rango ={porcentajeAv+'%'} />
                            </Grid>
                            <Grid item md={12} sx={{paddingBottom:1}}>
                                <OpcionCardTareas fechaInicio={fechaInicioProyecto} fechaFinal={fechaFinalProyecto}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container spacing={1} >
                        <Grid item md={4}>
                            <OpcionCardProgreso   desc={"Pendientes"} icono={
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
            <Grid container spacing={1} sx={{ mt: 1 , background: blue[500], paddingRight: 1}}>

                {
                    proyectoTarea? proyectoTarea.map((element,index) => (
                        console.log(element),
                            <Grid item md={3} >,
                                <BasicCard asignado={element.asignados} estado={element.estado_Tarea} nombre={element.nombre} descripcion={element.descripcion} linkT={'/mistareas/tarea/'+element.uid+'/editar'}/>,
                            </Grid>
                    )): <CircularProgress />
                }
            </Grid>

        </>
    )
}

export default DetalleProyecto;