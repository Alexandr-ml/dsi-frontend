import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from "../../Componentes/ResponsiveAppBar.jsx";
import { Button, Grid } from "@mui/material";
import { OpcionCardTareas, OpcionCardAvance, OpcionCardDetalle, OpcionCardRecursos, OpcionCardProgreso, BasicCard } from "../../Componentes/DetalleProyecto.jsx"
import Box from "@mui/material/Box";
import ConstructionIcon from '@mui/icons-material/Construction';
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ConsultaApi } from "../../../hooks/ConsultaApi.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Style } from '@mui/icons-material';
import { set } from 'date-fns';
import Loading from '../../Componentes/Loading.jsx'
import { Add } from "@mui/icons-material";


function DetalleProyecto() {


    let navigate = useNavigate();
    const { con, consultar } = ConsultaApi();
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
    const [dueno, setDueno] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    //obtener id del proyecto de la url

    const proyecto = window.location.href.split('/');
    const idPro = proyecto[6];


    const proy = '6546bf1bd11b1a0906d8aa45';
    const linkEditPro = '/misproyectos/proyecto/' + idPro + '/editar';


    const porcentajeAv = '60';
    //se ejecuta al crearse el componente
    useEffect(() => {
        consultar(idPro);
    }, []);


    var myHeaders = new Headers();
    myHeaders.set("x-token", sessionStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/listadoTareas/" + idPro, requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));

    useEffect(() => {
        if (con) {
            setNombreProyecto(con.nombre);
            setDescripcionProyecto(con.descripcion);
            //convertir fechaInicio a formato dd/mm/aaaa
            const fechaInicio = new Date(con.fecha_creacion);
            const fechaFinal = new Date(con.fecha_final);
            setFechaInicioProyecto(fechaInicio.toLocaleDateString());
            setFechaFinalProyecto(fechaFinal.toLocaleDateString());
            setPorcentajeAvance(con.porcentaje);
            if (con.propietario === localStorage.getItem("uid")) {
                setDueno(true)
            }


            if (con.colaboradores) setColaboradoresProyecto(con.colaboradores);
            setIsLoading(false);

            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/estadistica/" + idPro, requestOptions)
                .then(response => response.json())
                .then(result => setPendietes(result.cantidadTareasPendientes ? result.cantidadTareasPendientes : "0"))
                .catch(error => console.log('error', error));

            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/estadistica/" + idPro, requestOptions)
                .then(response => response.json())
                .then(result => setEnProceso(result.cantidadTareasEnProceso ? result.cantidadTareasEnProceso : "0"))
                .catch(error => console.log('error', error));

            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/estadistica/" + idPro, requestOptions)
                .then(response => response.json())
                .then(result => { setFinalizados(result.cantidadTareasFinalizadas ? result.cantidadTareasFinalizadas : "0") })
                .catch(error => console.log('error', error));


            fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/tareas/listadoTareas/" + idPro, requestOptions)
                .then(response => response.json())
                .then(result => setproyectoTarea(result.tareas.reverse()))
                .catch(error => console.log('error', error));
        }

    }, [con]);

    console.log(proyectoTarea)

    return (
        <>
            {proyectoTarea && finalizados ?
                <div>
                    {dueno ?
                        <Grid container spacing={1} justifyContent="center" maxWidth="xl" >
                            <Typography variant="h3" gutterBottom color="#214A87" textAlign='center'>{nombreProyecto}</Typography>
                            <Link to={linkEditPro}>
                                <BottomNavigationAction label="Recents" icon={<EditIcon sx={{ color: '#214A87', fontSize: 30 }} />} />
                            </Link>
                        </Grid>
                        :
                        <Grid container spacing={1} justifyContent="center" maxWidth="xl" >
                            <Typography variant="h3" gutterBottom color="#214A87" textAlign='center'>{nombreProyecto}</Typography>
                        </Grid>}
                    <Grid container spacing={1} sx={{ mt: 0.5, background: 'white', paddingRight: 1, paddingBottom: 3, paddingTop: 2 }} style={{ borderRadius: 10 }}>

                        <Grid item md={4} xs={12} justifyContent='center'>
                            <OpcionCardDetalle titulo={"Detalle"} desc={descripcionProyecto} />
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <Box>
                                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item md={12} xs={12} sx={{ ml: 9, mr: 10 }} >
                                        <OpcionCardAvance porcentaje={porcentajeAvance}
                                            rango={porcentajeAvance + '%'} />
                                    </Grid>
                                    <Grid item md={12} sx={{ paddingBottom: 1 }}>
                                        <OpcionCardTareas fechaInicio={fechaInicioProyecto} fechaFinal={fechaFinalProyecto} />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid container spacing={1}>


                                {pendites ? (
                                    <>

                                        <Grid item md={4} xs={4}>
                                            <OpcionCardProgreso
                                                desc={pendites}
                                                icono={<AlarmIcon />}
                                                color={"#540e06"}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <CircularProgress />
                                )}

                                {enProceso ? (
                                    <>
                                        <Grid item md={4} xs={4}>
                                            <OpcionCardProgreso
                                                desc={enProceso}
                                                icono={<ConstructionIcon />}
                                                color={"#a1a102"}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <CircularProgress />
                                )}
                                {finalizados ? (
                                    <>

                                        <Grid item md={4} xs={4}>
                                            <OpcionCardProgreso
                                                desc={finalizados}
                                                icono={<CheckBoxIcon />}
                                                color={"#145406"}
                                            />
                                        </Grid>
                                    </>
                                ) :
                                    <CircularProgress />
                                }
                            </Grid>

                        </Grid>

                        <Grid item md={4} xs={12}>
                            <OpcionCardRecursos colaboradores={colaboradoresProyecto} />
                        </Grid>
                    </Grid>
                    <Grid container alignItems={'center'} className={'mb-3'}>
                        <Grid item xs={8} >
                            <Typography variant={'h3'} color='#214A87'>Tareas</Typography>
                        </Grid >
                        <Grid item xs={4} justifyContent={'right'} display={'flex'}>
                            {dueno? 
                            <Button
                                onClick={() => {
                                    navigate(`/mistareas/creartarea/${idPro}`)
                                }}
                                variant={'contained'}
                                style={{ background: '#214A87', color: 'white', marginRight:'5%' }}
                                endIcon={<Add />}
                                >Nueva tarea</Button>
                                : <div></div>}
                        </Grid>
                    </Grid>
                            <Grid container spacing={1} sx={{ mt: 1, background: 'white', paddingRight: 1 }} style={{ borderRadius: 10 }}>
                                {proyectoTarea ? (
                                    proyectoTarea.reverse().map((element, index) => (
                                        <Grid item md={4} xs={12} lg={3} key={index}>
                                            <BasicCard
                                                asignado={element.asignados}
                                                estado={element.estado_Tarea}
                                                nombre={element.nombre}
                                                descripcion={element.descripcion}
                                                final={element.ending_date}
                                                linkT={'/mistareas/tarea/' + element.uid + '/editar'}
                                            />
                                        </Grid>
                                    ))
                                ) : (
                                    <CircularProgress />
                                )}
                            </Grid>
                            <br></br>
                        </div>
                        : <Loading></Loading>}
                    </>
                    )
}

                    export default DetalleProyecto;