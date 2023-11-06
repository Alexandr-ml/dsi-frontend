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
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Style } from '@mui/icons-material';
import { set } from 'date-fns';


function DetalleProyecto(){


    let navigate = useNavigate();
    const {con, consultar} = ConsultaApi();
    const [proyectoTarea, setproyectoTarea] = useState("");
    const [nombreProyecto, setNombreProyecto] = useState("");
    const [descripcionProyecto, setDescripcionProyecto] = useState("");
    const [fechaInicioProyecto, setFechaInicioProyecto] = useState("");
    const [fechaFinalProyecto, setFechaFinalProyecto] = useState("");
    const [colaboradoresProyecto, setColaboradoresProyecto] = useState("");
    const [porcentajeAvance, setPorcentajeAvance] = useState("");

    const [pendites, setPendietes] = useState("");
    const [enProceso, setEnProceso] = useState("");
    const [finalizados, setFinalizados] = useState("");


    const [isLoading, setIsLoading] = useState(true);

    //obtener id del proyecto de la url
    const idPro=window.location.href.split('/');



    const proy='6546bf1bd11b1a0906d8aa45';
    const linkEditPro='/misproyectos/proyecto/'+proy+'/editar';


    const porcentajeAv = '60';
    //se ejecuta al crearse el componente
    useEffect(() => {
        consultar(proy);
    }, []);


    var myHeaders = new Headers();
    myHeaders.append("x-token", sessionStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/listadoTareas/"+proy, requestOptions)
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
            setPorcentajeAvance(con.porcentaje);

            if (con.colaboradores)setColaboradoresProyecto(con.colaboradores);
            console.log(con.colaboradores);
            setIsLoading(false);

            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/estadistica/"+proy, requestOptions)
                .then(response => response.json())
                .then(result => setPendietes(result.cantidadTareasPendientes?result.cantidadTareasPendientes:"0"))
                .catch(error => console.log('error', error));

            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/estadistica/"+proy, requestOptions)
                .then(response => response.json())
                .then(result => setEnProceso(result.cantidadTareasEnProceso?result.cantidadTareasEnProceso:"0"))
                .catch(error => console.log('error', error));

            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/estadistica/"+proy, requestOptions)
                .then(response => response.json())
                .then(result => {setFinalizados(result.cantidadTareasFinalizadas?result.cantidadTareasFinalizadas:"0")})
                .catch(error => console.log('error', error));


            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/listadoTareas/"+proy, requestOptions)
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
                                <OpcionCardAvance porcentaje={porcentajeAvance}
                                                  rango ={porcentajeAvance+'%'} />
                            </Grid>
                            <Grid item md={12} sx={{paddingBottom:1}}>
                                <OpcionCardTareas fechaInicio={fechaInicioProyecto} fechaFinal={fechaFinalProyecto}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container spacing={1}>


                        {pendites ? (
                            <>

                                <Grid item md={4}>
                                    <OpcionCardProgreso
                                        desc={pendites}
                                        icono={<AlarmIcon />}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <CircularProgress />
                        )}

                        {enProceso ? (
                            <>
                                <Grid item md={4}>
                                    <OpcionCardProgreso
                                        desc={enProceso}
                                        icono={<ConstructionIcon />}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <CircularProgress />
                        )}
                        {finalizados ? (
                            <>

                                <Grid item md={4}>
                                    <OpcionCardProgreso
                                        desc={finalizados}
                                        icono={<CheckBoxIcon />}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <CircularProgress />
                        )}
                    </Grid>

                </Grid>

                <Grid item md={4}>
                    <OpcionCardRecursos colaboradores={colaboradoresProyecto}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 1 , background: blue[500], paddingRight: 1}}>
                {proyectoTarea ? (
                    proyectoTarea.map((element, index) => (
                        <Grid item md={3} key={index}>
                            <BasicCard
                                asignado={element.asignados}
                                estado={element.estado_Tarea}
                                nombre={element.nombre}
                                descripcion={element.descripcion}
                                linkT={'/mistareas/tarea/'+element.uid+'/editar'}
                            />
                        </Grid>
                    ))
                ) : (
                    <CircularProgress />
                )}
            </Grid>

        </>
    )
}

export default DetalleProyecto;