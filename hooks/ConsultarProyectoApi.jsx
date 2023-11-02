import React from 'react';

export const ConsultarProyectoApi = (id) => {
    const [nombreProyecto, setNombreProyecto] = React.useState([]);
    const [descripcionProyecto, setDescripcionProyecto] = React.useState([]);
    const [fechaInicioProyecto, setFechaInicioProyecto] = React.useState([]);
    const [fechaFinalProyecto, setFechaFinalProyecto] = React.useState([]);
    const [estadoProyecto, setEstadoProyecto] = React.useState([]);
    const [colaboradoresProyecto, setColaboradoresProyecto] = React.useState([]);
    //Obtener token de la sesion storage
    const token = sessionStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("x-token", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    //Obtener id del proyecto en la url
    const url = window.location.href.split("/");

    fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/"+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result);
            console.log(data);
            setNombreProyecto(data.nombre);
            setDescripcionProyecto(data.descripcion);
            setFechaInicioProyecto(data.fechaInicio);
            setFechaFinalProyecto(data.fechaFinal);
            setEstadoProyecto(data.estado);
            setColaboradoresProyecto(data.colaboradores);

            //retornar los datos del proyecto en un array
            return [nombreProyecto, descripcionProyecto, fechaInicioProyecto, fechaFinalProyecto, estadoProyecto, colaboradoresProyecto];
        })
        .catch(error => console.log('error', error));
}