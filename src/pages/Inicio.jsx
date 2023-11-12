import React from 'react'
import ResponsiveAppBar from "../Componentes/ResponsiveAppBar.jsx";
import { Card, CardContent, Grid } from "@mui/material";
import { CardUserInfo, CardArea } from "..//Componentes/OpcionCard.jsx"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import url from "../serverUrl.js";
import Loading from '../Componentes/Loading.jsx';



function Inicio() {

    let [cantidadProyectos, setCantidadProyectos] = useState()
    let [cantidadProyectosPendientes, setcantidadProyectosPendientes] = useState()
    let [cantidadProyectosFinalizados, setcantidadProyectosFinalizados] = useState()
    let [cantidadProyectosEnProceso, setcantidadProyectosEnProceso] = useState()




    var id = localStorage.getItem("uid");
    var token = sessionStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("x-token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/estadistica/" + id, requestOptions)
        .then(response => response.json()
            .then(result => {
                setCantidadProyectos(result.cantidadProyectos)
                setcantidadProyectosPendientes(result.cantidadProyectosPendientes)
                setcantidadProyectosFinalizados(result.cantidadProyectosFinalizados)
                setcantidadProyectosEnProceso(result.cantidadProyectosEnProceso)
            }
            )
            .catch(error => console.log('error', error)));

    console.log(cantidadProyectos, cantidadProyectosEnProceso, cantidadProyectosFinalizados, cantidadProyectosPendientes);

    let [imagenesAvatar, setImagenesAvatar] = useState([])

    useEffect(() => {
        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/colaboradores/" + id, requestOptions)
            .then(response => response.json()
                .then(result => { setImagenesAvatar(result.colaboradoresFiltrados) })
                .catch(error => console.log('error', error)));
    }, []);



    let navigate = useNavigate()

    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const imgUsuario = localStorage.getItem("fotoPerfil");




    return (
        <>
            <div style={{marginTop:'5%'}}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item md={4} xs={12}>
                        <CardUserInfo usuario={nombreUsuario} desc="" imgUser={imgUsuario} prFinalizados={cantidadProyectosFinalizados} prProceso={cantidadProyectosEnProceso} prNoIniciados={cantidadProyectosPendientes} avatars={
                            imagenesAvatar ?
                                imagenesAvatar.map((item) => {
                                    return (
                                        imagenesAvatar = item.avatar
                                    )
                                })
                                :
                                ''
                        } />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item md={6} xs={12}>
                                <CardArea titulo={"Proyectos"} desc={"En esta interfaz se realiza la creación, modificación y eliminación de un proyecto, además de realizar un filtrado de proyectos respecto al estado de cada uno."} handler={() => { navigate('/misproyectos') }} img="https://res.cloudinary.com/dykkzngwd/image/upload/v1695006757/ImagenesGestor/administrador-de-tarea-vs-gestor-de-proyectos_oac1mk.jpg" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <CardArea titulo={"Tareas"} desc={"En esta interfaz se realiza la creación, modificación y eliminación de una tarea, además de realizar un filtrado de tareas respecto al estado de cada tarea."} handler={() => { navigate('/mistareas') }} img="https://res.cloudinary.com/dykkzngwd/image/upload/v1695007523/ImagenesGestor/gestion_de_tareas_2_quqwlr.jpg" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <CardArea titulo={"Informes"} desc={"En esta interfaz se realiza la creación, modificación y eliminación de un informe, además de realizar un filtrado de informes respecto al estado de cada informe."} handler={() => { navigate('/misinformes') }} img="https://res.cloudinary.com/dykkzngwd/image/upload/v1695007522/ImagenesGestor/Administrador-de-tareas-gratis-header_c2gmj9.png" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <CardArea titulo={"Proximamente"} desc={"¡Podras disfrutar de nuevas funcionalidades que seran agregadas muy pronto!\nPuedes solicitar funciones nuevas cuando quieras"} handler={() => { navigate('') }} img="https://res.cloudinary.com/dykkzngwd/image/upload/v1695008807/ImagenesGestor/61d5e1b6ae8db76cba5ac2fe_Coming-Soon-Page_arkuna.jpg" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
            </div>
        </>
    )
}
export default Inicio;



