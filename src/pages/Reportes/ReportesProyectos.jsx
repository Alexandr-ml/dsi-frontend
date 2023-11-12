import React, { useEffect } from "react";
import { Card, CardContent, Typography, useStepContext, CircularProgress, Grid } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import serverUrl from "../../serverUrl.js";
import "../../styles/reporte.css";
import { useNavigate } from "react-router-dom";

const ReportProyectos = () => {

    const headers = new Headers
    headers.set("x-token", sessionStorage.getItem("token"))

    const initGetProyectos = {
        headers: headers,
        method: "GET",
    }

    var id = localStorage.getItem("uid")

    const [listaProyectos, setListaProyectos] = useState(null);
    const [proyectosNoIniciados, setProyectosNoIniciados] = useState();
    const [proyectosEnProgreso, setProyectosEnProgreso] = useState();
    const [proyectosFinalizados, setProyectosFinalizados] = useState();
    const [cantProyNoIniciados, setCantProyNoIniciados] = useState();
    const [cantProyEnProgreso, setCantProyEnProgreso] = useState();
    const [cantProyFinalizados, setCantProyFinalizados] = useState();
    const [proyectos33, setProyectos33] = useState();
    const [proyectos66, setProyectos66] = useState();
    const [proyectos99, setProyectos99] = useState();
    const [cantProy33, setCantProy33] = useState(0);
    const [cantPro66, setCantProy66] = useState(0);
    const [cantProy99, setCantProy99] = useState(0);

    const filtrarProyectos = (proyectos) => {
        let proyectosNoIniciadosAux = proyectos.filter(valor => valor.estado_Proyecto === 'No iniciado')
        let proyectosEnProgresoAux = proyectos.filter(valor => valor.estado_Proyecto === 'En proceso')
        let proyectosFinalizadosAux = proyectos.filter(valor => valor.estado_Proyecto === 'Finalizado')
        let proyectos33 = proyectosEnProgresoAux.filter(valor => valor.porcentaje <= 33)
        let proyectos66 = proyectosEnProgresoAux.filter(valor => valor.porcentaje >= 33 && valor.porcentaje <= 66)
        let proyectos99 = proyectosEnProgresoAux.filter(valor => valor.porcentaje > 66)
        setProyectosEnProgreso(proyectosEnProgresoAux)
        setProyectosFinalizados(proyectosFinalizadosAux)
        setProyectosNoIniciados(proyectosNoIniciadosAux)
        setCantProyNoIniciados(proyectosNoIniciadosAux.length)
        setCantProyEnProgreso(proyectosEnProgresoAux.length)
        setCantProyFinalizados(proyectosFinalizadosAux.length)
        setProyectos33(proyectos33)
        setProyectos66(proyectos66)
        setProyectos99(proyectos99)
        setCantProy33(proyectos33.length)
        setCantProy66(proyectos66.length)
        setCantProy99(proyectos99.length)

    }

    useEffect(() => {
        fetch("https://gestor-dsi-produccion2-production.up.railway.app/api/proyectos/creador/" + id, initGetProyectos)
            .then(rawResponse => rawResponse.json())
            .then((response) => {
                const proyectos = response.proyectos;
                filtrarProyectos(proyectos);
                console.log(proyectos);
            }).catch(error => {
                console.error("Error", error);
            })
    }, []);



    const data = {
        labels: [
            'No iniciado',
            'En progreso',
            'Finalizado'
        ],
        datasets: [{
            data: [cantProyNoIniciados, cantProyEnProgreso, cantProyFinalizados],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const dataPor = {
        labels: [
            '0% - 33%',
            '34% - 66%',
            '67% - 99%'
        ],
        datasets: [{
            data: [cantProy33, cantPro66, cantProy99],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'black',
                    fontSize: 14,
                },
            },
        },
    }

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    fontColor: 'black',
                    fontSize: 14,
                },
            },
        },
    }

    const Tabs = ({ tabs }) => {
        const [activeTab, setActiveTab] = useState(0);

        const handleTabClick = (index) => {
            setActiveTab(index);
        };

        return (
            <div className="tabs-container" style={{ width: '100%' }}>
                <div className="tab-buttons">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`tab-button ${index === activeTab ? 'active' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <div className="tab-content" style={{ width: '90%' }}>
                    {tabs[activeTab].content}
                </div>
            </div>
        );
    };

    const tabData = [
        {
            label: 'Estado',
            content:
                <div >
                    <Grid container style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item md={6} xs={12} style={{ marginBottom: '5%', padding: '3%' }}>
                            <Doughnut data={data} options={options} />
                        </Grid>
                        <Grid item md={6} xs={12} style={{ padding: '3%' }}>
                            <Bar data={data} options={optionsBar} />
                        </Grid>
                    </Grid>

                    <div style={{ width: '100%' }}>
                        {proyectosNoIniciados ? <>
                            <Grid container style={{ width: '100%' }}>
                                <Grid item md={4} xs={12}>
                                    <TableContainer component={'div'}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ textAlign: 'center', background: '#214A87', color: 'white' }}>No iniciados</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {proyectosNoIniciados.map((fila, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ border: 'none' }}>{fila.nombre}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TableContainer component={'div'}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ textAlign: 'center', background: '#214A87', color: 'white' }}>En progreso</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {proyectosEnProgreso.map((fila, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ border: 'none' }}>{fila.nombre}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TableContainer component={'div'}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ textAlign: 'center', background: '#214A87', color: 'white' }}>Finalizados</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {proyectosFinalizados.map((fila, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ border: 'none' }}>{fila.nombre}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </> : <div align={'center'}><CircularProgress /></div>}
                    </div>
                    <br></br>
                </div>
        },
        {
            label: 'Porcentaje',
            content:
                <div style={{ width: '100%' }}>
                    <Grid container style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Grid item md={6} xs={12} style={{ marginBottom: '5%', padding: '3%' }}>
                            <Doughnut data={dataPor} options={options} />
                        </Grid>
                        <Grid item md={6} xs={12} style={{ padding: '3%' }}>
                            <Bar data={dataPor} options={optionsBar} />
                        </Grid>
                    </Grid>
                    <div style={{ display: "flex" }}>
                        {proyectos33 ? <>
                            <Grid container>
                                <Grid item md={4} xs={12}>
                                    <TableContainer component={'div'}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ textAlign: 'center', background: '#214A87', color: 'white' }}>0% - 33%</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {proyectos33.map((fila, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ border: 'none' }}>{fila.nombre + " (" + fila.porcentaje + "%)"}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TableContainer component={'div'}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ textAlign: 'center', background: '#214A87', color: 'white' }}>34% - 66%</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {proyectos66.map((fila, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ border: 'none' }}>{fila.nombre + " (" + fila.porcentaje + "%)"}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TableContainer component={'div'}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ textAlign: 'center', background: '#214A87', color: 'white' }}>67% - 99%</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {proyectos99.map((fila, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell style={{ border: 'none' }}>{fila.nombre + " (" + fila.porcentaje + "%)"}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </> : <div align={'center'}><CircularProgress /></div>}
                    </div>
                    <br></br>
                </div>
        }
    ];


    return <>

        <h2 style={{ textAlign: 'center' }}>Reporte de Proyectos</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tabs tabs={tabData} style={{ width: '100%' }} />
        </div>

    </>

};

export default ReportProyectos;